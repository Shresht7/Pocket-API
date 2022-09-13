enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

interface RequestOptions {
    url?: URL | RequestInfo
    responseHandler?: (response: Response) => any
    defaultOptions?: RequestInit
}

export class Request {

    private handleResponse: (response: Response) => any

    private defaultOptions: RequestInit

    constructor(options?: RequestOptions) {
        this.handleResponse = options?.responseHandler || this._handleResponse
        this.defaultOptions = options?.defaultOptions || {}
    }

    get(url: URL | RequestInfo, options?: RequestInit) {
        return this._fetch(url, {
            ...this.defaultOptions,
            method: 'GET',
            ...options
        })
    }

    post(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch(url, {
            ...this.defaultOptions,
            method: Method.POST,
            body: this._serialize(body),
            ...options
        })
    }

    put(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch(url, {
            ...this.defaultOptions,
            method: Method.PUT,
            body: this._serialize(body),
            ...options
        })
    }

    patch(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch(url, {
            ...this.defaultOptions,
            method: Method.PATCH,
            body: this._serialize(body),
            ...options
        })
    }

    delete(url: URL | RequestInfo, options?: RequestInit) {
        return this._fetch(url, {
            ...this.defaultOptions,
            method: Method.DELETE,
            ...options
        })
    }

    private _serialize(body?: string | Object) {
        if (!body) { return undefined }
        return typeof body === 'string' ? body : JSON.stringify(body)
    }

    private _fetch(url: URL | RequestInfo, options?: RequestInit) {
        return fetch(url, options).then(this.handleResponse)
    }

    private _handleResponse(response: Response) {
        if (!response.ok) {
            return Promise.reject(`${response.status} - ${response.statusText}`)
        }
        return response
    }

}
