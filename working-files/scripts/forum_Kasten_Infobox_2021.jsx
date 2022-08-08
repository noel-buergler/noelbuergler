// 16.06.2022 - \\h*  vor und nach allen Begriffen bei der Vereinheitlichung

// Vereinheitlichung
try {
    app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
    app.findGrepPreferences.properties = ({findWhat:"\\h*(\\(\\(Infoboxanfang\\)\\)|\\(\\(Infobox\\)\\)|\\(\\(INFOBOX\\)\\)|\\(\\(INFOBOXANFANG\\)\\)|(?<!\\(\\()Infobox Anfang|(?<!\\(\\()Infoboxanfang|(?<!\\(\\()infobox|(?<!.)infobox|Infoboxanfang|Info-Box: Beginn|In Rahmen setzen:|Rahmenanfang|Rahmenbeginn|blauer Rahmen|(?<!.)Rahmen(?=(\\n|\\r))|//RAHMEN|//INFOBOX|//INFOBOXANFANG)\\h*"});
    app.changeGrepPreferences.properties = ({changeTo:"Infobox"});
    app.changeGrep();
  } catch (e) {alert(e + ' at line ' + e.line)}
  app.findGrepPreferences = NothingEnum.NOTHING;
  app.changeGrepPreferences = NothingEnum.NOTHING;
  try {
      app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
      app.findGrepPreferences.properties = ({findWhat:"\\h*(\\(\\(Infoboxende\\)\\)|Ende Rahmen:|\\(\\(INFOBOXENDE\\)\\)|(?<!\\(\\()Infobox Ende|(?<!\\(\\()infoboxende|Rahmenende|//RAHMENENDE|//INFOBOXENDE)\\h*"});
      app.changeGrepPreferences.properties = ({changeTo:"Infoboxende"});
      app.changeGrep();
    } catch (e) {alert(e + ' at line ' + e.line)}
    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;
    try {
        app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
        app.findGrepPreferences.properties = ({findWhat:"\\h*(\\(\\(Kastenanfang\\)\\)|\\(\\(KASTEN\\)\\)|\\(\\(kasten\\)\\)|\\(\\(KASTENANFANG\\)\\)|\\(\\(Kasten\\)\\)|(?<!\\(\\()Kasten Anfang|(?<!\\(\\()Kastenanfang|(?<!.)kasten(?!.)|Kastenbox|//KASTEN)\\h*"});
        app.changeGrepPreferences.properties = ({changeTo:"Kasten"});
        app.changeGrep();
      } catch (e) {alert(e + ' at line ' + e.line)}
      app.findGrepPreferences = NothingEnum.NOTHING;
      app.changeGrepPreferences = NothingEnum.NOTHING;
      try {
          app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
          app.findGrepPreferences.properties = ({findWhat:"\\h*(\\(\\(Kastenende\\)\\)|\\(\\(KASTENENDE\\)\\)|\\(\\(kastenende\\)\\)|Kasten Ende|(?<!\\(\\()Kastenende|(?<!\\(\\()kastenende|//KASTENENDE|Kasten-Ende)\\h*"});
          app.changeGrepPreferences.properties = ({changeTo:"Kastenende"});
          app.changeGrep();
        } catch (e) {alert(e + ' at line ' + e.line)}
        app.findGrepPreferences = NothingEnum.NOTHING;
        app.changeGrepPreferences = NothingEnum.NOTHING;

// Fügt Ebene «Boxen» hinzu
try{
myLayer = app.activeDocument.layers.add({name:"Boxen"});
}catch(e){
myLayer = app.activeDocument.layers.item("Boxen");
}

// Suche für Schlaufe
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "^Infobox$(.*(\\r|\\n))+?Infoboxende$";
var finds = app.activeDocument.findGrep();
var findAll = finds.length

//Schlaufe mit Anzahl der Fundstellen
var myDoc = app.activeDocument;
var myText = myDoc.textFrames;
var myOverset = [];
var i;
for (i = 0; i < findAll; i++) {
  if(myText[i].overflows){
    alert("Es hat noch Textboxen mit Übersatztext, bevor das Skript ausgeführt werden kann, muss dies korrigiert werden.")
    break;
}else{
findInfobox();
newFrame();
delComment();
}
}

// Infoboxtext markieren
function findInfobox(){
    try {

app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "^Infobox$(.*(\\r|\\n))+?Infoboxende$";
var finds = app.activeDocument.findGrep();
app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
finds[0].select();

	} catch (e) {alert(e + ' at line ' + e.line)}
    app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;


    }

