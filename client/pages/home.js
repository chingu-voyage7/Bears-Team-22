import React from "react";

import MainLayout from "../components/MainLayout";
import Router from 'next/router';
import firebase from '../components/Firebase/firebase-api';
import 'firebase/auth';

class Home extends React.Component {

    logout = () => {
        firebase.auth().signOut();
        Router.push('/login');
    };

	render() {
        const { name } = Router.query;
		return (
			<MainLayout>
                <h2>{`Welcome ${name}`}</h2>
                <button onClick={this.logout}>Sign out</button>
			</MainLayout>
		);
	}
}

export default Home;