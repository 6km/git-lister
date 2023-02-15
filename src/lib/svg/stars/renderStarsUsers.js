const renderStarsButton = require("./renderStarsButton")
const toBase64 = require("../../utils/toBase64")
const renderStarIcon = require("./renderStarIcon")

async function renderStarsUsers(users, options = {}) {
    const avatarSize = 40
        , avatarsPerRow = 21
        , avatarOffsetXConstant = -10

    const rowsCount = Math.ceil(users.length / avatarsPerRow)


    const width = (avatarSize + avatarOffsetXConstant) * avatarsPerRow - avatarOffsetXConstant
        , height = rowsCount === 0 ? 45 : avatarSize * rowsCount

    var avatarOffsetX = 0,
        avatarOffsetY = 0

    var svgStart = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" role="img" style="backgrounddd: #1a1d2c;">\n`
    var svgDefs = `
    <defs>
    <clipPath id="avatar-clip" r="${avatarSize / 2}">
    <circle xmlns="http://www.w3.org/2000/svg" cx="20" cy="20" r="${avatarSize / 2}"/>
    </clipPath>
    </defs>
    `
    var svgContent = ``
    var svgEnd = `</svg>`

    if (rowsCount === 0) {
        svgDefs = ""
        svgContent += `
        <g>
            <rect
                width="45"
                height="45"
                fill="rgba(255, 194, 0, 0.1)"
                x="0"
                y="0"
                rx="20"
            />

            ${renderStarIcon(9, 9, "rgba(255, 194, 0, 1)", .75)}

            <text
                fill="rgba(255, 194, 0, 1)"
                font-size="15"
                x="60"
                y="30"
                style="font-family: Arial; font-weight: 600;"
            >
                Star this repository and be the first supporter!
            </text>
        </g>
    `
    } else {
        svgContent += "<g>"

        for (var i = 0, len = users.length; i < len; i++) {
            avatarOffsetX += i === 0 ? 0 : avatarSize + avatarOffsetXConstant

            if (avatarOffsetX + 10 >= width) {
                avatarOffsetX = 0
                avatarOffsetY += avatarSize
            }

            let imageBase64 = await toBase64(users[i].avatar_url)

            svgContent += `
        <g transform="translate(${avatarOffsetX}, ${avatarOffsetY})">
            <image
                x="0"
                y="0"
                width="${avatarSize}"
                height="${avatarSize}"
                href="data:image/png;base64,${imageBase64}"
                style="box-shadow: 0 0 0 1px rgb(10 16 30 / 10%);"
                clip-path="url(#avatar-clip)"
            />
        </g>
        `
        }

        let buttonX = avatarOffsetX + avatarSize + 5,
            buttonY = avatarOffsetY,
            buttonWidth = 165,
            buttonHeight = 40

        if (buttonX + buttonWidth >= width) {
            buttonX = 0
            buttonY += avatarSize
        }

        let button = renderStarsButton(buttonX, buttonY, buttonWidth, buttonHeight, {
            text: options.moreButtonText
        })

        svgContent += button

        svgContent += "</g>"
    }

    return svgStart + svgDefs + svgContent + svgEnd;
}

module.exports = renderStarsUsers