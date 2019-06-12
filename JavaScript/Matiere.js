class Matiere extends ObjetGraphique
{
    constructor(posx, posy, r, coul, vx, vy, nomMatiere, bg)
    {
        super(posx, posy, coul, vx, vy, 2*r, 2*r);
        this.rayon = r;
        this.boundingradius =bg;
        this.nomMatiere = nomMatiere;
    }

    testeCollisionZone(w, h)
    {
        // Mur de droite
        if((this.x+this.width/2) >  w) {
            this.x = w - this.width/2;
            this.inverseSensDeplacementX();
        }

        // mur de gauche
        if((this.x-this.width/2) < 0) {
            this.x = this.width/2;
            this.inverseSensDeplacementX();
        }

        // en bass
        if((this.y+this.height/2) >  h) {
            this.y = h - this.height/2;
            this.inverseSensDeplacementY();
        }

        // en haut
        if((this.y-this.height/2) < 0) {
            this.y = this.height/2;
            this.inverseSensDeplacementY();
        }
    }

}
