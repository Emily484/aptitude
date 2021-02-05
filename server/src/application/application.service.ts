import { DocumentClient } from 'aws-sdk/clients/dynamodb';
import dynamo from '../dynamo/dynamo';
import logger from '../log';
import { Application } from './application';

class ApplicationService {
    private doc: DocumentClient;
    constructor() {
        this.doc = dynamo;
    }

    async getApplications(): Promise<Application[]> {
        const params = {
            TableName: 'application'
        };
        return await this.doc.scan(params).promise().then((data) => {
            return data.Items as Application[];
        }).catch((err) => {
            logger.error(err);
            return[];
        });
    }

    async getApplication(id: number): Promise<Application | null>{
        const params = {
            TableName: 'application',
            Key: {
                'appID': id
            }
        }
        return await this.doc.get(params).promise().then((data) => {
            return data.Item as Application;
        }).catch((err) => {
            logger.error(err);
            return null;
        });
    }

    async addApplication(app: Application): Promise<boolean> {
        const params = {
            TableName: 'application',
            Item: app,
            ConditionExpression: '#appID <> :appID',
            ExpressionAttributeNames: {
                '#appID': 'appID'
            },
            ExpressionAttributeValues: {
                ':appID': app.appID
            }
        };


        return await this.doc.put(params).promise().then((result) => {
            logger.info('Successfully created item');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        });
    }

    async updateApplication(app: Application): Promise<boolean>{
        console.log(app);
        const params = {
            TableName: 'application',
            Key: {
                'appID': app.appID
            },
            UpdateExpression: 'set #sendTo=:s, #grades=:g, #status=:a',
            ExpressionAttributeValues: {
                ':s': app.sendTo,
                ':g': app.grades,
                ':a': app.status,
            },
            ExpressionAttributeNames: {
                '#sendTo': 'sendTo',
                '#grades': 'grades',
                '#status': 'status',
            },
            ReturnValue: 'UPDATED_NEW'
        };

        return await this.doc.update(params).promise().then(() => {
            logger.info('Application moved on');
            return true;
        }).catch((error) => {
            logger.error(error);
            return false;
        })
    }

    async deleteApplication(id: number): Promise<boolean> {
        const params = {
            TableName: 'application',
            Key: {
                'appID': id
            }
        }
        return await this.doc.delete(params).promise().then((data) => {
            return true;
        }).catch((err) => {
            logger.error(err);
            return false;
        });
    }
}

const applicationService = new ApplicationService();
export default applicationService;
