import React from "react";
import Router from "next/router";
import "firebase/auth";

import firebase from "../components/firebase/firebase-api";
import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";

class Register extends React.Component {
	async signup(registrationData) {
		try {
			const userData = await firebase.auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password);
			const idToken = await userData.user.getIdToken();

			// TODO: Setup CSRF protection - `const _csrf = cookies.get('XSRF-TOKEN');`
			const fetchOpts = {
				method: "POST",
				headers: new Headers({"Content-Type": "application/json"}),
				credentials: "include",
				body: JSON.stringify({idToken, registrationData}) // TODO: Make sure we don't send the plaintext password to the server.
			};

			// When a user login it makes a call to the server
			// to set the cookie and sync mongo with firebase
			await fetch("http://localhost:5000/auth/login", fetchOpts);
			await firebase.auth().signOut();

			Router.push("/");
			return;
		} catch (error) {
			return error;
		}
	}

	render() {
		return (
			<MainLayout>
				<RegisterForm signup={this.signup}/>
			</MainLayout>
		);
	}
}

export default Register;
