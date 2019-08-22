import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";

class UserShow extends Component {
  state = {
    user: {},
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    file: "",
    images: []
  };
  async componentDidMount(){
    const user = await fetch(`http://localhost:8000/user/${this.props.match.params.id}`)
    const parsedUser = await user.json()
    delete parsedUser.data.password
    const photos = await fetch(`http://localhost:8000/user/${this.props.match.params.id}/photos`)
    const parsedPhotos = await photos.json()
    console.log(parsedUser)
    this.setState({
      user: parsedUser.data,
      images: parsedPhotos.data
    })
  };
  handleChange = (e) => {
    if(e.target.name !== "file") {
      this.setState({
        [e.target.name]: e.target.value
      })
    } else {
      this.setState({
        file: e.target.files[0]
      });
    }
  };
  handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append("title", this.state.title)
    data.append("description", this.state.description)
    data.append("latitude", this.state.latitude)
    data.append("longitude", this.state.longitude)
    data.append("file_location", this.state.file);
    const photoUpload = await fetch(`http://localhost:8000/user/${this.props.match.params.id}/photos`, {
      method: "POST",
      credentials: "include",
      body: data,
      headers: {
        "enctype": "multipart/form-data"
      }
    });
    const parsedResponse = await photoUpload.json()
    console.log(parsedResponse)
    
  };
  render () {
    console.log(this.state)
    return (
      // IF THE USER HAS PHOTOS ALREADY UPLOADED, SHOW THEM HERE
      <Form onSubmit={this.handleSubmit}>
        <Form.Input placeholder="Photo Title" type="text" name="title" onChange={this.handleChange}/>
        <Form.Input placeholder="Photo Description" type="text" name="description" onChange={this.handleChange}/>
        <Form.Input placeholder="Latitude" type="text" name="latitude" onChange={this.handleChange}/>
        <Form.Input placeholder="Longitude" type="text" name="longitude" onChange={this.handleChange}/>
        <Form.Input fluid icon='file image' iconPosition='left' type="file" name='file' onChange={this.handleChange}/>
        <Button disabled={!this.state.file} fluid size="large" type="submit">
          Add A Photo!
        </Button>
      </Form>
    )
  }
}

export default UserShow