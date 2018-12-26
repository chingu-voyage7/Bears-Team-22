import React from "react";

import MainLayout from "../components/MainLayout";
import RegisterForm from "../components/RegisterForm";
import firebase from '../components/Firebase/firebase-api';
import 'firebase/auth'
import Router from 'next/router';

class Register extends React.Component {

	signup = (email, password) =>{
		firebase.auth().createUserWithEmailAndPassword(email, password)
		.then(userData => {
			if(userData) {
				Router.push(`/home?name=${userData.user.email}`);			
			}
		});
	}

	render() {
		return (
			<MainLayout>
				<RegisterForm signup={this.signup} />
			</MainLayout>
		);
	}
}

export default Register;
