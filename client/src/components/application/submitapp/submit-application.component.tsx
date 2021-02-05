import { SyntheticEvent } from 'react';
import { useHistory } from 'react-router-dom';
import { connect, ConnectedProps, useSelector } from 'react-redux';
import { ApplicationState, UserState } from '../../../reducers/reducer';
import applicationService from '../../../services/application.service';
import { changeApplication } from '../../../actions/actions';
import { Application } from '../../../models/application.class';
import NavBar from '../../navigation/navbar';
import './submitapp.css';
import DiscountCoverage from './DiscountCoverage';

const applicationProp = (state: ApplicationState) => ({application: state.application});
const mapDispatch = {
    updateApplication: (application: Application) => changeApplication(application),
};
const connector = connect(applicationProp, mapDispatch);

type PropsFromRedux = ConnectedProps<typeof connector>;

function SubmitAppComponent(props: PropsFromRedux) {
    const userSelector = (state: UserState) => state.user;
    const user = useSelector(userSelector);
    const FIELDS = ['category', 'description', 'cost', 'date', 'time'];
    const history = useHistory();

    function handleFormInput(e: SyntheticEvent) {
        let a: any = { ...props.application };
        a[
            (e.target as HTMLInputElement).name
        ] = (e.target as HTMLInputElement).value;
        props.updateApplication(a);
    }

    function submitForm() {
        let newApp: Application = {...props.application}
        newApp.appID = Date.now();
        newApp.user = user.name;
        newApp.sendTo = user.supervisor;
        newApp.status = 'pending';
        newApp.grades = [];
        applicationService.addApplication(newApp).then(() => {
            props.updateApplication(new Application());
            history.push('/applications');
        });
    }

    return (
        <div>
            <NavBar></NavBar>
            <div className="submit-body">
                <h2>Tuition Reimbursement Management System</h2>
                <div className="service-container">

                    
                    <div className = 'form-container submit-container'>

                        <form className='submit-form' action='#'>
                            <h3>Apply Now</h3>
                            {FIELDS.map((fieldName) => {
                             return (
                                <div key={'input-field-' + fieldName}>
                                    {/* <label>{fieldName}</label> */}
                                    <input
                                        type='text'
                                        className='submit-input'
                                        name={fieldName}
                                        id={'a_' + fieldName}
                                        placeholder={fieldName}
                                        onChange={handleFormInput}
                                    ></input>
                                </div>
                                 );
                             })}
                            
                            <button className='btn btn-secondary submit-btn' onClick={submitForm}>Submit</button>    
                        </form>

                    </div>

                    <DiscountCoverage></DiscountCoverage>

                </div>
            </div>    
    </div>
    );
}

export default connector(SubmitAppComponent);
