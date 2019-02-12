import firebase from "firebase/app";
import getConfig from "next/config";

const {publicRuntimeConfig} = getConfig();
const {credentials} = publicRuntimeConfig;

export default firebase.apps.length > 0 ? firebase.app() : firebase.initializeApp(credentials);
