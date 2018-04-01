"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
require("zone.js/dist/zone-node");
const express = require("express");
const platform_server_1 = require("@angular/platform-server");
const fs = require("fs");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const document = fs.readFileSync(__dirname + '/index.html', 'utf8');
const AppServerModuleNgFactory = require(__dirname + '/dist-server/main.bundle').AppServerModuleNgFactory;
const app = express();
app.get('**', (req, res) => {
    const url = req.path;
    platform_server_1.renderModuleFactory(AppServerModuleNgFactory, { document, url })
        .then(html => {
        res.set('Cache-Control', 'public, max-age=600, s-maxage=1200');
        res.send(html);
    });
});
exports.ssapp = functions.https.onRequest(app);
//# sourceMappingURL=index.js.map