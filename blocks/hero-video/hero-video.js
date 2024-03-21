export default function decorate(block){
const videoBanner = block.children[0];
const heroContent = videoBanner.children[0];
const teaserVideoLink = heroContent.querySelector('a');
//const teaserVideoLink = heroContent.getElementsByTagName('a');

console.log("Teaser Video Link "+ teaserVideoLink, {block, heroContent});


// Create a video element
/*var video = document.createElement('video');
//// Set the src attribute of the video tag to the href value of the anchor tag
video.src = teaserVideoLink.href;
//
//// Add additional attributes as needed, e.g., controls
video.controls = true;
//
//// Replace the anchor tag with the video element
teaserVideoLink.parentNode.replaceChild(video, teaserVideoLink);
console.log("Latest Value "+ teaserVideoLink);*/

}