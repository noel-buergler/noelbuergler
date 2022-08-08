//#target indesign
var UIresult = myDisplayDialog2();
main();

function main(docWidth, docHeight){
var myDocument;
        createDocument(UIresult.docWidth, UIresult.docHeight);
myDisplayDialog(myDocument)
}

function createDocument(docWidth, docHeight){
  myDocument = app.documents.add();
    with(myDocument.documentPreferences){
        pageHeight = docHeight + "mm";
        pageWidth = docWidth + "mm";
        pagesPerDocument = 1;
}
}

function myDisplayDialog2(myDocument){
        var myDialog = new Window ('dialog', 'Neuer Umschlag');
            myDialog.alignChildren = "right";
            var rg0 = myDialog.add ('group');
                rg0.add('statictext',undefined, 'Breite:');
                  var docuWidth = rg0.add('edittext {text: 210, characters: 4}');
                    rg0.add('statictext',undefined, 'mm');
            var rg1 = myDialog.add ('group');
                rg1.add('statictext',undefined, 'Höhe:   ');
                  var docuHeight = rg1.add('edittext {text: 297, characters: 4}');
                    rg1.add('statictext',undefined, 'mm');
            var rg2 = myDialog.add ('group');
                rg2.alignment = "right";
                  rg2.add('button', undefined, 'Abbrechen', {name: 'cancel'});
                  rg2.add('button', undefined, 'OK', {name: 'ok'});

            var myResult = myDialog.show();
              if (myResult == 1){
                return {docHeight : docuHeight.text, docWidth : docuWidth.text};
              }
              if (myResult == 2){
                exit();
              }
}

