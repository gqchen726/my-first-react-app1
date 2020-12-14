const path = require('path');
module.exports = {
    entry: __dirname + "./src/App.js",
    output: {
        path: __dirname + "./public",
        fileName: "bundle.js",
    }
}