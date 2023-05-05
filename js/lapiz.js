class lapiz{
    constructor(posX,posY,fill,ctx,estilo,grosor){
        this.antX = posX;
        this.antY = posY;
        this.fill = fill;
        this.ctx = ctx;
        this.estilo = estilo;
        this.grosor = grosor;
    }

    moveTo(posX, posY){
        this.antX = this.posX;
        this.antY = this.posY;
        this.posX = posX;
        this.posY = posY;
    }

    draw(){
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.fill;
        this.ctx.lineWidth= grosor;
        this.ctx.lineCap = 'round';
        this.ctx.moveTo(this.antX,this.antY);
        this.ctx.lineTo(this.posX,this.posY);
        this.ctx.stroke();
        this.ctx.closePath();
    }
}