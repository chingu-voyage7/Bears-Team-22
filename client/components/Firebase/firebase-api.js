import firebase from 'firebase/app';
import 'firebase/auth'

import clientCredentials from '../../credentials/client'

import Router from 'next/router';


export default !firebase.apps.length ? firebase.initializeApp(clientCredentials) : firebase.app();

/* 

doCreateUserWithEmailAndPassword = (email, password) =>
    this.auth.createUserWithEmailAndPassword(email, password);

  doSignInWithEmailAndPassword = (email, password) =>
    this.auth.signInWithEmailAndPassword(email, password);

  doSignOut = () => this.auth.signOut();

  doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

  doPasswordUpdate = password =>
    this.auth.currentUser.updatePassword(password);

*/