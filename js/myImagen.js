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
            let newX = 0;
            let newY = 0;
            let xImg;
            let yImg;

            // si la imagen es mas alta o mas ancha que el canvas entro al if sino entro al else
            if(imgWidth >= canvasWidth || imgHeight >= canvasHeight){
                // si la imagen es horizontal (mas ancha que alta) entro al if sino entro al else
                if(imgWidth > imgHeight){ 
                    ratio = imgWidth/canvasWidth;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newY = ((canvasHeight- imgHeight)/ 2 );
                }else{
                    ratio = imgHeight / canvasHeight;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                    newX =((canvasWidth - imgWidth) /2);
                }
          
                ctx.drawImage(this, newX ,newY,newWidth,newHeight)
            }else{ 
                newWidth = imgWidth;
                newHeight = imgHeight;
                newX = (canvasWidth-imgWidth)/2;
                newY = (canvasHeight- imgHeight) / 2;
                ctx.drawImage(this, newX ,newY,newWidth,newHeight);
            }
            
            /*  guardo la imagen en una copia.
                guardo los valores de:  x, y de la imagen en una copia
                para poder usarlos cuando lo necesite fuera del onload
            */
                this.xImg = newX;
                this.yImg = newY;
        }
        this.imgActual = imagen;
    }

     /*--------------------------------------------------------------- filtros ----------------------------------------------------------------------*/
    
    agregarFiltro(imageData){
        // aplico el filtro si la imgActual es != null
        if(this.imgActual) {  
            ctx.putImageData(imageData, this.imgActual.xImg,this.imgActual.yImg);
        }
    }

    filtroNegativo(imageData,pixel){
        for (let i = 0; i < pixel.length; i+=4) {
            pixel[i ] = 255 - pixel[i]; // r
            pixel[i + 1] = 255 - pixel[i+1]; // g
            pixel[i+2] = 255 - pixel[i+2]; // b
        }
        this.agregarFiltro(imageData);
    }

    filtroBrillo(imageData,pixel){
        for (let i = 0; i < pixel.length; i++) { 
            pixel[i] = pixel[i] +5; // r
            pixel[i + 1] = pixel[i+1]+5; // g
            pixel[i+2] = pixel[i+2]+5; // b 
        }
        this.agregarFiltro(imageData);
    }
    
    filtroGrices(imageData,pixel){
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

    filtroSepia(imageData,pixel){
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

    filtroBinarizacion(imageData,pixel){
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
        // obtengo los datos de la imagen actual , x,y,width,height y la propia imagen 
        let img = this.imgActual;
        let x = this.imgActual.xImg;
        let y = this.imgActual.yImg;
        let width = this.imgActual.width;
        let height = this.imgActual.height;
        
        //vaciar el canvas, setear ultimo filtro como nulo y volver a dibujar la imagen
        this.init();
        this.ultimoFiltro = null;
        ctx.drawImage(img,x,y,width,height)
    }

    /*----------------------------------------------------------- filtros avanzados -------------------------------------------------------------------*/
    filtroBlur(imageData,input_pixels){
        let box_kernel = [  [1 / 9, 1 / 9, 1 / 9],
                            [1 / 9, 1 / 9, 1 / 9],
                            [1 / 9, 1 / 9, 1 / 9]];

        let gaussian_kernel = [ [1 / 256, 4  / 256,  6 / 256,  4 / 256, 1 / 256],
                                [4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256],
                                [6 / 256, 24 / 256, 36 / 256, 24 / 256, 6 / 256],
                                [4 / 256, 16 / 256, 24 / 256, 16 / 256, 4 / 256],
                                [1 / 256, 4  / 256,  6 / 256,  4 / 256, 1 / 256]];

        let kernel = box_kernel;
        let offset = Math.floor((kernel.length) / 2);

        for (let x = offset; x < this.imgActual.width - offset; x++) {
            for (let y = offset; y < this.imgActual.height - offset; y++) {
                let acc = [0,0,0];
                
                for (let a = 0; a < kernel.length; a++) {
                    for (let b = 0; b < kernel.length; b++) {
                        let xn = x + a - offset;
                        let yn = y + b - offset; 
                        
                        const pixel = (xn + yn * this.imgActual.width) * 4;

                        acc[0] += input_pixels[pixel] * kernel[a][b];
                        acc[1] += input_pixels[pixel + 1] * kernel[a][b];
                        acc[2] += input_pixels[pixel + 2] * kernel[a][b];
                      
                    }
                }
                input_pixels[(x + y * this.imgActual.width) * 4] = acc[0];
                input_pixels[(x + y * this.imgActual.width) * 4 + 1] = acc[1];
                input_pixels[(x + y * this.imgActual.width) * 4 + 2] = acc[2]; 
            }
        }
        this.agregarFiltro(imageData);
    }

    filtroBordes(imageData,input_pixels){
        let kernelx = [ [-1, 0, 1],
                        [-2, 0, 2],
                        [-1, 0, 1]];

        let kernely = [ [-1,-2,-1],
                        [ 0, 0, 0],
                        [ 1, 2, 1]];

        let intensity = [];
        for (let x = 0; x < imageData.width; x++) {
            intensity[x] = [];
            for (let y = 0; y < imageData.height; y++) {
                const pixel = ((x + y * this.imgActual.width) * 4); 
                let r = input_pixels[pixel];
                let g = input_pixels[pixel + 1];
                let b = input_pixels[pixel + 2];   

                intensity[x][y] = (r+g+b) / 3;
            }
        }

        for (let x = 1; x < this.imgActual.width - 1; x++) {
            for (let y = 1; y < this.imgActual.height - 1; y++) {
                let magX = 0;
                let magY = 0;
                
                for (let a = 0; a < 3; a++) {
                    for (let b = 0; b < 3; b++) {
                        let xn = x + a - 1;
                        let yn = y + b - 1; 

                        magX += (intensity[xn][yn] * kernelx[a][b]);
                        magY += (intensity[xn][yn] * kernely[a][b]);
                    }
                }
                
                let color = parseInt(Math.sqrt(magX*magX + magY*magY));
                imageData.data[(x + y * this.imgActual.width) * 4] = color;
                imageData.data[(x + y * this.imgActual.width) * 4 + 1] = color;
                imageData.data[(x + y * this.imgActual.width) * 4 + 2] = color; 
            }
        }
        this.agregarFiltro(imageData);
    }


    filtroX(){

    }
}

