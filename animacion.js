

class Persona {

    constructor(nombre, edad, estado = false){

        this.nombre = nombre;
        this.edad = edad;
        this.estado = estado;

    }

}

let arrayPersonas = [];
function add(){

    var inputNombre = document.querySelector('#nombre').value;
    var inputEdad = document.querySelector('#edad').value;



    if (inputNombre === '' || inputEdad === ''){
        alert('por favor llene ambos campos')
    } else {

        let newPersona =new Persona(inputNombre,inputEdad);

        arrayPersonas.push(newPersona);

        console.log(newPersona);
        console.log(arrayPersonas);


        GuardarDb();
        resetInput();
        renderAlertUi();
    }


}

const resetInput = () => {

    this.nombre.value = '';
    this.edad.value = '';

};

const GuardarDb  = () => {

    localStorage.setItem('persona', JSON.stringify(arrayPersonas))

};


const PintarDB = () => {

    arrayPersonas =  JSON.parse(localStorage.getItem('persona'))
    console.log(arrayPersonas)

    if (arrayPersonas === null){
        arrayPersonas = [];
    } else {

        renderAlertUi();

    }

};

var lista_personasUI = document.querySelector('#lista_personas');
const renderAlertUi = () => {
    lista_personasUI.innerHTML = '';
    arrayPersonas.forEach(element =>{

        if (element.estado){
            lista_personasUI.innerHTML+= `<div class="alert alert-success" role="alert"><i class="material-icons float-left">accessibility_new</i><b>${element.nombre}</b> - ${element.edad}  - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete_forever</i></span></div>`
        } else {
            lista_personasUI.innerHTML+= `<div class="alert alert-primary" role="alert"><i class="material-icons float-left">accessibility_new</i><b>${element.nombre}</b> - ${element.edad}  - ${element.estado}<span class="float-right"><i class="material-icons">done</i><i class="material-icons">delete_forever</i></span></div>`
        }

    } )
};



lista_personasUI.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.innerHTML === 'done' || e.target.innerHTML === 'delete_forever' ){
        let texto = e.path[2].childNodes[1].innerHTML;
        if (e.target.innerHTML === 'delete_forever'){
            EliminarDb(texto);
        }
        if (e.target.innerHTML === 'done'){
            EditarDb(texto);

        }
    }
});


const EliminarDb = (nombre) =>{

    let indexArry;
    arrayPersonas.forEach((element, index) =>{

        
        if (element.nombre === nombre) {
            indexArry = index;
            console.log('se elimino la posicion '+ ' ' + indexArry)
        }

    });

    arrayPersonas.splice(indexArry,1);
    GuardarDb();
    renderAlertUi();

    console.log(nombre)

};

const EditarDb = (nombre) => {

    let indexArry = arrayPersonas.findIndex((element) => {
      return  element.nombre === nombre
    });

    console.log(indexArry);
    console.log(arrayPersonas[indexArry]);
    arrayPersonas[indexArry].estado = true;
    GuardarDb();
    renderAlertUi();
};

document.addEventListener('DOMContentLoaded', PintarDB);