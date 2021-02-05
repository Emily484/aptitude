import React from 'react'
import { useSelector } from 'react-redux';
import { UserState } from '../../reducers/reducer';
import './grades.css';

export default function GradeFormat() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    
    return (
        <div className='grade-container'>
                {user.grades.map((item) => {
                return (    
                    <table className='table table-striped'>
                    <thead className='thead-default'>
                        <tr><h3>Grades for {user.name}</h3></tr>
                        <tr>
                        <th>Category</th>
                        <th>Grade</th> 
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                        <td>University Courses</td>
                        <td>{`${item.universityCourses}`} GPA</td>
                        </tr>
                        <tr>
                        <td>Seminars</td>
                        <td>{`${item.seminars}`}</td>
                        </tr>
                        <tr>
                        <td>Certification Preparation Classes</td>
                        <td>{`${item.certificationClasses}`}</td>
                        </tr>
                        <tr>
                        <td>Certification</td>
                        <td>{`${item.certification}`}</td>
                        </tr>
                        <tr>
                        <td>Technical Training</td>
                        <td>{`${item.technicalTraining}`}</td>
                        </tr>
                        <tr>
                        <td>Other</td>
                        <td>{`${item.other}`}</td>
                        </tr>
                    </tbody>
                    </table>
                    )}
                )}
        </div>
    )
}
