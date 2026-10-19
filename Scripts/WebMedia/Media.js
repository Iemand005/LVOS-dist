
// navigator.getUserMedia =
//   navigator.getUserMedia ||
//   navigator.webkitGetUserMedia ||
//   navigator.mozGetUserMedia;

// if (navigator.getUserMedia) {
//   navigator.getUserMedia(
//     { audio: true, video: { width: 1280, height: 720 } },
//     (stream) => {
//       const video = document.querySelector("video");
//       video.srcObject = stream;
//       video.onloadedmetadata = (e) => {
//         video.play();
//       };
//     },
//     (err) => {
//       console.error(`The following error occurred: ${err.name}`);
//     },
//   );
// } else {
//   console.log("getUserMedia not supported");
// }

function Media() {
}
/**
 * @param {(stream:MediaStream)=>void} callback
 * @param {(exception:any)=>void} [onError]
 */
Media.prototype.getMicrophoneStream = function(callback, onError) {
	if (typeof onError !== "function") onError = function(ex) {
		console.error("Failed to get microphone stream", ex);
	}
	try {
		if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia)
			navigator.mediaDevices.getUserMedia({ audio: true }).then(callback).catch(onError);
		else if (navigator.getUserMedia) navigator.getUserMedia({audio: true, video: false}, callback, onError);
	} catch (error) {
		console.error("Microphone access denied or failed:", error);
	}
}

Media.prototype.getDisplayStream = function() {
	try {
		return navigator.mediaDevices.getDisplayMedia({
			video: true,
			audio: {
				echoCancellation: false,
				noiseSuppression: false
			}
		});
	} catch (error) {
		console.error("Display capture access denied or failed:", error);
	}
}