window.onload = init;

let gf;

function init()
{
    gf = new GameFramework();
    gf.init();
}


var calcDistanceToMove = function(delta, speed)
{
    return (speed * delta) / 1000;
};

/////////////////////////////////


function changeTimer(time)
{
    gf.changeTimerGameOver(time);
}

function putColor(c)
{
    gf.reset();
    gf.setColorMajoritaire(c);
    gf.creerDesMatieres(15);
}

function changeSpeed(s)
{
    console.log("vitesse modif : " + s);
    gf.changeGeneralSpeed(s);
}

