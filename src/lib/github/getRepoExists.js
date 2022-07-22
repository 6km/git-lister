const axios = require("axios").default

async function getRepoExists(user, repo) {
    let exists = (await axios.get(`https://github.com/${user}/${repo}`)).status !== 404

    return exists
}

module.exports = getRepoExists