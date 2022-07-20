async function drawUsersSVG(users) {
    const avatarSize = 40
        , avatarsPerRow = 21
        , avatarOffsetXConstant = -10

    const rowsCount = Math.ceil(users.length / avatarsPerRow)

    const width = (avatarSize + avatarOffsetXConstant) * avatarsPerRow - avatarOffsetXConstant
        , height = avatarSize * rowsCount

    var avatarOffsetX = 0,
        avatarOffsetY = 0

    var svgStart = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img">\n`
    var svgDefs = `
    <defs>
        <clipPath id="avatar-clip" r="${avatarSize / 2}">
            <circle xmlns="http://www.w3.org/2000/svg" cx="20" cy="20" r="${avatarSize / 2}"/>
        </clipPath>
    </defs>
    `
    var svgContnent = ``
    var svgEnd = `</svg>`

    svgContnent += "<g>"

    for (var i = 0, len = users.length; i < len; i++) {
        avatarOffsetX += i === 0 ? 0 : avatarSize + avatarOffsetXConstant

        if (avatarOffsetX + 10 >= width) {
            avatarOffsetX = 0
            avatarOffsetY += avatarSize
        }

        svgContnent += `
        <g transform="translate(${avatarOffsetX}, ${avatarOffsetY})">
            <image
                x="0"
                y="0"
                width="${avatarSize}"
                height="${avatarSize}"
                href="${users[i].avatar_url}"
                style="box-shadow: 0 0 0 1px rgb(10 16 30 / 10%);"
                clip-path="url(#avatar-clip)"
            />
        </g>
        `
    }

    svgContnent += "</g>"

    return svgStart + svgDefs + svgContnent + svgEnd;
}

module.exports = drawUsersSVG