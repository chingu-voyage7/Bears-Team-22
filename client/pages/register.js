import React from "react";

import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";
import firebase from "../components/Firebase/firebase-api";
import "firebase/auth";
import Router from "next/router";

class Register extends React.Component {
	signup = registrationData => {
		firebase.auth().createUserWithEmailAndPassword(registrationData.email, registrationData.password)
			.then(userData => {
				return userData.user
					.getIdToken()
					.then(idToken => {
						// Const _csrf = Cookies.get('XSRF-TOKEN');   <-- TODO
						const fetchOpts = {
							method: "POST",
							headers: new Headers({"Content-Type": "application/json"}),
							credentials: "include",
							body: JSON.stringify({idToken, registrationData})
						};

						// When a user login it makes a call to the server
						// to set the cookie and sync mongo with firebase
						return fetch("http://localhost:5000/auth/login", fetchOpts);
					});
			})
			.then(() => firebase.auth().signOut())
			.then(() => Router.push("/home"))
			.catch(error => console.log(error));
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
