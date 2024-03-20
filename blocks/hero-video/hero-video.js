export default function decorate(block){
const videoBanner = block.children[0];
const heroContent = videoBanner.children[0];
const teaserVideoLink = heroContent.querySelector('a');

// Create a video element
var video = document.createElement('video');
// Set the src attribute of the video tag to the href value of the anchor tag
video.src = teaserVideoLink;
video.poster="https://www.evidentscientific.com/data/Media/home-brand.jpg?rev=FBD0";
// Add additional attributes as needed, e.g., controls
video.controls = true;
video.preload= none;

// Replace the anchor tag with the video element
//teaserVideoLink.parentNode.replaceChild(video, teaserVideoLink);
teaserVideoLink.appendChild(video);
}