function getFrequency(string, characterToCount) {
    var freq = 0;

    for (var i = 0; i < string.length; i++) {
        var character = string.charAt(i);

        if (character === characterToCount) freq++;
    }

    return freq;
};

function renderStar(x, y, fillColor = "#FFAC33", scale = 1) {
    return `
    <path transform="translate(${x}, ${y}), scale(${scale})" fill="${fillColor}"  xmlns="http://www.w3.org/2000/svg" d="M27.287 34.627c-.404 0-.806-.124-1.152-.371L18 28.422l-8.135 5.834c-.693.496-1.623.496-2.312-.008-.689-.499-.979-1.385-.721-2.194l3.034-9.792-8.062-5.681c-.685-.505-.97-1.393-.708-2.203.264-.808 1.016-1.357 1.866-1.363L12.947 13l3.179-9.549c.268-.809 1.023-1.353 1.874-1.353.851 0 1.606.545 1.875 1.353L23 13l10.036.015c.853.006 1.606.556 1.867 1.363.263.81-.022 1.698-.708 2.203l-8.062 5.681 3.034 9.792c.26.809-.033 1.695-.72 2.194-.347.254-.753.379-1.16.379z"/>
    `
}

function renderStarsButton(x, y, w, h, options) {
    const dotsDuplication = getFrequency(options.text, ".") + getFrequency(options.text, ",") + getFrequency(options.text, " ")
    
    // dynamically fit button content (text length * font size / 2) + icon width + dots duplication
    const buttonWidth = (options.text.length * 10) + 17 + (dotsDuplication)
        , buttonHeight = h
        , buttonText = options.text
        , buttonTextColor = "#ffcd4d"

    const textX = x + 40
        , textY = y + buttonHeight / 2 + 6

    const icon = renderStar(x + 12, buttonHeight * 0.28, buttonTextColor, 0.5)

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