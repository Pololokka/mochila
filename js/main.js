const form = document.getElementById('novoItem');
const lista = document.getElementById('lista');
//verifica se tem algum item alocado no local storage e cria a variável com os itens e transforma de string pra dado, ou cria a variável com um array vazio
const itens = JSON.parse(localStorage.getItem("item")) || [];

//cria os itens da página que foram alocados no local storage
itens.forEach ( (elemento) => {
    criaElemento(elemento);
})

form.addEventListener("submit", (evento) => {
    evento.preventDefault();
    //cria variáveis com os elementos, mas sem o .value, pra que outros elementos possam ser acessados
    const nome = evento.target.elements['nome'];
    const quantidade = evento.target.elements['quantidade'];

    //cria uma variável pra verificar se o elemento já existe
    const existe = itens.find ( (elemento) => elemento.nome === nome.value );

    //cria uma variável com ambos os atributos
    const itemAtual = {
        "nome": nome.value,
        "quantidade": quantidade.value
    }

    //cria um elemento novo, caso ele não exista, ou atualiza elementos que já existem
    if(existe) {
        itemAtual.id = existe.id;
      
        atualizaElemento(itemAtual);
       
        itens[itens.findIndex(elemento => elemento.id === existe.id)] = itemAtual;
    }
    else {
        //atribui um id ao item, com base no tamanho do array
        //itens[itens.length - 1] --> verifica se isso é verdadeiro(ou seja, se o array tem 0 ou mais itens)
        //itens[itens.length - 1] também verifica qual o último item do array, mas não sei porque
        // (condição) ?(if/else simples) *caso verdadeiro* : *caso falso*
        itemAtual.id = itens[itens.length - 1] ? (itens[itens.length - 1]).id + 1 : 0;
        
        //adiciona item a um array, a fim de salvar vários itens ao mesmo tempo
        itens.push(itemAtual)
        
        //executa a função de criar um novo elemento, e usa o nome e quantidade escritos nos campos condizentes
        criaElemento(itemAtual);
    }

    //salva o item novo no local storage, e transforma numa string
    localStorage.setItem("item", JSON.stringify(itens));

    //limpa os inputs
    nome.value = "";
    quantidade.value = "";
})

function criaElemento (item) {
    //cria um novo elemento de lista
    const novoItem = document.createElement('li');
    //atribui a classe "item" ao novo elemento de lista
    novoItem.classList.add("item");

    //cria uma nova tag "strong"
    const numeroItem = document.createElement('strong');
    //escreve dentro dessa tag "strong" nova
    numeroItem.innerHTML = item.quantidade;
    //cria um id pro item
    numeroItem.dataset.id = item.id

    //cria o novo item, porém, cria um objeto completo
    //novoItem.innerHTML = numeroItem + nome;

    //cria um item dentro do outro
    novoItem.appendChild(numeroItem);
    novoItem.innerHTML += item.nome;

    novoItem.appendChild(botaoDeleta(item.id));

    //insere o novo item na lista do HTML
    lista.appendChild(novoItem);

    //aloca o item no local storage, mas somente aloca um item. abaixo se encontra a versão antiga
    //localStorage.setItem("nome", nome);
    //localStorage.setItem("quantidade", quantidade);
    //versão nova do que foi feito acima --- movido para o event listener

}

function atualizaElemento(item) { 
    //pega o id que foi atribuído a um item(conforme acima), e muda quantidade do mesmo
    document.querySelector("[data-id='" + item.id + "']").innerHTML = item.quantidade;
}

function botaoDeleta (id) {
    const elementoBotao = document.createElement("button");
    elementoBotao.innerText = "X";

    elementoBotao.addEventListener("click", function() {
        deletaElemento(this.parentNode, id);
    })

    return elementoBotao;
}

function deletaElemento (tag, id) {
    tag.remove();

    //remove um item do array
    itens.splice(itens.findIndex(elemento => elemento.id === id), 1);

    //seta os valores novos no local storage
    localStorage.setItem("item", JSON.stringify(itens));
}
