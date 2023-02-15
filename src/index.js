require('dotenv').config()

const express = require("express");
const path = require('path');
const app = express();

app.use(express.json({ extended: false }));

const apiRoutes = require("./api");

app.use(express.static(path.join(__dirname, 'public')))
app.use("/api", apiRoutes);
app.disable("etag");

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`🚀 Server is running in port ${PORT}`));
