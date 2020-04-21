import { INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { Response } from 'express';
const consumerKey = process.env.QUICKBOOK_CLIENT_ID;
const clientSecret = process.env.QUICKBOOK_CONSUMERKEY;
const QuickBooks = require('node-quickbooks')

export class QuickbooksDataReaderService {

    qbo: any;
    constructor(oauthToken: string, realmId: string, refreshToken: string) {
        this.qbo = new QuickBooks(consumerKey,
            clientSecret,
            oauthToken,
            false, // no token secret for oAuth 2.0
            realmId,
            process.env.QUICKBOOK_CONNECTION_TYPE === 'sandbox' ? true : false, // use the sandbox?
            true, // enable debugging?
            null, // set minorversion, or null for the latest version
            '2.0', //oAuth version
            refreshToken);
    }

    async getAllCustomers(res: Response): Promise<void> {
        this.qbo.findCustomers({
            fetchAll: true
        }, function (e: Error, customers: any) {
            if (e) {
                res.status(INTERNAL_SERVER_ERROR).send({ status: false })
            }
            else {
                res.send({ status: true, data: customers })
            }

        })
    }
}