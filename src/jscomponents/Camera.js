import React from 'react';
import Webcam from 'react-webcam';
import SecurityCheck from './SecurityCheck';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.timerId = null;
        this.isCapturing = false;
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    startCapturing = () => {
        this.isCapturing = true;
        this.timerId.setInterval(() => {
            const image = this.webcam.getScreenshot();
            const byteArrayImage = this.convertToByteArray(image);
            this.fetchData(byteArrayImage);
        }, 1000);
    }

    convertToByteArray = (image) => {
        const base64 = require("base64-js");
        const base64string = image.split(",")[1];

        return base64.toByteArray(base64string);
    }

    fetchData = (byteArray) => {
        const apiKey = "5fc2fa40176b44e199807bc0a14b7478";
        const apiEndpoint = "https://australiaeast.api.cognitive.microsoft.com/face/v1.0/detect?returnFaceId";

        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    var matchedFace = null;
                })
            }
        })
    }

    saveImage = () => {
        var sourceImg = this.webcam.getScreenshot;
        var imageTag = document.getElementById("ownerFace");

        imageTag.src = sourceImg;

        return sourceImg; 
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
                <button onClick={this.saveImage}>Add User</button>
                <img id="ownerFace"/>
            </div>
        )
    }
}

export default Camera;