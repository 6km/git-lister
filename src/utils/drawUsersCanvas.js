const { createCanvas, loadImage } = require('canvas')

async function drawUsersCanvas(users) {
    const avatarSize = 40
        , avatarsPerRow = 21
        , avatarOffsetXConstant = -10

    const rowsCount = Math.ceil(users.length / avatarsPerRow)

    const width = (avatarSize + avatarOffsetXConstant) * avatarsPerRow - avatarOffsetXConstant
        , height = avatarSize * rowsCount

    const canvas = createCanvas(width, height),
        ctx = canvas.getContext('2d')

    var avatarOffsetX = 0,
        avatarOffsetY = 0

    for (var i = 0, len = users.length; i < len; i++) {
        avatarOffsetX += i === 0 ? 0 : avatarSize + avatarOffsetXConstant

        if (avatarOffsetX + 10 >= canvas.width) {
            avatarOffsetX = 0
            avatarOffsetY += avatarSize
        }

        var img = await loadImage(users[i].avatar_url);

        // Save the current state
        ctx.save()

        // Make the avatar rounded
        ctx.beginPath()
        ctx.arc(avatarOffsetX + (avatarSize / 2), avatarOffsetY + (avatarSize / 2), avatarSize / 2, 0, 360)
        ctx
        ctx.closePath()
        ctx.clip()

        // Add some shadow to the avatar
        ctx.shadowBlur = 2
        ctx.shadowColor = "rgba(10, 16, 30, 0.25)"

        // Draw the image
        ctx.drawImage(img, avatarOffsetX, avatarOffsetY, avatarSize, avatarSize);

        // Restore the previous state
        ctx.restore()
    }

    return canvas;
}

module.exports = drawUsersCanvas