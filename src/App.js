import React, { Component } from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";

const My404 = () => {
  return (
    <div>
      You Shall Not Pass!
    </div>
  )
}

class App extends Component {
  state = {
    username: "",
    email: "",
    image: "",
    loading: true,
  };
  logIn = async (data) => {
    try {
      const loginResponse = await fetch("http://localhost:8000/user/login", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
          "enctype": "multipart/form-data"
        }
      })
      const parsedResponse = await loginResponse.json();
      this.setState(() => {
        return {
          ...parsedResponse.data,
          loading: false
        }
      })
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  };
  signUp = async (data) => {
    try {
      const signupResponse = await fetch("http://localhost:8000/user/signup", {
        method: "POST",
        credentials: "include",
        body: data,
        headers: {
          "enctype": "multipart/form-data"
        }
      })
      const parsedResponse = await signupResponse.json()
      this.setState({
        ...parsedResponse.data,
        loading: false
      })
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  };
  render() {
    const { logged, user, photos } = this.state
    return (
      <main>
        <Switch>
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} signUp={this.signUp} /> } />
          <Route component={My404} />
        </Switch>
      </main>
    )
  };
}

export default App;
