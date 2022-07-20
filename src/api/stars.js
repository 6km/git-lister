const express = require("express");
const router = express.Router()

const { getStargazers, drawUsersSVG } = require("../utils");
const { cache } = require("../middlewares")

const axios = require("axios").default

/*router.get("/:user/:repo", cache(60) async (req, res) => {
    try {
        let { user, repo } = req.params;

        if (!user || !repo) throw Error();

        let repoExists = (await axios.get(`https://github.com/${user}/${repo}`)).status !== 404

        if (repoExists) {
            res.setHeader('Content-Type', 'image/png');

            let stargazers = await getStargazers({ user, repo }, req)

            drawUsers(stargazers).then(u => {
                // Send stargazers as a PNG Buffer
                res.send(u.toBuffer("image/png"))
            })
        }
    } catch {
        res.sendStatus(404)
    }
})*/

router.get("/:user/:repo", cache(60), async (req, res) => {
    let limit = parseInt(req.query.limit) || 60

    if (limit <= 0 || limit > 60) limit = 60;

    try {
        let { user, repo } = req.params;

        if (!user || !repo) throw Error();

        let repoExists = (await axios.get(`https://github.com/${user}/${repo}`)).status !== 404

        if (repoExists) {
            res.setHeader("Content-Type", "image/svg+xml");

            let stargazers = await getStargazers({ user, repo, limit }, req)

            let stargazersSVG = await drawUsersSVG(stargazers)

            res.send(stargazersSVG)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
})

module.exports = router