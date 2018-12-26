import React from "react";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";
import {auth } from 'firebase';
import firebase from '../components/Firebase/firebase-api';
import 'firebase/auth'

import Router from 'next/router';
import 'isomorphic-unfetch';

class Login extends React.Component {

	login = (email, password) => {
		
	firebase.auth().setPersistence(auth.Auth.Persistence.NONE);
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(loginData => {
		return loginData.user
						.getIdToken()
						.then(idToken => {
							//const _csrf = Cookies.get('XSRF-TOKEN'); 
							const fetchOpts = {
								method: 'POST',
								headers: new Headers({ 'Content-Type': 'application/json' }),
								credentials: 'include',
								body: JSON.stringify({ idToken })
								}

							// When a user login it makes a call to the server,
							// to register the session
							return fetch('http://localhost:5000/auth/login',fetchOpts)
						})
		})
		.then(() => firebase.auth().signOut())
		.then(() => Router.push('/home'))
		.catch(error => console.log(error));
}

	render() {
		return (
			<MainLayout>
				<LoginForm login={this.login} />
			</MainLayout>
		);
	}
}

export default Login;
