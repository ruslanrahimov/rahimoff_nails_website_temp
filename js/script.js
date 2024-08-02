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

const createTable = (data, tableType) => {
  if (!Array.isArray(data) || data.length === 0) {
    return "<p>No data available</p>";
  }

  //  const MASTER = "Uzman";
  const TOP_MASTER = "Fiyat";

  const tableHeaders = [tableType, TOP_MASTER];

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

(async () => {
  const getHandsPrices = getPrices("hands");
  const getFootsPrices = getPrices("foots");
  const getExtrasPrices = getPrices("extras");

  const handsPrices = await getHandsPrices();
  const footsPrices = await getFootsPrices();
  const extrasPrices = await getExtrasPrices();

  if (handsPrices && handsPrices.data) {
    const handsPriceList = createTable(handsPrices.data, "El");
    document.querySelector(".price-list--hands").innerHTML = handsPriceList;
  }

  if (footsPrices && footsPrices.data) {
    const footsPriceList = createTable(footsPrices.data, "Ayak");
    document.querySelector(".price-list--foots").innerHTML = footsPriceList;
  }

  if (extrasPrices && extrasPrices.data) {
    const extrasPriceList = createTable(extrasPrices.data, "Ekstra");
    document.querySelector(".price-list--extras").innerHTML = extrasPriceList;
  }
})();
