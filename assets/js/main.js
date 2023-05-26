const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')

const maxRecords = 151
const limit = 10
let offset = 0;

function pipeNumber(number, size) {
    const txt = ''+number;
    var auxTxt = '';
    for (let index = 0; index < size - txt.length; index++) {
        auxTxt += '0';
    }
    return auxTxt+txt;
}

function convertPokemonToLi(pokemon) {
    return `
        <li class="pokemon ${pokemon.type}">
            <div class="header">
                <span class="name">${pokemon.name}</span>
                <span class="number">#${pipeNumber(pokemon.number,3)}</span>
            </div>

            <div class="detail">
                <ol class="types">
                    ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                </ol>
                <img src="${pokemon.photo}" alt="${pokemon.name}">
            </div>

            <div class="stats">
                ${pokemon.stats.map((e) => {
                    return `<div 
                    class="bar" 
                    title="${e.name}: ${e.base_stat}"
                    style="background: linear-gradient(90deg, ${e.color} ${e.base_stat}%, white ${e.base_stat}%);"><span>${e.name}: ${e.base_stat}</span></div>`
                }).join('')}
            </div>
        </li>
    `
}

function loadPokemonItens(offset, limit) {
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        const newHtml = pokemons.map(convertPokemonToLi).join('')
        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItens(offset, limit)

loadMoreButton.addEventListener('click', () => {
    offset += limit
    const qtdRecordsWithNexPage = offset + limit

    if (qtdRecordsWithNexPage >= maxRecords) {
        const newLimit = maxRecords - offset
        loadPokemonItens(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    } else {
        loadPokemonItens(offset, limit)
    }
})