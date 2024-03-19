import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

var currentPageUrl = window.location.href;
console.log("value of url " + currentPageUrl);

// Check if the URL contains 'FR' and 'EN'
//if (currentPageUrl.includes('FR')) {
//    console.log("The URL contains both 'FR'.");
//     const footerPath = footerMeta.footer || '/FR/footer';
//} else if (currentPageUrl.includes('EN')) {
//    console.log("The URL contains both 'EN'.");
//    const footerPath = footerMeta.footer || '/EN/footer';
//}
//else {
 const footerPath = footerMeta.footer || '/footer';
//}
  // load footer fragment


  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
