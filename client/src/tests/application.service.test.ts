import axios from 'axios';
import applicationService from '../services/application.service';

let obj = {data: []};

test('getApplications returns a promise with data in it', async () => {
    let returnValues;
    axios.get = jest.fn().mockResolvedValue(obj);
    await applicationService.getApplications().then((arr) => {
        returnValues = arr;
    });
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(returnValues).toBe(obj.data);
});