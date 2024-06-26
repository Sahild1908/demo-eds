import { getMetadata } from "../../scripts/aem.js";
import { loadFragment } from "../fragment/fragment.js";

/**
 * loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const headerMeta = getMetadata("nav");
  block.textContent = "";
  debugger;
  var currentPageUrl = window.location.href;
  let headerPath;
  const languageToPath = {
    fr: "/fr/nav",
    en: "/en/nav",
    es: "/es/nav",
    ja: "/ja/nav",
    zh: "/zh/nav",
    de: "/de/nav",
    it: "/it/nav",
    pt: "/pt/nav",
    ru: "/ru/nav",
    ko: "ko/nav",
  };
  const pathParts = new URL(currentPageUrl).pathname
    .split("/")
    .filter((part) => part !== ""); // Get path parts and remove empty parts
  const desiredPart = pathParts[0]; // Get the second part of the path, which is "it"

  console.log("desiredpat is " + desiredPart);

  for (let languageCode in languageToPath) {
    if (desiredPart === languageCode) {
      headerPath = languageToPath[languageCode];
      break;
    }
  }
  console.log("HeaderPath is " + headerPath);
  const fragment = await loadFragment(headerPath);

  // decorate header DOM
  const header = document.createElement("div");
  while (fragment.firstElementChild) header.append(fragment.firstElementChild);

  block.append(header);
  var element = document.querySelector(
    ".language-dropdown > div:nth-child(2) > div:nth-child(2) > ul"
  );
  element.classList.add("navigator");
  var allLi = document.querySelectorAll(".navigator li");
  var matchingLi = null;
  for (var i = 0; i < allLi.length; i++) {
    let hrefUrl = allLi[i].querySelector("a").getAttribute("href");
    if (currentPageUrl.includes(hrefUrl)) {
      matchingLi = allLi[i];
      break;
    }
  }
  if (matchingLi) {
    var firstLi = document.querySelector(".navigator li:first-child");
    var parentElement = firstLi.parentNode;

    parentElement.insertBefore(matchingLi, firstLi); // Move the matching li to the top
  }

  var firstLi = document.querySelector(".navigator li:first-child");
  var otherLi = document.querySelectorAll(".navigator li:not(:first-child)");

  var anchorTag = firstLi.querySelector("a");
  anchorTag.removeAttribute("href");
  var matchingLi = null;
  for (var i = 0; i < otherLi.length; i++) {
    otherLi[i].style.display = "none";
  }

  for (var i = 0; i < otherLi.length; i++) {
    otherLi[i].style.display = "none";
  }

  firstLi.addEventListener("click", function () {
    for (var i = 0; i < otherLi.length; i++) {
      if (
        otherLi[i].style.display === "none" ||
        otherLi[i].style.display === ""
      ) {
        otherLi[i].style.display = "block";
      } else {
        otherLi[i].style.display = "none";
      }
    }
  });
  var newLi = document.querySelectorAll(".navigator li:not(:first-child) a");
  newLi.forEach(function(a) {
      a.setAttribute('href', a.getAttribute('href') + pathParts.slice(1).join('/'));
  });

  let showContactFormButton = document.querySelector(
    ".language-dropdown > div:nth-child(1) > div:nth-child(2) > ul li:last-child"
  );
  showContactFormButton.addEventListener("click", createContactUsForm);
}
function sendEmail() {
  var userId = "mCvtaVuC9TqMOTdhp"; // Update with your actual User ID
  emailjs.init(userId);

  var theName = "Sahil Dhiman";

  var theMsg = document.querySelector('.contact-form [name="comments"]').value;
  var theMail = document.querySelector('.contact-form [name="email"]').value;

  var contactDetails = {
    from_name: theName,
    to_email: theMail,
    message: theMsg,
    from_email: "parkash.singh@grazitti.com",
  };

  emailjs
    .send("service_5qy284e", "template_edxy78y", contactDetails)
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
  // modalHeading.textContent = "Contact Us";
  var currentPageUrl = window.location.href;
  const pathParts = new URL(currentPageUrl).pathname
    .split("/")
    .filter((part) => part !== ""); // Get path parts and remove empty parts
  const desiredPart = pathParts[0]; // Get the second part of the path, which is "it"
  const languageHeadings = {
    en: "Contact Us",
    fr: "Pour nous contacter",
    ja: "メールでのお問い合わせ",
    zh: "联系我们",
    de: "Kontakt",
    it: "Contatti",
    pt: "Fale conosco",
    ru: "Обратная связь",
    ko: "문의하기",
    es: "",
  };
  console.log("languageHeadings " + languageHeadings[desiredPart]);
  modalHeading.textContent = languageHeadings[desiredPart];

  const form = document.createElement("form");
  form.classList.add("contact-form");

  const elements = [
    {
      label: "Choose your Department *",
      type: "select",
      options: ["---", "Sales", "Service"],
      name: "department",
    },
    {
      label: "Choose Your Product Type *:",
      type: "select",
      options: [
        "---",
        "Automated NDT Systems",
        "Flaw Detection and Thickness Gauging",
        "Industrial Microscopes",
        "Life Science Microscopes",
        "OEM Microscope Components",
        "Videoscopes",
        "XRF Analyzers",
      ],
      name: "productType",
    },
    { label: "Country:", type: "input", inputType: "text", name: "country" },
    { label: "Location:", type: "input", inputType: "text", name: "location" },
    {
      label: "Company Name:",
      type: "input",
      inputType: "text",
      name: "companyName",
    },
    {
      label: "First Name:",
      type: "input",
      inputType: "text",
      name: "firstName",
    },
    { label: "Last Name:", type: "input", inputType: "text", name: "lastName" },
    {
      label: "E-mail:",
      type: "input",
      inputType: "email",
      name: "email",
      required: true,
    },
    { label: "Phone Number:", type: "input", inputType: "tel", name: "phone" },
    {
      label: "Zip/Postal code:",
      type: "input",
      inputType: "text",
      name: "zip",
    },
    { label: "Comments:", type: "textarea", name: "comments", required: true },
  ];
  const languageLabels = {
    en: {
      "Choose your Department *": "Choose your Department *",
      "Choose Your Product Type *:": "Choose Your Product Type *:",
      "Country:": "Country:",
      "Location:": "Location:",
      "Company Name:": "Company Name:",
      "First Name:": "First Name:",
      "Last Name:": "Last Name:",
      "E-mail:": "E-mail:",
      "Phone Number:": "Phone Number:",
      "Zip/Postal code:": "Zip/Postal code:",
      "Comments:": "Comments:",
      "---": "---",
      "Service": "Service",
      "Sales": "Sales",
      "Automated NDT Systems": "Automated NDT Systems",
      "Flaw Detection and Thickness Gauging":
        "Flaw Detection and Thickness Gauging",
      "Industrial Microscopes": "Industrial Microscopes",
      "Life Science Microscopes": "Life Science Microscopes",
      "OEM Microscope Components": "OEM Microscope Components",
      "Videoscopes": "Videoscopes",
      "XRF Analyzers": "XRF Analyzers",
    },
    fr: {
      "Choose your Department *": "Choisissez votre service *",
      "Choose Your Product Type *:": "Choisissez votre type de produit *",
      "Country:": "Emplacement:",
      "Location:": "Location:",
      "Company Name:": "Nom de votre entreprise :",
      "First Name:": "Prénom :",
      "Last Name:": "Nom :",
      "E-mail:": "Adresse électronique :",
      "Phone Number:": "Téléphone :",
      "Zip/Postal code:": "Code postal :",
      "Comments:": "Commentaires:",
      "---":"---",
      "Service": "Service",
      "Sales": "Sales",
      "Automated NDT Systems": "Systèmes de CND automatisés",
      "Flaw Detection and Thickness Gauging":
        "Recherche de défauts et mesure d’épaisseur",
      "Industrial Microscopes": "Microscopes industriels",
      "Life Science Microscopes": "Microscopes pour les sciences de la vie",
      "OEM Microscope Components": "Composants de microscope FEO",
      "Videoscopes": "Vidéoscopes",
      "XRF Analyzers": "Analyseurs XRF",
    },
    ja: {
      "Choose your Department *": "部門をお選びください *",
      "Choose Your Product Type *:": "対象製品をお選びください。 *",
      "Country:": "対象製品をお選びください。:",
      "Location:": "Location:",
      "Company Name:": "会社名 :",
      "First Name:": "フリガナ氏名 :",
      "Last Name:": "漢字氏名 :",
      "E-mail:": "Eメール :",
      "Phone Number:": "電話番号 :",
      "Zip/Postal code:": "郵便番号 :",
      "Comments:": "ご意見･ご要望:",
      "---":"---",
            "Service": "サービス/修理",
            "Sales": "販売",
            "Automated NDT Systems": "自動NDTシステム",
            "Flaw Detection and Thickness Gauging":
              "探傷器および厚さ計測機",
            "Industrial Microscopes": "工業用顕微鏡",
            "Life Science Microscopes": "ライフサイエンス顕微鏡",
            "OEM Microscope Components": "OEM顕微鏡部品",
            "Videoscopes": "ビデオスコープ",
            "XRF Analyzers": "蛍光X線分析計（XRF）",
    },
    es: {
      "Choose your Department *": "Seleccione su departamento *",
      "Choose Your Product Type *:": "Escoger tipo de producto *",
      "Country:": "Lugar :",
      "Location:": "Location:",
      "Company Name:": "Nombre de la compañía :",
      "First Name:": "Nombre :",
      "Last Name:": "Apellido :",
      "E-mail:": "Correo electrónico :",
      "Phone Number:": "Teléfono :",
      "Zip/Postal code:": "Código postal :",
      "Comments:": "Comentarios:",
      "---":"---",
                  "Service": "Service",
                  "Sales": "Sales",
                  "Automated NDT Systems": "Sistemas automatizados de NDT",
                  "Flaw Detection and Thickness Gauging":
                    "Detección de defectos y medición de espesores",
                  "Industrial Microscopes": "Microscopios industriales",
                  "Life Science Microscopes": "Microscopios Life Science",
                  "OEM Microscope Components": "Componentes de microscopio OEM",
                  "Videoscopes": "Videoscopios",
                  "XRF Analyzers": "Analizadores XRF",
    },
    zh: {
      "Choose your Department *": "选择您的部门 *",
      "Choose Your Product Type *:": "选择你的产品类型 *",
      "Country:": "工作地 :",
      "Location:": "Location:",
      "Company Name:": "公司名称 :",
      "First Name:": "名 :",
      "Last Name:": "姓 :",
      "E-mail:": "电子邮件地址 :",
      "Phone Number:": "电话 :",
      "Zip/Postal code:": "邮政编码 :",
      "Comments:": "注释:",
      "---":"---",
                  "Service": "服务/维修",
                  "Sales": "销售",
                  "Automated NDT Systems": "自动化无损检测（NDT）系统",
                  "Flaw Detection and Thickness Gauging":
                    "缺陷探测和厚度测量",
                  "Industrial Microscopes": "工业显微镜",
                  "Life Science Microscopes": "生命科学显微镜",
                  "OEM Microscope Components": "OEM显微镜部件",
                  "Videoscopes": "视频内窥镜",
                  "XRF Analyzers": "XRF分析仪",
    },
    it: {
      "Choose your Department *": "Scegli il dipartimento *",
      "Choose Your Product Type *:": "Choose Your Product Type *",
      "Country:": "Luogo:",
      "Location:": "Location:",
      "Company Name:": "Nome società :",
      "First Name:": "Nome :",
      "Last Name:": "Cognome :",
      "E-mail:": "Indirizzo e-mail :",
      "Phone Number:": "Telefono :",
      "Zip/Postal code:": "CAP :",
      "Comments:": "Note:",
      "---":"---",
                        "Service": "Service",
                        "Sales": "Sales",
                        "Automated NDT Systems": "Sistemi NDT automatizzati",
                        "Flaw Detection and Thickness Gauging":
                          "Rilevamento di difetti e misura di spessori",
                        "Industrial Microscopes": "Microscopi industriali",
                        "Life Science Microscopes": "Microscopi per le scienze della vita",
                        "OEM Microscope Components": "Componenti dei microscopi OEM",
                        "Videoscopes": "Videoscopi",
                        "XRF Analyzers": "Analizzatori XRF",
    },
    de: {
      "Choose your Department *": "Abteilung auswählen *",
      "Choose Your Product Type *:": "Produktart auswählen *",
      "Country:": "Arbeitsort:",
      "Location:": "Location:",
      "Company Name:": "Firmenname :",
      "First Name:": "Vorname :",
      "Last Name:": "Nachname :",
      "E-mail:": "E-Mail-Adresse :",
      "Phone Number:": "Telefon :",
      "Zip/Postal code:": "Postleitzahl :",
      "Comments:": "Kommentare:",
      "---":"---",
                              "Service": "Service",
                              "Sales": "Sales",
                              "Automated NDT Systems": "Automatisierte ZfP-Systeme",
                              "Flaw Detection and Thickness Gauging":
                                "Fehlererkennung und Dickenmessung",
                              "Industrial Microscopes": "Mikroskope für industrielle Anwendungen",
                              "Life Science Microscopes": "Mikroskope für biowissenschaftliche Anwendungen",
                              "OEM Microscope Components": "OEM-Komponenten für Mikroskope",
                              "Videoscopes": "Videoskope",
                              "XRF Analyzers": "RFA-Analysatoren",
    },
    ru: {
      "Choose your Department *": "Выберите отдел *",
      "Choose Your Product Type *:": "Choose Your Product Type *",
      "Country:": "Местоположение:",
      "Location:": "Location:",
      "Company Name:": "Название компании :",
      "First Name:": "Имя :",
      "Last Name:": "Фамилия :",
      "E-mail:": "е-мейл :",
      "Phone Number:": "Телефон :",
      "Zip/Postal code:": "Индекс :",
      "Comments:": "Комментарии:",
      "---":"---",
                                    "Service": "Service",
                                    "Sales": "Sales",
                                    "Automated NDT Systems": "Автоматизированные системы НК",
                                    "Flaw Detection and Thickness Gauging":
                                      "Дефектоскопия и толщинометрия",
                                    "Industrial Microscopes": "Промышленные микроскопы",
                                    "Life Science Microscopes": "Биологические микроскопы",
                                    "OEM Microscope Components": "Компоненты микроскопов OEM",
                                    "Videoscopes": "Видеоэндоскопы",
                                    "XRF Analyzers": "РФ-анализаторы (XRF)",
    },
    ko: {
      "Choose your Department *": "부서 선택 *",
      "Choose Your Product Type *:": "제품 타입을 선택하세요. *",
      "Country:": "지역:",
      "Location:": "Location:",
      "Company Name:": "회사명 :",
      "First Name:": "이름 :",
      "Last Name:": "성 :",
      "E-mail:": "이메일 :",
      "Phone Number:": "전화번호 :",
      "Zip/Postal code:": "우편번호 :",
      "Comments:": "문의사항:",
      "---":"---",
                                          "Service": "서비스/수리",
                                          "Sales": "영업",
                                          "Automated NDT Systems": "자동화된 NDT 시스템",
                                          "Flaw Detection and Thickness Gauging":
                                            "결함 감지 및 두께 측정",
                                          "Industrial Microscopes": "산업 현미경",
                                          "Life Science Microscopes": "생명과학 분야 현미경",
                                          "OEM Microscope Components": "OEM 현미경 구성 요소",
                                          "Videoscopes": "비디오스코프",
                                          "XRF Analyzers": "XRF 분석기",
    },
    pt: {
      "Choose your Department *": "Escolha seu departamento *",
      "Choose Your Product Type *:": "Escolha o seu tipo de produto *",
      "Country:": "Localização:",
      "Location:": "Location:",
      "Company Name:": "Nome da Empresa :",
      "First Name:": "Nome :",
      "Last Name:": "Sobrenome :",
      "E-mail:": "E-mail :",
      "Phone Number:": "Número de Telefone :",
      "Zip/Postal code:": "Código Postal :",
      "Comments:": "Comentários:",
      "---":"---",
                                          "Service": "Service",
                                          "Sales": "Sales",
                                          "Automated NDT Systems": "Sistemas automatizados de END",
                                          "Flaw Detection and Thickness Gauging":
                                            "Detecção de defeitos e medição de espessura",
                                          "Industrial Microscopes": "Microscópios industriais",
                                          "Life Science Microscopes": "Microscópios para ciências da vida",
                                          "OEM Microscope Components": "Componentes de microscópio do fabricante do equipamento original",
                                          "Videoscopes": "Videoscópios",
                                          "XRF Analyzers": "Analisadores por fluorescência de raios X",
    },
  };

  elements.forEach((element) => {
    const label = document.createElement("label");
    label.textContent = languageLabels[desiredPart][element.label]; // Access the correct label translation

    if (element.type === "select") {
      const select = document.createElement("select");
      select.setAttribute("name", element.name);
      element.options.forEach((option) => {
        const optionElement = document.createElement("option");
        // optionElement.textContent = option;
        optionElement.textContent = languageLabels[desiredPart][option];
        select.appendChild(optionElement);
      });
      label.appendChild(select);
    } else {
      const input = document.createElement("input");
      input.setAttribute("type", element.inputType);
      input.setAttribute("name", element.name);
      if (element.required) {
        input.setAttribute("required", "true");
      }
      label.appendChild(input);
    }

    form.appendChild(label);
  });

  const termsCheckbox = document.createElement("input");
  termsCheckbox.setAttribute("type", "checkbox");
  termsCheckbox.setAttribute("name", "terms");
  termsCheckbox.setAttribute("required", "true");

  const termsLabel = document.createElement("label");
  const languageText = {
    en: "I agree to the Terms of Use and acknowledge that I have read the Privacy Policy",
    fr: "J'accepte les conditions d'utilisation et reconnais avoir lu la politique de confidentialité",
    ja: "利用規約に同意し、プライバシーポリシーを読んだことを認めます",
    zh: "我同意使用条款并确认我已阅读隐私政策",
    de: "Ich stimme den Nutzungsbedingungen zu und bestätige, dass ich die Datenschutzrichtlinie gelesen habe",
    it: "Accetto i Termini di Utilizzo e riconosco di aver letto l'Informativa sulla Privacy",
    pt: "Concordo com os Termos de Uso e reconheço que li a Política de Privacidade",
    ru: "Настоящим подтверждаю, что я ознакомлен и согласен с условиями ",
  };
  termsLabel.innerHTML = languageText[desiredPart];
  termsLabel.appendChild(termsCheckbox);

  const submitBtn = document.createElement("button");
  submitBtn.setAttribute("type", "submit");
  const languageSubmitText = {
    en: "Submit",
    fr: "Soumettre",
    ja: "提出する",
    zh: "提交",
    de: "Absenden",
    it: "Invia",
    pt: "Enviar",
    ko: "제출",
    ru: "Отправить",
    es: "Enviar",
  };

  submitBtn.textContent = languageSubmitText[desiredPart];

  form.appendChild(termsLabel);
  form.appendChild(submitBtn);
  modalContent.appendChild(closeBtn);
  modalContent.appendChild(modalHeading);
  modalContent.appendChild(form);
  modalContainer.appendChild(modalContent);

  document.body.appendChild(modalContainer);

  const modalHeight = 80;
  modalContent.style.height = modalHeight + "vh";
  modalContent.style.overflowY = "auto";

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent default form submission

    // Validate checkbox and email before calling sendEmail
    if (!termsCheckbox.checked) {
      alert("Please agree to the Terms of Use.");
      return;
    }

    const emailInput = document.querySelector('.contact-form [name="email"]');
    const commentsInput = document.querySelector(
      '.contact-form [name="comments"]'
    );

    if (!emailInput.value || !commentsInput.value) {
      alert("Please fill in both email and comments.");
      return;
    }

    sendEmail();
  });
}
