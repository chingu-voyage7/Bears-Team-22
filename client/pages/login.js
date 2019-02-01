import React from "react";

import {auth} from "firebase/app";
import "firebase/auth";
import Router from "next/router";
import firebase from "../components/Firebase/firebase-api";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";

import "isomorphic-unfetch";

class Login extends React.Component {
	login = async (email, password) => {
		// Since we will use sessions the token auth will be saved and removed

		const fetchOpts = {
			method: "POST",
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
		};

		try {
			firebase.auth().setPersistence(auth.Auth.Persistence.NONE);
			const userData = await firebase.auth().signInWithEmailAndPassword(email, password);
			const idToken = await userData.user.getIdToken();
			fetchOpts.body = JSON.stringify({idToken});
		} catch (error) {
			const errorCode = error.code;
  			if (errorCode === 'auth/wrong-password' || errorCode === 'auth/user-not-found') {
				return { message: "Invalid credentials"};
			} else {
				return { message: "Login failed"};
			}
		}

		try {
			// When a user login it makes a call to the server
			// to set the cookie and sync mongo with firebase
			await fetch("http://localhost:5000/auth/login", fetchOpts);
			await firebase.auth().signOut(); // Cookies are set, no need to mantain the token in the storage
			Router.push("/");
			return null;
		} catch (error) {
			await fetch("http://localhost:5000/auth/logout");   // User already logged in with FB
			return { message: "Internal server error"};
		}
	};

	render() {
		return (
			<MainLayout>
				<LoginForm login={this.login}/>
			</MainLayout>
		);
	}
}

export default Login;
