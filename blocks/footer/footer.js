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
  let footerPath;
  const languageToPath = {
      'fr': '/fr/footer',
      'en': '/en/footer',
      'es': '/es/footer',
      'ja': '/ja/footer',
      'zh': '/zh/footer',
      'de': '/de/footer',
      'it': '/it/footer',
      'pt': '/pt/footer',
      'ru': '/ru/footer'
  };

  for (let languageCode in languageToPath) {
      if (currentPageUrl.includes(languageCode)) {
          footerPath = footerMeta.footer || languageToPath[languageCode];
          break;
      }
  }

  const fragment = await loadFragment(footerPath);

  // decorate footer DOM
  const footer = document.createElement('div');
  while (fragment.firstElementChild) footer.append(fragment.firstElementChild);

  block.append(footer);
}
