import firebase from "firebase/app";

import clientCredentials from "../../credentials/client";

export default firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(clientCredentials);
