import React, { Component } from "react";
import './App.css';
import { Route, Switch } from "react-router-dom";
import Login from "./Login";
import Signup from "./Signup";
import UserShow from "./UserShow";
import UserEdit from "./UserEdit";
import PhotoShow from "./PhotoShow";
import ShowAllPhotos from "./ShowAllPhotos";
import { formatDiagnosticsWithColorAndContext } from "typescript";

const My404 = () => {
  return (
    <div>
      You Shall Not Pass!
    </div>
  )
};

class App extends Component {
  state = {
    username: "",
    email: "",
    image: "",
    loading: true,
    isLogged: false,
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
          loading: false,
          isLogged: true
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
        loading: false,
        isLogged: true
      })
      return parsedResponse
    } catch (err) {
      console.log(err)
    }
  };

  render() {
    const currentUser = {
      username: this.state.username,
      email: this.state.email,
      image: this.state.image,
      isLogged: this.state.isLogged,
      id: this.state.id
    }
    return (
      <main>
        <Switch>
          <Route exact path="/" render={() => <ShowAllPhotos />} />
          <Route exact path="/login" render={(props) => <Login {...props} logIn={this.logIn} currentUser={currentUser} />} />
          <Route exact path="/signup" render={(props) => <Signup {...props} signUp={this.signUp} /> } />
          <Route exact path="/user/:id" render={(props) => <UserShow {...props} state={this.state} currentUser={currentUser} /> } />
          <Route exact path="/user/:id/edit" render={(props) => <UserEdit {...props} currentUser={currentUser} /> } />
          <Route exact path="/photos/:id" render={(props) => <PhotoShow {...props} currentUser={currentUser} />} />
          <Route component={My404} />
        </Switch>
      </main>
    )
  };
};

export default App;
