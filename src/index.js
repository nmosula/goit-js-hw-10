import "./css/styles.css";
import {fetchCountries} from "./js/fetchCountries.js";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inpSearch = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inpSearch.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    const searchCountry = inpSearch.value.trim();

    if (searchCountry == '') {
        countryList.innerHTML = "";
        countryInfo.innerHTML = "";
        return;
    }
    else if(searchCountry !== '') {
    
        fetchCountries(searchCountry)
            .then(data => {
                if (data.length == 1)
                    showCountryInfo(data);
                else if (data.length > 1 && data.length <= 10)
                    showCountries(data);
                else if (data.length > 10)
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", { timeout: 5000 });

            })
            .catch(err => console.log(err));
    }
}

function showCountryInfo(data) {
    const markup = data.map(({
        flags: {svg: country_flag},
        name: { official: country_name },
        capital: country_capital,
        population,
        languages
    }) => `
    <p class="country_name"><img class="country_flag" src="${country_flag}" alt="${country_name}">
    <span>${country_name}</span></p>
    <p><b>Capital:</b> ${country_capital}</p>
    <p><b>Population:</b> ${population}</p>
    <p><b>Languages:</b> ${Object.values(languages)}</p>
    `);

    countryList.innerHTML = "";
    countryInfo.innerHTML = markup.join('');
}


function showCountries(data) {
    const markup = data.map(({
        flags: {svg: country_flag},
        name: {common: country_name}
    }) => `<li>
    <p class="countries_name"><img class="country_flag" src="${country_flag}" alt="${country_name}">
    <span>${country_name}</span></p>
    </li>`);

    countryList.innerHTML = markup.join('');
    countryInfo.innerHTML = "";
}