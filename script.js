//
//Feito por Guilherme Alves (guialvesds)
//
const pokename = document.querySelector('#res');
const pokeImage = document.querySelector('#img');
//const pokeImage2 = document.querySelector('');
const form = document.querySelector('#form');
const input = document.querySelector('#inputSearch');
const buttonV = document.querySelector('#btn1');
const buttonP = document.querySelector('#btn2');
const buttonR = document.querySelector('#btn3');

const tp = document.querySelector('#ataque');
const hp = document.querySelector('#hp');
const at = document.querySelector('#at');

let seacrPok = 1;

const fetchPokemon = async (pokemon) => {
    const apiRes = await fetch(  `https://pokeapi.co/api/v2/pokemon/${pokemon}`);
    if (apiRes.status === 200){
        const data = await apiRes.json();
        return data;        
    }
    
};

const render = async (pokemon) => {
    pokename.innerHTML = 'Loading...'
    const data = await fetchPokemon(pokemon);

    if(data){
        pokename.innerHTML =`${data.id} - ${data.name}`;        
        seacrPok = data.id;             
        pokeImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_shiny"];
        tp.innerHTML = ` Tp: ${data["types"][0]["type"]["name"]}`;
         hp.innerHTML = `Hp: ${data["stats"][0]["base_stat"]}`;
         at.innerHTML = `At: ${data["stats"][1]["base_stat"]}`;
        input.value = ''

       // console.log(hp)
    }

    else {
        pokename.innerHTML = 'Ops, Não encontrado.';
        pokename.style.marginTop = '25px'
        pokeImage.src = '';
        tp.innerHTML = 'Tp: ???';
        hp.innerHTML = 'Hp: ???';    
        at.innerHTML = 'At: ???';    
        input.value = ''
    }

    console.log(data);
    
}

//render('1');

form.addEventListener("submit", (event) => {
    event.preventDefault(); //vai ficar ouvindo o input, esperando receber valor no input
    render(input.value.toLowerCase()); // Passamosa função que renderiza pegando o valor do input.
})

buttonP.addEventListener("click", () => {
    seacrPok += 1;
    render(seacrPok);
})

buttonV.addEventListener("click", () => {
    seacrPok -= 1;
    render(seacrPok);

})

buttonR.addEventListener("click", () => {
    seacrPok = 1;
    render(seacrPok);
})

render(seacrPok); // para deixar exibindo o primeiro pokemon da lista 