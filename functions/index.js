const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

exports.onNewUser = functions.auth.user().onCreate((user) => {
    admin.firestore().collection('usuarios').doc(user.uid).set({
        profissao: 'Programador'
    })

    if(user.email && user.email.endsWith('@treinaweb.com.br')){
        const customClaims = {
            role: 'admin'
        }
        admin.auth().setCustomUserClaims(user.uid, customClaims);
    }
})

exports.onDeleteUser = functions.auth.user().onDelete((user) => {
    admin.firestore().collection('usuarios').doc(user.uid).delete();
})