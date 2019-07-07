import React from 'react';

class SecurityCheck extends React.Component {
    constructor(props) {
        super(props);
        const ownerImageURL = "https://miro.medium.com/fit/c/256/256/1*DtfGQ_Lcz9ZJQyADo3vvgA.jpeg";
        const apiKey = "451f682a4583442fa9613d22c57b502d";
        const apiEndpoint = "https://facelock.cognitiveservices.azure.com/face/v1.0/";

        this.state = {
            userFaceId: null,
            cameraFaceId: null
        };

        this.retrieveFaceId(ownerImageURL, apiKey, apiEndpoint);

        console.log(this.state.userFaceId);
        console.log(this.state.cameraFaceId);
    }

    retrieveFaceId = (imageUrl, apiKey, apiEndpoint) => {
        fetch(apiEndpoint + "detect", {
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
                    this.setState({
                        userFaceId: data[0].faceId
                    });
                })
            }
        })
    }

    compareFaceId = (userFaceId, cameraFaceId, apiKey, apiEndpoint) => {
        var input = {
            faceId1: userFaceId,
            faceId2: cameraFaceId
        }

        fetch(apiEndpoint + "verify", {
            body: JSON.stringify(input),
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                response.json().then(data => {
                    console.log("Face match successful...");
                })
            }
        })
    }

    render() {
        return <div>
            <p>{}</p>
        </div>
    }
}

export default SecurityCheck;