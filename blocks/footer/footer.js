import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const footerMeta = getMetadata('footer');
  block.textContent = '';

  // load footer fragment
  var currentPageUrl = window.location.href;


let footerPath;

if (currentPageUrl.includes('fr')) {
    console.log("The URL contains 'FR'.");
    footerPath = footerMeta.footer || '/fr/footer';
} else if (currentPageUrl.includes('en')) {
    console.log("The URL contains 'EN'.");
    footerPath = footerMeta.footer || '/en/footer';
    console.log("Value of footerpath: " + footerPath);
}

const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
