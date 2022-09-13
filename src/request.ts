//  Library
import { Request } from './utils/request'

export const request = new Request({
    defaultOptions: {
        headers: {
            'Content-Type': 'application/json; charset=UTF-8',
            'X-Accept': 'application/json'
        }
    }
})
