/**
 * Import function triggers from their respective submodules:
 *
 * const {onCall} = require("firebase-functions/v2/https");
 * const {onDocumentWritten} = require("firebase-functions/v2/firestore");
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

const {onRequest} = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const serviceAccount = require('./facecockdev-firebase-adminsdk-46eir-1d924e004d.json');
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const app = require('./api/api');

exports.api = onRequest(
    {timeoutSeconds: 15, cors: true, maxInstances: 10},
    app
);