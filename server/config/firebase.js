const firebaseAdmin = require('firebase-admin');

const serviceAccountKey = require('./skipli-code-challenge-key.json');

//init admin 
firebaseAdmin.initializeApp({

  credential: firebaseAdmin.credential.cert(serviceAccountKey)

});

//get instance
const database = firebaseAdmin.firestore();

console.log("firebase admin connected successfully");

module.exports = {database, firebaseAdmin};