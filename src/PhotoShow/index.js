import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class PhotoShow extends Component {
  state = {
    title: "",
    description: "",
    latitude: "",
    longitude: "",
    file_location: "",
  };

  async componentDidMount(){
    const photo = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos/${this.props.match.params.id}`)
    const parsedPhoto = await photo.json()
    console.log(this.props.currentUser)
    this.setState({
      title: parsedPhoto.data.title,
      description: parsedPhoto.data.description,
      latitude: parsedPhoto.data.latitude,
      longitude: parsedPhoto.data.longitude,
      file_location: parsedPhoto.data.file_location,
    })
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    })
  };

  editPhoto = async (data) => {
    try {
      const editedPhotoRequest = await fetch(`${process.env.REACT_APP_BACKEND_URL}/photos/${this.props.match.params.id}/edit`, {
        method: "PUT",
        credentials: "include",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const editedPhotoResponse = await editedPhotoRequest.json();
      this.props.history.push(`/user/${this.props.currentUser.id}`) 
    } catch (err) {
      return(err)
    }
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.editPhoto(this.state)
  };
  
  render() {
    const { file_location } = this.state
    return(
      <div>
        <img src={`${process.env.REACT_APP_BACKEND_URL}/photo_uploads/${file_location}`} /> 
        <div>
          <Form onSubmit={this.handleSubmit}>
            <Form.Input placeholder="Photo Title" type="text" name="title" value={this.state.title} onChange={this.handleChange}/>
            <Form.Input placeholder="Photo Description" type="text" name="description" value={this.state.description} onChange={this.handleChange}/>
            <Form.Input placeholder="Latitude" type="text" name="latitude" value={this.state.latitude} onChange={this.handleChange}/>
            <Form.Input placeholder="Longitude" type="text" name="longitude" value={this.state.longitude} onChange={this.handleChange}/>
            <Button fluid size="large" type="submit">
              Update Photo!
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}

export default PhotoShow;