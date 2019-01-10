import React from "react";

import firebase from "../components/Firebase/firebase-api";
import {auth} from "firebase";
import "firebase/auth";
import Router from "next/router";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";

import "isomorphic-unfetch";

class Login extends React.Component {
	login = async (email, password) => {
		// Since we will use sessions the token auth will be saved and removed
		try {
			firebase.auth().setPersistence(auth.Auth.Persistence.NONE);
			const userData = await firebase.auth().signInWithEmailAndPassword(email, password);
			const idToken = await userData.user.getIdToken();
						
			// Const _csrf = Cookies.get('XSRF-TOKEN');  <-- TODO
			const fetchOpts = {
				method: "POST",
				headers: new Headers({"Content-Type": "application/json"}),
				credentials: "include",
				body: JSON.stringify({idToken})
			};
	
			// When a user login it makes a call to the server
			// to set the cookie and sync mongo with firebase
			await fetch("http://localhost:5000/auth/login", fetchOpts);
			await firebase.auth().signOut() // Cookies are set, no need to mantain the token in the storage
			Router.push("/home") // MOCK ROUTING - To be optimized accordingly to the front-end schema
		} catch(error) {
			console.log(error);
		}
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
