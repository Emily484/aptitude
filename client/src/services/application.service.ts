import axios from 'axios';
import { Application } from '../models/application.class';

class ApplicationService{
    private URI: string;
    constructor(){
        this.URI = 'http://localhost:3000/applications';
    }

    getApplications(): Promise<Application[]>{
        return axios.get(this.URI, {withCredentials: true}).then(result => result.data);
    }

    getApplication(id: number): Promise<Application> {
        return axios.get(this.URI+'/'+id, {withCredentials: true}).then(result=>result.data);

    }

    addApplication(a: Application): Promise<null>{
        return axios.post(this.URI, a, {withCredentials: true}).then(result => null);
    }

    updateApplication(a: Application): Promise<null> {
        return axios.put(this.URI, a, {withCredentials: true}).then(result => null);
    }

    deleteApplication(id: number): Promise<null> {
        console.log(id);
        return axios.delete(this.URI+'/'+id, {withCredentials: true}).then(result => null)
    }
}

export default new ApplicationService();