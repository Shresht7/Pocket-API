//  Library
import { request } from './request'

//  Type Definitions
import type { AddDetails, RetrieveDetails } from './types'

//  ==========
//  POCKET API
//  ==========

const ENDPOINT = {
    REQUEST_TOKEN: 'https://getpocket.com/v3/oauth/request',
    OAUTH: 'https://getpocket.com/v3/oauth/authorize',
    AUTHORIZE: 'https://getpocket.com/auth/authorize',
    ADD: 'https://getpocket.com/v3/add',
    RETRIEVE: 'https://getpocket.com/v3/get',
}

interface APIRequestOptions {
    consumer_key: string
}

export class PocketClient {

    private consumer_key: string

    private redirect_uri: string = 'http://localhost:3000'

    private request_token: string | undefined

    private access_token: string | undefined

    constructor(options: APIRequestOptions) {
        this.consumer_key = options.consumer_key
    }

    async getRequestToken() {
        if (this.request_token) { return this.request_token }

        try {
            const response = await request.post(ENDPOINT.REQUEST_TOKEN, {
                consumer_key: this.consumer_key,
                redirect_uri: this.redirect_uri,
            }).then<{ code: string }>(res => res.json())
            this.request_token = response.code
        } catch (err) {
            throw err
        }

        const authURL = `${ENDPOINT.AUTHORIZE}?${new URLSearchParams({ request_token: this.request_token, redirect_uri: this.redirect_uri }).toString()}`
        console.log('Authorize at', authURL)

        return this.request_token
    }

    setRequestToken(token: string) {
        this.request_token = token
        return this
    }

    async getAccessToken() {
        if (this.access_token) { return this.access_token }

        try {
            const response = await request.post(ENDPOINT.OAUTH, {
                consumer_key: this.consumer_key,
                code: this.request_token,
            }).then<{ access_token: string }>(res => res.json())
            this.access_token = response.access_token
        } catch (err) {
            throw err
        }

        return this.access_token
    }

    setAccessToken(token: string) {
        this.access_token = token
        return this
    }

    add(url: string, details?: AddDetails) {
        return request.post(ENDPOINT.ADD, {
            url,
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token
        })
    }

    retrieve(details?: RetrieveDetails) {
        return request.post(ENDPOINT.RETRIEVE, {
            count: 5,
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token,
        })
    }

}
