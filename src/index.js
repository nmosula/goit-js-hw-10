import "./css/styles.css";
import {fetchCountries} from "./js/fetchCountries.js";
import Notiflix from 'notiflix';
import debounce from 'lodash.debounce';

const DEBOUNCE_DELAY = 1000;

const inpSearch = document.querySelector("#search-box");
const countryList = document.querySelector(".country-list");
const countryInfo = document.querySelector(".country-info");

inpSearch.addEventListener('input', debounce(onInputCountry, DEBOUNCE_DELAY));

function onInputCountry() {
    const searchCountry = inpSearch.value.trim();

    if (searchCountry == '') return;
    else if(searchCountry !== '') {
    
        fetchCountries(searchCountry)
            .then(data => {
                if (data.length == 1)
                    showCountryInfo(data);
                else if (data.length > 1 && data.length <= 10)
                    showCountriesInfo(data);
                else if (data.length > 10)
                    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.", { timeout: 5000 });

            })
            .catch(err => console.log(err));
    }
}

function showCountryInfo(data) {
    console.log("Info One country");
    console.log(data);
}


function showCountriesInfo(data) {
    console.log("Info many countries");
    console.log(data);
}