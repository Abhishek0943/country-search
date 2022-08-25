

const tBody = document.querySelector("#tbody");
const countryList = async function (url) {
  const response = await fetch(url);
  const data = await response.json();
  const newData = data.map(myFun);
  function myFun(country, index) {
    return `<tr>
        <td>${index + 1}</td>
        <td>
        <div class = "country">
         <div class = "img"><img class = "flag" src="${
           country.flags.svg
         }"/> </div>
          <div>${country.name.common}</div>
        </div>
        </td>
        <td>${country.capital[0] || "-"}</td>
        <td>${
          Object.entries(country.currencies)[0]
            ? Object.entries(country.currencies)[0][1].name
            : "-"
        }</td>
        <td>${country.continents}</td>
        <td>${country.population}</td>
        </tr>`;
  }
  const sData = newData.join("");
  tBody.innerHTML = sData;
};


const countrySearch = () => {
  const inputCountry = document.getElementById("country").value.toLowerCase();;
  const tr = tBody.getElementsByTagName("tr");
  for (let i = 0; i < tr.length; i++) {
    const tdCountry = tr[i].getElementsByTagName("td")[1];
    const tdCapital = tr[i].getElementsByTagName("td")[2];
    if (tdCountry || tdCapital) {
      const txtCountry = tdCountry.textContent;
      const txtCapital = tdCapital.textContent;
      if (txtCapital.toLowerCase().indexOf(inputCountry) > -1 || txtCountry.toLowerCase().indexOf(inputCountry) > -1 ) {
        tr[i].style.display = "";
      } else {
        tr[i].style.display = "none";
      }
    }
    
  }
};
countryList(
  "https://restcountries.com/v3.1/all?fields=name,capital,currencies,flags,population,continents,latlng,official,timezones"
);
