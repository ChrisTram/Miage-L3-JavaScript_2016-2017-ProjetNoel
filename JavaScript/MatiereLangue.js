class MatiereLangue extends Matiere
{
    constructor(posx, posy, r, coul, vx, vy, nomMatiere, bg)
    {
        super(posx, posy, r, coul, vx, vy, nomMatiere, bg);
    }

    draw(ctx)
    {
        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = this.couleur;
        ctx.beginPath();
        ctx.arc(0, 0, this.rayon, 0, 2*Math.PI);
        ctx.fill();
        ctx.strokeStyle = "black";
        ctx.stroke();

        //texte
        let fontSize = 20;
        ctx.font=  fontSize + "px Arial";
        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.fillText(this.nomMatiere, 0, fontSize/2);

        ctx.restore();
    }
}

