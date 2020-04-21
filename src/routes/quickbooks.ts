

import { Request, Response, Router, json } from 'express';
import { BAD_REQUEST, CREATED, OK, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { QuickbookController } from 'src/controllers/quickbook';
import { token } from 'morgan';
const qb_controller = new QuickbookController();
const router = Router();

router.get('/connection-url', async (req: Request, res: Response) => {
    try {
        let response = await qb_controller.getUrl();
        console.log(response)
        return res.status(OK).send(response);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
});

router.get('/callback', async (req: Request, res: Response) => {
    try {
        let queryParams = req.query;
        console.log(JSON.stringify(queryParams))
        let code = req.query.code ? req.query.code.toString() : '';
        let state = req.query.state ? req.query.state.toString() : '';
        let realmId = req.query.realmId ? req.query.realmId.toString() : '';
        let response = await qb_controller.callback(code, state, realmId);
        return res.status(OK).send(response);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
});

router.get('/customers', async (req: Request, res: Response) => {
    try {
        let oauthToken = req.query.oauthToken ? req.query.oauthToken.toString() : '';
        let realmId = req.query.realmId ? req.query.realmId.toString() : '';
        let refreshToken = req.query.refreshToken ? req.query.refreshToken.toString() : '';
        let response = await qb_controller.getCustomers(oauthToken, realmId, refreshToken, res);
        // return res.status(OK).send(response);
    } catch (error) {
        return res.status(INTERNAL_SERVER_ERROR).json(error)
    }
});
export default router;