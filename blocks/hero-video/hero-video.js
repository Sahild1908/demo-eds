export default function decorate(block){
const videoBanner = block.children[0];
const heroContent = videoBanner.children[0];
const teaserVideoLink = heroContent.querySelector('a');
//const teaserVideoLink = heroContent.getElementsByTagName('a');

console.log("Teaser Video Link "+ teaserVideoLink, {block, heroContent});


// Create a video element
var video = document.createElement('video');
//// Set the src attribute of the video tag to the href value of the anchor tag
video.src = teaserVideoLink;
video.poster="https://evidentscientific.com/data/Media/home-brand.jpg?rev=FBD0";
video.preload="none";
//
//// Add additional attributes as needed, e.g., controls
video.controls = true;
//
//// Replace the anchor tag with the video element
teaserVideoLink.parentNode.replaceChild(video, teaserVideoLink);
console.log("Latest Value "+ teaserVideoLink);
console.log('video - ', video);
let videoBox = document.querySelector('.hero-video div:nth-child(2)')
console.log('videoBox - ', videoBox);
video.addEventListener('play', function() {
    // Remove the image element when the video starts playing
//    videoBox.remove();
videoBox.style.display = "none";
});
video.addEventListener('pause', function() {
videoBox.style.display = "block";
});

}