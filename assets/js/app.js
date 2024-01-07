import * as radar from "./myChart.js";

const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__img');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

let searchPokemon = 1;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    };
};

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = 'Cargando...';
    pokemonNumber.innerHTML = '';

    const data = await fetchPokemon(pokemon);
    if (data) {
        pokemonImage.style.display = 'block';
        pokemonName.innerHTML = data.name;
        pokemonNumber.innerHTML = data.id;
        pokemonImage.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default'];
        input.value = '';
        searchPokemon = data.id;
        radar.myRadar(data);

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'No encontrado :c';
        pokemonNumber.innerHTML = '';
        radar.myChart.destroy();
    }
};

form.addEventListener('submit', (event) => {
    event.preventDefault();
    radar.myChart.destroy();
    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        radar.myChart.destroy();
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    radar.myChart.destroy();
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
