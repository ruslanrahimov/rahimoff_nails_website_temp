const staticElementsData = {
  updateMessage: {
    tr: "Son güncelleme: 01.08.2024",
    en: "Last update: 01.08.2024",
    ru: "Последнее обновление: 01.08.2024",
  },
  wpLink: {
    tr: "Randevu Al",
    en: "Book Now",
    ru: "Записаться",
  },
};

const languagesArray = ["tr", "en", "ru"];
const select = document.querySelector(".select-language");

select.addEventListener("change", changeURLLanguage);

function changeURLLanguage() {
  console.log("Change");
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
}

changeLanguage();
