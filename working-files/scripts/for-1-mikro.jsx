/* Neuauflage Oktober 2021

Skript 1: Alle GREP-Abfragen ohne Formatänderungen

Claudia Naef

*/

// "Zahlen gruppieren" vor "Anführungszeichen"


// Array mit allen Suchabfragen und Ersetzungen
var grepList = [

//Doppelte Leerräume entfernen
'[~m~>~f~|~S~s~<~/~.~3~4~% ]{2,}',
'\\s',

 //Jahrteskreis in Jahreskreis
'Jahrteskreis',
'Jahreskreis',

//Lobreis in Lobpreis
'Lobreis',
'Lobpreis',

//Mediation in Meditation
'Mediation',
'Meditation',

//Herz Jesu Freitag in Herz-Jesu-Freitag
'Herz Jesu Freitag',
'Herz-Jesu-Freitag',

//Mess-Stiftung in Messstiftung
'Mess-Stiftung',
'Messstiftung',

//Oekumenisch in Ökumenisch
'Oekumenisch',
'Ökumenisch',

//ß in ss
'ß',
'ss',

//Caritas Woche in Caritas-Woche
'Caritas Woche',
'Caritas-Woche',

//Justinus Werk in Justinus-Werk
'Justinus Werk',
'Justinus-Werk',

//Santa messa in Santa Messa 
'Santa messa',
'Santa Messa',

//Schwiizer Chuchi Team in Schwiizer-Chuchi-Team 
'Schwiizer Chuchi Team',
'Schwiizer-Chuchi-Team',

//Muki Treffen in Muki-Treffen 
'Muki Treffen',
'Muki-Treffen',

//Franziskus Chor in Franziskus-Chor 
'Franziskus Chor',
'Franziskus-Chor',

//Laurentius Chor in Laurentius-Chor 
'Laurentius Chor',
'Laurentius-Chor',

//1›000 in 1000
'(?<=\\D\\d)›(?=\\d{3}\\D)',
'',

// falsches Apostroph aus Zahlen entfernen
'\\d\\K\'(?=\\d)',
'',

// Zahlen mit Achtelgeviert gliedern
'(?x) ((\d)(?=(\\d{9})\\b)) | ((\\d{3})(?=(\\d{6})\\b)) | ((\\d)(?=(\\d{6})\\b)) | ((\\d{3})(?=(\\d{3})\\b)) | ((\\d{2})(?=(\\d{3})\\b))',
'$0~<',

// Zahlen mit Achtelgeviert gliedern 2
'(?x) ((\d)(?=(\\d{9})\\b)) | ((\\d{3})(?=(\\d{6})\\b)) | ((\\d)(?=(\\d{6})\\b)) | ((\\d{3})(?=(\\d{3})\\b)) | ((\\d{2})(?=(\\d{3})\\b))',
'$0~<',

//Doppelte Anführungszeichen
'[„“”](.+?)[„“”]',
'«$1»',

'(?<=\\h)»(.+?)«(?=\\h)',
'«$1»',

//Einfache Anführungszeichen
'(?<!\\l)[‚‘’›](.+?)[‚‘’‹](?!\\l)',
'‹$1›',

//19. 30 Uhr in 19.30 Uhr  /  9. 30 Uhr in 9.30 Uhr  (Leerzeichen entfernen)
'[1-2]?[0-9]\\.\\K\\s(?=\\d\\d\\sUhr)',
'',

//19:30 Uhr in 19.30 Uhr
'((?<=\\d{2}):(?=\\d{2}\hUhr)|(?<=\\d{2}):(?=\\d{2})|(?<=\\d{1}):(?=\\d{2})|(?<=\\d{1}):(?=\\d{2}\\hUhr))',
'.',

//16 Uhr in 16.00 Uhr
'(?<!(\\.|\\d))([1-2]?[0-9])(\\s(Uhr)(?![\\l\\u]))',
'$2.00$3',

//8-9 Uhr in 8.00–9.00 Uhr
'(\\d{1,2})\\s?[–-]\\s?(\\d{1,2})(\\sUhr)',
'$1.00–$2.00$3',

//9.00 – 10.00 in 9.00–10.00
'(?<=\\d\\.\\d{2})\\s?[–-]\\s?(?=\\d\\d?\\.\\d{2})',
'–',

// 14 bis 16.00 Uhr in 14.00 bis 16.00 Uhr
'[12][0-9]\\K\\h(?=bis\\h[12][0-9]\\.(00)?\\hUhr)',
'.00\\s',

// 16.30 Uhr - 17.15 Uhr in 16.30-17.15 Uhr  (erstes "Uhr" entfernen, Halbgeviertstrich ohne Abstände)
'[12]?[0-9]\\.[0-5][05]\\K\\hUhr\\h[-–]\\h(?=[12]?[0-9]\\.[0-5][05]\\hUhr)',
'–',

//
'\s[12]?[0-9]\\K\\h?[-–]\\h?(?=[12]?[0-9]\\.[0-5][05]\\hUhr)',
'.00–',

//St. X oder St.X in St. X
'(\\b(St\\.))\\h?(?=[\\l\\u])',
'$1~<',

//Spatium vor Prozentzeichen
'(\\d+)\\h?(%)',
'$1~|$2',

//06. März in 6. März
'\\b0(\\d\\.)\\h(Januar|Jan\\.|Februar|Feb\\.|März|Mrz\\.|April|Apr\\.|Mai|Juni|Juli|August|Aug\\.|September|Sept\\.|Oktober|Okt\\.|November|Nov\\.|Dezember|Dez\\.)',
'$1 $2',

//06.-7. März in 6.-7. März (0 entfernen)
'\\b0(?=\\d\\.\\h?(-|–)\\h?\\d{1,2}\\.\\h(Januar|Jan\\.|Februar|Feb\\.|März|Mrz\\.|April|Apr\\.|Mai|Juni|Juli|August|Aug\\.|September|Sept\\.|Oktober|Okt\\.|November|Nov\\.|Dezember|Dez\\.))',
'',

//1.-4. März in 1.–4. März (Halbgeviertstrich)
'(\\b\\d{1,2}\\.)\\h?(-|–)\\h?(\\d{1,2}\\.\\h(Januar|Jan\\.|Februar|Feb\\.|März|Mrz\\.|April|Apr\\.|Mai|Juni|Juli|August|Aug\\.|September|Sept\\.|Oktober|Okt\\.|November|Nov\\.|Dezember|Dez\\.))',
'$1–$3',

//02.02.2018 in 2.02.2018 und 06.08. in 6.08.  (erste 0 entfernen)
'\\b0(?=[1-9]\\.[0|1]?[0-9]\\.)',
'',

//6.09. in 6.9. (zweite 0 entfernen)
'(?<=1|0)?(?<=\\d\\.)0(?=[1-9]\\.)',
'',

// 09.00 in 9.00 (0 davor entfernen)
'\\b0(?=[1-9]\\.[0-5][05]\\D)',
'',

//2018 - 2019 in 2018–2019 (Halbgeviertstrich)
'(?<=(19|20)\\d{2})\\s?[–-]\\s?(?=(19|20)\\d{2})',
'~=',

//Gedankenstrich
'(?<=[\\u\\l»)]\\h)-(?=\\h[\\u\\l«(])',
'~=',

// Tannacher - 18.00  (Gedankenstrich)
'\\l\\h\\K-(?=\\h\\d)',
'~=',

//Halbgeviertstrich zwischen zwei Daten
'[12]?[0-9]\\.[01]?[0-9]\\.\\K\\h[-–]\\h(?=[12]?[0-9]\\.[01]?[0-9])',
'–',

// *19.6.1949 - † 27.10.2021  in  *19.6.1949 – † 27.10.2021  (Achtelgeviert + Halbgeviertstrich + Achtelgeviert)
 '\\s[-–]\\s(?=†)',
 '~<~=~<',

//Preise in Fr.
'(Fr\\.|SFR|SFr|sFR)\\.?(?=\\h+(\\d+\\.(~=|\\d{2})))',
'Fr.',

//CHF in Fr.
'(?<!(\\u|\\l))(CHF|SFR|SFr|SFr\\.|sFR)(?=\\s)',
'Fr.',

// .00 in .– bei Preisen (Halbgeviertstrich)
'\\bFr\\.\\h\\d+\\.\\K00\\b',
'–',

// 10.-- in 10.– (Halbgeviertstrich)
'\\b\\d+\\.\\K--',
'–',

//Richtiger Apostroph
'(?<=(\\u|\\l))(´|΄|‘|`|‹)',
'’',

//Geschütztes Leerzeichen bei Uhrzeiten
'(?<=\\d\\.\\d\\d) (?=Uhr)',
'~s',

// Int: + ersetzen durch «Int: †»
'Int\\K[:.]\\h\\+',
': †',

// Wingdings Kreuz (V) durch Glyphe † ersetzen
'^V(?=\\h[12]?[0-9]\\.1?[0-9]\\.202[2-9]\\b)',
'†',

// + ersetzen durch «und»
'(?<= )\\+(?= )',
'und',

// <> zu «»
'<',
'«',

'>',
'»',

// Abstand vor Komma entfernen
'\\h,',
',',

// Maria Hilf zu Maria-Hilf
'Maria Hilf',
'Maria-Hilf',

// Gottestdienst Uhrzeiten
'(?<!\\d)\\r(?=\\d\\.\\d{2}(\\h|\\t))',
'\\r\\t',

'((?<=\\r)0(?=\\d{1}\\.\\d{2})|(?<=\\r)\\t0(?=\\d{1}\\.\\d{2}))',
'\\t',

'(?<=\\d\\.\\d{2})\\t\\t',
'\\t',

'(?<!\\d)\\r(\\t\\d|\\t\\d{2}|\\d|\\d{2})\\.\\d{2}\\K(\\t|\\t\\t|\\t )',
'\\t',

'\\r(\\t\\d|\\t\\d{2}|\\d|\\d{2})\\.\\d{2}(?!(\\.|\\h|\\t|\\t\\t|–))',
'$0\\t',

// Wochentag Datum Zeit mit Tabulatoren
'(Mo|Di|Mi|Do|Fr|Sa|So)\\K\\h+(?=(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\h+(\\d|\\d{2})\\.(\\d|\\d{2})\\h+.+$)',
'\\t',

'(Mo|Di|Mi|Do|Fr|Sa|So)\\h+(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\K\\h+(?=(\\d|\\d{2})\\.(\\d|\\d{2})\\h+.+$)',
'\\t',

'(Mo|Di|Mi|Do|Fr|Sa|So)\\h+(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\h+(\\d|\\d{2})\\.(\\d|\\d{2})\\K\\h+(?=.+$)',
'\\t',

// Tabulator und Abstand bei Uhrzeiten entfernen    Sonntag:   19.30       - 20.15
'(Montag|Dienstag|Mittwoch|Donnerstag|Freitag|Samstag|Sonntag):\\t\\t[12]?[0-9]\\.[0-5][0,5]\\K\\t\\h[-–]\\h(?=[12]?[0-9]\\.[0-5][0,5]\\hUhr)',
'–',

// Unnötige Returns zu einem
'\\r\\r\\r+',
'\\r\\r',

// 3.-6. Klässler (Halbgeviertstrich)
'(?<=\\d\\.)-(?=\\d\\.)',
'–',

// 3. - 6. Klässler (Abstände raus, Halbgeviertstrich)
'\\d\\.\\K\\h[-–]\\h(?=\\d\\.\\hKlasse)',
'~=',

// 17.00 h und 7.00 h zu Uhr
'(\\d{1}|\\d{2})\\.\\d{2}\\h\\Kh',
'Uhr',

// Geviertstrich zu Halbgeviertstrich (nicht wenn Tabulator für rechte Ausrichtung davor steht)
'(?<!)((CHF|Fr)\\.\\h\\d{4}\\.\\K—|(CHF|Fr)\\.\\h\\d{2}\\h\\d{3}\\.\\K—|(CHF|Fr)\\.\\h\\d{3}\\h\\d{3}\\.\\K—|(CHF|Fr)\\.\\h\\d{1}\\h\\d{3}\\h\\d{3}\\.\\K—|(CHF|Fr)\\.\\h\\d{3}\\.\\K—|(CHF|Fr)\\.\\h\\d{2}\\.\\K—|(CHF|Fr)\\.\\h\\d{1}\\.\\K—)',
'–',

// Doppelter Divis zu Halbgeviertstrich
'((CHF|Fr)\\.\\h\\d{4}\\.\\K--|(CHF|Fr)\\.\\h\\d{2}\\h\\d{3}\\.\\K--|(CHF|Fr)\\.\\h\\d{3}\\h\\d{3}\\.\\K--|(CHF|Fr)\\.\\h\\d{1}\\h\\d{3}\\h\\d{3}\\.\\K--|(CHF|Fr)\\.\\h\\d{3}\\.\\K--|(CHF|Fr)\\.\\h\\d{2}\\.\\K--|(CHF|Fr)\\.\\h\\d{1}\\.\\K--)',
'–',

// Di-Fr (ohne Abstand, Halbgeviertstrich)
'\\b(Mo|Di|Mi|Do|Fr|Sa|So)\\K\\h?[-–]\\h?(?=(Mo|Di|Mi|Do|Fr|Sa|So)\\b)',
'–',

// «Point 18»-Jugendabendgebet zu «Point 18» Jugendabendgebet (Divis entfernen)
'«Point 18»-Jugendabendgebet',
'«Point 18» Jugendabendgebet',


// Kollekten vor Betrag ein Tabulator mit rechter Ausrichtung
'.+\K~y(?=\\d+\\.\\d+\\r\\r)',
' ',

'(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\K\\h+(?=.+~y\\d+\\.\\d+)',
'\\t',

'\\r(?=(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\t.+~y\\d+\\.\\d+)',
'\\r\\t',

'(\\t+|\\h+)(?=~y)',
'',

// Erlöse vereinheitlichen
'.+\\K(\\h+|\\t+)(?=Fr\\.(\\h+|\\t+)\\d+\\.–\\r)',
'~y',

'\\r.+~yFr\\.\\K(\\h+|\\t+)(?=\\d+\\.~=)',
' ',

// Opfereinnahmen
'(\\r|\\r\\t+)(?=(\\d|\\d{2})\\.(\\d|\\d{2})\\.(\\h+|\\t+).+(\\h+|\\t+)\\d+\\.-\\r)',
'\\r\\t',

'(\\r|\\r\\t+)(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\K(\\h+|\\t+)(?=.+(\\h+|\\t+)\\d+\\.-\\r)',
'\\t',

'(\\r|\\r\\t+)(\\d|\\d{2})\\.(\\d|\\d{2})\\.(\\h+|\\t+).+\\K(\\h+|\\t+)(?=\\d+\\.-\\r)',
'~y',

'(\\r|\\r\\t+)(\\d|\\d{2})\\.(\\d|\\d{2})\\.(\\h+|\\t+).+(\\h+|\\t+|~y)\\d+\\.\\K-(?=\\r)',
'–',

// Schrägstrich ohne Leerzeichen
' ?/ ?',
'/',

// Gratulationen mit einem Tabulator und Tabulator rechte Ausrichtung
'(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\K\\t+',
'\\t',

'(\\d|\\d{2})\\.(\\d|\\d{2})\\.\\t+.+\\K\\t+(?=(\\d{2}|\\d)\\hJahre)',
'~y',

// Gottesdienste Doppelte Tabulatoren zu einem
'(?<=(\\d{2}\\.\\d{2}))\\t\\t',
'\\t',

'(?<=(\\d{1}\\.\\d{2}))\\t\\t',
'\\t',

// evang. ref. zu ev.-ref.
'evang\\.\\h(?=ref\\.)',
'ev.-',

// Abkürzungen (z.B oder z. B) mit Achtelgeviert
'(?<=[a-zA-Z])(\\.|\\.\\h)(?=[a-zA-Z]\\.)',
'.~<',

// Tabellenziffern .00 zu .––
'~y\\d+\\.\\K00',
'~_',

// Tabellenziffern  Geviertstrich
'Fr\\.~y\\d+?\\.\\K[-–]',
'—',

// Frankenbeträge (Halbgeviertstrich)
'Fr\\.(\\h|\\t)\\d+\\.\\K-',
'~=',

//Frankenbeträge (Seite 14 «Regeln zur Mikrotypografie.» von Althaus)
'(?<=Fr\\.)\\h(?=\\d)',
'~<',

'\\d+\\K-(?=\\d+)',
'~=',

// Frankenbeträge ohne Währung mit Halbgeviertstrich
'\\b\\d+\\.\\K-(?=\\D)',
'~=',

// Divis in Halbgeviertstrich 
'@KTIVI@ \\K-(?= Kultur und (bildung|Bildung))',
'~=',

// richtiges MInuszeichen bei +/-
'\\+/\\K-',
'~=',

// richtiges Multiplikationszeichen
'(\\d+|\\d+\\h)\\Kx(?=(\\h\\d+|\\d+))',
'×',

// doppelte Abstände vor Multiplikationszeichen entfernen
'\\h+(?=×)',
' ',

// doppelte Abstände nach Multiplikationszeichen entfernen
'×\\K\\h+',
' ',

// Abstand vor Multiplikationszeichen hinzufügen
'(?<!\\h)×',
' ×',

// Christus + Mansionem + Benedicat
'Christus+Mansionem+Benedicat',
'Christus + Mansionem + Benedicat',

'ChristusundMansionemundBenedicat',
'Christus + Mansionem + Benedicat',

'Christus und Mansionem und Benedicat',
'Christus + Mansionem + Benedicat',

// 9.30h in 9.30 Uhr
'[12]?[0-9]\\.[0-5][05]\\K\h?h(?=[\\U\\L])',
'~SUhr',

// 1/2 in ½ (Glyphe)
'\\b1\\/2\\b',
'½',

// v 1.3.1936 - V 20.10.2021  in * 1.3.1936–† 20.10.2021
'^(v)(\\h\\d?\\d\\.\\d?\\d\\.(19|20)\\d\\d)(\\h?[-–]\\h?)(V)(?=\\h\\d?\\d\\.\\d?\\d\\.(19|20)\\d\\d\\b)',
'*$2–†',

// Auslassungspunkte, Abstand davor und  danach
'(\\h?\\.{3,})(\\h?)',
'\\s...\\s',

// Auslassungspunkte (Abstand davor, reduziert auf 3)
'\\S\\K\\.{3,}',
' ...',

// Auslassungspunkte am Absatzbeginn (Abstand danach)
'^\\.{3,}(?=\\H)',
'... ',

// überflüssiges "Uhr" löschen
'[12][0-9]\\.[0-5][05]\\K\\hUhr(?=\\hbis\\h[12][0-9]\\.[0-5][05]\\hUhr)',
'',

// Wortabstand am Anfang der Zeile löschen
'^ ',
'',

// Leeräume vor und nach Halbgeviertstrich entfernen bei Tabellen mit Zeiten
'(Mo|Di|Mi|Do|Fr|Sa|So)\\t\\t[12]?\\d\\.[0-5][05]\\K\\t – (?=[12]?\\d\\.[0-5][05])',
'–',

// Textanker entfernen
'~a',
'',

]


//Loop mit allen Grep-Suchabfragen
function grepLoop (){
    for (i=0; i < grepList.length; i++){
        grepOptions (grepList[i], grepList[i+1]);
        i++;
     }
}


//Suchoptionen Grep
function grepOptions (findGrep, replaceGrep){

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

app.findChangeGrepOptions.properties = ({ includeMasterPages:false, includeFootnotes: true, kanaSensitive: true, widthSensitive: true });

app.findGrepPreferences.findWhat = findGrep;
app.changeGrepPreferences.changeTo = replaceGrep;

app.activeDocument.changeGrep();

app.findGrepPreferences = NothingEnum.nothing;
app.changeGrepPreferences = NothingEnum.nothing;

}



grepLoop();
