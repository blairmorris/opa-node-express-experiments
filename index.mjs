import express from 'express';
import bodyParser from 'body-parser';
import extAuth from '@build-security/opa-express-middleware';

const app = express();

const extAuthMiddleware = extAuth.authorize(req => ({
    port: 8181,
    hostname: 'http://localhost',
    policyPath: '/authz/allow',
    allowOnFailure: true, // default is false, remove once policies are in place
}));

app.use(bodyParser.json());
app.use(extAuthMiddleware);

app.get('/', (req, res) => res.send('Hello World!'));

app.get('/health', (req, res) => res.send('OPA Node Express Service is healthy!'));

const server = app.listen(3000, '0.0.0.0', () => {
    const {address, port} = server.address();
    console.log(`Express running on http://${address}:${port}`);
});
