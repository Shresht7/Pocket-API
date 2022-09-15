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

interface Config {
    consumer_key: string
    request_token?: string
    access_token?: string
    redirect_uri?: string
}

export class PocketClient {

    private consumer_key: string

    private redirect_uri: string = 'pocketAuthorizationFinished'

    private request_token: string | undefined

    private access_token: string | undefined

    constructor(config: Config) {
        this.consumer_key = config.consumer_key
        this.redirect_uri = config.redirect_uri || this.redirect_uri
        this.request_token = config.request_token
        this.access_token = config.access_token
    }

    /**
     * Request a request_token using the client's consumer_key.
     * The user will be redirected to the redirect_uri when authentication flow completes
     */
    async getRequestToken(): Promise<string> {
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

    /** Manually set the request_token */
    setRequestToken(token: string) {
        this.request_token = token
        return this
    }

    /** Returns the authorization url for the pocket oauth flow */
    getAuthURL(): string {
        if (!this.request_token || !this.redirect_uri) {
            throw new Error('Please provide the request_token and a redirect_uri')
        }
        const url = new URL(ENDPOINT.AUTHORIZE)
        url.searchParams.set('request_token', this.request_token)
        url.searchParams.set('redirect_uri', this.redirect_uri)
        return url.toString()
    }

    /** Request an access_token using the user's request_token */
    async getAccessToken(): Promise<string> {
        if (this.access_token) { return this.access_token }

        if (!this.request_token) { throw new Error('Please provide a request_token') }

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

    /** Manually set the access_token */
    setAccessToken(token: string) {
        this.access_token = token
        return this
    }

    /** Save an item to the user's Pocket list */
    add(details: AddDetails) {
        return request.post<AddResponse>(ENDPOINT.ADD, {
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token
        })
    }

    /** Retrieve items from the user's Pocket list */
    retrieve(details?: RetrieveDetails) {
        return request.post<RetrieveResponse>(ENDPOINT.RETRIEVE, {
            count: 5,
            ...details,
            consumer_key: this.consumer_key,
            access_token: this.access_token,
        })
    }

    /** Modify items from the user's Pocket list */
    modify(actions: ModifyAction[]) {
        return request.post<ModifyResponse>(ENDPOINT.MODIFY, {
            actions,
            consumer_key: this.consumer_key,
            access_token: this.access_token,
        })
    }

}
