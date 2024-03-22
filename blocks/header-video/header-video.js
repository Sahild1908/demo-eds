export default function decorate(block){
let anchorTag = document.querySelector('.header-video .button-container a');
var video = document.createElement('video');
video.src = anchorTag.href;
video.autoplay="autoplay";
anchorTag.parentNode.replaceChild(video, anchorTag);

}