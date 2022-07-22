const axios = require("axios").default

async function toBase64(url) {
    let { data: buffer } = await axios.get(url, {
        responseType: 'arraybuffer'
    })

    let base64 = Buffer.from(buffer, 'binary').toString('base64')

    return base64
}

module.exports = toBase64;