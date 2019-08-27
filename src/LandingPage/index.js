import React, { Component } from "react";
import { Button, Form, Grid, Header, Image, Message, Segment } from "semantic-ui-react";
import { Link } from "react-router-dom";

class LandingPage extends Component {
  state = {
    images: []
  };
  render() {
    return(
      <div className="container-background landing-background">
        <h1>Exchange-O-Gram</h1>
      </div>
    )
  }
}

export default LandingPage;