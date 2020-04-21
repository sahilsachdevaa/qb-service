import { getConnection, Connection } from "typeorm";
const OAuthClient = require('intuit-oauth');
const consumerKey = process.env.QUICKBOOK_CLIENT_ID;
const clientSecret = process.env.QUICKBOOK_CONSUMERKEY;
console.log(consumerKey)
console.log(clientSecret)
const oauthClient = new OAuthClient({
    clientId: consumerKey,
    clientSecret: clientSecret,
    environment: process.env.QUICKBOOK_CONNECTION_TYPE,
    redirectUri: process.env.QUICKBOOK_CALLBACK_URL,
})


export class QuickbooksConnectionService {

    /// Will generate Url for Same
    async getConnectURL(): Promise<string> {
        let url = oauthClient.authorizeUri({
            scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
            state: "user Information",
        });
        return url;
    }

    // will fetch Tokens on callback
    async getTokens(callbackString: string): Promise<any> {
        let tokens = await oauthClient.createToken(callbackString);
        return tokens.json;
    }
}