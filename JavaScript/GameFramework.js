function GameFramework()
{
    let canvas, ctx, w, h, colorMajoritaire;
    let tableauBoules = [];
    let inputStates = {};
    let score = 0;
    let player = new Player(0,20);
    let delta, oldTime = 0;
    let bulletin = new Bulletin();

    // Constabtes
    let SCORE_TEXT_X = 30;
    let SCORE_TEXT_Y = 30;
    let TIMER_MS = 30 * 1000; //


    function init()
    {
        canvas = document.querySelector("#myCanvas");
        ctx = canvas.getContext("2d");
        w = canvas.width;
        h = canvas.height;
        fpsContainer = document.getElementById('fpsContainer');
        TIMER_MS = document.getElementById("timer").value * 1000;

        changeGraphicalTimeLeft();

        /*****************
             Listener
         ******************/
        canvas.addEventListener('mousemove', function (evt)
        {
            inputStates.mousePos = getMousePos(evt);
        }, false);

        canvas.addEventListener('click', function (event)
        {
            let coordonnees = getMousePos(event);
            let collision = false;

            tableauBoules.forEach(function(boule)
            {
                if(circleCollide(coordonnees.x, coordonnees.y, player.boundingradius, boule.x, boule.y, boule.boundingradius))
                {
                    collision = true;
                    score += 1;

                    tuerBoule(boule);

                    //Recreation de boules
                    if(tableauBoules.length === 0)
                    {
                        creerDesMatieres(20);
                    }
                }
            });

            ctx.font="30px Arial";
            ctx.fillText(score, SCORE_TEXT_X, SCORE_TEXT_Y);

            if (collision)
                ctx.strokeStyle = ctx.fillStyle = 'red';
            else
                ctx.strokeStyle = ctx.fillStyle = 'black';

        }, false);

        let r = Math.round(255 * Math.random());
        let g = Math.round(255 * Math.random());
        let b = Math.round(255 * Math.random());
        colorMajoritaire = "rgb(" + r + "," + g + "," + b + ")";

        creerDesMatieres(20);

        createTimer();

        requestAnimationFrame(anime);
    }
    // vars for counting frames/s, used by the measureFPS function
    var frameCount = 0;
    var lastTime;
    var fpsContainer;
    var fps;

    var measureFPS = function(newTime)
    {

        // test for the very first invocation
        if(lastTime === undefined)
        {
            lastTime = newTime;
            return;
        }

        //calculate the difference between last & current frame
        var diffTime = newTime - lastTime;

        if (diffTime >= 1000)
        {
            fps = frameCount;
            frameCount = 0;
            lastTime = newTime;
        }

        //and display it in an element we appended to the
        // document in the start() function
        fpsContainer.innerHTML = 'FPS: ' + fps;
        frameCount++;
    };


    function timer(currentTime)
    {
        var delta = currentTime - oldTime;
        oldTime = currentTime;
        return delta;
    }

    function anime(time)
    {
        measureFPS(time);
        delta = timer(time);
        ctx.clearRect(0, 0, w, h);

        tableauBoules.forEach(function(r)
        {
            r.draw(ctx);
            r.move(delta);
            r.testeCollisionZone(w, h);
        });
        //player.draw(ctx);
        //player.move(delta);
        //player.testeCollisionZone(w, h);
        collisionTestBetweenBalls();
        updatePlayer();
        checkCollisions();
        requestAnimationFrame(anime);
    }
    

    function collisionTestBetweenBalls()
    {
        var balls = tableauBoules;

        for (var i = 0; i < tableauBoules.length; i++)
        {
            for (var j = i + 1; j < tableauBoules.length; j++)
            {
                var dx = balls[j].x - balls[i].x;
                var dy = balls[j].y - balls[i].y;

                var dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < (balls[j].rayon + balls[i].rayon))
                {
                    // balls have contact so push back...
                    var normalX = dx / dist;
                    var normalY = dy / dist;
                    var middleX = (balls[i].x + balls[j].x) / 2;
                    var middleY = (balls[i].y + balls[j].y) / 2;

                    balls[i].x = middleX - normalX * balls[i].rayon;
                    balls[i].y = middleY - normalY * balls[i].rayon;
                    balls[j].x = middleX + normalX * balls[j].rayon;
                    balls[j].y = middleY + normalY * balls[j].rayon;

                    var dVector = (balls[i].vitesseX - balls[j].vitesseX) * normalX;
                    dVector += (balls[i].vitesseY - balls[j].vitesseY) * normalY;
                    var dvx = dVector * normalX;
                    var dvy = dVector * normalY;

                    balls[i].vitesseX -= dvx;
                    balls[i].vitesseY -= dvy;
                    balls[j].vitesseX += dvx;
                    balls[j].vitesseY += dvy;
                }
            }
        }
    }

    function updatePlayer()
    {
        // The player is just a circle, drawn at the mouse position
        // Just to test circle/circle collision.

        if(inputStates.mousePos)
        {
            player.x = inputStates.mousePos.x;
            player.y = inputStates.mousePos.y;

            // draws a circle
            ctx.beginPath();
            ctx.arc(player.x, player.y, player.boundingradius, 0, 2*Math.PI);
            ctx.stroke();
        }
    }

    function checkCollisions()
    {
        let collision = false;

        tableauBoules.forEach(function(r)
        {
            if(circleCollide(player.x, player.y, player.boundingradius, r.x, r.y, r.boundingradius))
            {
                // Draw everything in red
                collision = true;
            }
        });

        ctx.font="30px Arial";
        ctx.fillText(score, SCORE_TEXT_X, SCORE_TEXT_Y);

        if (collision)
            ctx.strokeStyle = ctx.fillStyle = 'red';
        else
            ctx.strokeStyle = ctx.fillStyle = 'black';
    }

    function circleCollide(x1, y1, r1, x2, y2, r2)
    {
        var dx = x1 - x2;
        var dy = y1 - y2;
        return ((dx * dx + dy * dy) < (r1 + r2)*(r1+r2))
    }

    function getMousePos(evt)
    {
        // necessary to take into account CSS boudaries
        var rect = canvas.getBoundingClientRect();
        return {
            x: evt.clientX - rect.left,
            y: evt.clientY - rect.top
        };
    }

    function creerDesMatieres(n)
    {
        let matInfo = ["POO", "COO", "BD", "Système", "JavaScript", "PHP"];
        let matLangue = ["Anglais", "Italien", "Japonais"];
        let matNonInfo = ["Communication", "Comptabilité", "Marketing", "Gestion"];

        for(let i = 0; i < n; i++)
        {
            let x = w * Math.random();
            let y = h *Math.random();

            let couleur;

            let bool = (Math.random() < 0.5);
            if (bool)
            {
                let r = Math.round(255 * Math.random());
                let g = Math.round(255 * Math.random());
                let b = Math.round(255 * Math.random());
                couleur = "rgb(" + r + "," + g + "," + b + ")";
            }
            else
            {
                couleur = colorMajoritaire;
            }

            let vx = 10 * Math.random();
            let vy = 10 * Math.random();
            let rayon = 20+60*Math.random();

            let t = Math.random();

            if (t<0.33)
            {
                let nomMatiere = matInfo[Math.floor(Math.random() * (matInfo.length))];
                tableauBoules.push(new MatiereInformatique(x, y, rayon, couleur, vx, vy, nomMatiere,rayon));
            }
            else if (t<0.66)
            {
                let nomMatiere = matLangue[Math.floor(Math.random() * (matLangue.length))];
                tableauBoules.push(new MatiereLangue(x, y, rayon, couleur, vx, vy, nomMatiere,rayon));
            }
            else
            {
                let nomMatiere =   matNonInfo[Math.floor(Math.random() * (matNonInfo.length))];
                tableauBoules.push(new MatiereGestion(x, y, rayon, couleur, vx, vy, nomMatiere, rayon));
            }
        }
    }

    function setColorMajoritaire(c)
    {
        colorMajoritaire = c;
        console.log("C :" + c + "colormajoritaire : " + colorMajoritaire);
    }
    function changeGeneralSpeed (s)
    {
        tableauBoules.forEach(function(e)
        {
            e.changerVitesse(s);
        });
    }

    function reset()
    {
        tableauBoules = [];
    }

    function tuerBoule(boule)
    {
        let nomMatiere = boule.nomMatiere;
        bulletin.ajouterPoint(nomMatiere);

        // Suppresion du tableau  voir -> https://blog.mariusschulz.com/2016/07/16/removing-elements-from-javascript-arrays
        let indexElement = tableauBoules.indexOf(boule);
        tableauBoules.splice(indexElement, 1)
    }

    function createTimer()
    {
        setTimeout(function ()
        {
            launchGameOver();
        }
        , TIMER_MS);
    }

    function launchGameOver()
    {
        // Je supprime toute les boules
        tableauBoules = [];

        bulletin.printHTMLBulletin();
    }

    function changeTimerGameOver(time)
    {
        TIMER_MS = time * 1000;
        console.log(TIMER_MS);
    }

    function changeGraphicalTimeLeft()
    {
        setInterval(decreaseTimer, 1000);
    }

    let secondes = ((TIMER_MS/1000));
    function decreaseTimer()
    {
        if(secondes > 0)
            --secondes;
        else
            secondes = 0;

        document.getElementById("timeLeft").innerHTML = "Time left : " + secondes;
    }

    return {
        init:init,
        reset:reset,
        creerDesMatieres:creerDesMatieres,
        setColorMajoritaire:setColorMajoritaire,
        changeGeneralSpeed:changeGeneralSpeed,
        changeTimerGameOver:changeTimerGameOver,
        updatePlayer:updatePlayer

    }
}