function Bulletin()
{
    let listeMatieres =
        [
            ["Anglais", 0],
            ["BD", 0],
            ["Communication", 0],
            ["Comptabilité", 0],
            ["COO", 0],
            ["Marketing", 0],
            ["Gestion", 0],
            ["Italien", 0],
            ["Japonais", 0],
            ["Systèmes", 0],
            ["POO", 0],
            ["PHP", 0],
            ["JavaScript", 0]
        ];

    function ajouterPoint(matiere)
    {
        for (let i = 0; i < listeMatieres.length; i++)
        {
            let nomMatiere = listeMatieres[i][0];

            if(nomMatiere === matiere)
            {
                listeMatieres[i][1] += Math.floor(Math.random() * (7 - 5) + 5);
            }
        }
    }

    function getMoyenneMatiere(matiere)
    {
        let retour = 0;

        for (let i = 0; i < listeMatieres.length; i++)
        {
            if(listeMatieres[i][0] === matiere)
            {
               let laMoyenne = listeMatieres[i][1];

               // Pour éviter d'avoir des problèmes si génération de trop de boules matières
               if(laMoyenne >= 20)
               {
                   laMoyenne = 20;
               }

               retour = laMoyenne;
            }
        }

        return retour;
    }

    function getMoyenneGenerale()
    {
        let cumulNotes = 0;
        let nbMatiere = 0;

        listeMatieres.forEach(function (matiere)
        {
           cumulNotes += matiere[1];
           ++nbMatiere;
        });

        return Math.floor(cumulNotes/nbMatiere);
    }

    function getHTMLBulletin()
    {
        let laDiv = document.createElement("div");

        //Infos préalables
        let paragraphe = document.createElement("p");
        let boldGO = document.createElement("b");
        let breakHtml = document.createElement("br");
        boldGO.innerHTML = "GAME OVER !";
        paragraphe.appendChild(boldGO);
        paragraphe.appendChild(breakHtml);
        paragraphe.appendChild(breakHtml);
        let blabla = document.createTextNode("Votre moyenne générale est de ");
        paragraphe.appendChild(blabla);
        let boldMoyenne = document.createElement("b");
        boldMoyenne.innerHTML = getMoyenneGenerale() + "/20";
        paragraphe.appendChild(boldMoyenne);
        paragraphe.appendChild(breakHtml);
        let encouragement = document.createTextNode("N'hésitez pas à recommencer pour tenter d'avoir de meilleurs notes");
        paragraphe.appendChild(encouragement);

        //Première Ligne
        let tableau = document.createElement("table");

        let tableHead = ["Matière", "Moyenne"];
        let firstLine = document.createElement("tr");

        tableHead.forEach(function (data)
        {
            let cellule = document.createElement("th");
            let texte = document.createTextNode(data);

            cellule.appendChild(texte);
            firstLine.appendChild(cellule);
        });

        tableau.appendChild(firstLine);

        // Matières
        listeMatieres.forEach(function (matiere)
        {
            let ligne = document.createElement("tr");

            let cellule0 = document.createElement("td");
            let textMatiere = document.createTextNode(matiere[0]);
            cellule0.appendChild(textMatiere);
            ligne.appendChild(cellule0);

            let cellule1 = document.createElement("td");
            let note = getMoyenneMatiere(matiere[0]);
            let textNote = document.createTextNode(note + "/20");

            if(note <= 7)
                ligne.className = "badGrade";
            else if(note <= 13)
                ligne.className = "mediumGrade";
            else if(note <= 20)
                ligne.className = "goodGrade";

            cellule1.appendChild(textNote);
            ligne.appendChild(cellule1);

            tableau.appendChild(ligne);
        });

        laDiv.appendChild(paragraphe);
        laDiv.appendChild(tableau);

        return laDiv;
    }

    function printHTMLBulletin()
    {
        document.getElementById("bulletin").appendChild(getHTMLBulletin());
    }

    return{
        ajouterPoint:ajouterPoint,
        getMoyenneGenerale:getMoyenneGenerale,
        getMoyenneMatiere:getMoyenneMatiere,
        printHTMLBulletin:printHTMLBulletin
    }
}