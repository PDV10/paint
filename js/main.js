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
let imagen = null;
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
    imagen = null;
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
file.addEventListener("change", cargarImagen);

function cargarImagen(e){
    imagen = new Image();
    imagen.src = URL.createObjectURL(e.target.files[0]);
   /*  imgWidth = e.target.files[0].width;
    imgHeight = e.target.files[0].height; */
    
    imagen.onload = function(){
        console.log(imagen);
        ctx.drawImage(this, 0 ,0,canvasWidth,canvasHeight);
    }
}

function main(){
    ctx.fillStyle = 'white';  
    ctx.fillRect(0,0,canvasWidth,canvasHeight);
}

// filtros 


let filtroNegativo = document.getElementById("filtroNegativo");
filtroNegativo.addEventListener('click', negativo);

function negativo(){
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixel = imageData.data;
    for (let i = 0; i < pixel.length; i+=4) {
        pixel[i ] = 255 - pixel[i]; // r
        
        pixel[i + 1] = 255 - pixel[i+1]; // g
        
        pixel[i+2] = 255 - pixel[i+2]; // b
        
    }
    if(imagen != null)
    ctx.putImageData(imageData, 0,0);
    
}

let filtroBrillo = document.getElementById("filtroBrillo");
filtroBrillo.addEventListener('click', filtroDeBrillo);

function filtroDeBrillo(){
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixel = imageData.data;
    for (let i = 0; i < pixel.length; i++) { 
        pixel[i] = pixel[i] +5; // r
        pixel[i + 1] = pixel[i+1]+5; // g
        pixel[i+2] = pixel[i+2]+5; // b 
    }
    if(imagen != null){
        ctx.putImageData(imageData, 0,0);
    }
}

let filtroByN = document.getElementById("filtroByn");
filtroByN.addEventListener('click', filtroBlancoYnegro);

function filtroBlancoYnegro(){
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixel = imageData.data;
    for (let i = 0; i < pixel.length; i++) {
        let r =   pixel[i * 4];
        let g =   pixel[i * 4 + 1];
        let b =  pixel[i * 4 + 2];
        let promedio = ((r+g+b)/3);
        pixel[i * 4] =  promedio; // r
        
        pixel[i * 4 + 1] = promedio; // g
        
        pixel[i * 4 + 2] = promedio; // b
        
    }
    if(imagen != null)
    ctx.putImageData(imageData, 0,0);
    
}

let filtroSepia = document.getElementById("filtroSepia");
filtroSepia.addEventListener('click', filtroDeSepia);

function filtroDeSepia(){
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixel = imageData.data;
    for (let i = 0; i < pixel.length; i++) {
        let r =   pixel[i * 4];
        let g =   pixel[i * 4 + 1];
        let b =  pixel[i * 4 + 2];
       
        pixel[ i * 4 ] = ( r * .393 ) + ( g *.769 ) + ( b * .189 );
        pixel[ i * 4 + 1 ] = ( r * .349 ) + ( g *.686 ) + ( b * .168 );
        pixel[ i * 4 + 2 ] = ( r * .272 ) + ( g *.534 ) + ( b * .131 );
    }
    if(imagen != null)
    ctx.putImageData(imageData, 0,0);
}

let filtroX = document.getElementById("filtroX");
filtroX.addEventListener('click', filtro);

function filtro(){
    let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
    let pixel = imageData.data;
    for (let i = 0; i < pixel.length; i++) {
        let r =   pixel[i * 4];
        let g =   pixel[i * 4 + 1];
        let b =  pixel[i * 4 + 2];
        let pre = (Math.max(r,g,b));
        pixel[i * 4] = r*pre;
        pixel[i * 4+2] =g*pre; 
        pixel[i * 4+2] =b*pre;
        
    }
    if(imagen != null)
    ctx.putImageData(imageData, 0,0);
    
}