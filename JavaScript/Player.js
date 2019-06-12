class Player extends Matiere
{
    constructor(name, r)
    {
        super(100, 100, "rgb(0,0,0)", 0, 0, 2*r, 2*r, r);
        this.rayon = r;
        this.name = name;
    }
}