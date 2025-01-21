import extras from '../assets/data/extras.json';
import hands from '../assets/data/hands.json'
import foots from '../assets/data/foots.json';
import info from '../assets/data/info.json';

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
    hash = "tr";
  }
  select.value = hash;
  const data = info[hash];
  document.querySelector(".appoint__button").innerHTML = data.wpLink;
  document.querySelector(".update-date").innerHTML = data.updateMessage;
  document.querySelector(".vat").innerHTML = data.vat;
  document.querySelector(".credit-card").innerHTML = data.creditCard;
}

changeLanguage();


// Mobile Menu Handler

document.addEventListener('DOMContentLoaded', () => {
  // Store menu container
  const mobileMenu = document.getElementById('mobile-menu');
  // Store Trigger
  const mobileBtn = document.getElementById('mobile-footer-btn');
  const rotation = document.querySelector('.mobile-btn-close');

  mobileBtn.addEventListener('click', (e) => {
    e.stopPropagation();

    if (mobileMenu.classList.contains('mobile-menu-hide') || rotation.classList.contains('is-rotating')) {
      mobileMenu.classList.remove('mobile-menu-hide');
      mobileMenu.classList.add('mobile-menu-show');
      rotation.classList.remove('is-rotating');
      rotation.classList.add('is-rotating-back');
    } else {
      mobileMenu.classList.remove('mobile-menu-show');
      mobileMenu.classList.add('mobile-menu-hide');
      rotation.classList.remove('is-rotating-back');
      rotation.classList.add('is-rotating');
    }
  });
});

// Handle Prices

const createTable = (data, initialHeaders) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "<p>No data available</p>";
  }

  const headers = { ...initialHeaders };

  const tableHeaders = [headers.category, headers.oldPrice];

  let table = "<table>"; //open table tag

  table += "<thead><tr>"; //open table header tag
  tableHeaders.forEach((header) => {
    table += `<th>${header}</th>`;
  });
  table += "</tr></thead>"; //close table header tag

  table += "<tbody>"; //open table body

  data.forEach((row) => {

    table += "<tr>"; //open current table row

    const rowDataObject = row;

    for (const key in rowDataObject) {
      const value = rowDataObject[key];

      if (key === "service") {
        table += `<td><span style="font-weight: bold">${value}</span><br>`;
      } else if (key === "description") {
        table += `${value}<br>`;
      } else if (key === "extras") {
        table += `<span style="color: #AF1313">${value}</span></td>`;
      } else if (key === "oldPrice") {
        if(rowDataObject["newPrice"] !== "") {
          table += `<td><span class="old-price"><i class="icon">❌</i>${value != null && value !== "" ? value + "&#8378;" : ""}</span>`;
        }else{
          table += `<td>${value != null && value !== "" ? value + "&#8378;" : ""}`;
        }
      } else if (key === "newPrice") {
        if (value != null && value !== "") {
          table += `<span class="new-price"><i class="icon">🔥</i>${value + "&#8378;"}</span></td>`;
        } else {
          table += "</td>";
        }
      }
    }

    table += "</tr>"; //close current table row
  });

  table += "</tbody>"; //close body

  table += "</table><br>"; //close table

  return table;
};

function setPriceList(prices, headers) {
  document.querySelector(".price-list--hands").innerHTML = createTable(prices, headers);
}

(async () => {
  const languageSelector = document.querySelector(".select-language");

  const handsPrices = hands;
  const footsPrices = foots;
  const extrasPrices = extras;

  switch (languageSelector.value) {
    case "tr":
      if (handsPrices && handsPrices.tr) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.tr,
          { category: "El bakımı", oldPrice: "fiyat" }
        );
      }
      if (footsPrices && footsPrices.tr) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.tr,
          { category: "Ayak bakımı  ", oldPrice: "fiyat" }
        );
      }
      if (extrasPrices && extrasPrices.tr) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.tr,
          { category: "Ekstra Hizmetler", oldPrice: "fiyat" }
        );
      }
      break;
    case "en":
      if (handsPrices && handsPrices.en) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.en,
          { category: "Hands Care", oldPrice: "price" }
        );
      }
      if (footsPrices && footsPrices.en) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.en,
          { category: "Foot Care", oldPrice: "price" }
        );
      }
      if (extrasPrices && extrasPrices.en) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.en,
          { category: "Extra Services", oldPrice: "price" }
        );
      }
      break;
    case "ru":
      if (handsPrices && handsPrices.ru) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.ru,
          { category: "Уход за руками", oldPrice: "цена" }
        );
      }
      if (footsPrices && footsPrices.ru) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.ru,
          { category: "Уход за ногами", oldPrice: "цена" }
        );
      }
      if (extrasPrices && extrasPrices.ru) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.ru,
          { category: "Допольнительно", oldPrice: "цена" }
        );
      }
      break;
    default:
      break;
  }
})();
