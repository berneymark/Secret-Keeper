import React from 'react';
import Webcam from 'react-webcam';
import SecurityCheck from './SecurityCheck.js';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cameraByteArray: null,
            passOn: false
        }
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    checkUser = () => {
        const image = this.webcam.getScreenshot();
        const byteArrayImage = this.convertToByteArray(image);
        this.setState({
            cameraByteArray: byteArrayImage,
            passOn: true
        });

        return byteArrayImage;
    }

    convertToByteArray = (image) => {
        const base64 = require("base64-js");
        const base64string = image.split(",")[1];

        return base64.toByteArray(base64string);
    }

    returnSecurityCheck = () => {
        this.setState({
            passOn: false
        })

        return (<SecurityCheck faceId = {this.state.cameraByteArray}/>)
    }

    render() {
        const videoConstraints = {
            width: 750,
            height: 500,
            facingMode: 'user'
        }

        return(
            <div>
                <div>
                    <Webcam
                        ref = {this.setRef}
                        audio = {false}
                        height = {250}
                        width = {375}
                        screenshotFormat = "image/jpeg"
                        videoConstraints = {videoConstraints}/>
                </div>
                <button 
                    id = "loginButton" 
                    variant = "primary" 
                    onClick = {this.checkUser}>
                    Login
                </button>
                <div>
                    {this.state.passOn ? <this.returnSecurityCheck/> : null}
                </div>
            </div>
        )
    }
}

export default Camera;