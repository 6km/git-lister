const express = require("express");
const router = express.Router()

const { cache } = require("../middlewares");

const constants = require("../lib/constants")

const renderStarUsers = require("../lib/svg/stars/renderStarsUsers");
const getStargazers = require("../lib/github/getStargazers");
const getRepoExists = require("../lib/github/getRepoExists");

router.get("/:user/:repo", cache(constants.DEFAULT_CACHE_TIME), async (req, res) => {
    let limit = parseInt(req.query.limit) || constants.STARGAZERS.MAX_USERS_PER_IMAGE
    let moreButtonText = req.query.moreText || constants.STARGAZERS.DEFAULT_MORE_BUTTON_TEXT

    if (limit <= 0 || limit > constants.STARGAZERS.MAX_USERS_PER_IMAGE) limit = constants.STARGAZERS.MAX_USERS_PER_IMAGE;

    try {
        res.setHeader(`Cache-Control", "public, max-age=${constants.DEFAULT_CACHE_TIME}, must-revalidate`)

        let { user, repo } = req.params;

        if (!user || !repo) throw Error();

        let repoExists = await getRepoExists(user, repo)

        if (repoExists) {
            res.setHeader("Content-Type", "image/svg+xml");

            let stargazers = await getStargazers({ user, repo, limit }, req)

            let stargazersSVG = await renderStarUsers(stargazers, {
                moreButtonText
            })

            res.send(stargazersSVG)
        }
    } catch (err) {
        // console.log(err)
        res.sendStatus(404)
    }
})

module.exports = router