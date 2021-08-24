const prompt = require("prompt-sync")();

console.log(`Responda com 1 para 'Sim' e 0 para 'Não'.`);

const resp1 = parseInt(prompt('Ligou para a vítima? '));
const resp2 = parseInt(prompt('Mora perto da vítima? '));
const resp3 = parseInt(prompt('Trabalhou com a vítima? '));
const resp4 = parseInt(prompt('Foi ao local do crime? '));
const resp5 = parseInt(prompt('Devia para a vítima?' ));

const resp = resp1 + resp2 + resp3 + resp4 + resp5;

if (resp === 5){
    console.log(`Você é o assassino.`);
}else if (resp === 4 || resp === 3){
    console.log(`Você é o cúmplice.`);
} else if (resp === 2){
    console.log(`Você é um suspeito.`);
} else {
    console.log(`Você é inocente.`);
};
