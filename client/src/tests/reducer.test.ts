import { ApplicationActions } from "../actions/actions";
import { Application } from "../models/application.class";
import { User } from "../models/user";
import reducer, { ReactState } from "../reducers/reducer";

test('reducer clears application after changeApplication action', () => {
    const initialApplications: Application[] = [];
    const initialApplication = new Application();
    initialApplication.appID = 1234;
    const initialUser = new User();
    const initialState: ReactState = {
        applications: initialApplications,
        application: initialApplication,
        user: initialUser
    };
    const newApplication = new Application()
    const action = {
        type: ApplicationActions.ChangeApplication,
        payload: newApplication
    } 
    let newState = reducer(initialState, {type: '', payload: null});
    expect(newState).toBe(initialState);

    newState = reducer(initialState, action)
    expect(newState.application).toBe(newApplication);

    expect(newState.applications).toBe(initialApplications);
    expect(newState.user).toBe(initialUser);
})