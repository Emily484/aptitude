import Express from 'express';
import applicationService from './application.service';
import logger from '../log'

const router = Express.Router();

router.get('/', function(req, res, next){
    applicationService.getApplications().then((application) => {
        res.send(JSON.stringify(application));
    });
});

router.get('/:id', function (req, res, next) {
    applicationService.getApplication(Number(req.params.id)).then((app) => {
        res.send(JSON.stringify(app));
    });
})

router.delete('/:id', function (req, res, next) {
    logger.debug(req.body);
    applicationService.deleteApplication(Number(req.params.id)).then((data) => {
        logger.debug(data);
        res.sendStatus(200);
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500);
    });
});

router.post('/', (req, res, next) => {
    logger.debug(req.body);
    applicationService.addApplication(req.body).then((data)=> {
        logger.debug(data);
        res.sendStatus(201); // Created
    }).catch((err) => {
        logger.error(err);
        res.sendStatus(500); // Server error, sorry
    })
});

router.put('/', (req, res, next) => {
    logger.debug(req.body);
    applicationService.updateApplication(req.body).then((data) => {
        res.send(data);
    })
});


export default router;