// Markierter Text in neues Textfeld und Objektformat anwenden
function newFrame() {
objectStyle = "Infobox";
if (app.selection.length == 1 && app.selection[0].hasOwnProperty("baseline") && app.selection[0].length > 0)
{
frame = app.selection[0].parentTextFrames[0].duplicate();
frame.texts[0].remove();
frame.move (undefined, [0, app.selection[0].characters[0].baseline- app.selection[0].parentTextFrames[0].characters[0].baseline]);
app.selection[0].move(LocationOptions.AT_BEGINNING, frame.texts[0]);
while (frame.texts[0].characters[-1].contents == 'r')
frame.texts[0].characters[-1].remove();
frame.applyObjectStyle(app.activeDocument.objectStyles.item(objectStyle));
frame.select();
}
  frame.itemLayer = myLayer;
  changeParagraph()
}



// Kommentar "Infobox" entfernen
function delComment(){

        try {

app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
app.findGrepPreferences.findWhat = "(Infobox\\r|\\rInfoboxende)";
app.changeGrepPreferences.changeTo = "";
app.selection[0].parentStory.changeGrep();
/*app.selection[0].fit (FitOptions.FRAME_TO_CONTENT);*/



	} catch (e) {alert(e + ' at line ' + e.line)}
    app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;


    }

    // Suche für Schlaufe
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "^Kasten$(.*(\\r|\\n))+?Kastenende$";
    var finds = app.activeDocument.findGrep();
    var findAll = finds.length

    //Schlaufe mit Anzahl der Fundstellen
    var myDoc = app.activeDocument;
var myText = myDoc.textFrames;
var myOverset = [];
var i;
for (i = 0; i < findAll; i++) {
  if(myText[i].overflows){
    alert("Es hat noch Textboxen mit Übersatztext, bevor das Skript ausgeführt werden kann, muss dies korrigiert werden.")
    break;
}else{
findInfobox2();
newFrame2();
delComment2();
}
}

    // Infoboxtext markieren
    function findInfobox2(){
        try {

    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "^Kasten$(.*(\\r|\\n))+?Kastenende$";
    var finds = app.activeDocument.findGrep();
    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    finds[0].select();

    	} catch (e) {alert(e + ' at line ' + e.line)}
        app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
        }

    // Markierter Text in neues Textfeld und Objektformat anwenden
    function newFrame2() {
    objectStyle = "Kasten";
    if (app.selection.length == 1 && app.selection[0].hasOwnProperty("baseline") && app.selection[0].length > 0)
    {
    frame = app.selection[0].parentTextFrames[0].duplicate();
    frame.texts[0].remove();
    frame.move (undefined, [0, app.selection[0].characters[0].baseline- app.selection[0].parentTextFrames[0].characters[0].baseline]);
    app.selection[0].move(LocationOptions.AT_BEGINNING, frame.texts[0]);
    while (frame.texts[0].characters[-1].contents == 'r')
    frame.texts[0].characters[-1].remove();
    frame.applyObjectStyle(app.activeDocument.objectStyles.item(objectStyle));
    frame.select();
    }
    frame.itemLayer = myLayer;
    changeParagraph()
    }

    // Kommentar "Kasten" entfernen
    function delComment2(){

            try {

    app.findGrepPreferences = app.changeGrepPreferences = NothingEnum.NOTHING;
    app.findGrepPreferences.findWhat = "(Kasten\\r|\\rKastenende)";
    app.changeGrepPreferences.changeTo = "";
    app.selection[0].parentStory.changeGrep();
    /*app.selection[0].fit (FitOptions.FRAME_TO_CONTENT);*/

    	} catch (e) {alert(e + ' at line ' + e.line)}
        app.findTextPreferences = app.changeTextPreferences = NothingEnum.NOTHING;
        }
        

  // Ändert Untertitel im Kasten/Infobox
  function changeParagraph(){
    var myDoc = app.activeDocument;
    var myLayerName = app.activeDocument.layers.item("Text");
    myLayerName.visible = false;
    myLayerName.locked = true;
    try {
    		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});
    		app.findGrepPreferences = NothingEnum.nothing;
    		app.findGrepPreferences.appliedParagraphStyle = "02_Untertitel"
    		app.changeGrepPreferences = NothingEnum.nothing;
    		app.changeGrepPreferences.appliedParagraphStyle = "02.2_Untertitel_Kasten-Infobox";
    		myDoc.changeGrep();
    } catch (e) {alert(e + ' at line ' + e.line)}
    app.findGrepPreferences = NothingEnum.NOTHING;
    app.changeGrepPreferences = NothingEnum.NOTHING;
    myLayerName.visible = true;
    myLayerName.locked = false;
  }
