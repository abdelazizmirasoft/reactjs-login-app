
import React, { Component } from "react";
import axios from 'axios';

class Registration extends Component{
    constructor(props){
        super(props);
        this.state = {
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
            registrationErrors: "",
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    handleSubmit(event){
        console.log("Submitted");
        
        
        
        const {name, email, password, password_confirmation} = this.state;
        axios.post("http://127.0.0.1:8000/api/register",
                    {name: name,
                    email: email,
                    password: password,
                    password_confirmation: password_confirmation},
                    {withCredentials : true}
        ).then(
            response=>{
                console.log("Registration Suceess", response);
                if(response.data.status==='created'){
                    this.props.handleSuccessfulAuth(response.data);
                }
            }).catch(error=>{
            console.log("Registration error", error);
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
                    <input type="text" name="name" placeholder="Name" value={this.state.name} onChange={this.handleChange} required/>
                    <input type="email" name="email" placeholder="Email" value={this.state.email} onChange={this.handleChange} required/>
                    <input type="password" name="password" placeholder="password" value={this.state.password} onChange={this.handleChange}  required />
                    <input type="password" name="password_confirmation" placeholder="password_confirmation" value={this.state.password_confirmation} onChange={this.handleChange}  required />
                    <button type="submit" onClick={this.onSubmit} className="btn btn-primary account-btn">register</button>
                </form>
            </div>
        );
    }
}

export default Registration;
;