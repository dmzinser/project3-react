import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Login extends Component {
  state = {
    username: "",
    password: ""
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", this.state.username);
    data.append("password", this.state.password);
    
    const loginCall = this.props.logIn(data);
    loginCall.then((data) => {
      if(data.status.message === "Success"){
          this.props.history.push(`/user/${data.data.id}`)
        } else {
          console.log(data)
        }
    })
  };
  
  render() {
    return(
      <Form onSubmit={this.handleSubmit}>
        Username:
        <Form.Input fluid icon="user" iconPosition="left" placeholder="username" type="text" name="username" onChange={this.handleChange}/>
        Password:
        <Form.Input fluid icon="lock" iconPosition="left" type="password" name="password" onChange={this.handleChange}/>
        <Button fluid size="large" type="submit">Login</Button>
        <Message>
          Not A Member? <Link to="/signup">Sign Up!</Link>
        </Message>
      </Form>
    )
  }
}

export default Login;