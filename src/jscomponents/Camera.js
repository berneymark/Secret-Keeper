import React from 'react';
import Webcam from 'react-webcam';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.timerId;
        this.isCapturing;
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    startCapturing = () => {
        this.isCapturing = true;
        this.timerId.setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
        }, 1000);
    }

    convertToByteArray = (image) => {
        const base64 = require("base64-js");
        const base64String = image.split(",")[1];
    }

    render() {
        const videoConstraints = {
            width: 750,
            height: 500,
            facingMode: 'user'
        }

        return(
            <div>
                <Webcam
                    ref = {this.setRef}
                    audio = {false}
                    height = {250}
                    width = {375}
                    screenshotFormat = "image/jpeg"
                    videoConstraints = {videoConstraints}/>
            </div>
        )
    }
}