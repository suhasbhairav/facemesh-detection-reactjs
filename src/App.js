import React, { useState, useEffect, useRef } from 'react';
import Webcam from 'react-webcam';
import { FaceMesh } from '@mediapipe/face_mesh';
import * as Facemesh from '@mediapipe/face_mesh';
import * as cam from '@mediapipe/camera_utils';
import { drawConnectors } from '@mediapipe/drawing_utils';

function App() {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const connect = window.drawConnectors;
  var camera = null;
  const [arrayIndex, setArrayIndex] = useState(0);
  const [arrayImages, setArrayImages] = useState(["https://upload.wikimedia.org/wikipedia/commons/9/9d/Sunglasses_%28example%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/e/ea/Glasses_%28example%29.svg",
  "https://upload.wikimedia.org/wikipedia/commons/5/54/Twemoji2_1f576.svg"
]);
  const onResults = async (model) => {
    if(typeof webcamRef.current !== "undefined" && webcamRef.current !== null && webcamRef.current.video.readyState === 4){
      const video = webcamRef.current.video;

      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
      
      //const faces = await model.estimateFaces(video);
      //console.log(faces);

      const ctx = canvasRef.current.getContext("2d");
      ctx.save();

      ctx.clearRect(0,0, videoWidth, videoHeight);
      ctx.drawImage(model.image, 0,0, videoWidth, videoHeight);
      console.log(model);
      if(model.multiFaceLandmarks){
        for(const landmarks of model.multiFaceLandmarks){
          /*drawConnectors(ctx, landmarks, Facemesh.FACEMESH_TESSELATION, {color: '#C0C0C070', lineWidth: 0.5})
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_RIGHT_EYE, {color: '#FFFFFF'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_RIGHT_IRIS, {color: '#C0C0C070'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_LEFT_EYE, {color: '#FFFFFF'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_LEFT_IRIS, {color: '#30FF30'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_FACE_OVAL, {color: '#C0C0C070'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_LIPS, {color: '#FFFFFF'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_LEFT_EYEBROW, {color: '#FFFFFF'});
          drawConnectors(ctx, landmarks, Facemesh.FACEMESH_RIGHT_EYEBROW, {color: '#FFFFFF'});*/
          const image = new Image();
          image.src = arrayImages[arrayIndex];
          image.onload = () => {
            
            ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
          };
        }
      }
    }
  };
  
  const changeFilter = () => {
      if(arrayIndex === 3){
        setArrayIndex(0);
      }else{
        setArrayIndex(arrayIndex+1);
      }
      var ctx = canvasRef.current.getContext("2d");
      ctx.save();
      ctx.clearRect(0,0, 640, 480);
      
  };


  useEffect(() => {
    const faceMesh = new FaceMesh({locateFile: (file) => {
      return `https://cdn.jsdelivr.net/npm/@mediapipe/face_mesh/${file}`;
    }});

    faceMesh.setOptions({
      maxNumFaces: 3,
      minDetectionConfidence: 0.5,
      minTrackingConfidence: 0.5,
    });

    faceMesh.onResults(onResults);

    if (typeof webcamRef.current !== "undefined" && webcamRef.current !== null) {
      camera = new cam.Camera(webcamRef.current.video, {
        onFrame:async () => {
          await faceMesh.send({image:webcamRef.current.video})
        },
        width: 640,
        height: 480
      });
      camera.start();
    }
  });


  return (
    <div>
      <div>
        <button title="Change Filter" onClick={() => changeFilter()}>Change Filter </button>
      </div>
      <div>
      <Webcam
          ref={webcamRef}
          audio={false}
          id="img"
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
        />

        <canvas
          ref={canvasRef}
          style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            width: 640,
            height: 480,
          }}
          id="myCanvas"
        />
        </div>
    </div>
  );
}

export default App;
