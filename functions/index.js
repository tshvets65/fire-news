const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp({
    credential: admin.credential.applicationDefault(),
    databaseURL: 'https://fire-notes-1c823.firebaseio.com'
});
const db = admin.firestore();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/linksPagination?offset=20&limit=5
//
exports.linksPagination = functions.https.onRequest((request, response) => {
    response.set("Access-Control-Allow-Origin", "*");
    let linksRef = db.collection('links');
    const offset = Number(request.query.offset);
    const limit = Number(request.query.limit);
    linksRef
        .orderBy('created', 'desc')
        .limit(limit)
        .offset(offset)
        .get()
        .then(snapshot => {
            const links = snapshot.docs.map(doc => {
                return { id: doc.id, ...doc.data() };
            });
            response.json(links);
        });
});
