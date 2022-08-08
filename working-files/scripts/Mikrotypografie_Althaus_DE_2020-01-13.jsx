/*  
	
	Allgemeine Information zu diesem Skript:
	Version: 14.1.2020
  	Autor: Noel Bürgler
	Basis: «Regeln zur Mikrotypografie.» (Althaus)
	InDesign-Version bei Erstellung: InDesign 2020

	Bemerkung: Die doppelten Backslash «\\» werden von InDesign als ein Backslash «\» interpretiert.
	Bei dem Rauskopieren darauf achten, dass diese vereinheitlicht werden.

*/



// Eigene Funktionen
function _clearGREP() {
	app.findGrepPreferences = NothingEnum.NOTHING;
	app.changeGrepPreferences = NothingEnum.NOTHING;
}
function _clearText() {
	app.findTextPreferences = NothingEnum.NOTHING;
	app.changeTextPreferences = NothingEnum.NOTHING;
}
function _optionsGREP() {
	app.findChangeGrepOptions.properties = ({ includeFootnotes: true, kanaSensitive: true, widthSensitive: true });
}
function _optionsText() {
	app.findChangeTextOptions.properties = ({ includeFootnotes: true, kanaSensitive: true, widthSensitive: true });
}



// Benutzerauswahl
main();
function main() {
	if (app.layoutWindows.length == 0) return;
	if (app.selection.length == 0) {
		var scope = app.documents[0];
	}
	else {
		var w = new Window('dialog', localize(({ en: "Scope of Find/Change", de: "Bereich der Ersetzung", ja_JP: "検索置換の範囲" })));
		var scopeGroup = w.add('Panel', undefined, localize(({ en: "Scope of Find/Change", de: "Bereich der Ersetzung", ja_JP: "検索置換の範囲" })));
		scopeGroup.alignment = 'fill';
		scopeGroup.alignChildren = 'fill';
		scopeGroup.margins = [10, 20, 10, 10];
		with (scopeGroup) {
			rButScopeDoc = add('radiobutton', undefined, localize(({ en: "Document", de: "Dokument", ja_JP: "ドキュメント" })));
			rButScopeDoc.value = true;
			rButScopeSel = add('radiobutton', undefined, localize(({ en: "Selection", de: "Auswahl", ja_JP: "選択範囲" })));
			rButScopeStory = add('radiobutton', undefined, localize(({ en: "Story (of Selection)", de: "Textabschnitt", ja_JP: "ストーリー" })));
		}
		var uiCtrlGroup = w.add('group');
		with (uiCtrlGroup) {
			var cancelBtn = uiCtrlGroup.add('button', undefined, localize(({ en: "Cancel", de: "Abbrechen", ja_JP: "キャンセル" })));
			var okButton = uiCtrlGroup.add('button', undefined, localize(({ en: "Run", de: "Starten", ja_JP: "実行" })));
			cancelBtn.onClick = function () {
				w.close(2);
			}
			okButton.onClick = function () {
				if (rButScopeDoc.value) scope = app.documents[0];
				else if (rButScopeSel.value) scope = app.selection[0];
				else if (rButScopeStory.value) scope = app.selection[0].parentStory;
				w.close(1);
			}
		}
		if (w.show() != 1) {
			return
		}
	}
	var changeObject = scope;
	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;
	var doc = app.documents[0];



	// Zahlen gruppieren
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\d(?=\\d{6}\\b)";
		app.changeGrepPreferences.changeTo = "$0~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{2})\\d(?=\\d{3}\\b)";
		app.changeGrepPreferences.changeTo = "$0~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d)\\d(?=\\d{3}\\b)";
		app.changeGrepPreferences.changeTo = "$0~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{2})[‹’‘](?=\\d{3}\\b)";
		app.changeGrepPreferences.changeTo = "~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d)[‹’‘](?=\\d{3}[‹’‘]\\d{3}\\b)";
		app.changeGrepPreferences.changeTo = "~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{3})[‹’‘](?=\\d{3}\\b)";
		app.changeGrepPreferences.changeTo = "~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}


	
	// Frankenbeträge (Seite 14 «Regeln zur Mikrotypografie.»)
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=Fr\\.)\\h+(?=\\d)";
		app.changeGrepPreferences.changeTo = "~<";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}



	// Einfache Anführungs- und Schlusszeichen (Seite 15 «Regeln zur Mikrotypografie.»)
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[‚‘’](.+?)[‘’]";
		app.changeGrepPreferences.changeTo = "‹$1›";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "‹ ";
		app.changeTextPreferences.changeTo = "‹";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " ›";
		app.changeTextPreferences.changeTo = "›";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "  ";
		app.changeTextPreferences.changeTo = " ";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}



	// Doppelte Anführungs- und Schlusszeichen (Seite 15 «Regeln zur Mikrotypografie.»)
	_clearText();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[«„“”](.+?)[„“”»]";
		app.changeGrepPreferences.changeTo = "«$1»";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "« ";
		app.changeTextPreferences.changeTo = "«";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " »";
		app.changeTextPreferences.changeTo = "»";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "  ";
		app.changeTextPreferences.changeTo = " ";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}



	// Klammern (Seite 17 «Regeln zur Mikrotypografie.»)
	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "( ";
		app.changeTextPreferences.changeTo = "(";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " )";
		app.changeTextPreferences.changeTo = ")";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "[ ";
		app.changeTextPreferences.changeTo = "[";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " ]";
		app.changeTextPreferences.changeTo = "]";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "{ ";
		app.changeTextPreferences.changeTo = "{";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " }";
		app.changeTextPreferences.changeTo = "}";
		changeObject.changeText();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}



	// Copyright (Seite 25 «Regeln zur Mikrotypografie.»)
	_clearText();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\h+(?=©)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}



	// Stern und Kreuz (Seite 28 «Regeln zur Mikrotypografie.»)
	_clearText();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\*(?=\\d)|\\* (?=\\d))";
		app.changeGrepPreferences.changeTo = "* ";
		changeObject.changeGrep();
	} catch (e) {
		alert(e + ' at line ' + e.line)
	}

	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\*(?=\\w)|\\* (?=\\w))";
		app.changeGrepPreferences.changeTo = "* ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+)(\\*)";
		app.changeGrepPreferences.changeTo = "$2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(†(?=\\d)|† (?=\\d))";
		app.changeGrepPreferences.changeTo = "† ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Et-Zeichen (Seite 28 «Regeln zur Mikrotypografie.»)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((\\h+)(\\&)(\\h+)|(\\h+)(\\&)|(\\&)(\\h+)|(?<=\\w)(\\&)(?=\\w))";
		app.changeGrepPreferences.changeTo = "~<\u0026~<";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// At-Zeichen (@) (Seite 29 «Regeln zur Mikrotypografie.»)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\w) @ | @ (?=\\w)|(?<=\\w) @| @(?=\\w)|(?<=\\w)@ |@ (?=\\w))";
		app.changeGrepPreferences.changeTo = "@";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Malzeichen (Seite 36 «Regeln zur Mikrotypografie.»)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)×(?=\\d)|(?<=\\d) × (?=\\d)|(?<=\\d)× (?=\\d)|(?<=\\d) ×(?=\\d))";
		app.changeGrepPreferences.changeTo = " × ";
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\l)×(?=\\l)|(?<=\\l)× (?=\\l)|(?<=\\l) ×(?=\\l))";
		app.changeGrepPreferences.changeTo = " × ";
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\u)×(?=\\u)|(?<=\\u)× (?=\\u)|(?<=\\u) ×(?=\\u))";
		app.changeGrepPreferences.changeTo = " × ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Masseinheiten
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km/h(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " km/h";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km/h(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ha(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ha";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ha(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mg(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " mg";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mg(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)g(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " g";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=g(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)kg(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " kg";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=kg(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " mm";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " cm";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " dm";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " m";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " km";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mg2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " mg2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mg2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)g2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " g2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=g2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)kg2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " kg2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=kg2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " mm2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " cm2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " dm2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " m2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " km2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " mm3";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " cm3";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " dm3";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " m3";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " km3";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ml(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ml";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ml(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dl(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " dl";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dl(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)l(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " l";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=l(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ms(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ms";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ms(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)s(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " s";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=s(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)min.(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " min.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=min.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)Std.(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " Std.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Std.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)°(?=F)|(?<=\\d) ° (?=F)|(?<=\\d) °(?=F))";
		app.changeGrepPreferences.changeTo = " °";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)(?=°)|(?<=\\d)\\h+(?=°))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mio\\.\\h+)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mio\\.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!)) ";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mia\\.\\h+)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mia\\.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!)) ";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Sonstige mikrotypografischen Regeln

	// Datumsanzeige (Vor Jahr ein Leerzeichen)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=Januar)\\h+(?=\\d{4})|(?<=Februar)\\h+(?=\\d{4})|(?<=März)\\h+(?=\\d{4})|(?<=April)\\h+(?=\\d{4})|(?<=Mai)\\h+(?=\\d{4})|(?<=Juni)\\h+(?=\\d{4})|(?<=Juli)\\h+(?=\\d{4})|(?<=August)\\h+(?=\\d{4})|(?<=September)\\h+(?=\\d{4})|(?<=Oktober)\\h+(?=\\d{4})|(?<=November)\\h+(?=\\d{4})|(?<=Dezember)\\h+(?=\\d{4}))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige (Nach Tagen mit Leerzeichen ein Achtelgeviert)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.)\\h+(?=(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige (Abgekürzte Monate)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d\\.)\\h+(?=(Jan\\.|Feb\\.|Mrz\\.|Apr\\.|Mai\\.|Jun\\.|Jul\\.|Aug\\.|Sept\\.|Okt\\.|Nov\\.|Dez\\.))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige mit Monat
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=(Januar|Februar|März|April|Mai|Juni|Juli|August|September|Oktober|November|Dezember))";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X. X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\h+\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X. X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\h+\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.X. – / X. X. –
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X. – / XX. X. –
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.XX.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{2}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{2})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. XX.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{2}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{2})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. XX. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{2}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{2})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.XX. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{2}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{2})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.XX. – / XX. XX. –
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{2}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{2}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. X.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{1})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX. X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\h+\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2}\\.\\d{1})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige XX.X. – / XX. X. –
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{2})\\.\\h+(?=\\d{1}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.XX.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{2}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\d{2})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X. XX.XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{2}\\.\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\h+\\d{2})\\.(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X. XX. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{2}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\h+\\d{2})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.XX. XXXX
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{2}\\.\\h+\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1}\\.\\d{2})\\.\\h+(?=\\d{4})";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datumsanzeige X.XX. – / X. XX. –
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.(?=\\d{2}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{1})\\.\\h+(?=\\d{2}\\.)";
		app.changeGrepPreferences.changeTo = ". ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Prozent und Promille ohne Abstand
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " %";
		app.changeGrepPreferences.changeTo = "%";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " ‰";
		app.changeGrepPreferences.changeTo = "‰";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Divis mit Leerzeichen vor und nach wird zu Halbgeviertstrich
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " - ";
		app.changeGrepPreferences.changeTo = " – ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Paragraph mit Achtelgeviert
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(§(?!\\h+)|§\\h+(?=\\d))";
		app.changeGrepPreferences.changeTo = "§ ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(  |  )";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Schrägstrich ohne Leerzeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " / ";
		app.changeGrepPreferences.changeTo = "/";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Trademark (Angemeldete Marke) ohne Leerzeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " ™";
		app.changeGrepPreferences.changeTo = "™";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Leerraum vor Fragezeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+)(\\?)";
		app.changeGrepPreferences.changeTo = "$2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Leerraum vor Ausrufezeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+)(\\!)";
		app.changeGrepPreferences.changeTo = "$2";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Absatz und Artikel (Gesetzestexte)
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=Art\\.)\\h+(?=\\d)|(?<=Abs\\.)\\h+(?=\\d)|(?<=Art\\.\\h+\\d)\\h+(?=Abs\.))";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=Abs\\.\\h+\\d)\\h+(?=\\w)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Uhrzeit
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)-(?=\\d)";
		app.changeGrepPreferences.changeTo = "–";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Telefonnummern
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{3}\\h+\\d{3})\\h+(?=\\d{2}\\h+\\d{2})";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{3}\\h+\\d{3}\\h+\\d{2})\\h+(?=\\d{2})";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\+\\d{2}\\h+\\d{2}\\h+\\d{3})\\h+(?=\\d{2}\\h+\\d{2})";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\+\\d{2}\\h+\\d{2}\\h+\\d{3}\\h+\\d{2})\\h+(?=\\d{2})";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Kerning von ! ? : ; ) } ] » % ‰ « ( { [ *
	app.findGrepPreferences = app.changeGrepPreferences = null;
	// app.findChangeGrepOptions.caseSensitive = true;
	kerningSpatium('(.(?=:)|.(?=\\))|.(?=\\*)|.(?=\\})|.(?=\\])|.(?=;)|.(?=»)|.(?=%)|.(?=‰)|.(?=!)|.(?=\\?)|«|\\(|«|\\{|«|\\[)', 80)

	function kerningSpatium(kPair, kValue) {
		// finde alle Vorkommen von kPairs
		app.findGrepPreferences.findWhat = kPair;
		var myPairs = app.activeDocument.findGrep();
		// füge kValue nach dem Zeichen ein.
		for (var i = 0; i < myPairs.length; i++)
			myPairs[i].insertionPoints[1].kerningValue = 80;
	}


	// Deutsche Abkürzungen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(a\\.A\\.|a\\.\\h+A\\.)";
		app.changeGrepPreferences.changeTo = "a. A.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(d\\.h\\.|d\\.\\h+h\\.)";
		app.changeGrepPreferences.changeTo = "d. h.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(a\\.A\\.|a\\.\\h+A\\.)";
		app.changeGrepPreferences.changeTo = "a. A.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(i\\.V\\.|i\\.\\h+V\\.)";
		app.changeGrepPreferences.changeTo = "i. V.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(m\\.E\\.|m\\.\\h+E\\.)";
		app.changeGrepPreferences.changeTo = "m. E.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(m\\.W\\.|m\\.\\h+W\\.)";
		app.changeGrepPreferences.changeTo = "m. W.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(o\\.Ä\\.|o\\.\\h+Ä\\.)";
		app.changeGrepPreferences.changeTo = "o. Ä.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(u\\.a\\.|u\\.\\h+a\\.)";
		app.changeGrepPreferences.changeTo = "u. a.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(u\\.Ä\\.|u\\.\\h+Ä\\.)";
		app.changeGrepPreferences.changeTo = "u. Ä.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(u\\.\\h+a\\.\\h+m\\.|u\\.a\\.m\\.|u\\.a\\.\\h+m\\.|u\\.\\h+a\\.m\\.)";
		app.changeGrepPreferences.changeTo = "u. a. m.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(u\\.v\\.a\\.m\\.|u\\.\\h+v\\.\\h+a\\.\\h+m\\.\\h+)";
		app.changeGrepPreferences.changeTo = "u. v. a. m.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(u\\.U\\.|u\\.\\h+U\\.)";
		app.changeGrepPreferences.changeTo = "u. U.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(z\\.B\\.|z\\. B\\.|Z\\.B\\.|Z\\. B\\.)";
		app.changeGrepPreferences.changeTo = "z. B.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(z\\.H\\.|z\\.\\h+H\\.)";
		app.changeGrepPreferences.changeTo = "z. H.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(z\\.T\\.|z\\.\\h+T\\.)";
		app.changeGrepPreferences.changeTo = "z. T.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(Dr\\.|Dr\\.\\h+|iur\\.|iur\\.\\h+|med\\.|med\\.\\h+|oec\\.|oec\\.\\h+|rer\\.|rer\\.\\h+|Prof\\.|Prof\\.\\h+|Art\\.|Art\\.\\h+|lit\\.|lit\\.\\h+|dipl\\.|dipl\\.\\h+|Ing\\.|Ing\\.\\h+|S\\.|S\\.\\h+|Rz\\.\\h+|Rz\\.|N\\.|N\\.\\h+|Bst\\.|Bst\\.\\h+|Anm\\.|Anm\\.\\h+|Nr\\|.Nr\\.\\h+|E\\.|E\\.\\h+)";
		app.changeGrepPreferences.changeTo = "$1 ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+ | \\h+)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d+\\.)-";
		app.changeGrepPreferences.changeTo = "–";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=St\\.)\\h+(?=\\w)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(`|´|‘)";
		app.changeGrepPreferences.changeTo = "’";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=Fr\\.)\\h+(?=\\d)";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();

	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(m\\.\\h+ü\\.\\h+M\\.|m\\h+ü\\.\\h+M\\.|m\\h+ü\\.M\\.|m\\.ü\\.M\\.|müM\\.)";
		app.changeGrepPreferences.changeTo = "m ü. M.";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();



	// Ende des Skripts = Löschung mehrerer Festwerte
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[             ]{2,}";
		app.changeGrepPreferences.changeTo = " ";
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


};

function getStyleByString(docOrGroup, string, property) {
	if (string == '[No character style]') return docOrGroup[property][0];
	if (string == '[No paragraph style]') return docOrGroup[property][0];
	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];
	stringResult = string.match(/^(.*?[^\\]):(.*)$/);
	var styleName = (stringResult) ? stringResult[1] : string;
	styleName = styleName.replace(/\\:/g, ':');
	remainingString = (stringResult) ? stringResult[2] : '';
	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;
	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);
	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString(styleOrGroup, remainingString, property);
	return styleOrGroup;
};