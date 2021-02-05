import React, { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { getUser} from '../../actions/actions';
import { User } from '../../models/user';
import { ApplicationState, UserState } from '../../reducers/reducer';
import applicationService from '../../services/application.service';
import userService from '../../services/user.service';
import GradeFormat from './GradeFormat';
import {getApplications} from '../../actions/actions';
import './sidebar.css';
import AppTable from './AppTable';
import {FaMoneyBillWave, FaWpforms, FaIdBadge} from 'react-icons/fa';
import {IoIosSchool} from 'react-icons/io';
import {IconContext} from 'react-icons/lib';

export default function AdminSidebar() {
    const [click, setClick] = useState(false)
    
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    const selectApplication = (state: ApplicationState) => state.applications;
    const applications = useSelector(selectApplication);

    const history = useHistory();
    const dispatch = useDispatch();
    
    useEffect(() => {
        applicationService.getApplications().then((data) => {
        dispatch(getApplications(data));
        });

        userService.login(user).then((u) => {
            dispatch(getUser(u));
            });

    }, [dispatch]);

    function logout(){
        userService.logout().then(() => {
            dispatch(getUser(new User()));
            history.push('/')
        });
    }

    const handleClick = () => setClick(!click)
    
    return (
        <IconContext.Provider value={{color: '#e5e5e5'}}>
            <section className='sidebar col-md-3'>
                <div className='user-panel'>
                    {user.role === 'Employee' ? ( 
                        <p className='user-options'><div className='admin-icon'><FaMoneyBillWave /></div>Balance: ${user.balance}</p>
                        ) : (
                        <p className='user-options'><div className='gr-admin-icon'><FaIdBadge /></div>{user.role}</p>
                        )}
                        <p className='user-options-link click' onClick={handleClick}><div className='admin-icon'><FaWpforms /></div>Applications</p>
                    {user.role === 'Employee' ? (
                        <p className='user-options-link click' onClick={handleClick}><div className='admin-icon'><IoIosSchool /></div>View Grades</p>
                    ) : (null)}
                        <p className='user-options'>
                            {user.role && (
                                <button className='btn btn-secondary btn-lg' onClick={logout}>Logout</button>
                            )}
                        </p>
                </div>       
            </section>
            <div className='grade-format'>
                    { click ? <GradeFormat></GradeFormat> : <AppTable></AppTable>}
            </div>   
        </IconContext.Provider>
    );
}
