import * as Actions from '../actions/actions';
import {Application} from '../models/application.class';
import { User } from '../models/user';

export interface ApplicationState {
    applications: Application[];
    application: Application;
}

export interface UserState {
    user: User;
}

export interface ReactState extends UserState, ApplicationState {}

export const initialState: ReactState = {
    user: new User(),
    applications: [],
    application: new Application()
}

const reducer = (state: ReactState = initialState, action: Actions.ReactAction): ReactState => {
    console.log(action);
    const newState = {...state}
    switch(action.type) {
        case Actions.ApplicationActions.GetApplications:
            newState.applications = action.payload as Application[];
            return newState;
        case Actions.ApplicationActions.ChangeApplication:
            newState.application = action.payload as Application;
            return newState;
        case Actions.UserActions.GetUser:
            newState.user = action.payload as User;
            return newState;
        default:
            return state;
    }
}

export default reducer;