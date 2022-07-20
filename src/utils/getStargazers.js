const { default: axios } = require("axios");

async function getStargazers({ user, repo, limit }, req) {
    const endpoint = `https://api.github.com/repos/${user}/${repo}/stargazers?page=1&per_page=${limit}`

    let stargazers = (await axios.get(endpoint, {
        headers: {
            'X-Forwarded-For': req.ip
        }
    })).data

    return stargazers;
}

module.exports = getStargazers