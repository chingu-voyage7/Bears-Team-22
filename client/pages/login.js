import React from "react";

import {auth} from "firebase/app";
import "firebase/auth";
import Router from "next/router";

import firebase from "../firebase/firebase-api";
import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";

import {get, post} from "../http";

class Login extends React.Component {
	login = async (email, password) => {
		// Since we will use sessions the token auth will be saved and removed
		const fetchOpts = {
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include"
		};

		try {
			firebase.auth().setPersistence(auth.Auth.Persistence.NONE);

			const userData = await firebase.auth().signInWithEmailAndPassword(email, password);
			const idToken = await userData.user.getIdToken();

			fetchOpts.body = JSON.stringify({idToken});
		} catch (error) {
			const {code} = error;

			if (code === "auth/user-disabled" || code === "auth/network-request-failed") {
				return {message: "Login failed"};
			}

			return {message: "Given user not found or invalid password."};
		}

		try {
			// When a user login it makes a call to the server
			// to set the cookie and sync mongo with firebase
			await post("/auth/login", fetchOpts);
			await firebase.auth().signOut(); // Cookies are set, no need to mantain the token in the storage

			Router.push("/");
		} catch (error) {
			await get("/auth/logout"); // User already logged in with Firebase
			return {message: "Login failed (internal server error)"};
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
