const axios = require('axios');
const AWS = require('aws-sdk');
const fs = require('fs');
const ProvjeraAutorizacije = require("./provjeraAutorizacije.js");

AWS.config.update({
    accessKeyId: 'access_key',
    secretAccessKey: 'secret_key'
});

const s3Client = new AWS.S3();

const bucket = "zavrsni-storage";

exports.createFile = async function (zahtjev, odgovor) {

  let autorizacija = new ProvjeraAutorizacije();
  let kod = autorizacija.provjeri(zahtjev);

  if(kod == 400){
      odgovor.status(400);
      let poruka = { greska: "nevaljani zahtjev, nedostaju korime i lozinka" }
      odgovor.send(JSON.stringify(poruka));
  }
  else if(kod == 401){
      odgovor.status(401);
      let poruka = { greska: "neautorizirani pristup" }
      odgovor.send(JSON.stringify(poruka));
  }
  else{
    let file;
    let podaci;

    const naziv = zahtjev.body.naziv;

    if(zahtjev.body.url){
      file = zahtjev.body.url;
      let response = await axios.get(file, { responseType: 'arraybuffer' });
      podaci = response.data;
    }
    else {
      file = zahtjev.files.file;
      podaci = file.data;
    }

    console.log(podaci);

    let uspjeh = await storeImageToS3(bucket,naziv,podaci);

    odgovor.send(JSON.stringify(uspjeh));
  }
};

exports.uploadFile = async function (zahtjev, odgovor){

  let autorizacija = new ProvjeraAutorizacije();
  let kod = autorizacija.provjeri(zahtjev);

  if(kod == 400){
      odgovor.status(400);
      let poruka = { greska: "nevaljani zahtjev, nedostaju korime i lozinka" }
      odgovor.send(JSON.stringify(poruka));
  }
  else if(kod == 401){
      odgovor.status(401);
      let poruka = { greska: "neautorizirani pristup" }
      odgovor.send(JSON.stringify(poruka));
  }
  else{
    const file = zahtjev.file;

    console.log("file: ");
    console.log(file);

    const fileContent = fs.readFileSync(file.path);

    const fileExtension  = file.mimetype.split('/')[1];
    const modifiedFilename = file.originalname + "." + fileExtension;

    const params = {
      Bucket: bucket,
      Key: modifiedFilename,
      Body: fileContent,
      ContentType: file.mimetype
    };

    s3Client.upload(params, (err, data) => {
      if (err) {
        console.error('Error:', err);
        return odgovor.status(500).json({ error: 'Neuspješno uploadanje na S3' });
      }

      fs.unlinkSync(file.path);

      odgovor.json({ message: 'Datoteka uspješno uploadana.', fileUrl: data.Location });
    });  
  }
}


exports.getFile = async function (zahtjev, odgovor) {
  let autorizacija = new ProvjeraAutorizacije();
  let kod = autorizacija.provjeri(zahtjev);

  if(kod == 400){
      odgovor.status(400);
      let poruka = { greska: "nevaljani zahtjev, nedostaju korime i lozinka" }
      odgovor.send(JSON.stringify(poruka));
  }
  else if(kod == 401){
      odgovor.status(401);
      let poruka = { greska: "neautorizirani pristup" }
      odgovor.send(JSON.stringify(poruka));
  }
  else{
    if (!zahtjev.params || !zahtjev.params.fileName) {
      odgovor.status(400);
      let poruka = { greska: "nevaljani zahtjev, nedostaje fileName parametar" }
      odgovor.send(JSON.stringify(poruka));
    }
    else{

      let fileName = zahtjev.params.fileName;
      const params = {
          Bucket: bucket,
          Key: fileName
        };
      
      const s3Stream = s3Client.getObject(params).createReadStream();
    
      const contentType = getContentType(fileName);
      const contentDisposition = `inline; filename="${fileName}"`;
      odgovor.set('Content-Type', contentType);
      odgovor.set('Content-Disposition', contentDisposition);
    
      s3Stream.pipe(odgovor);
    
      s3Stream.on('error', err => {
        console.error('Error streaming file from S3:', err);
        odgovor.status(500).send('Error streaming file');
      });
    }
  }
};

function getContentType(fileKey) {
    const extension = fileKey.split('.').pop().toLowerCase();
  
    const contentTypeMap = {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      png: 'image/png',
      mp4: 'video/mp4',
      webm: 'video/webm'
    };
  
    return contentTypeMap[extension] || 'application/octet-stream';
  }

  async function storeImageToS3(bucketName, key, imageData) {
    try {
      const params = {
        Bucket: bucketName,
        Key: key,
        Body: imageData
      };
  
      const result = await s3Client.putObject(params).promise();
      return true;
    } catch (error) {
      return false;
    }
  }