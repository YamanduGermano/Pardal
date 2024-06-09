document.addEventListener('DOMContentLoaded', function() {
    const video = document.querySelector('video');
    const cameraOptions = document.querySelector('.video-options>select');
    let display = document.querySelector('display')
    let inv = document.querySelector('.invisivel')
    let foto = document.querySelector('.icone_perfil')
    let moldura = document.querySelector('.moldura');
    let streamStarted = false;
    let mudar = document.querySelector('#info')

    const constraints = {
        video: {
          width: {
            min: 720,
            max: 720
          },
          height: {
            min: 720,
            max: 720
          },
          facingMode: 'user',
          image_format: 'jpeg',
          jpeg_quality: 100
        }
      };

    const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices();

        const videoDevices = devices.filter(device => device.kind === 'videoinput');
        const options = videoDevices.map(videoDevice => {
          return `<option value="${videoDevice.deviceId}">${videoDevice.label}</option>`;
        });
        cameraOptions.innerHTML = options.join('');
    };
      
        
    const startStream = async (constraints) => {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        handleStream(stream);
    };

    camera = document.querySelector('#camera')

    let determ =1

    camera.addEventListener('click',function(){
        if (determ==1){
            inv.style.display = "flex"
            determ=0
            if(document.querySelector("#canvas")!== null){
                canvas.remove()
            }
            foto.remove();
        }
        else if (determ==0){
            inv.style.display = "none"
            determ=1

            
            moldura.innerHTML+='<canvas id="canvas" width="177" height="177"></canvas>'
            canvas.getContext('2d').drawImage(video, 0, 0, canvas.width, canvas.height);
            let image_data_url = canvas.toDataURL('image/jpeg');
            
            // data url of the image
            console.log(image_data_url);
        }
        
        if (streamStarted) {
            video.play();
            // play.classList.add('d-none');
            // pause.classList.remove('d-none');
            return;
          }
          if ('mediaDevices' in navigator && navigator.mediaDevices.getUserMedia) {
            const updatedConstraints = {
              ...constraints,
              deviceId: {
                exact: cameraOptions.value
              }
            };
            console.log(cameraOptions.value)
            startStream(updatedConstraints);
          }
    })


    
    const handleStream = (stream) => {
      video.srcObject = stream;
      streamStarted = true;
    };
    
    getCameraSelection();



    mudar.addEventListener('click',function(){
      
    })
})