import * as AWS from 'aws-sdk';
import userService from '../user/user.service';
import applicationService from '../application/application.service';

// Set the region
AWS.config.update({ region: 'us-west-2' });

// Create a DynamoDB service object
const ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10' });

const removeUsers = {
    TableName: 'users'
}
const removeApplication = {
    TableName: 'application'
}

const userSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'name',
            AttributeType: 'S'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'name',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'users',
    StreamSpecification: {
        StreamEnabled: false
    }
};

const appSchema = {
    AttributeDefinitions: [
        {
            AttributeName: 'appID',
            AttributeType: 'N'
        }
    ],
    KeySchema: [
        {
            AttributeName: 'appID',
            KeyType: 'HASH'
        }
    ],
    ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5
    },
    TableName: 'application',
    StreamSpecification: {
        StreamEnabled: false
    }
};

ddb.deleteTable(removeUsers, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(userSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateUserTable();
                }, 10000);
            }
        });
    }, 5000);
});

function populateUserTable() {
    userService.addUser({name: 'Bob', password: 'pass', balance: 1000, supervisor: 'Peter', role: 'Employee', grades: [{universityCourses: 3.4, seminars: 'N/A', certificationClasses: 'N/A', certification: 'pass', technicalTraining: 'N/A', other: 'N/A'}]}).then(()=>{});
    userService.addUser({name: 'Carole', password: 'pass', balance: 1000, supervisor: 'Peter', role: 'Employee', grades: [{universityCourses: 2.4, seminars: 'pass', certificationClasses: 'pass', certification: 'pass', technicalTraining: 'pass', other: 'N/A'}]}).then(()=>{});
    userService.addUser({name: 'Alex', password: 'pass', balance: 1000, supervisor: 'Peter', role: 'Employee', grades: [{universityCourses: 1.2, seminars: 'N/A', certificationClasses: 'fail', certification: 'fail', technicalTraining: 'N/A', other: 'N/A'}]}).then(()=>{});
    userService.addUser({name: 'Peter', password: 'pass', balance: 1000, supervisor: 'Jennifer', role: 'Direct Supervisor', grades: []}).then(()=>{});
    userService.addUser({name: 'Jennifer', password: 'pass', balance: 1000, supervisor: 'Michael', role: 'Department Head', grades: []}).then(()=>{});
    userService.addUser({name: 'Michael', password: 'pass', balance: 1000, supervisor: 'N/A', role: 'BenCo', grades: []}).then(()=>{});
}

ddb.deleteTable(removeApplication, function (err, data) {
    if (err) {
        console.error('Unable to delete table. Error JSON:', JSON.stringify(err, null, 2));
    } else {
        console.log('Deleted table. Table description JSON:', JSON.stringify(data, null, 2));
    }
    setTimeout(()=>{
        ddb.createTable(appSchema, (err, data) => {
            if (err) {
                // log the error
                console.log('Error', err);
            } else {
                // celebrate, I guess
                console.log('Table Created', data);
                setTimeout(()=>{
                    populateAppTable();
                }, 10000);
            }
        });
    }, 5000);
}); 

 function populateAppTable() {
    applicationService.addApplication({
        appID: 1610573087882,
        user: 'Bob',
        sendTo: 'Michael',
        date: '3/15/21',
        time: '11:00',
        description: 'Event Marketing 101',
        location: 'Austin',
        category: 'Seminar',
        cost: 2000,
        status: 'pending',
        grades: [{universityCourses: 3.4, seminars: 'N/A', certificationClasses: 'N/A', certification: 'pass', technicalTraining: 'N/A', other: 'N/A'}]
    }).then(()=>{});
    applicationService.addApplication({
        appID: 1610573087872,
        user: 'Bob',
        sendTo: 'Peter',
        date: '5/21/21',
        time: '11:00',
        description: 'Using React Components',
        location: 'Austin',
        category: 'Technical Training',
        cost: 500,
        status: 'pending',
        grades: []
    }).then(()=>{});
    applicationService.addApplication({
        appID: 1610573087862,
        user: 'Alex',
        sendTo: 'Peter',
        date: '6/15/21',
        time: '9:00',
        description: 'ENGL 309',
        location: 'Austin',
        category: 'University Course',
        cost: 750,
        status: 'pending',
        grades: []
    }).then(()=>{});
    applicationService.addApplication({
        appID: 1610573087852,
        user: 'Carole',
        sendTo: 'Jennifer',
        date: '4/01/21',
        time: '10:30',
        description: 'Intro to Form Validation',
        location: 'Austin',
        category: 'University Course',
        cost: 500,
        status: 'pending',
        grades: []
    }).then(()=>{});
    applicationService.addApplication({
        appID: 1610573087852,
        user: 'Carole',
        sendTo: 'Carole',
        date: '6/11/21',
        time: '9:30',
        description: 'Intro to Psychology',
        location: 'Austin',
        category: 'University Course',
        cost: 500,
        status: 'pending',
        grades: []
    }).then(()=>{});
}
 