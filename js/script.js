const getPrices = (fileName) => async () => {
  try {
    const response = await fetch(`../data/${fileName}.json`);
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error(`Error fetching ${fileName}:`, error);
    return null;
  }
};

const createTable = (data, initialHeaders) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "<p>No data available</p>";
  }

  const headers = { ...initialHeaders };

  const tableHeaders = [headers.category, headers.price];

  let table = "<table>";

  table += "<thead><tr>";
  tableHeaders.forEach((header) => {
    table += `<th>${header}</th>`;
  });
  table += "</tr></thead>";

  table += "<tbody>";
  data.forEach((row) => {
    table += "<tr>";
    Object.values(row).forEach((value, index) => {
      if (index === 0) {
        table += `<td>${value}</td>`;
      } else {
        table += `<td>${value != null ? value + "&#8378;" : "-"}</td>`;
      }
    });
    table += "</tr>";
  });
  table += "</tbody>";

  table += "</table><br>";

  return table;
};

function setPriceList(prices, headers) {
  const handsPriceList = createTable(prices, headers);
  document.querySelector(".price-list--hands").innerHTML = handsPriceList;
}

(async () => {
  const languageSelector = document.querySelector(".select-language");

  const getHandsPrices = getPrices("hands");
  const getFootsPrices = getPrices("foots");
  const getExtrasPrices = getPrices("extras");

  const handsPrices = await getHandsPrices();
  const footsPrices = await getFootsPrices();
  const extrasPrices = await getExtrasPrices();

  switch (languageSelector.value) {
    case "tr":
      if (handsPrices && handsPrices.tr) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.tr,
          { category: "El", price: "Fiyat" }
        );
      }
      if (footsPrices && footsPrices.tr) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.tr,
          { category: "Ayak", price: "Fiyat" }
        );
      }
      if (extrasPrices && extrasPrices.tr) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.tr,
          { category: "Ekstralar", price: "Fiyat" }
        );
      }
      break;
    case "en":
      if (handsPrices && handsPrices.en) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.en,
          { category: "Manicure", price: "Price" }
        );
      }
      if (footsPrices && footsPrices.en) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.en,
          { category: "Pedicure", price: "Price" }
        );
      }
      if (extrasPrices && extrasPrices.en) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.en,
          { category: "Extras", price: "Price" }
        );
      }
      break;
    case "ru":
      if (handsPrices && handsPrices.ru) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.ru,
          { category: "Маникюр", price: "Цена" }
        );
      }
      if (footsPrices && footsPrices.ru) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.ru,
          { category: "Педикюр", price: "Цена" }
        );
      }
      if (extrasPrices && extrasPrices.ru) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.ru,
          { category: "Допольнительно", price: "Цена" }
        );
      }
      break;
    default:
      break;
  }
})();
