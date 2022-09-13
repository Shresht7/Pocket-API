enum Method {
    GET = 'GET',
    POST = 'POST',
    PUT = 'PUT',
    PATCH = 'PATCH',
    DELETE = 'DELETE'
}

interface RequestOptions {
    url?: URL | RequestInfo
    responseHandler?: <T>(response: Response) => CustomResponse<T>
    defaultOptions?: RequestInit
}

export class Request {

    private handleResponse: <T>(response: Response) => CustomResponse<T> | Promise<never>

    private defaultOptions: RequestInit

    constructor(options?: RequestOptions) {
        this.handleResponse = options?.responseHandler || this._handleResponse
        this.defaultOptions = options?.defaultOptions || {}
    }

    get<T = any>(url: URL | RequestInfo, options?: RequestInit) {
        return this._fetch<T>(url, {
            ...this.defaultOptions,
            method: 'GET',
            ...options
        })
    }

    post<T = any>(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch<T>(url, {
            ...this.defaultOptions,
            method: Method.POST,
            body: this._serialize(body),
            ...options
        })
    }

    put<T = any>(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch<T>(url, {
            ...this.defaultOptions,
            method: Method.PUT,
            body: this._serialize(body),
            ...options
        })
    }

    patch<T = any>(url: URL | RequestInfo, body?: string | Object, options?: RequestInit) {
        return this._fetch<T>(url, {
            ...this.defaultOptions,
            method: Method.PATCH,
            body: this._serialize(body),
            ...options
        })
    }

    delete<T = any>(url: URL | RequestInfo, options?: RequestInit) {
        return this._fetch<T>(url, {
            ...this.defaultOptions,
            method: Method.DELETE,
            ...options
        })
    }

    private _serialize(body?: string | Object) {
        if (!body) { return undefined }
        return typeof body === 'string' ? body : JSON.stringify(body)
    }

    private _fetch<T>(url: URL | RequestInfo, options?: RequestInit) {
        return fetch(url, options).then(this.handleResponse<T>)
    }

    private _handleResponse<T>(response: Response): CustomResponse<T> | Promise<never> {
        if (!response.ok) {
            return Promise.reject(`${response.status} - ${response.statusText}`)
        }
        return response
    }

}

export interface CustomResponse<T> extends Response {
    json: () => Promise<T>
}
