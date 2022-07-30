

let PokeNumero= document.querySelector('.pokemon-number');
let PokeNome= document.querySelector('.pokemon-name');
let PokemonImg = document.querySelector('.pokemon-img');
let pokemonType = document.querySelector('.poke-type-text');

let inputForm = document.querySelector('#form');
let input = document.getElementById('buscador');

const btn_prev = document.querySelector('.btn-prev');
const btn_next = document.querySelector('.btn-next');

let indexPokemon = 1;

// COLOCA O STATUS NA TELA
const online = document.querySelector('.online');

let status_nome = document.querySelector('.nome-res');
let status_type = document.querySelector('.type-res');
let status_number = document.querySelector('.number-res');



// api pokemons 
const fatchPokemon = async (pokemon)=>{
    let APIurl = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;
    const APIrespnse = await fetch(APIurl);

    if(APIrespnse.status === 200){
        const data = await APIrespnse.json();
        return data  
    }
}

const renderPokemon = async (pokemon)=> {
    PokeNome.innerHTML = 'Loading ...'
    const data = await fatchPokemon(pokemon)

    if (data){
        PokemonImg.classList.remove('nonePokebola')
        PokeNumero.innerHTML = data.id
        PokeNome.innerHTML = data.name    
    
        PokemonImg.src = data['sprites']['versions']['generation-v']
        ['black-white']['animated']['front_default'];         
        pokemonType.innerHTML = data['types']['0']['type']['name']; 
            
        indexPokemon = data.id;

        // retornos
        status_nome.innerHTML = data.name;
        status_type.innerHTML = data['types']['0']['type']['name'];
        status_number.innerHTML = data.id;

    } else {
        console.log('Busca invalida o Pokemon Não existe')
        status_nome.innerHTML =' Null';
        status_type.innerHTML = 'Null';
        status_number.innerHTML = 'Null';  
        notFound()  
    }    
}

const notFound = ()=>{
    PokeNumero.innerHTML = ''
    PokeNome.innerHTML = '[ -- Not Found -- ]'
    pokemonType.innerHTML = '-----';
    PokemonImg.src = './img/pokebolanone.png'; 
    PokemonImg.classList.add('nonePokebola')

}

inputForm.addEventListener('submit', (event)=>{
    event.preventDefault()    
    renderPokemon(input.value.toLowerCase());
    input.value = '';    
})

btn_prev.addEventListener('click', ()=>{
    if (indexPokemon > 1){
        indexPokemon-=1;    
        renderPokemon(indexPokemon);
    }
})

btn_next.addEventListener('click', ()=>{
    if (indexPokemon < 649){
        indexPokemon+=1;    
        renderPokemon(indexPokemon);
    }
})


renderPokemon(indexPokemon)

// COLOCA O STATUS NA TELA

online.addEventListener('change',(event)=>{
    event.preventDefault()
    let statusPokemon = document.querySelector('.conteiner-status');
    if (event.target.checked){
        statusPokemon.style.display = 'block'
    }
    else{
        statusPokemon.style.display = 'none'
    }
})

