"use strict"

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let canvasWidth = canvas.width;
let canvasHeight = canvas.height;
let btnDibujar = false;
let btnBorrar = false;
let grosor = 10;
let colorTrazo = 'black';
let mouseUp = true;
let mouseDown = false;
let inputColor = document.getElementById("inputColor");
let MiLapiz = null;
let miImagen = null;
let file = document.getElementById("file");
let penSize = document.querySelector(".pen-size");
let btnAumentar = document.querySelector(".aumentar");
let btnDisminuir= document.querySelector(".disminuir");
//obtengo todos los botones de filtro
let filtros = document.querySelectorAll(".btn-filtro");

// se agrega la clase esconder filtro (para que se cierren cuando aprentamos otro boton)
function esconderFiltros(){
    filtros.forEach(filtro => {
        filtro.classList.add("esconder");
    });
}

// se elimina la clase esconder filtro (para que se muestren)
function mostrarFiltros(){
    filtros.forEach(filtro => {
        filtro.classList.remove("esconder");
    });
}

//cambiar el grosor del lapiz desde el input number
penSize.addEventListener('change', ()=>{
    grosor = parseInt(penSize.value);
})

//aumentar el grosor del lapiz desde boton
btnAumentar.addEventListener('click', ()=>{
    if(grosor < 99){
        grosor += 5;
    }
    penSize.value = grosor;
});

//disminuir el grosor del lapiz desde boton
btnDisminuir.addEventListener("click", ()=>{
    if(grosor>0){
        grosor -= 2;
         penSize.value = grosor;
    }
}); 

// cambiar color del trazo mediante el input
inputColor.addEventListener('input', ()=>{
    colorTrazo = inputColor.value;
    
})

// al llamar al evento mousedown instanciar lapiz 
canvas.addEventListener('mousedown', (e)=>{
    mouseUp = false;
    mouseDown = true;
    MiLapiz = new lapiz(e.layerX, e.layerY, colorTrazo, ctx, 'black',grosor);
    
});

//al mover el mouse se verifica que se este presionando el click y que este activado el boton de dibujar
canvas.addEventListener('mousemove', (e)=>{
    if(mouseDown && btnDibujar){
        MiLapiz.moveTo(e.offsetX, e.offsetY);
        MiLapiz.draw(); 
              
    }
});

// dejar de dibujar
canvas.addEventListener('mouseup', ()=>{
    mouseUp = true;
    mouseDown = false;
    MiLapiz = null;
});

// boton dibujar
document.getElementById("pen").addEventListener("click", ()=>{
    if(btnBorrar){
        if(grosor - 20 > 0){
            grosor -= 20;
        }else{
            grosor = 10;
        }
        penSize.value = grosor;
        btnBorrar = false;
    }
    btnDibujar = true;
    colorTrazo = inputColor.value;
}) 

// boton goma de borrar
document.getElementById("borrar").addEventListener("click", ()=>{
    if(!btnBorrar){
        grosor += 20;
    }
    btnDibujar = true;
    btnBorrar = true;
    colorTrazo = 'white';
    penSize.value = grosor;
}) 

// boton limpiar canvas
document.getElementById("limpiar").addEventListener("click", ()=>{
    main();
    miImagen  = null;
    esconderFiltros();
}) 

//boton guardar
document.getElementById("guardar").addEventListener("click", ()=>{
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
    main();
    esconderFiltros()
}) 


//cargar imagen
file.addEventListener("change", e=>{
    miImagen = new MyImagen(ctx,canvasWidth,canvasHeight,null,null)
    miImagen.cargarImagen(e);
    file.value = null;
    mostrarFiltros();
});

// iniciar canvas de blanco
function main(){
    ctx.fillStyle = 'white';  
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

// aplicar filtro
//recorro todos los botones que aplican filtros 
filtros.forEach(filtro => {
    // al hacer click en uno especifico guardo el id del mismo y se lo paso a aplicar filtro
    filtro.addEventListener("click", ()=>{
        // si hay una imagen cargada aplica el filtro, sino no
        if(miImagen){
            aplicarFiltro(filtro.id);
        }else{
            console.log("cargue una imagen");
        }
    })
});

// si existe el filtro del id que recibo como parametro llamo a la funcion que corresponda
function aplicarFiltro(id){
    let imageData = ctx.getImageData(miImagen.imgActual.xImg, miImagen.imgActual.yImg, miImagen.imgActual.width, miImagen.imgActual.height);
    let pixel = imageData.data;

    // si el ultimo filtro es igual al id que llega por parametro entra al if y quita el filtro que ya esta aplicado
    // si no es asi, entra al else, fijarse si el id existe como parametro 
    // y si existe aplicar el filtro y setearlo como ultimo filtro 

    if(miImagen.ultimoFiltro == id){
        miImagen.quitarFiltro();
    }else{
        if(id == "filtroNegativo"){
            miImagen.ultimoFiltro = "filtroNegativo";
            miImagen.filtroNegativo(imageData,pixel);
        }
        if(id == "filtroBrillo"){
            miImagen.filtroBrillo(imageData,pixel);
        }
        if(id == "filtroBinarizacion"){
            miImagen.ultimoFiltro = "filtroBinarizacion";
            miImagen.filtroBinarizacion(imageData,pixel);
        }
        if(id == "filtroGris"){
            miImagen.ultimoFiltro = "filtroGris";
            miImagen.filtroGrices(imageData,pixel);
        }
        if(id == "filtroSepia"){
            miImagen.ultimoFiltro = "filtroSepia";
            miImagen.filtroSepia(imageData,pixel);
        } 
        if(id == "filtroBlur"){
            miImagen.ultimoFiltro = "filtroBlur";
            miImagen.filtroBlur(imageData,pixel);
        } 
        if(id == "filtroBordes"){
            miImagen.ultimoFiltro = "filtroBordes";
            miImagen.filtroBordes(imageData,pixel);
        }  
        if(id == "filtroSaturacion"){/* 
            miImagen.ultimoFiltro = "filtroSaturacion"; */
            miImagen.filtroSaturacion(imageData,pixel);
        }   
        if(id == "quitarFiltro"){
            miImagen.quitarFiltro();
        }  
    }

    /* // una vez seleccionado un filtro se esconden 
    esconderfiltros() */
};
