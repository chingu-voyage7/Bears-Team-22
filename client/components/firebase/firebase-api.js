import firebase from "firebase/app";

import clientCredentials from "../../client-cred";

export default firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(clientCredentials);
