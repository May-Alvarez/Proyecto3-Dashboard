const pokemonStatistic = document.getElementById('myChart');
export let myChart;

export function myRadar(data){
    
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

    return data;
}