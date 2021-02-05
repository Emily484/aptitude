# APTITUDE (TRMS)

## Project Description
Aptitude is a company which provides educational and career guidance to their clients. The main service provided is the Tuition Reimbursement Management System which allows a user to submit an application for discounted coverage on educational services such as university courses, seminars, certificate preparation course, and more. Employees of Aptitude are allowed to apply for the TRMS as an employee benefit. 

## Technologies Used
### React
### TypeScript
### Express
### DynamoDB

## Features
#### Employee can apply for TRMS
#### Employee can view and submit their grades
#### Employee can claim reimbursement on approved application
#### Managerial role can accept application
#### Managerial role can deny application
#### BenCo can request grade submission

### To-do list:
#### Employee can include attachments to application
#### Employee can view pending reimbursement balance
#### Managerial role can request for more information from applicant

## Getting Started
In code editing terminal:
#### git clone https://github.com/Emily484/aptitude.git
#### cd aptitude/server
#### add file '.env' with content: CLIENT = http://localhost:3001
#### npm install
#### npm run setup (requires AWS cli configuration)
#### npm run start
#### cd ../
#### cd client
#### add file '.env' with content: PORT = 3001
#### npm install
#### npm run start 

## Usage
### Employee login:
username: Bob
username: Carole
username: Alex

### Direct Supervisor login:
username: Peter

### Department Head login:
username: Jennifer

### BenCo login:
username: Michael

universal password: pass

### User:
*Sign in on the main page with login information, you will be redirected to an admin panel

### Employee:
*Employees can view their account balance, applications and grades are accessed on a sidebar
*To submit an application click on TRMS in the navbar
*Fill out form and submit, application will be sent to their supervisor
*If employee has any pending applications for grade request it will be displayed by the application tab, there will be an option to view application in which a card pops up. From their they can click the 'submit grade' button and their grades will be sent to the Ben Co.
*If employee has any applications that can be approved it will be displayed by the application tab in which you can view in more detail. The detail view will have a 'claim reimbursement' button which takes out from their balance the alloted discount.

### Direct Supervisor and Department Head:
*For managerial roles, their employment status will be shown in the sidebar
*Any pending applications that have been sent to a specific user will show up in the application view.
*To view a specific application, click on "View Details"
*Managerial roles have the abilit to either approve or deny an application. Denying an application deletes the application form the database, approving application sends the application up to their supervisor.

### BenCo:
*Ben Co has all the functionality that Direct Supervisor and Department Head have with the addition to request grade submission, which sends the application back to the employee.
*If an application has it's grade submission attached BenCo can accept the application which sends the application back to the employee with final approval. 
