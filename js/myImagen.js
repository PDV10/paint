class MyImagen{
    constructor(ctx,canvasWidth,canvasHeight){
        this.ctx = ctx;
        this.width = canvasWidth;
        this.height = canvasHeight;
    }

    init(){
        ctx.fillStyle = 'white';  
        ctx.fillRect(0,0,canvasWidth,canvasHeight);
    }

    cargarImagen(e){
        this.init();
        let origWidth = this.width;
        let origHeight = this.height;
        let imagen = new Image();
        imagen.src = URL.createObjectURL(e.target.files[0]);
        imagen.onload = function(){
            
        let canvasWidth = origWidth;
        let canvasHeight = origHeight;
        let imgWidth = imagen.width;
        let imgHeight = imagen.height;
        let newWidth = null;
        let newHeight = null;
        let ratio = null;
        let newX = null;
        let newY = null;
            if(imgWidth >= canvasWidth || imgHeight >= canvasHeight){
                if(imgWidth> imgHeight){ // imagenes horizontales mas grandes que canvas
                    ratio = imgWidth/canvasWidth;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newX = 0;
                    newY = ((canvasHeight- imgHeight) );
                }else{// imagenes verticales mas grandes que canvas
                    ratio = imgHeight / canvasHeight;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newX = canvasWidth - imgWidth / 2;
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
        }
    }

    negativo(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i+=4) {
            pixel[i ] = 255 - pixel[i]; // r
            pixel[i + 1] = 255 - pixel[i+1]; // g
            pixel[i+2] = 255 - pixel[i+2]; // b
        }
        /* if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
    }

    filtroDeBrillo(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i++) { 
            pixel[i] = pixel[i] +5; // r
            pixel[i + 1] = pixel[i+1]+5; // g
            pixel[i+2] = pixel[i+2]+5; // b 
        }
      /*   if(imagen != null) */{
            ctx.putImageData(imageData, 0,0);
        }
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
      /*   if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
    }

    filtroDeSepia(){
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
      /*   if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
    }
     filtroDeBinarizacion(){
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
      /*   if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
    }

     filtro(){
        let imageData = ctx.getImageData(0, 0, canvasWidth, canvasHeight);
        let pixel = imageData.data;
        for (let i = 0; i < pixel.length; i++) {
            let r =   pixel[i * 4];
            let g =   pixel[i * 4 + 1];
            let b =  pixel[i * 4 + 2];
            let promedio = (Math.max(r,g,b));
            pixel[i * 4] = r*promedio;
            pixel[i * 4+2] =g*promedio; 
            pixel[i * 4+2] =b*promedio;
            
        }
        /* if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
    }
}

