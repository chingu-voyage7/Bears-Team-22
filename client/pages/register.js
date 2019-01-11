import React from "react";
import Router from "next/router";
import "firebase/auth";

import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";
import firebase from "../components/Firebase/firebase-api";

class Register extends React.Component {
	async signup(registrationData) {
		try {
			const userData = await firebase.auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password);
			const idToken = await userData.user.getIdToken();

			// Const _csrf = Cookies.get('XSRF-TOKEN');   <-- TODO
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
			await Router.push("/");
		} catch (error) {
			console.error(error);
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
