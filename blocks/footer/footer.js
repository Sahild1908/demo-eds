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
  debugger;

  if (currentPageUrl.includes('FR')) {
      console.log("The URL contains both 'FR'.");
       const footerPath = footerMeta.footer || '/FR/footer';
  } else if (currentPageUrl.includes('EN')) {
      console.log("The URL contains both 'EN'.");
      const footerPath = footerMeta.footer || '/EN/footer';
      console.log("value of footerpath "+ footerPath)
  }
  else{
  const footerPath = footerMeta.footer || '/footer';
  }

  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
