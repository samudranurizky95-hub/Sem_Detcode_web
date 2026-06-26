const video = document.getElementById("video");
const canvas = document.getElementById("canvas");
const statusText = document.getElementById("status");
const switchBtn = document.getElementById("switchCamera");

let facingMode = "user";
let stream;

async function startCamera() {
    if (stream) {
        stream.getTracks().forEach(track => track.stop());
    }

    try {
        stream = await navigator.mediaDevices.getUserMedia({
            video: {
                facingMode: facingMode,
                width: { ideal: 1280 },
                height: { ideal: 720 }
            },
            audio: false
        });

        video.srcObject = stream;

    } catch (e) {
        alert("Kamera tidak bisa diakses.");
        console.log(e);
    }
}

switchBtn.onclick = () => {
    facingMode = facingMode === "user" ? "environment" : "user";
    startCamera();
};

startCamera();