//Musterseiten und Dokumentseiten erzeugen
function myBookcover(myDocument, myBookThicknessPT, myFlapleftPT, myFlaprightPT){
  myDocument = app.activeDocument
  var FlapleftOffset = 0;
  var FlaprightOffset = 0;

    //Musterseite erstellen und dritte Seite hinzufügen
    var myBookMaster = myDocument.masterSpreads.add ();
        myBookMaster.pages.add();
          if(myFlapleftPT){
            myBookMaster.pages.add();
              var FlapleftOffset = 1;
              setWidthHeight(myBookMaster.pages.item(0), myFlapleftPT, myDocument.documentPreferences.properties.pageHeight + documentUnits ());
          };
          if(myFlaprightPT){
            myBookMaster.pages.add();
              var FlaprightOffset = 1;
              setWidthHeight(myBookMaster.pages.item(3+FlapleftOffset), myFlaprightPT, myDocument.documentPreferences.properties.pageHeight + documentUnits ());
          };

              //Buchrücken auf Musterseite erstellen
              setWidthHeight(myBookMaster.pages.item(1+FlapleftOffset), myBookThicknessPT, myDocument.documentPreferences.properties.pageHeight + documentUnits ());

              //Dokumentseitenanordnung zulassen und Beschnitt hinzufügen
              myDocument.documentPreferences.allowPageShuffle = false;
              myDocument.documentPreferences.preserveLayoutWhenShuffling = true;
              myDocument.documentPreferences.preserveLayoutWhenShuffling = true;
              myDocument.documentPreferences.documentBleedUniformSize = false;
              myDocument.documentPreferences.documentBleedBottomOffset = 3;
              myDocument.documentPreferences.documentBleedTopOffset = 3;
              myDocument.documentPreferences.documentBleedInsideOrLeftOffset = 3;
              myDocument.documentPreferences.documentBleedOutsideOrRightOffset = 3;
              masters = myDocument.masterSpreads.itemByName('B-Musterseite').pages;
                for (i = 0; i < masters.length; i++) {
                  masters[i].marginPreferences.properties = {
                    top : 0,
                    left: 0,
                    right: 0,
                    bottom: 0
                };
              }

//Umschlag erstellen
var mySpread = myDocument.spreads.add(LocationOptions.BEFORE,myDocument.spreads[0],{appliedMaster:myBookMaster});
    mySpread.allowPageShuffle = false;
    mySpread.pages.add();
      if(myFlapleftPT){
        mySpread.pages.add();
          myLascheLinks = myDocument.sections.add(myDocument.pages[0],{continueNumbering:false, pageNumberStart:4, sectionPrefix:"F"});
          setWidthHeight(mySpread.pages.item(2), myBookThicknessPT, myDocument.documentPreferences.properties.pageHeight + documentUnits ());
          setWidthHeight(mySpread.pages.item(3), myDocument.documentPreferences.properties.pageWidth + documentUnits (), myDocument.documentPreferences.properties.pageHeight + documentUnits ());
      }
      if(myFlaprightPT){
          mySpread.pages.add();
          myLascheRechts = myDocument.sections.add(myDocument.pages[3+FlapleftOffset],{continueNumbering:false, pageNumberStart:1, sectionPrefix:"F"});
          setWidthHeight(mySpread.pages.item(3+FlapleftOffset), myFlaprightPT, myDocument.documentPreferences.properties.pageHeight + documentUnits ());
      }

            //Hat die Startseite schon einen Sektionsanfang?
            var neuDo = false;
	               for(var myCounter = 0; myCounter < myDocument.sections.length; myCounter ++){
		                 if(myDocument.sections[myCounter].pageStart.id == myDocument.pages[3+FlapleftOffset+FlaprightOffset].id){
                       var neuDo = true;
                     };
	               }
                 //Wenn nicht, Sektionsanfang auf Startseite mit Seitenzahl 1
                      if(neuDo == false){
                        myDocument.sections.add(myDocument.pages[3+FlapleftOffset+FlaprightOffset],{continueNumbering:false, pageNumberStart:1, sectionPrefix:""});
                      };

                      //Dupliziert den Druckbogen
                      delPages();
                      if(myFlaprightGroup.checkedState == true && myFlapleftGroup.checkedState == true){
                        myDocument.pages[4].duplicate (LocationOptions.AFTER, myDocument.spreads[0]);
                        myDocument.pages[3].duplicate (LocationOptions.AFTER, myDocument.pages[5]);
                        myDocument.pages[2].duplicate (LocationOptions.AFTER, myDocument.pages[6]);
                        myDocument.pages[1].duplicate (LocationOptions.AFTER, myDocument.pages[7]);
                        myDocument.pages[0].duplicate (LocationOptions.AFTER, myDocument.pages[8]);
                        app.layoutWindows[0].activeSpread.duplicate (LocationOptions.AFTER, app.layoutWindows[0].activeSpread);
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                        myDocument.pages[5].remove();
                      }
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState == false){
                      myDocument.pages[3].duplicate (LocationOptions.AFTER, myDocument.spreads[0]);
                      myDocument.pages[2].duplicate (LocationOptions.AFTER, myDocument.pages[4]);
                      myDocument.pages[1].duplicate (LocationOptions.AFTER, myDocument.pages[5]);
                      myDocument.pages[0].duplicate (LocationOptions.AFTER, myDocument.pages[6]);
                      app.layoutWindows[0].activeSpread.duplicate (LocationOptions.AFTER, app.layoutWindows[0].activeSpread);
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      }
                      if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState != false){
                      myDocument.pages[3].duplicate (LocationOptions.AFTER, myDocument.spreads[0]);
                      myDocument.pages[2].duplicate (LocationOptions.AFTER, myDocument.pages[4]);
                      myDocument.pages[1].duplicate (LocationOptions.AFTER, myDocument.pages[5]);
                      myDocument.pages[0].duplicate (LocationOptions.AFTER, myDocument.pages[6]);
                      app.layoutWindows[0].activeSpread.duplicate (LocationOptions.AFTER, app.layoutWindows[0].activeSpread);
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      myDocument.pages[4].remove();
                      }
                      if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState == false){
                      app.layoutWindows[0].activeSpread.duplicate (LocationOptions.AFTER, app.layoutWindows[0].activeSpread);
                      }
                      myDocument.documentPreferences.facingPages = false;
                      myDocument.documentPreferences.facingPages = true;
                      setGuides(UIresult.docWidth, UIresult.docHeight);

                      //Umschlag sinnvoll paginieren
                      //erste Umschlagseite
                      myUmschlag = myDocument.sections.add(myDocument.pages[0+FlapleftOffset],{continueNumbering:false, pageNumberStart:4, sectionPrefix:"US"});
                      myRuecken = myDocument.sections.add(myDocument.pages[1+FlapleftOffset],{continueNumbering:false, pageNumberStart:1, sectionPrefix:"R"});
                      myUmschlag2 = myDocument.sections.add(myDocument.pages[2+FlapleftOffset],{continueNumbering:false, pageNumberStart:1, sectionPrefix:"US"});
                      //zweite Umschlagseite

                      //flapleft and flapright
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != false){myFlap3US2 = myDocument.sections.add(myDocument.pages[4+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"F"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != false){myUmschlag7 = myDocument.sections.add(myDocument.pages[5+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"US"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != false){myRuecken4 = myDocument.sections.add(myDocument.pages[6+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"R"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != false){myUmschlag8 = myDocument.sections.add(myDocument.pages[7+FlapleftOffset],{continueNumbering:false, pageNumberStart:3, sectionPrefix:"US"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != false){myFlap3US2 = myDocument.sections.add(myDocument.pages[8+FlapleftOffset],{continueNumbering:false, pageNumberStart:3, sectionPrefix:"F"});}

                      //flapleft
                      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState != true){myUmschlag3 = myDocument.sections.add(myDocument.pages[3+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"US"});}
                      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState != true){myRuecken2 = myDocument.sections.add(myDocument.pages[4+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"R"});}
                      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState != true){myUmschlag4 = myDocument.sections.add(myDocument.pages[5+FlapleftOffset],{continueNumbering:false, pageNumberStart:3, sectionPrefix:"US"});}
                      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState != true){myFlapUS2 = myDocument.sections.add(myDocument.pages[6+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"F"});}

                      //flapright
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != true){myUmschlag5 = myDocument.sections.add(myDocument.pages[5+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"US"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != true){myRuecken3 = myDocument.sections.add(myDocument.pages[6+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"R"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != true){myUmschlag6 = myDocument.sections.add(myDocument.pages[7+FlapleftOffset],{continueNumbering:false, pageNumberStart:3, sectionPrefix:"US"});}
                      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != true){myFlap2US2 = myDocument.sections.add(myDocument.pages[4+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"F"});}

                      //normal
                      if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState == false){myUmschlag7 = myDocument.sections.add(myDocument.pages[3+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"US"});}
                      if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState == false){myRuecken4 = myDocument.sections.add(myDocument.pages[4+FlapleftOffset],{continueNumbering:false, pageNumberStart:2, sectionPrefix:"R"});}
                      if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState == false){myUmschlag7 = myDocument.sections.add(myDocument.pages[5+FlapleftOffset],{continueNumbering:false, pageNumberStart:3, sectionPrefix:"US"});}
}

//Dialogfenster
function myDisplayDialog(myDocument){
	var myLabelWidth = 90;
	var myDisplayDialog = app.dialogs.add({name:"Rückenbreite und Klappen definieren"});
	with(myDisplayDialog.dialogColumns.add()){

		with(dialogRows.add()){
			with(dialogColumns.add()){
				staticTexts.add({staticLabel:"Rückenbreite:", minWidth:myLabelWidth});
			}
			with(dialogColumns.add()){
				var myBookThickness = measurementEditboxes.add({editValue:14.1732, editUnits:app.documents[0].viewPreferences.horizontalMeasurementUnits});
			}
		}
            myFlapleftGroup = enablingGroups.add({staticLabel:"Klappe links", checkedState:false});
			with (myFlapleftGroup){
				with(borderPanels.add()){
					with (dialogColumns.add()){
						staticTexts.add({staticLabel:"Breite:"});
					}
					with (dialogColumns.add()){
						var myFlapleft = measurementEditboxes.add({editValue:425.197, editUnits:app.documents[0].viewPreferences.horizontalMeasurementUnits});
					}
				}
			}
            myFlaprightGroup = enablingGroups.add({staticLabel:"Klappe rechts", checkedState:false});
			with (myFlaprightGroup){
				with(borderPanels.add()){
					with (dialogColumns.add()){
						staticTexts.add({staticLabel:"Breite:"});
					}
					with (dialogColumns.add()){
						var myFlapright = measurementEditboxes.add({editValue:425.197, editUnits:app.documents[0].viewPreferences.horizontalMeasurementUnits});
					}
				}
			}
      /*if(myFlaprightGroup.checkedState == true && myFlapleftGroup.checkedState == true){
        alert("Zwei Klappen sind nicht möglich.")
      }*/
	  }
	var myResult = myDisplayDialog.show();
	if(myResult == true){
		var myBookThicknessPT = myBookThickness.editValue + "pt";
         if(myFlapleftGroup.checkedState != false){
         var myFlapleftPT = myFlapleft.editValue + "pt";
         }
         if(myFlaprightGroup.checkedState != false){
         var myFlaprightPT = myFlapright.editValue + "pt";
         }
         myBookcover (myDocument, myBookThicknessPT, myFlapleftPT, myFlaprightPT)
		myDisplayDialog.destroy();
	}
	else{
		myDisplayDialog.destroy();
	}
}

//use documents units for height
function documentUnits () {
  switch (app.documents[0].viewPreferences.horizontalMeasurementUnits){
   case 2051106676: return 'ag';
   case 2053336435: return 'cm';
   case 2053335395: return 'c';
   case 2053729891: return 'in';
   case 2053729892: return 'in';
   case 2053991795: return 'mm';
   case 2054187363: return 'p';
   case 2054188905: return 'pt';
   }
  }

//change book backside functions
function setWidthHeight(o, w, h, useVisibleBounds) {
    if( !o.resize ) return;
      var CS_INNER = CoordinateSpaces.INNER_COORDINATES,
      BB = BoundingBoxLimits[(useVisibleBounds?'OUTER_STROKE':'GEOMETRIC_PATH') + '_BOUNDS'];
        var MarLeft = UnitValue(o.marginPreferences.properties.left + documentUnits ()).as('pt');
        var MarRight = UnitValue(o.marginPreferences.properties.right + documentUnits ()).as('pt');
          var wPt = UnitValue(w).as('pt'),
              hPt = UnitValue(h).as('pt');
              if( 0 >= wPt || 0 >= hPt ) return;
              if(wPt < MarLeft+MarRight){
                o.marginPreferences.properties = {
                  left: 0,
                  right: 0,
                };
              }
              o.resize(
                [CS_INNER,BB],
                AnchorPoint.CENTER_ANCHOR,
                ResizeMethods.REPLACING_CURRENT_DIMENSIONS_WITH,
                [wPt,hPt,CS_INNER]
              );
}

//Erstelle Hilfslinien
function setGuides(docWidth, docHeight){
      pageHeight = Number(docHeight);
      pageWidth = Number(docWidth);
      var widthFlapRight = RoundWithDecimal(app.activeDocument.pages[3].bounds[3] - app.activeDocument.pages[3].bounds[1], 3);
      var widthFlapLeft = RoundWithDecimal(app.activeDocument.pages[0].bounds[3] - app.activeDocument.pages[0].bounds[1], 3);
      var widthBookThicknessPTFlapLeft = RoundWithDecimal(app.activeDocument.pages[2].bounds[3] - app.activeDocument.pages[2].bounds[1], 3);
      var widthBookThicknessPTFlapRight = RoundWithDecimal(app.activeDocument.pages[1].bounds[3] - app.activeDocument.pages[1].bounds[1], 3);
      var widthBookThicknessPT1 = RoundWithDecimal(app.activeDocument.pages[1].bounds[3] - app.activeDocument.pages[1].bounds[1], 3);
      var widthFlapRight2F = RoundWithDecimal(app.activeDocument.pages[4].bounds[3] - app.activeDocument.pages[4].bounds[1], 3);
      var widthFlapLeft2F = RoundWithDecimal(app.activeDocument.pages[0].bounds[3] - app.activeDocument.pages[0].bounds[1], 3);
      var widthBookThicknessPTFlapLeft2F = RoundWithDecimal(app.activeDocument.pages[2].bounds[3] - app.activeDocument.pages[2].bounds[1], 3);
      //Horizontal
      var myGuideSpread1Top = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.HORIZONTAL, location: 0, fitToPage: false,});
      var myGuideSpread1Bottom = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.HORIZONTAL, location: pageHeight, fitToPage: false,});
      var myGuideSpread2Top = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.HORIZONTAL, location: 0, fitToPage: false,});
      var myGuideSpread2Bottom = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.HORIZONTAL, location: pageHeight, fitToPage: false,});
      //Vertikal mit Klappe links
      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState !=true){
        var myGuideSpread1No1 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread2No1 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread1No2 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft, fitToPage: false,});
        var myGuideSpread2No2 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth, fitToPage: false,});
        var myGuideSpread1No3 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft + pageWidth, fitToPage: false,});
        var myGuideSpread2No3 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapLeft, fitToPage: false,});
        var myGuideSpread1No4 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft + pageWidth + widthBookThicknessPTFlapLeft, fitToPage: false,});
        var myGuideSpread2No4 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapLeft + pageWidth, fitToPage: false,});
        var myGuideSpread1No5 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft + pageWidth + widthBookThicknessPTFlapLeft + pageWidth, fitToPage: false,});
        var myGuideSpread2No5 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapLeft + pageWidth + widthFlapLeft, fitToPage: false,});
      }
      //Vertikal mit beiden Klappen
      if(myFlapleftGroup.checkedState != false && myFlaprightGroup.checkedState != false){
        var myGuideSpread1No16 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread2No16 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread1No17 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft2F, fitToPage: false,});
        var myGuideSpread1No18 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft2F + pageWidth, fitToPage: false,});
        var myGuideSpread1No19 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft2F + pageWidth + widthBookThicknessPTFlapLeft2F, fitToPage: false,});
        var myGuideSpread1No20 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft2F + pageWidth + widthBookThicknessPTFlapLeft2F + pageWidth, fitToPage: false,});
        var myGuideSpread1No21 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapLeft2F + pageWidth + widthBookThicknessPTFlapLeft2F + pageWidth + widthFlapRight2F, fitToPage: false,});
        var myGuideSpread2No17 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight2F, fitToPage: false,});
        var myGuideSpread2No18 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight2F + pageWidth, fitToPage: false,});
        var myGuideSpread2No19 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight2F + pageWidth + widthBookThicknessPTFlapLeft2F, fitToPage: false,});
        var myGuideSpread2No20 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight2F + pageWidth + widthBookThicknessPTFlapLeft2F + pageWidth, fitToPage: false,});
        var myGuideSpread2No21 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight2F + pageWidth + widthBookThicknessPTFlapLeft2F + pageWidth + widthFlapLeft2F, fitToPage: false,});
      }
      //Vertikal mit Klappe rechts
      if(myFlaprightGroup.checkedState != false && myFlapleftGroup.checkedState != true){
        var myGuideSpread1No6 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread2No6 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread1No7 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight, fitToPage: false,});
        var myGuideSpread2No7 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth, fitToPage: false,});
        var myGuideSpread1No8 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight + pageWidth, fitToPage: false,});
        var myGuideSpread2No8 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapRight, fitToPage: false,});
        var myGuideSpread1No9 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight + pageWidth + widthBookThicknessPTFlapRight, fitToPage: false,});
        var myGuideSpread2No9 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapRight + pageWidth, fitToPage: false,});
        var myGuideSpread1No10 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: widthFlapRight + pageWidth + widthBookThicknessPTFlapRight + pageWidth, fitToPage: false,});
        var myGuideSpread2No10 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPTFlapRight + pageWidth + widthFlapRight, fitToPage: false,});
      }if(myFlaprightGroup.checkedState == false && myFlapleftGroup.checkedState == false){
        var myGuideSpread1No11 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread2No11 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: 0, fitToPage: false,});
        var myGuideSpread2No12 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth, fitToPage: false,});
        var myGuideSpread1No13 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth, fitToPage: false,});
        var myGuideSpread2No13 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPT1, fitToPage: false,});
        var myGuideSpread1No14 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPT1, fitToPage: false,});
        var myGuideSpread2No14 = app.activeDocument.spreads[0].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPT1 + pageWidth, fitToPage: false,});
        var myGuideSpread1No15 = app.activeDocument.spreads[1].guides.add({orientation: HorizontalOrVertical.VERTICAL, location: pageWidth + widthBookThicknessPT1 + pageWidth, fitToPage: false,});
      }
}

//Löscht alle Musterseiten A
function delPages() {
  myDoc = app.activeDocument;
  myMaster = myDoc.masterSpreads.itemByName("A-Musterseite");
  myPages = myDoc.pages;
  for (i = myPages.length - 1; i >=0; i--){
      	if (myPages[i].appliedMaster == myMaster) myPages[i].remove();;
  }
}

//Zu Zahlen umwandeln (für Hilfslinien)
function RoundWithDecimal(number, decimals){
    var multiplier = Math.pow(10,decimals);
    return Math.round(number*multiplier)/multiplier;
}