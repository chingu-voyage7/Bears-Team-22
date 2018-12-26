import React from "react";
import Router from "next/router";
import "firebase/auth";

import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";
import firebase from "../components/Firebase/firebase-api";

class Register extends React.Component {
	signup(email, password) {
		firebase.auth().createUserWithEmailAndPassword(email, password)
			.then(userData => { // eslint-disable-line promise/prefer-await-to-then
				if (userData) {
					Router.push("/home");
				}
			});
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
