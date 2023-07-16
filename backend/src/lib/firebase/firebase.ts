import * as admin from "firebase-admin";
var serviceAccount = require("../../../book-catalog-559a6-firebase-adminsdk-nrke1-7324c33265.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

export default admin;
