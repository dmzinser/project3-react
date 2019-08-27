import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom";

class Signup extends Component {
  state = {
    username: "",
    email: "",
    password: "",
    image: {}
  };
  handleChange = (e) => {
    if(e.target.name !== "image") {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        image: e.target.files[0]
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("username", this.state.username);
    data.append("email", this.state.email);
    data.append("password", this.state.password);
    data.append("file", this.state.image);

    const signUpCall = this.props.signUp(data);

    signUpCall.then((data) => {
      if(data.status.message === "Success"){
        this.props.history.push(`/user/${data.data.id}`)
      } else {
        console.log(data)
      }
    })
  };
  render() {
    return (
       <div className="container-background landing-background">
       <Grid textAlign='center' verticalAlign='middle' style={{ height: '100vh', marginTop: 0,}}>
         <Grid.Column style={{maxWidth: 450}}>
           <Form onSubmit={this.handleSubmit}>
               <Segment stacked>
                Username:
                <Form.Input fluid icon="user" iconPosition="left" placeholder="username" type="text" name="username" onChange={this.handleChange}/>
                Email:
                <Form.Input fluid icon="mail" iconPosition="left" placeholder="email" type="text" name="email" onChange={this.handleChange}/>
                Password:
                <Form.Input fluid icon="lock" iconPosition="left" type="password" name="password" onChange={this.handleChange}/>
                Image:
                <Form.Input fluid icon="lock" iconPosition="left" type="file" name="image" onChange={this.handleChange}/>
                <Button fluid size="large" type="submit">
                  Register
                </Button>
                <Message>
                  Already a member? <Link to="/login">Login</Link>
                </Message>
             </Segment>
           </Form>
         </Grid.Column>
       </Grid>
     </div>
    )
  }
}

export default Signup;