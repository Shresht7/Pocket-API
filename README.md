# Pocket API

A thin wrapper client for the Pocket API.

⚠ Work-in-Progress ⚠

<!-- 
## Install

```
npm install Shresht7/pocket-api
```
 -->

## Usage

Create a `PocketClient` using your `consumer_key` to interact with the Pocket API.

```ts
import { PocketClient } from 'pocket-api'

//  This assumes you have already completed the auth flow and
//  have obtained these tokens.
const consumer_key = 'YOUR_CONSUMER_KEY'
const request_token = 'REQUEST_TOKEN'
const access_token = 'ACCESS_TOKEN'

const pocket = new PocketClient({ consumer_key, access_token })
```

Once the client has been authorized (i.e. has a valid `access_token`), you can start making API requests. Read more about [Authorization](#authorization)

```ts
const response = await pocket.retrieve({ count: 3 })
console.log(response.ok, response.status, response.statusText, await response.json())
```

For API documentation, see [Reference](#reference).

## API Reference

[Pocket API Documentation](https://getpocket.com/developer/docs/overview)

### `add`

Add item to the user's Pocket

http://getpocket.com/developer/docs/v3/add

```ts
pocket.add({
    url: 'https://example.com',
    title: 'Example',
    tags: 'tag1,tag2'
})
```

Accepts a single object with the following parameters

| Parameter  | Description                                                                                                                                                                                                             | Required |
| :--------: | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------: |
|   `url`    | The URL of the item you want to save                                                                                                                                                                                    |    ✔     |
|  `title`   | Title of the item. This can be included for cases where the item does not have a title, which is typical for image or PDF URLs. If Pocket detects a title from the contents of the page, this parameter will be ignored |          |
|   `tags`   | A comma separated list of tags to apply to the item                                                                                                                                                                     |          |
| `tweet_id` | If you are adding Pocket support to a Twitter client, please send along a reference to the tweet status id. This allows pocket to show the original tweet alongside the article.                                        |
|            |

> Your consumer_key must have the ADD permission

### `retrieve`

Retrieve items from the user's Pocket list

```ts
//  retrieve 10 items
const { list } = await pocket.retrieve({
    count: 10,
})
```

> Your consumer_key must have the RETRIEVE permission

### `modify`

Modify items from the user's Pocket list

```ts
const modification = await pocket.modify([
        { action: 'tag_delete', tag: 'old' },
        { action: 'tag_rename', old_tag: 'typo', new_tag: 'typography' },
])
```

> Your consumer_key must have the MODIFY permission

## Authorization

### 1. Consumer Key

Register your app with Pocket using the developer portal.

http://getpocket.com/developer/apps/new

> Note: The permissions you grant to this app **cannot** be changed at a later date.

### 2. Request Token

Once you have the `consumer_key`, you can obtain the `request_token` using the `getRequestToken()` method.

```ts
const redirect_uri = 'http://localhost:3000'  // You will be redirected here after authorization
const pocket = new PocketClient({ consumer_key, redirect_uri })

//  Request the request token
await pocket.getRequestToken()  //  returns the request_token, but is also tracked internally in the class
```

Once you have the request token, you have to redirect the user to the authorization url to authenticate the app.

```ts
const authURL = pocket.getAuthURL()
//  Send the user to this URL for authorization
```

### 3. Access Token

Once the user has authorized the app, they will be redirected to the `redirect_uri`. You can then request the `access_token` using the `getAccessToken()` method.

```ts
await pocket.getAccessToken()   //  returns the access_token, but also tracks it internally
```

Once you have the `access_token`, it will be used along with the `consumer_key` on all subsequent API calls.

### 4. Future

You do not need to reauthenticate every time the app runs, you can just stow the credentials and retrieve them as needed.

```ts
const consumer_key = 'YOUR_CONSUMER_KEY'
const access_token = 'YOUR_ACCESS_TOKEN'
const pocket = new PocketClient({ consumer_key, access_token })
//  Use the Pocket API
```

---

## 📑 License

> [MIT License](./LICENSE)
