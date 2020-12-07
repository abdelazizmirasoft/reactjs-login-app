
import React, { Component } from "react";
import axios from 'axios';

class Login extends Component{
    constructor(props){
        super(props);
        this.state = {
            email: "",
            password: "",
            loginErrors: ""
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){      
        
        
        const {email, password} = this.state;
        axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie').then(response => {
            axios.post("http://127.0.0.1:8000/api/login",
                        {
                        email: email,
                        password: password
                        },
                        {withCredentials : true}
            ).then(
                response=>{
                    if(response.data.logged_in){
                        this.props.handleSuccessfulAuth(response.data);
                    }
                    console.log("Login res", response);
            }).catch(error=>{
                console.log("Login error", error);
            });
        });
        
        event.preventDefault();
    }
    handleChange(event){
        console.log("handelChange");
        this.setState({[event.target.name]:event.target.value});
    }
    render(){
        return(
            <div>
                <form onSubmit={this.handleSubmit}>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}  required />
                    <button type="submit" onClick={this.onSubmit} className="btn btn-primary account-btn">Login</button>
                </form>
            </div>
        );
    }
}

export default Login;
;