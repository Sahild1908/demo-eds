import { getMetadata } from '../../scripts/aem.js';
import { loadFragment } from '../fragment/fragment.js';
//import { SMTPClient } from '../../node_modules/emailjs/email.js';

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
       headerPath = headerMeta.footer || '/en/nav';
}
else if(currentPageUrl.includes('es')){
  headerPath = headerMeta.footer || '/en/es';
}

const fragment = await loadFragment(headerPath);

  // decorate header DOM
  const header = document.createElement('div');
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  block.append(header);
 var element = document.querySelector('.language-dropdown > div:nth-child(2) > div:nth-child(2) > ul');
 element.classList.add('navigator');
 var allLi = document.querySelectorAll('.navigator li');
 var matchingLi = null;
 for (var i = 0; i < allLi.length; i++) {
  let hrefUrl = allLi[i].querySelector('a').getAttribute('href');
      if (currentPageUrl.includes(hrefUrl)){
       matchingLi = allLi[i];
         break;
      }
 }
 if (matchingLi) {
     var firstLi = document.querySelector('.navigator li:first-child');
     var parentElement = firstLi.parentNode;

     parentElement.insertBefore(matchingLi, firstLi); // Move the matching li to the top
 }


 var firstLi = document.querySelector('.navigator li:first-child');
 var otherLi = document.querySelectorAll('.navigator li:not(:first-child)');

var anchorTag = firstLi.querySelector('a');
anchorTag.removeAttribute('href');
var matchingLi = null;
 for (var i = 0; i < otherLi.length; i++) {
     otherLi[i].style.display = "none";


 }


 for (var i = 0; i < otherLi.length; i++) {
      otherLi[i].style.display = "none";
      }


 firstLi.addEventListener('click', function() {
     for (var i = 0; i < otherLi.length; i++) {
         if (otherLi[i].style.display === 'none' || otherLi[i].style.display === '') {
             otherLi[i].style.display = 'block';
         } else {
             otherLi[i].style.display = 'none';
         }

     }
 });
 let showContactFormButton = document.querySelector('.language-dropdown > div:nth-child(1) > div:nth-child(2) > ul li:last-child');
 showContactFormButton.addEventListener("click", createContactUsForm);

}
function sendEmail() {
     var userId = "mCvtaVuC9TqMOTdhp"; // Update with your actual User ID
     emailjs.init(userId);

     var theName = "Sahil Dhiman";
    /* var theMail = "sahil.dhiman@grazitti.com";*/
     var theMail = document.querySelector('.contact-form input[type="email"]').value;

     /*var theMsg = "This is a Demo Email";*/
     var theMsg = document.querySelector('.contact-form textarea[name="comments"]').value;

     var contactDetails = {
         from_name: theName,
         to_email: theMail,
         message: theMsg,
         from_email: "parkash.singh@grazitti.com"
     };

     emailjs.send('service_5qy284e', 'template_edxy78y', contactDetails)
         .then(function (response) {
             alert("Email Sent Successfully");
         })
         .catch(function (error) {
             alert("Error Occurred: " + error);
         });
 }

function createContactUsForm() {
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");

  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modalContainer.remove();
  });

  const modalHeading = document.createElement("h2");
  modalHeading.textContent = "Contact Us";

  const form = document.createElement("form");
  form.classList.add("contact-form");

  const elements = [
    { label: "Choose your department *:", type: "select", options: ["Sales", "Customer Service", "Technical Support", "General Inquiry"], name: "department" },
    { label: "Choose Your Product Type *:", type: "input", inputType: "text", name: "productType" },
    { label: "Country:", type: "input", inputType: "text", name: "country" },
    { label: "Location:", type: "input", inputType: "text", name: "location" },
    { label: "Company Name:", type: "input", inputType: "text", name: "companyName" },
    { label: "First Name:", type: "input", inputType: "text", name: "firstName" },
    { label: "Last Name:", type: "input", inputType: "text", name: "lastName" },
    { label: "E-mail:", type: "input", inputType: "email", name: "email" },
    { label: "Phone Number:", type: "input", inputType: "tel", name: "phone" },
    { label: "Zip/Postal code:", type: "input", inputType: "text", name: "zip" },
    { label: "Comments:", type: "textarea", name: "comments" }
  ];

  elements.forEach(element => {
    const label = document.createElement("label");
    label.textContent = element.label;

    if (element.type === "select") {
      const select = document.createElement("select");
      select.setAttribute("name", element.name);
      element.options.forEach(option => {
        const optionElement = document.createElement("option");
        optionElement.textContent = option;
        select.appendChild(optionElement);
      });
      label.appendChild(select);
    } else {
      const input = document.createElement("input");
      input.setAttribute("type", element.inputType);
      input.setAttribute("name", element.name);
      label.appendChild(input);
    }

    form.appendChild(label);
  });

  const termsCheckbox = document.createElement("input");
  termsCheckbox.setAttribute("type", "checkbox");
  termsCheckbox.setAttribute("name", "terms");
  termsCheckbox.setAttribute("required", "true");

  const termsLabel = document.createElement("label");
  termsLabel.innerHTML = "I agree to the Terms of Use and acknowledge that I have read the Privacy Policy";
  termsLabel.appendChild(termsCheckbox);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";

  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalHeading);
  form.appendChild(termsLabel);
  form.appendChild(submitBtn);
  modalContent.appendChild(form);
  modalContainer.appendChild(modalContent);

  document.body.appendChild(modalContainer);

  const modalHeight = 80;
  modalContent.style.height = modalHeight + "vh";
  modalContent.style.overflowY = "auto";

  let submitButton = document.querySelector('.contact-form button');

  if (submitButton) {
    submitButton.addEventListener("click", sendEmail);
  } else {
    console.error('Submit button not found.');
  }
}
