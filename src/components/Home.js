import React, { Component } from "react";
import Registration from "./auth/Registration";
import Login from "./auth/Login";

class Home extends Component{

    constructor(props){
        super(props);
         this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
        this.handleLogoutClicked = this.handleLogoutClicked.bind(this);
    }
    handleSuccessfulAuth(data){
        // Update parent component
        this.props.handleLogin(data);
        this.props.history.push("/dashboard");
    }

	handleLogoutClicked(){
        Axios.delete("http://127.0.0.1:8000/api/logout", {headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}},{withCerendtials:true}).then(response=>{
            this.props.handleLogout();
            console.log("Response: ",response)
        }).catch(error=>{
            console.log("Logout error: ", error);
        });
        
    }

    render(){
        return(
            <div>
                <h1>Home</h1>
                <h1>Status: {this.props.loggedInStatus}</h1>
                <button onClick={()=> this.handleLogoutClicked()}>Logout</button>
                <Registration handleSuccessfulAuth={this.handleSuccessfulAuth} />
                <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
                
            </div>
        );
    }
}

export default Home;
;
