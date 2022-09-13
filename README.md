# Pocket API

A thin wrapper client for the Pocket API.

## Usage

```ts
import { PocketClient } from 'pocket-api'

const consumer_key = 'YOUR_CONSUMER_KEY'

//  NOTE: Implementation details of the auth flow are left to the application
const request_token = 'REQUEST_TOKEN'
const access_token = 'ACCESS_TOKEN'

const pocket = new PocketClient({ consumer_key })
    .setRequestToken(request_token)
    .setAccessToken(access_token)

async function main() {
    const response = await pocket.retrieve({ count: 3 })
    console.log(response.ok, response.status, response.statusText, await response.json())
}
```

## Reference

- [Pocket API Documentation](https://getpocket.com/developer/docs/overview)

---

## 📑 License

> [MIT License](./LICENSE)
