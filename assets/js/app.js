const pokemonName = document.querySelector('.pokemon__name');
const pokemonNumber = document.querySelector('.pokemon__number');
const pokemonImage = document.querySelector('.pokemon__img');

const form = document.querySelector('.form');
const input = document.querySelector('.input__search');
const buttonPrev = document.querySelector('.btn-prev');
const buttonNext = document.querySelector('.btn-next');

const pokemonStatistic = document.getElementById('myChart');

let searchPokemon = 1;
let myChart;

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if(APIResponse.status === 200){
        const data = await APIResponse.json();
        return data;
    };
};

function myRadar(data){
    Chart.defaults.color = "#070707";
    myChart = new Chart(pokemonStatistic, {
        type: 'radar',
        data: {
        labels: ['hp', 'attack', 'defense', 'special-attack', 'special-defense', 'speed'],
        datasets: [{
            label: data.name.charAt(0).toUpperCase() + data.name.slice(1),
            data: [
                data.stats[0].base_stat, 
                data.stats[1].base_stat, 
                data.stats[2].base_stat, 
                data.stats[3].base_stat, 
                data.stats[4].base_stat, 
                data.stats[5].base_stat],
            borderWidth: 1,
            pointBackgroundColor: ['#FF0000', '#FFA500', '#008000', '#0000FF', '#EE82EE','#FFFF00'],
            borderColor: ['#f7f7f7'],
            borderCapStyle: ['red'],
            fill: false
        }]
        },
        options: {
            elements: {
                line: {
                    borderWidth: 3
                }
            }
        }
    });
}

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
        myRadar(data);

    } else {
        pokemonImage.style.display = 'none';
        pokemonName.innerHTML = 'No encontrado :c';
        pokemonNumber.innerHTML = '';
        myChart.destroy();
    }
};
form.addEventListener('submit', (event) => {
    event.preventDefault();

    renderPokemon(input.value.toLowerCase());
    input.value = '';
});

buttonPrev.addEventListener('click', () =>{
    if (searchPokemon > 1) {
        searchPokemon -= 1;
        myChart.destroy();
        renderPokemon(searchPokemon);
    }
});

buttonNext.addEventListener('click', () =>{
    searchPokemon += 1;
    myChart.destroy();
    renderPokemon(searchPokemon);
});

renderPokemon(searchPokemon);
