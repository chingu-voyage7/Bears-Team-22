import React from "react";

import MainLayout from "../components/MainLayout";
import Router from 'next/router';
import firebase from '../components/Firebase/firebase-api';
import 'firebase/auth'

class Home extends React.Component {

    logout = () => {
      fetch('http://localhost:5000/auth/logout', {credentials: 'include'})
        .then(() =>  Router.push('/login'))
        .catch(error => console.log(error));
    };

	render() {
		return (
			<MainLayout>
                <h2>Welcome!</h2>
                <button onClick={this.logout}>Sign out</button>
			</MainLayout>
		);
	}
}

export default Home;