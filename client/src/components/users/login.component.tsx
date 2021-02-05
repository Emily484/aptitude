import { SyntheticEvent } from 'react';
import userService from '../../services/user.service';
import { useHistory } from 'react-router-dom';
import { UserState } from '../../reducers/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../actions/actions';
import './login.css';

// Function Component
function LoginComponent() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const dispatch = useDispatch();
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let u: any = { ...user };
        if((e.target as HTMLInputElement).name === 'username'){
            u.name = (e.target as HTMLInputElement).value;
        } else {
            u.password = (e.target as HTMLInputElement).value;
        }
        dispatch(getUser(u));
    }
    function submitForm() {
        userService.login(user).then((user) => {
            dispatch(getUser(user))
            history.push('/applications');
        });
    }
    return (
        <div>
            <div className='login-container'>
                <div className='window'>
                        <div className='content'>
                            <div className='welcome'>
                                Welcome,
                            </div>
                            <div className='login-subtitle'>Please enter your username and password to login.
                            </div>
                            <div className='input-fields'>
                                <input
                                    type='text'
                                    placeholder='Username'
                                    name='username'
                                    className='input-line full-width'
                                    onChange={handleFormInput} 
                                />
                                <input
                                    type='password'
                                    placeholder='Password'
                                    className='input-line full-width'
                                    name='password'
                                    onChange={handleFormInput} 
                                />
                            </div>
                            <div className='button-container'>
                                <button className='btn btn-secondary' onClick={submitForm}>
                                    Login
                                </button>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    );
}

export default LoginComponent;
