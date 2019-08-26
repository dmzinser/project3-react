import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

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
    console.log(this.props.currentUser)
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

  deleteUser = async (id) => {
    try {
      const deleteUserRequest = await fetch(`http://localhost:8000/user/${this.props.match.params.id}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(this.state.user),
        headers:  {
          "Content-Type": "application/json"
        }
      })
      const deleteUserResponse = await deleteUserRequest.json()
      this.setState({
        user: {deleteUserResponse}
      })
      this.props.history.push("/signup")
    } catch (err) {
      return(err)
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
    const photoUpload = await fetch("http://localhost:8000/photos/addphoto", {
      method: "POST",
      credentials: "include",
      body: data,
      headers: {
        "enctype": "multipart/form-data"
      }
    });
    const parsedResponse = await photoUpload.json()
    if(parsedResponse.status.message === "Success"){
      this.setState({
        images: [...this.state.images, parsedResponse.data]
      })
    }
    console.log(parsedResponse)
  };

  deletePhoto = async (id) => {
    try {
      const deleteRequest = await fetch(`http://localhost:8000/photos/${id}`, {
        method: "DELETE",
        credentials: "include",
        body: JSON.stringify(this.state.file),
        headers: {
          "Content-Type": "application/json"
        }
      })
      const deleteResponse = await deleteRequest.json()
      this.setState({
        file: {deleteResponse},
        images: [...this.state.images].filter( p => p.id !== id)
      })
    } catch (err) {
      return(err)
    }
  };

  render () {
    const { images } = this.state
    return (
      <div>
        <Grid columns={4} >
          <Grid.Row>
            {images.map(photo => {
              return (
                <Grid.Column >
                  <div>
                    <Link to={`/photos/${photo.id}`}>
                      <img src={`http://localhost:8000/photo_uploads/${photo.file_location}`} />
                    </Link>
                    
                    <Button>
                      <Link to={`/photos/${photo.id}`}>Edit Photo</Link>
                    </Button>
                    <Button onClick={() => this.deletePhoto(photo.id)} type="submit">
                      Delete Photo
                    </Button>
                  </div>
                </Grid.Column>
              )
            })}
          </Grid.Row>
        </Grid>
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
      <Link to={`/user/${this.props.match.params.id}/edit`}>
      <Button fluid size="large" type="submit">
          Edit User!
      </Button>
      </Link>
      <Button onClick={this.deleteUser} fluid size="large" type="submit">
          Delete User!
      </Button>
      </div>
    )
  }
}

export default UserShow;