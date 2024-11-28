const staticElementsData = {
  updateMessage: {
    tr: "Son fiyat güncellemesi: 01.08.2024",
    en: "Last price update: 01.08.2024",
    ru: "Последнее обновление цен: 01.08.2024",
  },
  vat: {
    tr: "Fiyatlarımıza KDV dahildir",
    en: "Prices include VAT",
    ru: "Цены включают в себя НДС",
  },
  creditCard: {
    tr: "Kredi kartı geçerlidir ve ekstra ücret yok!",
    en: "Accepting credit card payments and no extra charges!",
    ru: "Принимаем оплатну кредитной картой. Дополнительная плата не взимается!",
  },
  wpLink: {
    tr: "Randevu Al",
    en: "Book Now",
    ru: "Записаться",
  },
  footerPointLinkName: {
    tr: "Konum",
    en: "Location",
    ru: "Локация",
  },
  footerWpLinkName:{
    tr: "Randevu",
    en: "Book Now",
    ru: "Запись",
  }
};

const languagesArray = ["tr", "en", "ru"];
const select = document.querySelector(".select-language");

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage() {
  let lang = select.value;
  location.href = `${location.pathname}#${lang}`;
  location.reload();
}

function changeLanguage() {
  let hash = window.location.hash;
  hash = hash.substring(1);
  if (!languagesArray.includes(hash)) {
    location.href = location.pathname + "#tr";
    location.reload();
  }
  select.value = hash;
  document.querySelector(".appoint__button").innerHTML =
    staticElementsData["wpLink"][hash];
  document.querySelector(".update-date").innerHTML =
    staticElementsData["updateMessage"][hash];
  document.querySelector(".vat").innerHTML = staticElementsData["vat"][hash];
  document.querySelector(".credit-card").innerHTML =
    staticElementsData["creditCard"][hash];

  const locationLinksName = document.querySelectorAll(".location");
  locationLinksName.forEach(locationLinkName => {
    locationLinkName.innerHTML = staticElementsData["footerPointLinkName"][hash];
  })

  const wpLinksName = document.querySelectorAll(".booking");
  wpLinksName.forEach(wpLinkName => {
    wpLinkName.innerHTML = staticElementsData["footerWpLinkName"][hash];
  })
}

changeLanguage();
