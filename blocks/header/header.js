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
console.log("showContact button "+ showContactFormButton);
 showContactFormButton.addEventListener("click", createContactUsForm);
 console.log("after show contact button ");
 var nodemailer = require('nodemailer');

 var transporter = nodemailer.createTransport({
   service: 'gmail',
   auth: {
     user: 'palak67gupta@gmail.com',
     pass: '9459043290'
   }
 });

 var mailOptions = {
   from: 'palak67gupta@gmail.com',
   to: 'sahil.dhiman@grazitti.com',
   subject: 'Sending Email using Node.js',
   text: 'That was easy!'
 };

 transporter.sendMail(mailOptions, function(error, info){
   if (error) {
     console.log(error);
   } else {
     console.log('Email sent: ' + info.response);
   }
 });


}

function createContactUsForm() {
  // Create modal container
  const modalContainer = document.createElement("div");
  modalContainer.classList.add("modal-container");
console.log("Inside create contact us");
  // Create modal content
  const modalContent = document.createElement("div");
  modalContent.classList.add("modal-content");

  // Close button
  const closeBtn = document.createElement("span");
  closeBtn.classList.add("close-btn");
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", () => {
    modalContainer.remove(); // Close modal when close button is clicked
  });

  // Form heading
  const modalHeading = document.createElement("h2");
  modalHeading.textContent = "Contact Us";

  // Form
  const form = document.createElement("form");
  form.classList.add("contact-form");

  // Choose Department
  const departmentLabel = document.createElement("label");
  departmentLabel.textContent = "Choose your department *:";
  const departmentSelect = document.createElement("select");
  // Populate options for department
  const departmentOptions = [
    "Sales",
    "Customer Service",
    "Technical Support",
    "General Inquiry",
  ];
  departmentOptions.forEach((option) => {
    const optionElement = document.createElement("option");
    optionElement.textContent = option;
    departmentSelect.appendChild(optionElement);
  });
  departmentSelect.setAttribute("name", "department");
  departmentLabel.appendChild(departmentSelect);

  // Choose Product Type
  const productTypeLabel = document.createElement("label");
  productTypeLabel.textContent = "Choose Your Product Type *:";
  const productTypeInput = document.createElement("input");
  productTypeInput.setAttribute("type", "text");
  productTypeInput.setAttribute("name", "productType");
  productTypeLabel.appendChild(productTypeInput);

  // Country
  const countryLabel = document.createElement("label");
  countryLabel.textContent = "Country:";
  const countryInput = document.createElement("input");
  countryInput.setAttribute("type", "text");
  countryInput.setAttribute("name", "country");
  countryLabel.appendChild(countryInput);

  // Location
  const locationLabel = document.createElement("label");
  locationLabel.textContent = "Location:";
  const locationInput = document.createElement("input");
  locationInput.setAttribute("type", "text");
  locationInput.setAttribute("name", "location");
  locationLabel.appendChild(locationInput);

  // Company Name
  const companyNameLabel = document.createElement("label");
  companyNameLabel.textContent = "Company Name:";
  const companyNameInput = document.createElement("input");
  companyNameInput.setAttribute("type", "text");
  companyNameInput.setAttribute("name", "companyName");
  companyNameLabel.appendChild(companyNameInput);

  // First Name
  const firstNameLabel = document.createElement("label");
  firstNameLabel.textContent = "First Name:";
  const firstNameInput = document.createElement("input");
  firstNameInput.setAttribute("type", "text");
  firstNameInput.setAttribute("name", "firstName");
  firstNameLabel.appendChild(firstNameInput);

  // Last Name
  const lastNameLabel = document.createElement("label");
  lastNameLabel.textContent = "Last Name:";
  const lastNameInput = document.createElement("input");
  lastNameInput.setAttribute("type", "text");
  lastNameInput.setAttribute("name", "lastName");
  lastNameLabel.appendChild(lastNameInput);

  // Email
  const emailLabel = document.createElement("label");
  emailLabel.textContent = "E-mail:";
  const emailInput = document.createElement("input");
  emailInput.setAttribute("type", "email");
  emailInput.setAttribute("name", "email");
  emailLabel.appendChild(emailInput);

  // Phone Number
  const phoneLabel = document.createElement("label");
  phoneLabel.textContent = "Phone Number:";
  const phoneInput = document.createElement("input");
  phoneInput.setAttribute("type", "tel");
  phoneInput.setAttribute("name", "phone");
  phoneLabel.appendChild(phoneInput);

  // Zip/Postal code
  const zipLabel = document.createElement("label");
  zipLabel.textContent = "Zip/Postal code:";
  const zipInput = document.createElement("input");
  zipInput.setAttribute("type", "text");
  zipInput.setAttribute("name", "zip");
  zipLabel.appendChild(zipInput);

  // Comments
  const commentsLabel = document.createElement("label");
  commentsLabel.textContent = "Comments:";
  const commentsTextarea = document.createElement("textarea");
  commentsTextarea.setAttribute("name", "comments");
  commentsLabel.appendChild(commentsTextarea);

  // Terms and conditions
  const termsCheckbox = document.createElement("input");
  termsCheckbox.setAttribute("type", "checkbox");
  termsCheckbox.setAttribute("name", "terms");
  termsCheckbox.setAttribute("required", "true"); // Required field
  const termsLabel = document.createElement("label");
  termsLabel.textContent =
    "I agree to the Terms of Use and acknowledge that I have read the Privacy Policy";
  termsLabel.appendChild(termsCheckbox);

  // Submit button
  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  submitBtn.textContent = "Submit";

  // Append elements
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalHeading);
  form.appendChild(departmentLabel);
  form.appendChild(productTypeLabel);
  form.appendChild(countryLabel);
  form.appendChild(locationLabel);
  form.appendChild(companyNameLabel);
  form.appendChild(firstNameLabel);
  form.appendChild(lastNameLabel);
  form.appendChild(emailLabel);
  form.appendChild(phoneLabel);
  form.appendChild(zipLabel);
  form.appendChild(commentsLabel);
  form.appendChild(termsLabel);
  form.appendChild(submitBtn);
  modalContent.appendChild(form);
  modalContainer.appendChild(modalContent);

  // Append modal to body
  document.body.appendChild(modalContainer);
  // Set fixed height and enable overflow scrolling for modal content
  const modalHeight = 80; // Adjust this value as needed
  modalContent.style.height = modalHeight + "vh";
  modalContent.style.overflowY = "auto";
}
