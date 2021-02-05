import { Grades } from "../user/user";


export class Application {
    appID: number = 0;
    user: string = '';
    sendTo: string = '';
    date: string = '';
    time: string = '';
    description: string = '';
    location: string = '';
    category: string = '';
    cost: number = 0;
    status: string = '';
    grades: Grades[] = [];
}