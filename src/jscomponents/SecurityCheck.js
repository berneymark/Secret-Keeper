import React from 'react';
import UserFace from '../img/userFace.JPG';

class SecurityCheck extends React.Component {
    constructor(props) {
        super();
        const ownerImageURL = "https://miro.medium.com/fit/c/256/256/1*DtfGQ_Lcz9ZJQyADo3vvgA.jpeg";
        this.state = {
            userFaceId: this.retrieveFaceId(ownerImageURL),
            cameraFaceId: null
        }
    }

    retrieveFaceId = (imageUrl) => {
        const apiKey = "451f682a4583442fa9613d22c57b502d";
        const apiEndpoint = "https://facelock.cognitiveservices.azure.com/face/v1.0/detect";

        fetch(apiEndpoint, {
            body: '{"url": ' + '"' + imageUrl + '"}',
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log(data[0].faceId);
                    return data[0].faceId;
                })
            }
        })
    }

    render() {
        return <div>
            <p>{this.state.userFaceId}</p>
        </div>
    }
}

export default SecurityCheck;