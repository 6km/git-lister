const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.json({ extended: false }));

const apiRoutes = require("./api");

app.use("/api", apiRoutes);

if (
    process.env.LD_LIBRARY_PATH == null ||
    !process.env.LD_LIBRARY_PATH.includes(
        `${process.env.PWD}/node_modules/canvas/build/Release:`,
    )
) {
    process.env.LD_LIBRARY_PATH = `${process.env.PWD
        }/node_modules/canvas/build/Release:${process.env.LD_LIBRARY_PATH || ''}`;
}

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`🚀 Server is running in port ${PORT}`));
