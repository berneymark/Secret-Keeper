import React from 'react';
import Webcam from 'react-webcam';
import SecurityCheck from './SecurityCheck.js';

class Camera extends React.Component {
    constructor(props) {
        super(props);
        this.isCapturing = false;

        this.state = {
            cameraFaceId: null
        };
    }

    setRef = webcam => {
        this.webcam = webcam;
    }

    checkUser = () => {
        this.isCapturing = true;
        const image = this.webcam.getScreenshot();
        const byteArrayImage = this.convertToByteArray(image);

        return this.fetchData(byteArrayImage);
    }

    convertToByteArray = (image) => {
        const base64 = require("base64-js");
        const base64string = image.split(",")[1];

        return base64.toByteArray(base64string);
    }

    fetchData = (byteArray) => {
        const apiKey = "451f682a4583442fa9613d22c57b502d";
        const apiEndpoint = "https://facelock.cognitiveservices.azure.com/face/v1.0/detect";

        fetch(apiEndpoint, {
            body: byteArray,
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    if (data[0] != null) {
                        console.log(data[0].faceId);
                        this.setState = {
                            cameraFaceId: data[0].faceId
                        };

                        return data[0].faceId;
                    } else console.log("it's null this time round...");
                })
            }
        })
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
                <SecurityCheck faceId = {this.state.cameraFaceId}/>
                <button variant="primary" onClick={this.checkUser}>Login</button>
            </div>
        )
    }
}

export default Camera;