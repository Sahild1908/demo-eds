export default function decorate(block){
const videoBanner = block.children[0];
console.log("videoBanner " + videoBanner);
const heroContent = videoBanner.children[0];
console.log("heroContent " + heroContent);
const teaserVideoLink = heroContent.querySelector('a');
console.log("teaserVideoLink " + teaserVideoLink);
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