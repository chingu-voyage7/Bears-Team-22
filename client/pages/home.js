/*****************************************/ 
// FAKE HOMEPAGE MADE FOR TESTING PURPOSE!
/*****************************************/

import React from "react";
import Router from "next/router";

import "isomorphic-unfetch";
import MainLayout from "../components/MainLayout";
class Home extends React.Component {
	// Get the user from the appropriate endpoint
	static async getInitialProps () {
		try {
			const response = await fetch('http://localhost:5000/user/current-user', {credentials: 'include'})
			if (response.status !== 200) {
				throw new Error('Unauthorized!');
			}
			const user = await response.json()
			return { user }
		} catch ( error ) {
			console.error(error);
			return {}
		}
	}

	constructor(props) {
		super(props);
		this.state = {
			user: this.props.user
		}
	}


    logout = () => {
    	fetch("http://localhost:5000/auth/logout", {credentials: "include"})
    		.then(() => Router.push("/login"))
    		.catch(error => console.log(error));
    };

    handleClick = () => {
    	fetch("http://localhost:5000/user/get-all", {credentials: "include"})
    		.then(response => response.json())
    		.then(resp => console.log("response", resp))
    		.catch(error => console.log(error));
	}
	

	updateEmail = () => {
 		let newEmail = '';
		this.state.user.email === 'test@test.com' 
		? newEmail= 'best@best.com' 
		: newEmail = 'test@test.com';

		const fetchOpts = {
			method: "POST",
			headers: new Headers({"Content-Type": "application/json"}),
			credentials: "include",
			body: JSON.stringify({email: newEmail})
		};

		fetch("http://localhost:5000/user/update-user", fetchOpts)
    		.then(response => response.json())
    		.then(resp => console.log("response", resp))
    		.catch(error => console.log(error));
	}

	deleteUser = () => {
		const fetchOpts = {
			method: "DELETE",
			credentials: "include"
		};

		fetch("http://localhost:5000/user/delete-user", fetchOpts)
    		.then(() => {
				console.log('user deleted correctly!')
				this.logout();
			})
    		.catch(error => console.log(error));
	}

    render() {
		const { user } = this.state;
    	return (
	<MainLayout>
	<h2>Welcome!</h2>
	<button onClick={this.logout}>Sign out</button>
	<button onClick={this.handleClick}>Test protected route</button>
	<button onClick={this.updateEmail} >Update email</button>
	<button onClick={this.deleteUser} >Delete user ( care, one click one shot! )</button>
	<p>{user ? user.email : 'nobody'} is logged in</p>
    		</MainLayout>
    	);
    }
}

export default Home;
