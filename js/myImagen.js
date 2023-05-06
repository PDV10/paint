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
                if(imgWidth> imgHeight){
                    ratio = imgWidth/canvasWidth;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                }else{
                    ratio = imgHeight / canvasHeight;
                    newWidth = imgWidth/ratio;
                    newHeight = imgHeight/ratio;
                }
                ctx.drawImage(this, 0 ,0,newWidth,newHeight)
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
       /*  if(imagen != null) */
        ctx.putImageData(imageData, 0,0);
        
    }
    
}

