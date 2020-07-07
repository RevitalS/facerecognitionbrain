import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import Rank from './components/Rank/Rank';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';


import './App.css';
//import { render } from 'react-dom';

const serverUrl =  'http://localhost:3000'; //'https://aqueous-mesa-81156.herokuapp.com';

const particlesOptions = {
  particles:{
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
} 

const initialState = {
    input: '',
    imgUrl: '',
    box: {},
    route: 'signin',
    isSignedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {

    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - (clarifaiFace.right_col * width),
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box});
  }

  onInputChange = (event) => {
    this.setState({input: event.target.value});
  }

  onButtonSubmit = () => {
    this.setState({box:{}});
    this.setState({imgUrl: this.state.input});
   // console.log(this.state.input, Clarifai.FACE_DETECTION_MODEL);
   if (!this.state.input) {
     return;
   }
    fetch(serverUrl + '/imageurl', {
      method: 'post',
      headers: {'content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      })
    })
    .then(response => response.json())
    .then(response =>  {
      if (response) {
        if (Object.keys(response.outputs[0].data).length !== 0) {
            fetch(serverUrl + '/image', {
              method: 'put',
              headers: {'Content-Type': 'application/json'},
              body: JSON.stringify({
                  id: this.state.user.id
                })
            })
          .then(response => response.json())
          .then(count =>  {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
          .catch(console.log, 'error get info from clarifai')
          this.displayFaceBox(this.calculateFaceLocation(response))
        }
  }
    
  }).catch(err => console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    }else if (route === 'home') {
      this.setState({isSignedIn: true});
    }
    this.setState({route: route});
  }

  render () {
  const {isSignedIn, imgUrl, route, box} = this.state;
  return (
    <div className="App">
       <Particles className='particles'
                params={particlesOptions}/>
      <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      { route === 'home' 
      ? <div>
      <Logo/>
      <Rank name={this.state.user.name} entries={this.state.user.entries}/>
      <ImageLinkForm 
        onInputChange={this.onInputChange} 
        onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition box={box} imgUrl={imgUrl}/>
        </div>
      : (
        route === 'signin' 
        ? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} serverUrl={serverUrl}/>
        : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} serverUrl={serverUrl}/>
        )
      
      }
    </div>
  ); 
  }
}

export default App;
