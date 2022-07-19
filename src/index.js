const express = require("express");
const app = express();

app.use(express.static('public'));
app.use(express.json({ extended: false }));

const apiRoutes = require("./api");

app.use("/api", apiRoutes);

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`🚀 Server is running in port ${PORT}`));