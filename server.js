const express = require('express');
const path = require('path');
const send = require('send');
// const data = require('dataModule');

const PORT = process.env.PORT || 4000
const DIST_DIR = path.join(__dirname, 'dist')
const app = express();

const reg = /\/backend\/api\/v1\/location\/(\d+)/;

app.route('/backend/api/v1/location/*').get((req, res) => {
    const num = req.path.match(reg)[1];
    res.json(require(`./data/location_${num}.json`));
});
app.route('/backend/*').get((req, res) => {
    switch (req.path) {
        case "/backend/api/v1/user":
            res.send('not logged in');
            break;
        case "/backend/api/v1/get":
            res.json({ "locale": "en", "_token": "V8kifnL0TpO3Z7gyUuNCTpIYsYwFm2HfentlNI2T" });
            break;
        case "/backend/api/v1/locations":
            res.json(require('./data/locations.json'));
            break;
        case "/backend/api/v1/brief/top":
            res.json(require('./data/locations.json'));
            break;
        default:
            res.json({});
    }
});
app.get('*.*', express.static(DIST_DIR))
app.get('*', (req, res) => {
    var stream = send(req, "/index.html", { root: path.join(DIST_DIR, req.path) });
    stream.pipe(res);
})

app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
});
