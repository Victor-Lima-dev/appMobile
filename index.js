import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-app.js";
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.0.2/firebase-database.js";

//Parte 1 - Criando um projeto no Firebase
// Precisa criar um projeto no firebase e pegar as informações de configuração
// fazemos o import initializeApp e getDatabase
// e passamos as informações de configuração para o initializeApp

//Parte 2 - Criando uma base de dados no Firebase
// e passamos o app para o getDatabase
// e pegamos a referência da nossa base de dados com a ref
// e passamos a referência para o push

//Parte 3 - Adicionando itens na nossa base de dados
// pegamos o valor do input com o value
// e passamos o valor para o push
// e limpamos o input com o clearInputField

//Parte 4 - Pegando os itens da nossa base de dados
// passamos a referência para o onValue
// e usamos o snapshot para pegar os dados da nossa base de dados, snapshot é o valor atual da nossa base de dados
// e pegamos o valor do snapshot com o snapshot.val()
// isso nos retorna um objeto com os dados da nossa base de dados
// e transformamos esse objeto em um array com o Object.values()
// e percorremos esse array com o forEach
// e passamos o item para o callback
// e adicionamos o item na nossa lista com o innerHTML
// assim adicionamos os itens da nossa base de dados na nossa lista
// colocamos dentro de uma função para podermos disparar primeiro para preencher a lista com os itens da nossa base de dados


const appSettings = {
    dataBase : "https://mobileapp-70c94-default-rtdb.firebaseio.com/",
    projectId: "mobileapp-70c94"
}

const app = initializeApp(appSettings);
const database = getDatabase(app);
const shoppingListInDb = ref(database, "shoppingList");


const inputFieldEl = document.querySelector('#input-field');
const addButtonEl = document.querySelector('#add-button');
const shoppingListEl = document.querySelector('#shopping-list');




onValue(shoppingListInDb, (snapshot) => {
    
    // snapshot é o valor atual da nossa base de dados
    // pegamos o valor do snapshot com o snapshot.val()


    if(!snapshot.exists()){
        shoppingListEl.innerHTML = "Nenhum item na lista";
    }

    const data = snapshot.val();

    // transformamos esse objeto em um array com o Object.entries()


    const shoppingList = Object.entries(data);

    // limpamos a lista antes de preencher com os itens da nossa base de dados
    clearShoppingList();
    

    // percorremos o array com o forEach
    // e passamos o item para o callback
    // e adicionamos o item na nossa lista com o innerHTML

    //criar um for para percorrer o array

    

    for (let i = 0; i < shoppingList.length; i++) {
        let item = shoppingList[i];


        addInputValueToShoppingList(item);
    }


    
})


addButtonEl.addEventListener('click', () => {
    let inputValue = inputFieldEl.value;

    push(shoppingListInDb, inputValue);

    clearInputField();

});

const clearInputField = () => {
    inputFieldEl.value = '';
}

const clearShoppingList = () => {
    shoppingListEl.innerHTML = '';
};

const addInputValueToShoppingList = (item) => {
    

    let itemId = item[0];
    let itemValue = item[1];

    //cria o elemento li
    const liEl = document.createElement('li');
    //adiciona o valor do input no elemento li
    liEl.textContent = itemValue;
    //adiciona o elemento li na lista ul como filho
    shoppingListEl.appendChild(liEl);

   liEl.addEventListener('click', () => {
        let location = ref(database, `shoppingList/${itemId}`);
       remove(location);
   })



};