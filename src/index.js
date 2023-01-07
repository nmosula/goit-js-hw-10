import "./css/styles.css";
import "./js/fetchCountries.js";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 300;

const inpSearch = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inpSearch.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    const searchCountry = inpSearch.value.trim();

    
    console.log(fetchCountries(searchCountry));
}