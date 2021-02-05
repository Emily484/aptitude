import { Application } from '../models/application.class';
import { User } from '../models/user';

export enum ApplicationActions {
    GetApplications = 'GET_APPLICATIONS',
    ChangeApplication = 'CHANGE_APPLICATION'
}

export enum UserActions{
    GetUser = 'GET_USER'
}

export interface ReactAction{
    type: string;
    payload: any;
}

export interface UserAction extends ReactAction {
    type: UserActions;
    payload: User;
}

export interface ApplicationAction extends ReactAction {
    type: ApplicationActions;
    payload: Application | Application[];
}

export function getApplications(apps: Application[]): ApplicationAction{
    const action: ApplicationAction = {
        type: ApplicationActions.GetApplications,
        payload: apps
    }
    return action;
}


export function changeApplication(app: Application): ApplicationAction{
    const action: ApplicationAction = {
        type: ApplicationActions.ChangeApplication,
        payload: app
    }
    return action;
}

export function getUser(user: User): UserAction {
    const action: UserAction = {
        type: UserActions.GetUser,
        payload: user
    }
    return action;
}



