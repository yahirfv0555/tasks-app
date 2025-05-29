
const environments = {
    local: {
        apiUrl: 'https://localhost:7090/api/v1/',
        appUrl: 'https://localhost:3000/'
    }
}

export const environment: 'local' | 'QA' | 'PROD' = 'local';

export const apiUrl: string = environments[environment].apiUrl;
export const appUrl: string = environments[environment].appUrl;