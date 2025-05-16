
const environments = {
    local: {
        apiUrl: 'https://localhost:7090/api/v1',
        appUrl: 'https://localhost:3000/'
    }
}

const environment: 'local' | 'QA' | 'PROD' = 'local';

const apiUrl: string = environments[environment].apiUrl;
const appUrl: string = environments[environment].appUrl;

export default { environment, apiUrl, appUrl }
