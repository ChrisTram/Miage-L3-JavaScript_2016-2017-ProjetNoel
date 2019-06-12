class ObjetGraphique
{
    constructor(posx, posy, coul, vx, vy, w, h, bg) {
        this.x = posx;
        this.y = posy;
        this.couleur = coul;
        this.vitesseX = vx;
        this.vitesseY = vy;
        this.width = w;
        this.height = h;
        this.boundingradius = bg;
    }

    draw(ctx) {
        ctx.save();
        ctx.fillStyle = "black";
        ctx.fillRect(this.x, this.y, 2, 2);
        ctx.restore();
    }

    move( delta) {
        this.x += this.vitesseX;
        this.y += this.vitesseY;
        this.x += calcDistanceToMove(delta, this.vitesseX);
        this.y += calcDistanceToMove(delta, this.vitesseY);
    }

    inverseSensDeplacementX() {
        this.vitesseX = -this.vitesseX;
    }

    inverseSensDeplacementY() {
        this.vitesseY = -this.vitesseY;
    }

    changerVitesse(s) {
        console.log("Ancienne vitesse : " + this.vitesseX);
        console.log("Vitesse ajoutée : " + s);
        //X
        if (this.vitesseX > 0) {
            if ((this.vitesseX - 1) < 0 && eval(s) === -1) {
                this.vitesseX = 0.2;
            } else {
                this.vitesseX += eval(s);
            }
        }
        if (this.vitesseX < 0) {
            if ((this.vitesseX + 1) > 0 && eval(s) === -1) {
                this.vitesseX = -0.2;
            } else {
                this.vitesseX -= eval(s);
            }
        }
        //Y
        if (this.vitesseY > 0) {
            if ((this.vitesseY - 1) < 0 && eval(s) === -1) {
                this.vitesseY = 0.2;
            } else {
                this.vitesseY += eval(s);
            }
        }
        if (this.vitesseY < 0) {
            if ((this.vitesseY + 1) > 0 && eval(s) === -1) {
                this.vitesseY = -0.2;
            } else {
                this.vitesseY -= eval(s);
            }
        }
        console.log("Nouvelle vitesse : " + this.vitesseX);
    }
}