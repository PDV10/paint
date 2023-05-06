class MyImagen{
    constructor(ctx,canvasWidth,canvasHeight,imgActual,ultimoFiltro){
        this.ctx = ctx;
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.imgActual = imgActual;
        this.ultimoFiltro = ultimoFiltro;
    }

    init(){
        ctx.fillStyle = 'white';  
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }

    cargarImagen(e){
        //limpio el canvas antes de cargar una imagen
        this.init();
        // obtengo los valores originales de width y height antes de cargar la imagen
        let origWidth = this.width;
        let origHeight = this.height;
        
       
        let imagen = new Image();
        imagen.src = URL.createObjectURL(e.target.files[0]);
      
        imagen.onload = function(){
        
        // guardo los valores originales del width y height del canvas 
        let canvasWidth = origWidth;
        let canvasHeight = origHeight;
        // obtengo los valores de width y height de la nueva imagen cargada
        let imgWidth = imagen.width;
        let imgHeight = imagen.height;
        // seteo variables vacias
        let newWidth = null;
        let newHeight = null;
        let ratio = null;
        let newX = null;
        let newY = null;
        let xImgActual;
        let yImgActual;
        let widthImgActual;
        let heightImgAcual;
            
            // si la imagan es mas alta o mas ancha que el canvas entro al if sino entro al else
            if(imgWidth >= canvasWidth || imgHeight >= canvasHeight){
                // si la imagen es horizontal (mas ancha que alta) entro al if sino entro al else
                if(imgWidth> imgHeight){ 
                    ratio = imgWidth/canvasWidth;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newX = 0;
                    newY = ((canvasHeight- imgHeight)/ 2 );
                }else{
                    ratio = imgHeight / canvasHeight;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newX =((canvasWidth - imgWidth) /2);
                    newY = 0;
                }
          
                ctx.drawImage(this, newX ,newY,newWidth,newHeight)
            }else{ 
                newWidth = imgWidth;
                newHeight = imgHeight;
                newX = (canvasWidth-imgWidth)/2;
                newY = (canvasHeight- imgHeight) / 2;
                ctx.drawImage(this, newX ,newY,newWidth,newHeight);
            }
            /**
                guardo la imagen en una copia.
                guardo los valores de:  x, y , width y height
                de la imagen para poder volvera dibujarla en otro momento si lo necesito
                */
               this.xImgActual = newX;
               this.yImgActual = newY;
               this.widthImgActual = newWidth;
               this.heightImgAcual = newHeight;
            }
            this.imgActual = imagen;
    }

    /* -------------------------------------------- filtros ------------------------------------------------------------*/ 
    // si existe el filtro del id que recibo como parametro llamo a la funcion que corresponda
    aplicarFiltro(id){
        // si el ultimo filtro es igual al id que llega por parametro entra al if y quita el filtro que ya esta aplicado
        // si no es asi, entra al else, fijarse si el id existe como parametro 
        // y si existe aplicar el filtro y setearlo como ultimo filtro 
        if(this.ultimoFiltro == id){
            console.log("entro");
            this.quitarFiltro();
        }else{
            if(id == "filtroNegativo"){
                this.ultimoFiltro = "filtroNegativo";
                this.filtroNegativo();
            }
            if(id == "filtroBrillo"){
                this.filtroBrillo();
            }
            if(id == "filtroBinarizacion"){
                this.ultimoFiltro = "filtroBinarizacion";
                this.filtroBinarizacion();
            }
            if(id == "filtroGris"){
                this.ultimoFiltro = "filtroGris";
                this.filtroGrices();
            }
            if(id == "filtroSepia"){
                this.ultimoFiltro = "filtroSepia";
                this.filtroSepia();
            } 
            if(id == "quitarFiltro"){
                this.quitarFiltro();
            }
            if(id == "filtroX"){
                this.filtroX();
            }            
        }
    }

    // aplico el filtro si la imgActual es != null
    agregarFiltro(imageData){
        if(this.imgActual) {  
            ctx.putImageData(imageData, 0,0);
        }
    }

    filtroNegativo(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i+=4) {
            pixel[i ] = 255 - pixel[i]; // r
            pixel[i + 1] = 255 - pixel[i+1]; // g
            pixel[i+2] = 255 - pixel[i+2]; // b
        }
        this.agregarFiltro(imageData);
    }

    filtroBrillo(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i++) { 
            pixel[i] = pixel[i] +5; // r
            pixel[i + 1] = pixel[i+1]+5; // g
            pixel[i+2] = pixel[i+2]+5; // b 
        }
        this.agregarFiltro(imageData);
    }
    
    filtroGrices(){
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
        this.agregarFiltro(imageData);
    }

    filtroSepia(){
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
        this.agregarFiltro(imageData);
    }
    filtroBinarizacion(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i++) {
            let r =   pixel[i * 4];
            let g =   pixel[i * 4 + 1];
            let b =  pixel[i * 4 + 2];
            let promedio = ((r+g+b)/3);
            if(promedio > 128){
                pixel[i * 4] = 255;
                pixel[i * 4 + 1] = 255;
                pixel[i * 4 + 2] = 255;
            }else{
                pixel[i * 4] = 0;
                pixel[i * 4 + 1] = 0;
                pixel[i * 4 + 2] = 0;
            }
        }
        this.agregarFiltro(imageData);

    }

    quitarFiltro(){
        /* console.log("x: " + this.imgActual.xImgActual);
        console.log("y: " + this.imgActual.yImgActual);
        console.log("width: " + this.imgActual.widthImgActual);
        console.log("height: " + this.imgActual.heightImgAcual); */
       
        // obtengo los datos de la imagen actual , x,y,width,height y la propia imagen 
        let img = this.imgActual;
        let x = this.imgActual.xImgActual;
        let y = this.imgActual.yImgActual;
        let width = this.imgActual.widthImgActual;
        let height = this.imgActual.heightImgAcual;
        
        //vaciar el canvas, setear ultimo filtro como nulo y volver a dibujar la imagen
        this.init();
        this.ultimoFiltro = null;
        ctx.drawImage(img, x ,y,width,height)
    }

    filtroX(){
             
    }
}

