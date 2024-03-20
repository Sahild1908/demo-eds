export default function decorate(block){
var anchorTag = document.querySelector('a');
console.log("anchortag " + anchorTag );
// Create a video element
var video = document.createElement('video');
console.log("video " + video );
// Set the src attribute of the video tag to the href value of the anchor tag
video.src = anchorTag.href;

// Add additional attributes as needed, e.g., controls
video.controls = true;

// Replace the anchor tag with the video element
anchorTag.parentNode.replaceChild(video, anchorTag);
}