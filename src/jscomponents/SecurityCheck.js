import React from 'react';

class SecurityCheck extends React.Component {
    constructor(props) {
        super(props);

        this._isMounted = false;

        const ownerImageURL = "https://miro.medium.com/fit/c/256/256/1*DtfGQ_Lcz9ZJQyADo3vvgA.jpeg";
        const apiKey = "INACTIVE";
        const apiEndpoint = "https://facelock.cognitiveservices.azure.com/face/v1.0/";

        this.retrieveUserFaceId(ownerImageURL, this.props.faceId, apiKey, apiEndpoint);
    }

    retrieveUserFaceId = (userImageUrl, cameraByteArray, apiKey, apiEndpoint) => {
        fetch(apiEndpoint + "detect", {
            // eslint-disable-next-line
            body: '{"url": ' + '"' + userImageUrl + '"}',
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok)
                return response.json();
        }).then(data => {
            console.log("Changing state of userFaceId to: " + data[0].faceId);

            this.retrieveCameraFaceId(data[0].faceId, cameraByteArray, apiKey, apiEndpoint);
        })
    }

    retrieveCameraFaceId = (userFaceId, cameraByteArray, apiKey, apiEndpoint) => {
        fetch(apiEndpoint + "detect", {
            body: cameraByteArray,
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/octet-stream'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok)
                return response.json();
        }).then(data => {
            if (typeof data[0] != 'undefined') {
                console.log("Changing state of cameraFaceId to: " + data[0].faceId);
                this.compareFaceId(userFaceId, data[0].faceId, apiKey, apiEndpoint);
            } else alert("No face found.");
        })
    }

    compareFaceId = (userFaceId, cameraFaceId, apiKey, apiEndpoint) => {
        var input = JSON.stringify({"faceId1": userFaceId, "faceId2": cameraFaceId});

        fetch(apiEndpoint + "verify", {
            body: input,
            headers: {
                'cache-control': 'no-cache', 
                'Ocp-Apim-Subscription-Key': apiKey, 
                'Content-Type': 'application/json'
            },
            method: 'POST'
        }).then(response => {
            if (response.ok) {
                return response.json(); 
            }
        }).then(data => {
            if (typeof data != 'undefined') {
                console.log("Faces are identical: " + data.isIdentical);
                if (data.isIdentical)
                    alert("The secret is that you're Batman!")
                else alert("You are not Bruce. You can't know the secret.");
            } else alert("Face match is undefined.");
        })
    }

    render() {
        return(
            <div></div>
        )
    }
}

export default SecurityCheck;
