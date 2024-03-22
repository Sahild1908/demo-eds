import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const headerMeta = getMetadata('nav');
  block.textContent = '';

  // load footer fragment
  var currentPageUrl = window.location.href;


let headerPath;

if (currentPageUrl.includes('fr')) {
    headerPath = headerMeta.footer || '/fr/nav';
} else if (currentPageUrl.includes('en')) {
    console.log("The URL contains 'EN'.");
    headerPath = headerMeta.footer || '/en/nav';
}

const fragment = await loadFragment(headerPath);

  // decorate header DOM
  const header = document.createElement('div');
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  block.append(header);
 var element = document.querySelector('.language-dropdown > div:nth-child(2) > div:nth-child(2) > ul');
 element.classList.add('navigator');

 var firstLi = document.querySelector('.navigator li:first-child');
 var otherLi = document.querySelectorAll('.navigator li:not(:first-child)');

var anchorTag = firstLi.querySelector('a');
anchorTag.removeAttribute('href');
var matchingLi = null;
 for (var i = 0; i < otherLi.length; i++) {
     otherLi[i].style.display = "none";
     console.log(otherLi[i].querySelector('a').getAttribute('href'));
    let hrefUrl = otherLi[i].querySelector('a').getAttribute('href');
     if (currentPageUrl.includes(hrefUrl)){
      matchingLi = otherLi[i];
        break;
     }

 }

 if (matchingLi) {
     matchingLi.style.display = "block";
     matchingLi.parentNode.insertBefore(matchingLi, firstLi); // Move the matching li to the top
 }


 firstLi.addEventListener('click', function() {
     for (var i = 0; i < otherLi.length; i++) {
         if (otherLi[i].style.display === 'none' || otherLi[i].style.display === '') {
             otherLi[i].style.display = 'block';
         } else {
             otherLi[i].style.display = 'none';
         }
         console.log("------------------------------------ value "+ otherLi[i]);
     }
 });
}
