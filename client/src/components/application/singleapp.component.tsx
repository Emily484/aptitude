import { useEffect} from 'react';
import { useHistory, Link } from 'react-router-dom';
import { Application } from '../../models/application.class';
import applicationService from '../../services/application.service';
import { ApplicationState, UserState } from '../../reducers/reducer';
import { useDispatch, useSelector } from 'react-redux';
import { changeApplication, getUser } from '../../actions/actions';
import NavBar from '../navigation/navbar';
import userService from '../../services/user.service';
import { User } from '../../models/user';

interface ApplicationDetailProps {
    match: any;
}

export default function SingleAppComponent(props: ApplicationDetailProps) {
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
        app.sendTo = 'Emily';
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
        })
 
    }

    console.log(user.grades)
    return (
        <div>
            <NavBar></NavBar>
            <div className='col application card'>
                <h2>Application #{app.appID}</h2>
                    <div className='card-body'>
                        <p className='app'>Applicant: {app.user}</p>
                        <p className='app'>Type: {app.category}</p>
                        <p className='app'>Description: {app.description}</p>
                        <p className='app'>Cost: {app.cost}</p>
                        <p className='app'>Location: {app.location}</p>
                        <p className="app">Date: {app.date}</p>
                        <p className="app">Status: {app.status}</p>
                        {app.status === 'Approved' ? (
                            <button onClick={claimReimbursement}>Claim Reimbursement</button>
                        ) : (null)}
                        {app.grades ? (
                    <div>
                        {app.grades.map((item) => {
                            return (
                                <div> Grades:
                                <div>University Courses: {`${item.universityCourses}`}</div>
                                <div>Seminars: {`${item.seminars}`}</div>
                                <div>Certification Preparation Classes: {`${item.certificationClasses}`}</div>
                                <div>Certification: {`${item.certification}`}</div>
                                <div>Technical Training: {`${item.technicalTraining}`}</div>
                                <div>Other: {`${item.other}`}</div>
                                </div>
                                )
                        })}
                    </div>
                        ) : (null)}
                    </div>
                    

                    {(userContext.role === 'Employee') && (app.status === 'pending') ? (
                        <>
                            <button className='btn btn-info' onClick={submitGrade}>
                                Submit Grade
                            </button> 
                        </> ) : (null)}

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
                            
                            <button className='btn btn-info' onClick={sendOn}>
                                Approve Application
                            </button> 
                    
                            <button className='btn btn-info' onClick={sendBack}>
                                Request Grade Format
                            </button>
                    

                        </div>
                         ) : (null)}
                        
                    {userContext.role !== 'Employee' && (
                        <>
                            <button className='btn btn-danger' onClick={handleDelete}>
                                Reject Application
                            </button>
                        </> )}  
            </div>
        </div>
    );
}
