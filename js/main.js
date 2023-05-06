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

//cambiar el grosor del lapiz desde el input number
penSize.addEventListener('change', e=>{
    grosor = penSize.value;
})

//aumentar el grosor del lapiz desde boton
btnAumentar.addEventListener('click', e=>{
    if(grosor < 99){
        grosor += 5;
    }
    penSize.value = grosor;
});

//disminuir el grosor del lapiz desde boton
btnDisminuir.addEventListener("click", e=>{
    if(grosor>0){
        grosor -= 2;
         penSize.value = grosor;
    }
}); 

// cambiar color del trazo mediante el input
inputColor.addEventListener('input', e=>{
    colorTrazo = inputColor.value;
})

// al llamar al evento mousedown instanciar lapiz 
canvas.addEventListener('mousedown', (e)=>{
    mouseUp = false;
    mouseDown = true;
    MiLapiz = new lapiz(e.layerX, e.layerY, colorTrazo, ctx, 'black',grosor);
});

canvas.addEventListener('mousemove', (e)=>{
    if(mouseDown && btnDibujar){
        MiLapiz.moveTo(e.offsetX, e.offsetY);
        MiLapiz.draw();       
    }
});

// dejar de dibujar
canvas.addEventListener('mouseup', (e)=>{
    mouseUp = true;
    mouseDown = false;
    MiLapiz = null;
});

// boton dibujar
document.getElementById("pen").addEventListener("click", (e)=>{
    if(btnBorrar){
        grosor -= 20;
        penSize.value = grosor;
        btnBorrar = false;
    }
    btnDibujar = true;
    colorTrazo = inputColor.value;
}) 

// boton goma de borrar
document.getElementById("borrar").addEventListener("click", (e)=>{
    if(!btnBorrar){
        grosor += 20;
    }
    btnDibujar = true;
    btnBorrar = true;
    colorTrazo = 'white';
    penSize.value = grosor;
}) 

// boton limpiar canvas
document.getElementById("limpiar").addEventListener("click", (e)=>{
    main();
   /*  imagen = null; */
}) 

//boton guardar
document.getElementById("guardar").addEventListener("click", (e)=>{
    let link = document.createElement('a');
    link.download = "canvas.png";
    link.href = canvas.toDataURL();
    link.click();
    main();
}) 

//cargar imagen
file.addEventListener("change", e=>{
    miImagen = new MyImagen(ctx,canvasWidth,canvasHeight)
    miImagen.cargarImagen(e);
});

// iniciar canvas de blanco
function main(){
    ctx.fillStyle = 'white';  
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

// filtro negativo
let filtroNegativo = document.getElementById("filtroNegativo");
filtroNegativo.addEventListener('click', e=>{
    miImagen.negativo();
});

// filtro aumentar brillo
let filtroBrillo = document.getElementById("filtroBrillo");
filtroBrillo.addEventListener('click', e=>{
    miImagen.filtroDeBrillo();
});

// filtro grices
let filtroGris = document.getElementById("filtroGris");
filtroGris.addEventListener('click', e=>{
    miImagen.filtroGrices();
});

// filtro sepia
let filtroSepia = document.getElementById("filtroSepia");
filtroSepia.addEventListener('click', e=>{
    miImagen.filtroDeSepia();
});

//filtro binarizacion
let filtroBinarizacion = document.getElementById("filtroBinarizacion");
filtroBinarizacion.addEventListener('click', e=>{
    miImagen.filtroDeBinarizacion()
});

// filtro Test
let filtroX = document.getElementById("filtroX");
filtroX.addEventListener('click', e=>{
    miImagen.filtro();
});