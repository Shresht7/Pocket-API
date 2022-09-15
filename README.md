# Pocket API

A thin wrapper client for the Pocket API.

<!-- 
## Install

```
npm install Shresht7/pocket-api
```
 -->

## Reference

[Pocket API Documentation](https://getpocket.com/developer/docs/overview)

## Usage

Create a `PocketClient` using your `consumer_key` to interact with the Pocket API.

```ts
import { PocketClient } from 'pocket-api'

const consumer_key = 'YOUR_CONSUMER_KEY'
const request_token = 'REQUEST_TOKEN'
const access_token = 'ACCESS_TOKEN'

const pocket = new PocketClient({ consumer_key })
    .setRequestToken(request_token)
    .setAccessToken(access_token)
```

Once the client has been authorized (i.e. has a valid `access_token`), you can start making API requests.

```ts
const response = await pocket.retrieve({ count: 3 })
console.log(response.ok, response.status, response.statusText, await response.json())
```

For API documentation, see [Reference](#reference).

---

## 📑 License

> [MIT License](./LICENSE)
