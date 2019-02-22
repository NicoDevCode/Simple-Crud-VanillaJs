class Persona {
    constructor(nombre, edad){
        this.nombre = nombre;
        this.edad = edad;
    }
}
let arrayPersonas = [];
const add = () => {
    let inputNombre = document.querySelector('#nombre').value;
    let inputEdad = document.querySelector('#edad').value;

    if (parseInt(indexEvent) >= 0){
        UpDateAlert(inputNombre,inputEdad,indexEvent);

    }else {
        let newPersona =new  Persona(inputNombre,inputEdad);
        arrayPersonas.push(newPersona);
    }

    RenderAlertAdd();
    GuardarBD();
    cleatInputs();
    indexEvent = -1



};
const cleatInputs = () =>{
    this.nombre.value = '';
    this.edad.value = '';
};
const GuardarBD = () => {
    localStorage.setItem('PersonasLocalDB', JSON.stringify(arrayPersonas))
};
const RenderAlertAdd = () => {
    let RenderUi = document.querySelector('#viewPersonas');
    RenderUi.innerHTML = '';
    arrayPersonas.forEach((element, index)=>{
        RenderUi.innerHTML +=  `<div class="alert alert-success" role="alert" data-index="${index}"><i class="material-icons float-left">accessibility_new</i><b>${element.nombre}</b> - ${element.edad}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete_forever</i></span></div>`
    })
};
const PrintDB = () =>{
    arrayPersonas = JSON.parse(localStorage.getItem('PersonasLocalDB'));
    if (arrayPersonas === null){
        arrayPersonas = []
    } else {
        RenderAlertAdd()
    }
};
document.addEventListener('DOMContentLoaded', PrintDB);
let indexEvent;
document.addEventListener('click', (e)=>{
    e.preventDefault();
    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete_forever') {
        indexEvent = e.path[2].getAttribute("data-index");
        if (e.target.innerHTML === 'done') {
            EditAlert(indexEvent)
        }

        if (e.target.innerHTML === 'delete_forever') {
            DeleteAlert(indexEvent)
        }
    }
});

const EditAlert = () => {
    this.nombre.value = arrayPersonas[indexEvent].nombre;
    this.edad.value = arrayPersonas[indexEvent].edad;

};

const UpDateAlert = (nombre,edad) => {

    arrayPersonas[parseInt(indexEvent)]['nombre'] = nombre;
    arrayPersonas[parseInt(indexEvent)]['edad'] = edad;

    RenderAlertAdd();
    GuardarBD();
    cleatInputs();
};

const DeleteAlert = () =>{
    arrayPersonas.splice([parseInt(indexEvent)],1);
    RenderAlertAdd();
    GuardarBD();
    cleatInputs();
    indexEvent = -1
};

