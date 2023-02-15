const renderStarIcon = require('./renderStarIcon')

function getFrequency(string, characterToCount) {
    var freq = 0;

    for (var i = 0; i < string.length; i++) {
        var character = string.charAt(i);

        if (character === characterToCount) freq++;
    }

    return freq;
};

function renderStarsButton(x, y, w, h, options) {
    const dotsDuplication = getFrequency(options.text, ".") + getFrequency(options.text, ",") + getFrequency(options.text, " ")

    // dynamically fit button content (text length * font size / 2) + icon width + dots duplication
    const buttonWidth = (options.text.length * 10) + 17 + (dotsDuplication)
        , buttonHeight = h
        , buttonText = options.text
        , buttonTextColor = "#ffcd4d"

    const textX = x + 40
        , textY = y + buttonHeight / 2 + 6

    const icon = renderStarIcon(x + 12, buttonHeight * 0.28, buttonTextColor, 0.5)

    return `
        <g>
            <rect
                width="${buttonWidth < 140 ? 140 : buttonWidth}"
                height="${buttonHeight}"
                fill="rgb(255 194 0 / 10%)"
                x="${x}"
                y="${y}"
                rx="20"
            />

            ${icon}

            <text
                fill="${buttonTextColor}"
                font-size="15"
                x="${textX}"
                y="${textY}"
                style="font-family: Arial; font-weight: 600;"
            >
                ${buttonText}
            </text>
        </g>
    `
}

module.exports = renderStarsButton