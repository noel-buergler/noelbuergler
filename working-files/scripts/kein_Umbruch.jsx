//This script was auto generated by chainGREP.jsx//chainGREP.jsx is provided by Gregor Fellenz https://www.publishingx.de///Download at https://www.publishingx.de/download/chain-grepmain();function main() {	if (app.layoutWindows.length == 0) return;	if (app.selection.length != 1 || !app.selection[0].hasOwnProperty('changeGrep')) {		alert('Please select only one textframe or text range!');		return;	}	var changeObject = app.selection[0];	if (changeObject.hasOwnProperty('characters') && changeObject.characters.length == 0) return;	var doc = app.documents[0];	var style;	var options = app.findChangeGrepOptions.properties;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;	// Query [[C-kein-Umbruch]] -- If you delete this comment you break the update function	try {		app.findChangeGrepOptions.properties = ({includeFootnotes:true, kanaSensitive:true, widthSensitive:true});		app.findGrepPreferences.properties = ({findWhat:".*"});		app.changeGrepPreferences.properties = ({changeTo:"$0", noBreak:true});		changeObject.changeGrep();	} catch (e) {alert(e + ' at line ' + e.line)}	app.findChangeGrepOptions.properties = options;	app.findGrepPreferences = NothingEnum.NOTHING;	app.changeGrepPreferences = NothingEnum.NOTHING;};function getStyleByString(docOrGroup, string, property) {	if (string == '[No character style]') return docOrGroup[property][0];	if (string == '[No paragraph style]') return docOrGroup[property][0];	if (string == 'NormalParagraphStyle') return docOrGroup[property][1];	stringResult = string.match (/^(.*?[^\\]):(.*)$/);	var styleName = (stringResult) ? stringResult[1] : string;	styleName = styleName.replace (/\\:/g, ':');	remainingString = (stringResult) ? stringResult[2] : '';	var newProperty = (stringResult) ? property.replace(/s$/, '') + 'Groups' : property;	var styleOrGroup = docOrGroup[newProperty].itemByName(styleName);	if (remainingString.length > 0 && styleOrGroup.isValid) styleOrGroup = getStyleByString (styleOrGroup, remainingString, property);	return styleOrGroup;};