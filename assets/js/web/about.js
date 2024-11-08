import {Element, Button} from "./../_shared/prototypes.js";

console.log("OI ABOUT");

const title = new Element("h1", "Olá, eu sou o Sobre");
document.body.appendChild(title.render());

const button = new Button("Clique aqui", () => console.log("clicou"));
document.body.appendChild(button.render());