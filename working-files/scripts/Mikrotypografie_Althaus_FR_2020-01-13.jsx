/*  
	
	Allgemeine Information zu diesem Skript:
	Version: 14.1.2020
  	Autor: Noel Bürgler
	Basis: «Règles typographiques.» (Althaus)
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


	// Richtiger Apostroph mit Geschütztem Leerzeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(`|´|‘)" ;
		app.changeGrepPreferences.changeTo = "’" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(`\\h+|'\\h+|´\\h+|‘\\h+)" ;
		app.changeGrepPreferences.changeTo = "’ " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "(?<=\\.)›(?=\\l)" ;
		app.changeTextPreferences.changeTo = "’" ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=.)›(?=\\l)" ;
		app.changeGrepPreferences.changeTo = "’" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Zahlen gruppieren
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d)[‹’‘](?=\\d{3}[\\s\\.])" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\d(?=\\d{6}\\b)" ;
		app.changeGrepPreferences.changeTo = "$0~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{2})\\d(?=\\d{3}\\b)" ;
		app.changeGrepPreferences.changeTo = "$0~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d)\\d(?=\\d{3}\\b)" ;
		app.changeGrepPreferences.changeTo = "$0~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{2})[‹’‘](?=\\d{3}\\b)" ;
		app.changeGrepPreferences.changeTo = "~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d)[‹’‘](?=\\d{3}[‹’‘]\\d{3}\\b)" ;
		app.changeGrepPreferences.changeTo = "~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\b\\d{3})[‹’‘](?=\\d{3}\\b)" ;
		app.changeGrepPreferences.changeTo = "~<" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Achtelgeviert vor ? ! ; : »
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<!\\h)\\?" ;
		app.changeGrepPreferences.changeTo = " ?" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<!\\h)\\!" ;
		app.changeGrepPreferences.changeTo = " !" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<!\\h)\\;" ;
		app.changeGrepPreferences.changeTo = " ;" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<!(\\h|https|http))\\:" ;
		app.changeGrepPreferences.changeTo = " :" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<!\\h)\\»" ;
		app.changeGrepPreferences.changeTo = " »" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+(?=\\?)|\\h+(?=\\!)|\\h+(?=\\;)|\\h+(?=\\:)|\\h+(?=\\»))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Achtelgeviert nach «
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\«(?!\\h+)" ;
		app.changeGrepPreferences.changeTo = "« " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\«)\\h+(?=.)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Stern und Kreuz
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\*(?=\\d)|\\* (?=\\d))" ;
		app.changeGrepPreferences.changeTo = "* " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\*(?=\\w)|\\* (?=\\w))" ;
		app.changeGrepPreferences.changeTo = "* " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(\\h+)(\\*)" ;
		app.changeGrepPreferences.changeTo = "$2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(†(?=\\d)|† (?=\\d))" ;
		app.changeGrepPreferences.changeTo = "† " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Telefonnummern
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{3}\\h+\\d{3})\\h+(?=\\d{2}\\h+\\d{2})" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d{3}\\h+\\d{3}\\h+\\d{2})\\h+(?=\\d{2})" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\+\\d{2}\\h+\\d{2}\\h+\\d{3})\\h+(?=\\d{2}\\h+\\d{2})" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\+\\d{2}\\h+\\d{2}\\h+\\d{3}\\h+\\d{2})\\h+(?=\\d{2})" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Et-Zeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((\\h+)(\\&)(\\h+)|(\\h+)(\\&)|(\\&)(\\h+)|(?<=\\w)(\\&)(?=\\w))" ;
		app.changeGrepPreferences.changeTo = " \u0026 " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Datum ohne Punkt nach Tag
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\.\\h+(?=(janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Paragraph mit geschütztem Leerzeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(§(?!\\h+)|§\\h+(?=\\d))" ;
		app.changeGrepPreferences.changeTo = "§ " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Uhrzeiten
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=h(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d(?<!\\h+))h(?=(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " h" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=min(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d(?<!\\h+))min(?=(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " min" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=s(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d(?<!\\h+))s(?=(\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\h+))" ;
		app.changeGrepPreferences.changeTo = " s" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Prozent und Promillezeichen mit Achtelgeviert
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=.(?<!\\h+))%" ;
		app.changeGrepPreferences.changeTo = " %" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\h+(?=%)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=.(?<!\\h+))‰" ;
		app.changeGrepPreferences.changeTo = " ‰" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\h+(?=‰)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Masseinheiten
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km/h(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " km/h" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km/h(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ha(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " ha" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ha(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mg(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " mg" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mg(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)g(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " g" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=g(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)kg(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " kg" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=kg(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " mm" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " cm" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " dm" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " m" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " km" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mg2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " mg2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mg2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)g2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " g2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=g2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)kg2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " kg2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=kg2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " mm2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " cm2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " dm2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " m2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km2(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " km2" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km2(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)mm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " mm3" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=mm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)cm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " cm3" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=cm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dm3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " dm3" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dm3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)m3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " m3" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=m3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)km3(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " km3" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=km3(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ml(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " ml" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ml(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)dl(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " dl" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=dl(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)l(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " l" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=l(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)ms(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " ms" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=ms(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)s(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " s" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=s(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)min.(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " min." ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=min.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)Std.(?=(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " Std." ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Std.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!|\\)|\\]|\\}|\\»|\\›))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)°(?=F)|(?<=\\d) ° (?=F)|(?<=\\d) °(?=F))" ;
		app.changeGrepPreferences.changeTo = " °" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)(?=°)|(?<=\\d)\\h+(?=°))" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mio\\.\\h+)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mio\\.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!)) " ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mia\\.\\h+)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=\\d)\\h+(?=Mia\\.(\\h+|\\)|\\,|\\.|\\:|\\;|\\?|\\!)) " ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Falsche Einfache und Doppelte Anführungszeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[‚‘](.+?)[‘]" ;
		app.changeGrepPreferences.changeTo = "‹$1›" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "‹ " ;
		app.changeTextPreferences.changeTo = "‹" ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " ›" ;
		app.changeTextPreferences.changeTo = "›" ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "  " ;
		app.changeTextPreferences.changeTo = " " ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[«„“”](.+?)[„“”»]" ;
		app.changeGrepPreferences.changeTo = "«$1»" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "« " ;
		app.changeTextPreferences.changeTo = "«" ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = " »" ;
		app.changeTextPreferences.changeTo = "»" ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();
	try {
		_optionsText();
		app.findTextPreferences.findWhat = "  " ;
		app.changeTextPreferences.changeTo = " " ;
		changeObject.changeText();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearText();


	// million/millions/milliard/milliards – Mehr als zwei mit «s» und weniger als zwei ohne «s»
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=[1-1,999]) milliards" ;
		app.changeGrepPreferences.changeTo = " milliard" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=[1-1,999]) millions" ;
		app.changeGrepPreferences.changeTo = " million" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=[2-9]) milliard" ;
		app.changeGrepPreferences.changeTo = " milliards" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "(?<=[2-9]) million" ;
		app.changeGrepPreferences.changeTo = " millions" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "milliards{2,}" ;
		app.changeGrepPreferences.changeTo = "milliards" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "millions{2,}" ;
		app.changeGrepPreferences.changeTo = "millions" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Abkürzungen


	// Copyright
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "\\h+(?=©)" ;
		app.changeGrepPreferences.changeTo = " " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Malzeichen
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\d)×(?=\\d)|(?<=\\d) × (?=\\d)|(?<=\\d)× (?=\\d)|(?<=\\d) ×(?=\\d))" ;
		app.changeGrepPreferences.changeTo = " × " ;
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\l)×(?=\\l)|(?<=\\l)× (?=\\l)|(?<=\\l) ×(?=\\l))" ;
		app.changeGrepPreferences.changeTo = " × " ;
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "((?<=\\u)×(?=\\u)|(?<=\\u)× (?=\\u)|(?<=\\u) ×(?=\\u))" ;
		app.changeGrepPreferences.changeTo = " × " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// 1re / 2e / 3e
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "1\\.(?!\\h+\\u)" ;
		app.changeGrepPreferences.changeTo = "1er" ;
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "2\\.(?!\\h+\\u)" ;
		app.changeGrepPreferences.changeTo = "2e" ;
	} catch (e) { alert(e + ' at line ' + e.line) }
	changeObject.changeGrep();
	_clearGREP();
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "3\\.(?!\\h+\\u)" ;
		app.changeGrepPreferences.changeTo = "3e" ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Divis mit Leerzeichen vor und nach wird zu Halbgeviertstrich
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = " - " ;
		app.changeGrepPreferences.changeTo = " – " ;
		changeObject.changeGrep();
	} catch (e) { alert(e + ' at line ' + e.line) }
	_clearGREP();


	// Ende des Skripts = Löschung mehrerer Festwerte
	try {
		_optionsGREP();
		app.findGrepPreferences.findWhat = "[             ]{2,}" ;
		app.changeGrepPreferences.changeTo = " " ;
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