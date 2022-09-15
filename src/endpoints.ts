//  =========
//  ENDPOINTS
//  =========

const baseURL = 'https://getpocket.com'

export const ENDPOINT = {
    REQUEST_TOKEN: baseURL + '/v3/oauth/request',
    OAUTH: baseURL + '/v3/oauth/authorize',
    AUTHORIZE: baseURL + '/auth/authorize',
    ADD: baseURL + '/v3/add',
    MODIFY: baseURL + '/v3/send',
    RETRIEVE: baseURL + '/v3/get',
} as const
