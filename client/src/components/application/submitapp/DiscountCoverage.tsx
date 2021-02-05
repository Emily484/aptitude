import { useSelector } from 'react-redux';
import { UserState } from '../../../reducers/reducer';
import './submitapp.css';

export default function DiscountCoverage() {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    
    return (
        <div className='overlay-container'>
            <div className="inner-overlay">
                <div className="overlay-panel overlay-right">
                    <h2>Discount Coverage Rates</h2>
                    <p>80% on University Courses</p>
                    <p>60% on Seminars</p>
                    <p>75% on Certification Preparation Classes</p>
                    <p>100% on Certification</p>
                    <p>90% on Technical Training</p>
                    <p>30% on Misc</p>
                    {user.role === 'Employee' && (
                    <p className='emp-discount'>*Employees are able to claim up to $1000 in tuition reimbursement a year*</p>
                    )}
                </div>
            </div>
            
        </div>
    )
}
