const express = require('express');
const path = require('path');
const fileupload = require('express-fileupload');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));
app.use(fileupload());

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, "home.html"));
})

app.get('/editor', (req, res) => {
    res.sendFile(path.join(initial_path, "editor.html"));
})

app.get("/:blog", (req, res) => {
    res.sendFile(path.join(initial_path, "page.html"));
})

app.use((req, res) => {
    res.json("404");
})

app.listen("3000", () => {
    console.log('listening......');
})
