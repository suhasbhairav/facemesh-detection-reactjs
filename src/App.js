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
  const [arrayImages, setArrayImages] = useState([
  "https://freesvg.org/img/HUMAN-HEART.png",
  "https://upload.wikimedia.org/wikipedia/commons/9/9e/Lungs_diagram_simple.svg",
  "https://upload.wikimedia.org/wikipedia/commons/b/be/Stomach_icon.svg",
  "https://upload.wikimedia.org/wikipedia/commons/d/d4/Liver.svg",
  "https://upload.wikimedia.org/wikipedia/commons/6/62/Colon_scheme.svg",
  "https://upload.wikimedia.org/wikipedia/commons/f/f7/Small_intestine.svg",
  "https://upload.wikimedia.org/wikipedia/commons/3/33/Human-brain.SVG",
  "https://upload.wikimedia.org/wikipedia/commons/9/9d/Sunglasses_%28example%29.svg",
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
          

          const image2 = new Image();
          image2.src = arrayImages[1];
          image2.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image2, (landmarks[70].x*videoWidth)-30, (landmarks[50].y*videoHeight)+80, image2.width/3, image2.height/3);
            
          };

          const image = new Image();
          image.src = arrayImages[0];
          image.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image, (landmarks[71].x*videoWidth)-20, (landmarks[50].y*videoHeight)+90, image.width/3, image.height/3);
            
          };
          const image3 = new Image();
          image3.src = arrayImages[2];
          image3.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image3, (landmarks[71].x*videoWidth), (landmarks[50].y*videoHeight)+180, image3.width/4, image3.height/4);
            
          };

          const image4 = new Image();
          image4.src = arrayImages[3];
          image4.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image4, (landmarks[71].x*videoWidth)-20, (landmarks[50].y*videoHeight)+240, image4.width/2, image4.height/2);
            
          };
          const image5 = new Image();
          image5.src = arrayImages[4];
          image5.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image5, (landmarks[71].x*videoWidth)-20, (landmarks[50].y*videoHeight)+280, image5.width/2, image5.height/2);
            
          };
          const image6 = new Image();
          image6.src = arrayImages[5];
          image6.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image6, (landmarks[71].x*videoWidth)-20, (landmarks[50].y*videoHeight)+280, image6.width/2, image6.height/2);
            
          };
          const image7 = new Image();
          image7.src = arrayImages[6];
          image7.onload = () => {
            
            //ctx.drawImage(image, (landmarks[21].x*videoWidth), (landmarks[50].y*videoHeight)-50, 110, 50);
            ctx.drawImage(image7, (landmarks[71].x*videoWidth), (landmarks[50].y*videoHeight)-110, image7.width/11, image7.height/11);
            
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
        width: 980,
        height: 760
      });
      camera.start();
    }
  });


  return (
    <div>
      <div>
        {/*<button title="Change Filter" onClick={() => changeFilter()}>Change Filter </button>*/}
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
            width: 980,
            height: 760,
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
            width: 980,
            height: 760,
          }}
          id="myCanvas"
        />
        </div>
    </div>
  );
}

export default App;
