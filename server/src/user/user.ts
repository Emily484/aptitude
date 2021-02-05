import logger from '../log';
import userService from './user.service';

export class User {
    name: string = ''; 
    password: string = ''; 
    balance: number = 0; 
    supervisor: string = '';
    role: string= ''
    grades: Grades[] = [];
    constructor(){}
}

export interface Grades {
    universityCourses: number;
    seminars: string;
    certificationClasses: string;
    certification: string;
    technicalTraining: string;
    other: string;
}

export async function login(name: string, password: string): Promise<User|null> {
    logger.debug(`${name +' '+ password}`);
    return await userService.getUserByName(name).then((user)=> {
        if (user && user.password === password) {
            return user
        } else {
            return null;
        }
    })
}

/* export function register(username: string, password: string, money: number, callback: Function) {
    userService.addUser(new User(username, password, money, 'Customer')).then((res) => {
        logger.trace(res);
        callback();
    }).catch((err) => {
        logger.error(err);
        console.log('Error, this probably means that the username is already taken.')
        callback();
    });
}
 */
export function updateUser(user: User) {
    userService.updateUser(user).then((success) => {
        logger.info('user updated successfully');
    }).catch((error) => {
        logger.warn('user not updated');
    });
}
