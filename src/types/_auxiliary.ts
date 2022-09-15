export interface RequestToken {
    code: string
}

export interface AccessToken {
    access_token: string
}

export interface BasePayload {
    /** Your application's Consumer Key */
    consumer_key?: string
    /** The user's Pocket Access Token */
    access_token?: string
}
