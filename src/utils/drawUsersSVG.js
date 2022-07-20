async function drawUsersSVG(users) {
    const avatarSize = 40
        , avatarsPerRow = 21
        , avatarOffsetXConstant = -10

    const rowsCount = Math.ceil(users.length / avatarsPerRow)

    const width = (avatarSize + avatarOffsetXConstant) * avatarsPerRow - avatarOffsetXConstant
        , height = avatarSize * rowsCount

    var avatarOffsetX = 0,
        avatarOffsetY = 0

    var svgStart = `<svg width="${width}" height="${height}">`
    var svgContnent = ``
    var svgEnd = `</svg>`

    for (var i = 0, len = users.length; i < len; i++) {
        avatarOffsetX += i === 0 ? 0 : avatarSize + avatarOffsetXConstant

        if (avatarOffsetX + 10 >= width) {
            avatarOffsetX = 0
            avatarOffsetY += avatarSize
        }

        svgContnent += `
        <foreignObject x="${avatarOffsetX}" y="${avatarOffsetY}" width="${avatarSize}" height="${avatarSize}">
            <image
                width="${avatarSize}"
                height="${avatarSize}"
                src="${users[i].avatar_url}"
                style="border-radius: 20px; box-shadow: 0 0 0 1px rgb(10 16 30 / 10%);"
            />
        </foreignObject>
        `
    }

    return svgStart + svgContnent + svgEnd;
}

module.exports = drawUsersSVG