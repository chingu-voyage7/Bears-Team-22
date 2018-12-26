import React from "react";
import {auth} from "firebase";
import "firebase/auth";

import Router from "next/router";
import "isomorphic-unfetch";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";
import firebase from "../components/Firebase/firebase-api";

class Login extends React.Component {
	login = (email, password) => {
		firebase.auth().setPersistence(auth.Auth.Persistence.NONE);
		firebase.auth().signInWithEmailAndPassword(email, password)
			.then(loginData => { // eslint-disable-line promise/prefer-await-to-then
				return loginData.user
					.getIdToken()
					.then(idToken => { // eslint-disable-line promise/prefer-await-to-then
						// Const _csrf = Cookies.get('XSRF-TOKEN');
						const fetchOpts = {
							method: "POST",
							headers: new Headers({"Content-Type": "application/json"}),
							credentials: "include",
							body: JSON.stringify({idToken})
						};

						// When a user login it makes a call to the server,
						// to register the session
						return fetch("http://localhost:5000/auth/login", fetchOpts);
					});
			})
			.then(() => firebase.auth().signOut()) // eslint-disable-line promise/prefer-await-to-then
			.then(() => Router.push("/home")) // eslint-disable-line promise/prefer-await-to-then
			.catch(error => console.log(error));
	}

	render() {
		return (
			<MainLayout>
				<LoginForm login={this.login}/>
			</MainLayout>
		);
	}
}

export default Login;
