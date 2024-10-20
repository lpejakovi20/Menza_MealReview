## Web Application for Meal Reviews

### 1. Motivation
The student restaurant in Varaždin serves meals of varying quality, which created the need for an application that allows users to provide feedback and rate the meals and individual products. This application will enable restaurant users to view previous experiences and reviews from other customers, improving decision-making and helping avoid low-quality meals and products.

### 2. Tools and Technologies Used
The web application was developed in a virtual machine running Ubuntu. The following tools were used:
- **Tools**:
  - Visual Studio Code
  - Visual Paradigm
  - phpMyAdmin
  - Terminal
  - Amazon Relational Database
  - Amazon Simple Storage Service (S3)
  
- **Technologies**:
  - HTML + CSS
  - JavaScript
  - Angular
  - Node.js
  - Express.js
  - Python
  - Django
  - MySQL

## Project Structure
- `django_server/`: Django-based backend implementation.
- `express_server/`: Express.js backend implementation.
- `angular/`: Angular frontend application.

## Features

### Guest
- User registration and login
- View the daily menu

### Registered User
- Logout
- View all products
- View all menus
- View product details and reviews
- View nutritional values of products
- View menu details and reviews
- Review individual products
- Review entire menus

### Administrator
- Add new products
- Add new menus
- Approve reviews
- Activate user accounts

Note: Each higher-level role inherits the capabilities of the lower-level roles (e.g., User > Guest). 


## References

The full written paper for this undergraduate project can be found at the following link:

[Undergraduate Paper - Comparison of programming languages for server-side web application development](https://repozitorij.foi.unizg.hr/islandora/object/foi:7672)

