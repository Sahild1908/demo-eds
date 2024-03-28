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
    footerPath = footerMeta.footer || '/fr/footer';
} else if (currentPageUrl.includes('en')) {
    footerPath = footerMeta.footer || '/en/footer';
}
else if (currentPageUrl.includes('es')) {
    footerPath = footerMeta.footer || '/es/footer';
}
else if (currentPageUrl.includes('ja')) {
    footerPath = footerMeta.footer || '/ja/footer';
}
else if (currentPageUrl.includes('zh')) {
    footerPath = footerMeta.footer || '/zh/footer';
}else if (currentPageUrl.includes('de')) {
     footerPath = footerMeta.footer || '/de/footer';
 }
 else if (currentPageUrl.includes('it')) {
      footerPath = footerMeta.footer || '/it/footer';
  }
  else if (currentPageUrl.includes('pt')) {
       footerPath = footerMeta.footer || '/pt/footer';
   }
   else if (currentPageUrl.includes('ru')) {
        footerPath = footerMeta.footer || '/ru/footer';
    }


const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
