import React from "react";

import MainLayout from "../components/MainLayout";
import LoginForm from "../components/LoginForm";

import firebase from '../components/Firebase/firebase-api';
import 'firebase/auth'

import 'isomorphic-unfetch'
import Router from 'next/router';

class Login extends React.Component {

	login = (email, password) =>{
	firebase.auth().signInWithEmailAndPassword(email, password)
	.then(loginData => {
		if(loginData) {
			Router.push(`/home?name=${loginData.user.email}`);
		}
	});
}

componentDidMount () {  
	firebase.auth().onAuthStateChanged(userData => {
		console.log('userdata', userData);
		if (userData) {
		  return userData
			.getIdToken()
			.then(token => {
			  // When a user login it makes a call to the server,
			  // to register the session
			  return fetch('http://localhost:5000/auth/login',{
				method: 'POST',
				headers: new Headers({ 'Content-Type': 'application/json' }),
				credentials: 'include',
				body: JSON.stringify({ token })
			  })
			})
		} else {
		  // eslint-disable-next-line no-undef
		  fetch('http://localhost:5000/auth/logout', {
			method: 'GET',
			credentials: 'include'
		  })
		}
	  })
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
