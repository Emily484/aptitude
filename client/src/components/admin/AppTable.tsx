import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState, UserState } from '../../reducers/reducer';
import 'bootstrap/dist/css/bootstrap.min.css';
import './grades.css';
import applicationService from '../../services/application.service';
import { getApplications } from '../../actions/actions';
import { Link } from 'react-router-dom';


export default function AppTable() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);

    const selectApplication = (state: ApplicationState) => state.applications;
    const applications = useSelector(selectApplication);
    
    const dispatch = useDispatch();

    useEffect(()=>{
        applicationService.getApplications().then((data)=> {
            dispatch(getApplications(data));
        })
    }, [dispatch]);
    
    return (
        <div className='grade-container'>   
                    <table className='table table-striped'>
                    <thead className='thead-default'>
                        <tr>
                        <th>Application</th>
                        <th>Applicant</th>
                        <th>Status</th>
                        <th>Deadline</th>
                        {/* <th>See More Details</th> */}
                        </tr>
                    </thead>
                    {applications.map((item) => {
                        return ( 
                    <tbody>
                    
                    {user.name === item.sendTo && (  
                        <tr>
                            
                        <td>{`${item.appID}`}</td>
                        <td>{`${item.user}`}</td>
                        <td>{`${item.status}`}</td>
                        <td>{`${item.date}`}</td>
                        <td><Link 
                                className='btn btn-info'
                                to={`/applications/${item.appID}`}>
                                    View Details
                            </Link>
                        </td>
                            
                        </tr>
                            )}
                        
                    </tbody>
                      );
                    })}
                    </table>
        </div>
    )
}
