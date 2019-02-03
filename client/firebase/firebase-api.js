import firebase from "firebase/app";

import {credentials} from "../config";

export default firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(credentials);
