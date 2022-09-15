//  Library
import { PocketClient } from '../src'
import * as http from 'node:http'
import { config } from 'dotenv'

//  Configure DotEnv
config()

//  Configuration
const PORT = 3210
const url = 'http://localhost:' + PORT
const consumer_key = process.env.CONSUMER_KEY!
const redirect_uri = url + '/redirect'

//  -----------------------------------------------------------
const pocket = new PocketClient({ consumer_key, redirect_uri })
//  -----------------------------------------------------------

const server = http.createServer(async (req, res) => {
    switch (req.url) {
        case '/':
            await startAuthFlow(res)
            break
        case '/redirect':
            await handleAuthRedirect(res)
            break
        default:
            res.writeHead(404)
            res.end()
            break
    }
})

async function startAuthFlow(res: http.ServerResponse) {
    await pocket.getRequestToken()
    const Location = pocket.getAuthURL()
    res.writeHead(302, { Location })
    res.end()
}

async function handleAuthRedirect(res: http.ServerResponse) {
    await pocket.getAccessToken()
    res.writeHead(200)
    res.end()
    console.log(pocket)
}

server.listen(PORT, () => { console.log(`Server running on http://localhost:${PORT}`) })
