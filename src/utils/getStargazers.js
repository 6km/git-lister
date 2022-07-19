const { default: axios } = require("axios");

async function getStargazers({ user, repo }, req) {
    const endpoint = `https://api.github.com/repos/${user}/${repo}/stargazers?page=1&per_page=60`

    let stargazers = (await axios.get(endpoint, {
        headers: {
            'X-Forwarded-For': req.ip
        }
    })).data

    return stargazers;
}

module.exports = getStargazers