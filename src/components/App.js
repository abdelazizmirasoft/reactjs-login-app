import React, { Component } from "react";


import Dashboard from "./Dashboard";
import Home from "./Home";
import { BrowserRouter, Switch, Route } from "react-router-dom"
import axios from "axios";

class App extends Component{

    constructor(){
        super();
        this.state={
            loggedInStatus: "NOT_LOGGED_IN",
            logged_in: false,
            user: {}
        }
        this.handleLogin = this.handleLogin.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
    }    

    checkLoginStatus(){
        axios.get("http://127.0.0.1:8000/api/logged_in", {headers:{Authorization : `Bearer ${localStorage.getItem("token")}`}})
            .then(response=>{
                if(response.data.logged_in && this.state.loggedInStatus == "NOT_LOGGED_IN"){
                    this.setState({
                        loggedInStatus: "LOGGED_IN",
                        user:response.data.user
                    });
                }
                console.log("User logged In",response)
                })
            .catch(error=>
                console.log("Check loggin error",error)
                );
    }
    handleLogout(){
        this.setState({
            loggedInStatus: "NOT_LOGGED_IN",
            user:{}
        });
    }

    componentDidMount(){
        this.checkLoginStatus();
    }

    handleLogin(data){
        this.setState({
            loggedInStatus: "LOGGED_IN",
            logged_in: true,
            user:data
        });
        console.log(" handleLogin -->"+ data.token);
        localStorage.setItem('token',data.token);

    }

    render(){
         return(
            <div className="app">
                <BrowserRouter>
                    <Switch>
                        <Route 
                            exact 
                            path={"/"}
                            render={props=>(
                                <Home 
                                    {...props} 
                                    handleLogin={this.handleLogin} 
                                    handleLogout={this.handleLogout} 
                                    loggedInStatus={this.state.loggedInStatus}
                                />
                            )}
                            /> 
                        <Route 
                            exact 
                            path={"/dashboard"} 
                            render={props=>(
                                <Dashboard {...props} loggedInStatus={this.state.loggedInStatus}/>
                            )}
                            /> 
                    </Switch>
                </BrowserRouter>
            </div>
        );

        /*return( 
            <Login/>
        );*/
/*
        return (
            
              <div >
                <AppProvider>
                  <AuthContainer />
                </AppProvider>
              </div>
            
          )
  */      
       /*return(
           <div>
               <div className="ui fixed inverted menu">
                    <div className="ui container">
                        <a href="/#" className="header item">
                            React JS CRUD with Laravel API
                        </a>
                    </div>
                    
               </div>
               <div className="ui main container">
                    <MyForm customer={this.state.customer} onFormSubmit={this.onFormSubmit} /> 
                    {this.state.loader ? <Loader/> : ""}
                    <CustomerList customers={this.state.customers} onDelete={this.onDelete} onEdit={this.onEdit}  />
               </div>
           </div>
       );*/
    }
}

export default App; 
