export class User {
    name: string ='';
    password: string ='';
    role?: string;
    balance: number = 0;
    supervisor: string = '';
    grades: Grades[] = [];
}

export interface Grades {
    universityCourses: number;
    seminars: string;
    certificationClasses: string;
    certification: string;
    technicalTraining: string;
    other: string;
}