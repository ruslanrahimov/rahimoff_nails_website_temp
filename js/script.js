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

  let table = "<table>"; //open table tag

  table += "<thead><tr>"; //open table header tag
  tableHeaders.forEach((header) => {
    table += `<th>${header}</th>`;
  });
  table += "</tr></thead>"; //close table header tag

  table += "<tbody>"; //open table body

  data.forEach((row) => {

    table += "<tr>"; //open current table row

    Object.values(row).forEach((value, index) => {
      if (index === 0) {
        table += `<td><span style="font-weight: bold">${value}</span><br>`;
      } else if (index === 1) {
        table += `${value}<br>`;
      }else if(index === 2) {
        table += `<span style="color: #e51414">${value}</span></td>`;
      }
      else{
        table += `<td>${value != null ? value + "&#8378;" : "-"}</td>`;
      }
    });

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
          { category: "El bakımı", price: "Fiyat" }
        );
      }
      if (footsPrices && footsPrices.tr) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.tr,
          { category: "Ayak bakımı  ", price: "Fiyat" }
        );
      }
      if (extrasPrices && extrasPrices.tr) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.tr,
          { category: "Ekstra Hizmetler", price: "Fiyat" }
        );
      }
      break;
    case "en":
      if (handsPrices && handsPrices.en) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.en,
          { category: "Hands Care", price: "Price" }
        );
      }
      if (footsPrices && footsPrices.en) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.en,
          { category: "Foot Care", price: "Price" }
        );
      }
      if (extrasPrices && extrasPrices.en) {
        document.querySelector(".price-list--extras").innerHTML = createTable(
          extrasPrices.en,
          { category: "Extra Services", price: "Price" }
        );
      }
      break;
    case "ru":
      if (handsPrices && handsPrices.ru) {
        document.querySelector(".price-list--hands").innerHTML = createTable(
          handsPrices.ru,
          { category: "Уход за руками", price: "Цена" }
        );
      }
      if (footsPrices && footsPrices.ru) {
        document.querySelector(".price-list--foots").innerHTML = createTable(
          footsPrices.ru,
          { category: "Уход за ногами", price: "Цена" }
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
