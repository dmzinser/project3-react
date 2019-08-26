import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react"
import { Link } from "react-router-dom";

class UserEdit extends Component {
  state = {
    username: "", 
    email: "",
    password: "",
    image: {}
  };
  
  async componentDidMount(){
    const user = await fetch(`http://localhost:8000/user/${this.props.match.params.id}`)
    const parsedUser = await user.json()
    console.log(parsedUser)
    this.setState({
      username: parsedUser.data.username,
      email: parsedUser.data.email,
      password: parsedUser.data.password,
    })
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

  editUser = async (data) => {
    try {
      const editUserRequest = await fetch(`http://localhost:8000/user/${this.props.match.params.id}/edit`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const editUserResponse = await editUserRequest.json();
      this.props.history.push(`/user/${editUserResponse.data.id}`)
    } catch (err) {
      return (err)
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.editUser(this.state)
  };

  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        Username:
        <Form.Input fluid icon="user" iconPosition="left" placeholder="username" type="text" name="username" value={this.state.username} onChange={this.handleChange}/>
        Email:
        <Form.Input fluid icon="mail" iconPosition="left" placeholder="email" type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
        {/* Password:
        <Form.Input fluid icon="lock" iconPosition="left" type="password" name="password" value={this.state.password} onChange={this.handleChange}/> */}
        {/* Image:
        <Form.Input fluid icon="lock" iconPosition="left" type="file" name="image" onChange={this.handleChange}/> */}
        <Button fluid size="large" type="submit">
          Save Changes
        </Button>
      </Form>
    )
  }
}

export default UserEdit;