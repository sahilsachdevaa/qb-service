import { QuickbooksConnectionService } from 'src/services/quickbook-connection';
import { QuickbooksDataReaderService } from 'src/services/quickbook-data-reader';
import { Response } from 'express';

const quickbookService = new QuickbooksConnectionService();

class QuickbookController {
    async getUrl(): Promise<any> {
        const authUri = await quickbookService.getConnectURL();
        return {
            url: authUri
        };
    }

    async callback(code: string, state: string, realmID: string): Promise<any> {
        try {
            const callbackString = '/api/qb/callback?state=' + state + '&code=' + code;
            const accessToken = await quickbookService.getTokens(callbackString);
            return accessToken
        }
        catch (e) {
            return e.message;
        }
    }

    async getCustomers(oauthToken: string, realmId: string, refreshToken: string, res: Response): Promise<any> {
        const dataService = new QuickbooksDataReaderService(oauthToken, realmId, refreshToken);
        const customers = await dataService.getAllCustomers(res);
        return {
            Customers: customers
        };
    }
}

export { QuickbookController }