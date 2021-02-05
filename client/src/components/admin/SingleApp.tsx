import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, UserState } from '../../reducers/reducer';
import applicationService from '../../services/application.service';
import { changeApplication, getUser } from '../../actions/actions';
import { Application } from '../../models/application.class';
import NavBar from '../navigation/navbar';
import './singleapp.css';
import userService from '../../services/user.service';
import { User } from '../../models/user';

interface ApplicationDetailProps {
    match: any;
}

function SingleApp(props: ApplicationDetailProps) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const applicationSelector = (state: ApplicationState) => state.application;
    const app = useSelector(applicationSelector);
    const userContext = useSelector((state: UserState) => state.user);
    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(()=>{
        console.log(props.match.params.id);
        applicationService.getApplication(props.match.params.id).then((app)=> {
            console.log(app);
            dispatch(changeApplication(app));
        })

        userService.login(userContext).then((u) => {
            dispatch(getUser(u));
            });

    }, [dispatch, props.match.params.id]);

    function handleDelete() {
        applicationService.deleteApplication(app.appID).then(() => {
            dispatch(changeApplication(new Application()));
            history.push('/applications');
        });
    }

    // change sendTo to the logged in user's supervisor
    function sendUp() {
        app.sendTo = user.supervisor;
        applicationService.updateApplication(app).then(() => {
            dispatch(changeApplication(new Application()))
            history.push('/applications');
        });
    }

    // change sendTo to the app's name
    function sendBack() {
        app.sendTo = app.user;
        applicationService.updateApplication(app).then(() => {
            dispatch(changeApplication(new Application()))
            history.push('/applications');
        })
    }

    // logic for final acceptance of application
    function sendOn() {
        app.sendTo = app.user;
        app.status = 'Approved';
        applicationService.updateApplication(app).then(() => {
            dispatch(changeApplication(new Application()))
            history.push('/applications');
        })
    }

    // logic for employee to submit grade
    function submitGrade() {
        console.log(user.grades)
        app.sendTo = 'Michael';
        app.grades = user.grades;
        console.log(app.grades)
        applicationService.updateApplication(app).then(() => {
            dispatch(changeApplication(new Application()))
            history.push('/applications');
        })
    }

    function claimReimbursement() {
        if(app.category === 'University Course'){
            userContext.balance -= (app.cost * 0.2)
        } else if (app.category === 'Seminar'){
            userContext.balance -= (app.cost * 0.4)
        } else if (app.category === 'Certification Preparation Class'){
            userContext.balance -= (app.cost * 0.25)
        } else if (app.category === 'Certification'){
            userContext.balance -= 0
        } else if (app.category === 'Technical Training'){
            userContext.balance -= (app.cost * 0.1)
        }else{
            userContext.balance -= (app.cost * 0.7)
        }
        
        userService.updateUser(userContext).then(() => {
            dispatch(getUser(new User()))
            // history.push('/');
        })
 
    }

    return (
        <div>
            <NavBar></NavBar>
                <div className="app-container">
                            <div className='card app-card text-center'>
                                <div className='app-card-body text-dark'>
                                    <h5 className='card-title'>Application #{app.appID}</h5>
                                    <p className='card-text text-secondary'>Applicant: {app.user}</p>
                                    <p className='card-text text-secondary'>Category: {app.category}</p>
                                    <p className='card-text text-secondary'>Description: {app.description}</p>
                                    <p className='card-text text-secondary'>Cost: ${app.cost}</p>
                                    <p className='card-text text-secondary'>Date: {app.date}</p>
                                    <p className='card-text text-secondary'>Status: {app.status}</p>
                                    {app.grades ? (
                                <>
                                    {app.grades.map((item) => {
                                        return (
                                            <> <h5 className='card-title'>Grades</h5>
                                            <p className='card-text text-secondary'>University Courses: {`${item.universityCourses}`}</p>
                                            <p className='card-text text-secondary'>Seminars: {`${item.seminars}`}</p>
                                            <p className='card-text text-secondary'>Certification Preparation Classes: {`${item.certificationClasses}`}</p>
                                            <p className='card-text text-secondary'>Certification: {`${item.certification}`}</p>
                                            <p className='card-text text-secondary'>Technical Training: {`${item.technicalTraining}`}</p>
                                            </>
                                            )
                                    })}
                                </>
                                    ) : (null)}
                                    {app.status === 'Approved' ? (
                                        <a href='/applications' className='btn btn-outline-info' onClick={claimReimbursement}>{app.status} *click to claim reimbursement*</a>
                                    ) : (null)}

                                    {userContext.role === 'Direct Supervisor' && (
                                        <>
                                            <button className='btn btn-info' onClick={sendUp}>
                                                Accept Application
                                            </button> 
                                        </> )}

                                    {userContext.role === 'Department Head' && (
                                        <>
                                            <button className='btn btn-info' onClick={sendUp}>
                                                Accept Application
                                            </button> 
                                        </> )}

                                    
                                    {(userContext.role === 'BenCo') ? (
                                        <div>

                                            <button className='btn btn-info' onClick={sendBack}>
                                                Request Grade Format
                                            </button>

                                            <button className='btn btn-info' onClick={sendOn}>
                                                Approve Application
                                            </button> 
                                    
                                        </div>
                                    ) : (null)}

                                    {userContext.role !== 'Employee' && (
                                        <>
                                            <button className='btn btn-danger' onClick={handleDelete}>
                                                Reject Application
                                            </button>
                                        </> )} 
                                    
                                    {(userContext.role === 'Employee') && (app.status === 'pending') ? (
                                        <>
                                            <button className='btn btn-info' onClick={submitGrade}>
                                                Submit Grade
                                            </button> 
                                        </> ) : (null)}
                                </div>             
                        </div>
                </div>
         </div>
    );
}

export default SingleApp;
