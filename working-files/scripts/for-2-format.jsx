/* Neuauflage Oktober 2021

Skript 2:   GREP-Abfragen mit Formatänderungen
                  Abweichungen löschen
                  Unbenutzte Formate und Farbfelder löschen
                  Kerning von Satzzeichen

Letzte Änderung: 16.06.2022 - Claudia Naef

*/

//Array mit allen Suchabfragen mit Formatänderungen 
// HIER KEINE ABWEICHUNGEN VON FORMATEN
var grepListFormat = [


// lange Absätze in "05_Fliesstext"
({findWhat:"^.{200,}$"}),
({appliedParagraphStyle:"05_Fliesstext"}),

// Times New Roman entfernen
({appliedFont:"Times New Roman"}),
({appliedFont:"Akkurat Pro", fontStyle:"Regular"}),

// Helvetica entfernen
({appliedFont:"Helvetica"}),
({appliedFont:"Akkurat Pro", fontStyle:"Regular"}),

// Helvetica Neue entfernen
({appliedFont:"Helvetica Neue"}),
({appliedFont:"Akkurat Pro", fontStyle:"Regular"}),

// rechtsbündiger Tab vor Autor (Kursiv)
({findWhat:"\\h{3,}(?=.+\\r)", fontStyle:"Italic"}), 
({changeTo:"~y"}),

// Rubriktitel mit falschen Absatzformat behalten
({pointSize:12}),
({appliedParagraphStyle:"01_Rubriktitel"}),
    
// Splitt 6: Niederhasli, Fehler markieren, wenn aus Kreus "=" wird  
({findWhat:"(?<=\\()=(?=\\s\\d+)"}),
({underline:true, underlineColor:"In_Abklaerung", underlineOffset:-3, underlineWeight:10}),

//  kursiv  in Zeichenformat "Kursiv_Schwarz"
({fontStyle:"Italic", fillColor:"Black"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// bold und blau in Zeichenformat "Bold_Blau"
({fontStyle:"Bold", fillColor:"C=100 M=0 Y=0 K=60"}),
({appliedCharacterStyle:"Bold_Blau"}),

// blau in Zeichenformat "Bold_Blau"
({fillColor:"C=100 M=0 Y=0 K=60"}),
({appliedCharacterStyle:"Bold_Blau"}),

// kursiv und schwarz bold in Zeichenformat "Bold_Kursiv_Schwarz" im Fliesstext
({fontStyle:"Bold Italic", fillColor:"Black", appliedParagraphStyle: "05_Fliesstext"}),
({appliedCharacterStyle:"Bold_Kursiv_Schwarz"}),

// bold und schwarz in Zeichenformat "Bold_Schwarz"
({fontStyle:"Bold", fillColor:"Black"}),
({appliedCharacterStyle:"Bold_Schwarz"}),

// bold und forumblau zu "Bold_Blau"
({fontStyle: "Bold", fillColor: "C=100 M=0 Y=0 K=60"}),
({appliedCharacterStyle: "Bold_Blau"}),

// Unterstreichungen zu "Bold_Schwarz" im Fliesstext
({underline:true, fillColor: "Black"}),
({appliedCharacterStyle:"Bold_Schwarz"}),

// 01_Rubriktitel harter Absatz zu weichem
({findWhat:"\\r(?=.*\\r)", appliedParagraphStyle:"01_Rubriktitel"}),
({changeTo:"\\n"}),

// Zeile vor Untertitel in 05_Fliesstext
({findWhat:"^\\r", appliedParagraphStyle:"02_Untertitel"}),
({appliedParagraphStyle:"05_Fliesstext"}),

// 02_Untertitel harter Absatz zu weichem
({findWhat:"\\r(?=.*\\r)", appliedParagraphStyle:"02_Untertitel"}),
({changeTo:"\\n"}),

// 05_Fliesstext weicher Umbruch in harten Umbruch
({findWhat:"\\n", appliedParagraphStyle:"05_Fliesstext"}),
({changeTo:"\\r"}),

// Hyperlinks und E-Mails in «Kursiv_Schwarz»
({findWhat:"((?<=(http|https|www))\\S*|\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Za-z]{2,6}\\b|(http|https|www)\\..*\\b)"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// Hyperlinks kursiv  in «Kursiv_Schwarz» (von ersten GREP nicht erfasst)
({findWhat:"https?://[\\u\\l\\/\\.]*\\.(com|de|ch|at)/?"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

//Hyperlinks kursiv in "Kursiv_Schwarz" (wenn nach Top-Level-Domain noch mehr kommt)
({findWhat:"www\\.[A-Za-z0-9.-]+?(com|de|ch|at)\\/[A-Za-z0-9-]*\\b"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// WWW-Adressen in "Kursiv_Schwarz"
({findWhat:"(www)?\\S+?\\.(de|ch|at)"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// E-Mail-Adressen kursiv
({findWhat:"([+\\-.\\w])+@\\w([-.\\w])+\\.\\w{2,4}"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// Blindzeilen zu 05_Fliesstext
({findWhat:"((?<=\\r)\\r|(?<=\\r\\r)\\r)"}),
({appliedParagraphStyle:"05_Fliesstext"}),

// forum "f" kursiv
({findWhat:"«\\Kf(?=orum»)"}),
({appliedCharacterStyle:"Kursiv_Schwarz"}),

// Forum "f" kursiv und klein
({findWhat:"\\b[Ff](?=orum\\s)"}),
({changeTo:"f", appliedCharacterStyle:"Kursiv_Schwarz"}),

//  orum nicht kursiv
({findWhat:"\\bf\\Korum\\b"}),
({appliedCharacterStyle:"[No character style]"}),

// Tab/Zeit/Tab/Text in Absatzformat 04_Gottesdienst_Zeiten
({findWhat:"^\\t[12]?[0-9]\\.[0-9][05]\\t[\\u\\l]{3,}", fontStyle:"Regular"}),
({appliedParagraphStyle:"04_Gottesdienste_Zeiten"}),

// Datum/Tab/Text in Absatzformat 04_Gottesdienst_Zeiten
({findWhat:"^[12]?[0-9]\\.1?[0-9]\\.\\t\\S+", fontStyle:"Regular"}),
({appliedParagraphStyle:"04_Gottesdienste_Zeiten"}),

// Leerzeile nach Rubriktitel entfernen 1
// unsichtbares Zeichen bei 01_Rubriktitel einfügen (Verschachteltes Format hier beenden)
({findWhat:"\\r", appliedParagraphStyle:"01_Rubriktitel"}),
({changeTo:"~h\\r"}),

// Leerzeile nach Rubriktitel entfernen 2
// Leerzeile nach 01_Rubriktitel entfernen
({findWhat:"~h\\r\\K\\r"}),
({changeTo:""}),

// Leerzeile nach Rubriktitel entfernen 3
// unsichtbares Zeichen wieder entfernen
({findWhat:"~h", appliedParagraphStyle:"01_Rubriktitel"}),
({changeTo:""}),

// Leerzeile vor Rubriktitel einfügen 1
// unsichtbares Zeichen vor 01_Rubriktitel einfügen (2x Verschachteltes Format hier beenden)
({findWhat:"^.", appliedParagraphStyle:"01_Rubriktitel"}),
({changeTo:"~h~h$0"}),

// Leerzeile vor Rubriktitel einfügen 2
//Leerzeile vor Rubriktitel einfügen
({findWhat:"(?<!\\r)\\r(?=~h~h)"}),
({changeTo:"\\r\\r"}),

// Leerzeile vor Rubriktitel einfügen 3
// unsichtbares Zeichen wieder entfernen
({findWhat:"~h", appliedParagraphStyle:"01_Rubriktitel"}),
({changeTo:""}),

// Leerzeile nach Untertitel entfernen 1
// unsichtbares Zeichen bei 02_Untertitel einfügen (Verschachteltes Format hier beenden)
({findWhat:"\\r", appliedParagraphStyle:"02_Untertitel"}),
({changeTo:"~h~h~h\\r"}),

// Leerzeile nach Untertitel entfernen 2
// Leerzeile nach 02_Untertitel entfernen
({findWhat:"~h~h~h\\r\\K\\r"}),
({changeTo:""}),

// Leerzeile nach Rubriktitel entfernen 3
// unsichtbares Zeichen wieder entfernen
({findWhat:"~h", appliedParagraphStyle:"02_Untertitel"}),
({changeTo:""}),


// Zeichenformat aus 02_Untertitel entfernen
({appliedParagraphStyle:"02_Untertitel"}),
({appliedCharacterStyle:"[No character style]"}),

// Zeichenformat aus 01_Rubriktitel entfernen
({appliedParagraphStyle:"01_Rubriktitel"}),
({appliedCharacterStyle:"[No character style]"}),

// Zeichenformat aus 02.2.0Untertitel_Kasten-Infobox
({appliedParagraphStyle:"02.2_Untertitel_Kasten-Infobox"}),
({appliedCharacterStyle:"[No character style]"}),

// Zentrierter Text markieren
({findWhat:"^(.+?)$", justification:1667591796}),
({changeTo:"((ZENTRIERT))$0((ZENTRIERT))"}),



]


var grepListTrack = [
// diverse Laufweiten verändern
// zusätzlich alle anderen Abweichungen von Formaten

// markierter "zentrierter Text" wieder zentrieren
({findWhat:"^\\(\\(ZENTRIERT\\)\\)(.+?)\\(\\(ZENTRIERT\\)\\)$"}),
({changeTo:"$1", justification:1667591796}),

// Laufweite auf -10 bei diversen Ausdrücken
({findWhat:"(Eucharistiefeier im Alterszentrum|Eucharistiefeier in kroat\\. Sprache|Eucharistiefeier auf Portugiesisch|Wortgottesfeier im Alterszentrum|Jeden Dienstag 7\\.30 Uhr Eucharistiefeier|Eucharistiefeier, St. Anna-Kapelle|MCLE Santa Misa \\(iglesia grande\\))"}),
({tracking:-10}),

// Laufweite auf -15 im 01_Rubriktitel
({findWhat:"(Mitteilungen\\/Veranstaltungen|Verschiedenes aus der Pfarrei)", appliedParagraphStyle:"01_Rubriktitel"}),
({tracking:-15}),

// Laufweite auf -5 im 01_Rubriktitel
({findWhat:"Veranstaltungen und Beiträge", appliedParagraphStyle:"01_Rubriktitel"}),
({tracking:-5}),

// Laufweite auf +25 im 02_Untertitel
({findWhat:"Verstorbene Pfarreiangehörige", appliedParagraphStyle:"02_Untertitel"}),
({tracking:25}),

// Laufweite auf -20 überall
({findWhat:"(Eucharistiefeier im Alterszentrum Adlergarten|MCLI Santa Messa \\(chiesa grande\\))"}),
({tracking:-20}),

// Laufweite auf -15 überall
({findWhat:"Gottesdienst Spital Limmattal"}),
({tracking:-15}),

// geschützer Leerraum bei Datum in Untertitel
({findWhat:"[12]?[0-9]\\.\\K\\h(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember)", appliedParagraphStyle:"02_Untertitel"}),
({changeTo:"$0", noBreak:true}),

// Infobox/Kasten pink markieren
({findWhat:"(\\(\\(.*\\)\\)|\\(\\(Infoboxanfang\\)\\)|\\(\\(Infoboxende\\)\\)|\\(\\(Kastenanfang\\)\\)|\\(\\(Kastenende\\)\\)|\\(\\(Kasten\\)\\)|\\(\\(Infobox\\)\\)|Info-Box: Beginn|Infoboxende|Kastenende|Infobox Anfang|Infobox Ende|Infoboxanfang|Kasten Anfang|Kasten Ende|Kastenanfang|(?<!.)kasten(?!.)|kastenende|(?<!.)infobox|infoboxende|Ende Rahmen|In Rahmen setzen:|Ende Rahmen:|Kastenbox|(?<!.)Infobox|(?<!.)Kasten|Rahmenanfang|Rahmenbeginn|Rahmenende|blauer Rahmen|(?<!.)Rahmen(?!.)|//RAHMENENDE|//RAHMEN|//KASTENENDE|//KASTEN|//INFOBOX|//INFOBOXANFANG|//INFOBOXENDE|Kasten-Ende)"}),
({fillColor:"In_Abklaerung"}),

// 3 Kafitässli
({findWhat:"(\\(LOGO\\)|Logo fraueziit 2020|Logo|3 Kafitässli|(?<!.)Bild(?!.))"}),
({fillColor: "In_Abklaerung"}),


]

//Loop mit allen Grep-Suchabfragen mit Formatänderungen
function grepFormatLoop (){
    for (i=0; i < grepListFormat.length; i++){
        grepOptionsFormat(grepListFormat[i], grepListFormat[i+1]);
        i++;
     }
}


//Loop mit allen Grep-Suchabfragen für das "Tracking"
function grepTrackLoop (){
    for (i=0; i < grepListTrack.length; i++){
        grepOptionsFormat(grepListTrack[i], grepListTrack[i+1]);
        i++;
     }
}

//Suchoptionen mit Formatänderungen
function grepOptionsFormat (findGrep, replaceGrep){

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findChangeGrepOptions.properties = ({ includeMasterPages:false, includeFootnotes: true, kanaSensitive: true, widthSensitive: true });

app.findGrepPreferences.properties = findGrep;
app.changeGrepPreferences.properties = replaceGrep;

app.activeDocument.changeGrep();

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

}



// falsche Absatzformate löschen und durch richtge ersetzen

function delStyle(){
    
    // richtiges Absatzformat 05_Fliesstext
    var newPS = app.activeDocument.paragraphStyles.itemByName("05_Fliesstext");  
    
    // Liste mit falschen Absatzformaten für 05_Fliesstext
    var oldPS = app.activeDocument.paragraphStyles.itemByName("Standard"); 
        try {
            oldPS.remove(newPS);
        } catch (e){};
    
    var oldPS1 = app.activeDocument.paragraphStyles.itemByName("Normal"); 
        try {
            oldPS1.remove(newPS);
        } catch (e){};
    
    var oldPS2 = app.activeDocument.paragraphStyles.itemByName("No Spacing"); 
        try {
            oldPS2.remove(newPS);
        } catch (e){};
    
    var oldPS3 = app.activeDocument.paragraphStyles.itemByName("Heading 1"); 
        try {
            oldPS3.remove(newPS);
        } catch (e){};
    
    var oldPS4 = app.activeDocument.paragraphStyles.itemByName("x_msonormal"); 
        try {
            oldPS4.remove(newPS);
        } catch (e){};
    
    var oldPS5 = app.activeDocument.paragraphStyles.itemByName("Normal"); 
        try {
            oldPS5.remove(newPS);
        } catch (e){};
    
    var oldPS6 = app.activeDocument.paragraphStyles.itemByName("Normale"); 
        try {
            oldPS6.remove(newPS);
        } catch (e){};
    
    var oldPS7 = app.activeDocument.paragraphStyles.itemByName("06_Fliesstext"); 
        try {
            oldPS7.remove(newPS);
        } catch (e){};
    
    var oldPS8 = app.activeDocument.paragraphStyles.itemByName("07_Fliesstext"); 
        try {
            oldPS8.remove(newPS);
        } catch (e){};
    
    var oldPS9 = app.activeDocument.paragraphStyles.itemByName("Plain Text"); 
        try {
            oldPS9.remove(newPS);
        } catch (e){};

  
    // Falsches Absatzformat für 04_Gottesdienste_Zeiten
    var oldPS10 = app.activeDocument.paragraphStyles.itemByName("05_Gottesdienste_Zeiten"); 
    
    // Richtiges Absatzformat 04_Gottesdienst_Zeiten
    var newPS1 = app.activeDocument.paragraphStyles.itemByName("04_Gottesdienste_Zeiten");
        try {
            oldPS10.remove(newPS1);
        } catch (e){};

    // Falsches Absatzformat für 08_Aufzaehlung_Punkte
    var oldPS11 = app.activeDocument.paragraphStyles.itemByName("08_Aufzaehlung"); 
    
    // Richtiges Absatzformat 08_Aufzahlung_Punkte
    var newPS2 = app.activeDocument.paragraphStyles.itemByName("08_Aufzaehlung_Punkte");  
        try {
            oldPS11.remove(newPS2);
        } catch (e){};
    


    // Liste mit falschen Zeichenformaten
    var oldCS = app.activeDocument.characterStyles.itemByName("Hyperlink");
    
    // wird ersetzt mit Zeichenformat
    var newCS = app.activeDocument.characterStyles.itemByName("Kursiv_Schwarz");
        try {
            oldCS.remove(newCS);
        } catch (e){};
}




// Liste mit falschen Farbfeldern (blau)
var oldBlau = [
    "R=31 G=73 B=125",
    "Blue",
    "C=100 M=79 Y=0 K=0",
    "R=0 G=0 B=225",
    "R=0 G=112 B=192",
    "R=31 G=78 B=121",
    "R=46 G=116 B=181",
    "R=47 G=84 B=150",
    "R=47 G=84 B=150",
    "R=54 G=95 B=145",
    "R=68 G=114 B=196",
    "Word_R0_G0_B225",
    "Word_R0_G112_B192",
    "Word_R31_G56_B100",
    "Word_R31_G73_B125",
    "Word_R31_G78_B121",
    "Word_R46_G116_B181",
    "Word_R47_G84_B150",
    "Word_R47_G84_B150",
    "Word_R54_G95_B145",
    "Word_R68_G114_B196",

    ]
    
// Funktion Blau ersetzen mit Forum Blau    
function delBlau (searchBlau){
    var delCol = app.activeDocument.colors.itemByName(searchBlau);
    var forumBlau = app.activeDocument.colors.itemByName("C=100 M=0 Y=0 K=60");
    try {
        delCol.remove(forumBlau.name);
    } catch (e){};
    
}

// Loop mit "delBlau"
function delBlauLoop (){
    for (i=0; i < oldBlau.length; i++){
        delBlau(oldBlau[i]);
     }
}    
    

// Alle RGB-Felder löschen
 function delRGB(){
	 var myDoc = app.activeDocument;
     
        try {
            var myTestColor = myDoc.colors.itemByName("In_Abklaerung");
            var myTestColorSpace = myTestColor.space;
        }catch (e) {}
        
	 var allSwatchesSpace = myDoc.swatches[0].properties.space;
	 var allSwatches = myDoc.swatches.length;
	 var counter = 0;          
     
	 for (var i=allSwatches-1; i>-1; i--) {
        if (myDoc.swatches[i].properties.space ==  myTestColorSpace && myDoc.swatches[i].name !=="In_Abklaerung" ) {
            try {
                myDoc.swatches[i].remove();
                counter++;
                }
		 catch (e) {
		 }
    }
 }
}

// Abweichungen löschen
function clearOverrides(){
	if (app.selection.length > 0) {
		var myObject = app.selection[0].parentStory;
	} else {
		var myObject = app.activeDocument.stories.everyItem();
	}
	myObject.clearOverrides(OverrideType.all);
}

// Kerning von ! ? : ; ) } ] » % ‰ « ( { [ *
function kerningSpatium(kPair, kValue) {
    app.findGrepPreferences = app.changeGrepPreferences = null;
    // finde alle Vorkommen von kPairs
	app.findGrepPreferences.findWhat = kPair;
	var myPairs = app.activeDocument.findGrep();
	// füge kValue nach dem Zeichen ein.
	for (var i = 0; i < myPairs.length; i++){
        myPairs[i].insertionPoints[1].kerningValue = 40;
    }
    app.findGrepPreferences = NothingEnum.nothing;
    app.changeGrepPreferences = NothingEnum.nothing;
}

// ((live)) durch Bild ersetzen (Skriptetikett muss vorhanden sein)
function replaceStream(){ 
        // alle Objekte in Array
        var allItems = app.documents[0].pageItems.everyItem().getElements();
        
        // mit Loop nach "STREAM" im Skriptetikett suchen 
        function getStreamLabel (){
            for (i=0; i < allItems.length; i++){
                $.writeln(i);
                $.writeln(allItems[i].label);
                    if (allItems[i].label === "STREAM") {
                        // wenn "STREAM" gefunden -> Objekt auswählen und kopieren (Zwischenspeicher)
                        var selectStream = allItems[i].select();
                        app.copy();
                    } else {
                }
            }
        }




        //Suchoptionen mit Formatänderungen
        function grepOptionsFormat (findGrep, replaceGrep){

        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;

        app.findChangeGrepOptions.properties = ({ includeMasterPages:false, includeFootnotes: true, kanaSensitive: true, widthSensitive: true });

        app.findGrepPreferences.properties = findGrep;
        app.changeGrepPreferences.properties = replaceGrep;

        app.activeDocument.changeGrep();

        app.findGrepPreferences = NothingEnum.nothing;
        app.changeGrepPreferences = NothingEnum.nothing;

        }

        getStreamLabel();
        // Suchen nach ((live)), ändern in: Inhalt der Zwischenablage, unformatiert mit einem Grundlinienversatz
        grepOptionsFormat(({findWhat:"\\(\\(live\\)\\)"}), ({changeTo:"~C", baselineShift:-1.5}));
        
    }




delBlauLoop();
delRGB();
grepFormatLoop();
delStyle();
clearOverrides();
grepTrackLoop();
kerningSpatium('(.(?=:)|.(?=\\))|.(?=\\*)|.(?=\\})|.(?=\\])|.(?=;)|.(?=»)|.(?=%)|.(?=‰)|.(?=!)|.(?=\\?)|«|\\(|«|\\{|«|\\[)', 40)
replaceStream();

