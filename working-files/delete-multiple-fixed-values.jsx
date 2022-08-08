function main() {

	app.scriptPreferences.userInteractionLevel = UserInteractionLevels.INTERACT_WITH_ALL;
	var myDoc = app.activeDocument;

	function _clearGREP(){app.findGrepPreferences = NothingEnum.NOTHING;app.changeGrepPreferences = NothingEnum.NOTHING;}
	function _optionsGREP(){app.findChangeGrepOptions.properties = ({ includeFootnotes: true, kanaSensitive: true, widthSensitive: true });}

	var grepList = [
		/*
		Example:
		{"findWhat":"","appliedParagraphStyle":"","changeTo":""},
		*/
		// Delete Multiple Fixed Values
		{"findWhat":"[             ]{2,}","changeTo":" "},
	]

	for (i = 0; i < grepList.length; i++) {
		_clearGREP();
		_optionsGREP();
		app.findGrepPreferences.findWhat = grepList[i].findWhat;
		app.changeGrepPreferences.changeTo = grepList[i].changeTo;
		myDoc.changeGrep();
		_clearGREP();
	}

	function showDialog(){
	var myWindow = new Window ("dialog");
    var myInputGroup = myWindow.add ("group");
        myInputGroup.add ("statictext", undefined, "Typgrafie-Anpassung erfolgreich abgeschlossen!");
    var myButtonGroup = myWindow.add ("group");
        myButtonGroup.alignment = "center";
        myButtonGroup.add ("button", undefined, "OK");
        myWindow.show ();
	}
	showDialog();
}

app.doScript(main, ScriptLanguage.JAVASCRIPT, [], UndoModes.ENTIRE_SCRIPT);
