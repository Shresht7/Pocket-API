//  Library
import { request } from './request'
import { ENDPOINT } from './endpoints'

//  Type Definitions
import type {
    RequestToken,
    AccessToken,
    AddDetails,
    AddResponse,
    RetrieveDetails,
    RetrieveResponse,
    ModifyAction,
    ModifyResponse,
} from './types'

//  ==========
//  POCKET API
//  ==========

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
            const response = await request.post<RequestToken>(ENDPOINT.REQUEST_TOKEN, {
                consumer_key: this.consumer_key,
                redirect_uri: this.redirect_uri,
            }).then(res => res.json())
            this.request_token = response.code
        } catch (err) {
            throw err
        }

        return this.request_token
    }

    setRequestToken(token: string) {
        this.request_token = token
        return this
    }

    async getAccessToken() {
        if (this.access_token) { return this.access_token }

        try {
            const response = await request.post<AccessToken>(ENDPOINT.OAUTH, {
                consumer_key: this.consumer_key,
                code: this.request_token,
            }).then(res => res.json())
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

    /** Save an item to the user's Pocket list */
    add(details?: AddDetails) {
        return request.post<AddResponse>(ENDPOINT.ADD, {
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token
        })
    }

    retrieve(details?: RetrieveDetails) {
        return request.post<RetrieveResponse>(ENDPOINT.RETRIEVE, {
            count: 5,
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token,
        })
    }

    modify(actions: ModifyAction[]) {
        return request.post<ModifyResponse>(ENDPOINT.MODIFY, {
            actions,
            consumer_key: this.consumer_key,
            access_token: this.access_token,
        })
    }

}
