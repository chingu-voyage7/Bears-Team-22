import React from "react";

import Router from "next/router";
import MainLayout from "../components/MainLayout";

class Home extends React.Component {
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

    render() {
    	return (
	<MainLayout>
	<h2>Welcome!</h2>
	<button onClick={this.logout}>Sign out</button>
	<button onClick={this.handleClick}>Test protected route</button>
    		</MainLayout>
    	);
    }
}

export default Home;
