import { Route, BrowserRouter } from 'react-router-dom';
import SubmitAppComponent from '../application/submitapp/submit-application.component';
import LoginComponent from '../users/login.component';
import Main from '../main/Main';
import AdminContainer from '../admin/AdminContainer';
import SingleApp from '../admin/SingleApp';
import Service from '../main/Service';
import Membership from '../main/Membership';

export default function RouterComponent () {

    return(
        <BrowserRouter>
        <div>
            <Route exact path='/' component={Main} />
            <Route path="/submitApp" component={SubmitAppComponent} />
            <Route exact path='/applications/:id' component={SingleApp}/>
            <Route path="/login" component={LoginComponent} />
            <Route exact path='/applications' component={AdminContainer} />
            <Route exact path='/services' component={Service} />
            <Route exact path='/memberships' component={Membership} />
        </div>
        </BrowserRouter>
    );
}