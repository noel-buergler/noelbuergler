# Verfügbare Skripte
## delete-multiple-fixed-values
Dieses Skript vereinheitlich mehrere Festwerte (beispielsweise mehrere Leerzeichen) in einen Festwert.<br />
[Download](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/delete-multiple-fixed-values/delete-multiple-fixed-values.jsxbin)

## format-apostrophs
Dieses Skript korrigiert diese falsche Apostrophs.<br />
[Download](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/format-apostrophs/format-apostrophs.jsxbin)

## format-telephone-numbers
Dieses Skript vereinheitlich Telefonnummern von folgendem Muster:<br />
`000 000 00 00`, `0000000000`, `+00 00 000 00 00`, `+00000000000` (mit Leerzeichen) zu:<br />
`000 000 00 00`, `000 000 00 00`, `+00 00 000 00 00`, `+00 00 000 00 00` (mit Achtelgeviert)<br />
[Download](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/format-telephone-numbers/format-telephone-numbers.jsxbin)

## german-abbreviations
Dieses Skript vereinheitlich deutsche Abkürzungen:
`a.A.`, `d.h.`, `i.V.`, `m.E.`, `m.W.`, `o.A.`, `u.a.`, `u.a.m`, `z.B/Z.B`, `z.H.`, `z.T.`, `Dr.`, `iur.`, `med.`, `oec.`, `rer.`, `Prof.`, `Art.`, `lit.`, `dipl.`, `Ing.`, `S.`, `Rz.`, `N.`, `Bst.`, `Anm.`, `Nr.`, `E.`, `m.ü.M`, `Fr. 00.–`<br />
[Download](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/german-abbreviations/german-abbreviations.jsxbin)

## group-numbers
Dieses Skript vereinheitlich Nummern bis zu einer Milliarde von folgendem Muster:<br />
`1000000`, `100000`, `10000`, `1’000’000`, `100’000`, `10’000`, `1‘000‘000`, `100‘000`, `10‘000`, `1‹000‹000`, `100‹000`, `10‹000`<br />
`1 000 000`, `100 000`, `10 000` (mit Achtelgeviert)
[Download](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/group-numbers/group-numbers.jsxbin)

## kerning-spatium
Diese Skripte fügen ein Spatium (30, 50, 80 Einheiten) vor gewissen typografischen Zeichen ein. Wählen Sie das zu der Schrift passende aus.<br />
[Download – 30 Einheiten](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/kerning-spatium/kerning-spatium_30.jsxbin)<br />
[Download – 50 Einheiten](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/kerning-spatium/kerning-spatium_50.jsxbin)<br />
[Download – 80 Einheiten](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/kerning-spatium/kerning-spatium_80.jsxbin)

## quotation-and-closing-marks
Diese Skripte korrigiert falsche einfache/doppelte Anführungs- & Schlusszeichen in verschiedenen Sprachen (Schweizerdeutsch, Deutsch, Französisch)<br />
[Download – Französische doppelt](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/french-double-quotation-and-closing-marks.jsxbin)<br />
[Download – Französische einzel](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/french-single-quotation-and-closing-marks.jsxbin)<br />
[Download – Deutsche doppelt](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/german-double-quotation-and-closing-marks.jsxbin)<br />
[Download – Deutsche einzel](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/german-single-quotation-and-closing-marks.jsxbin)<br />
[Download – Schweizer doppelt](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/swiss-double-quotation-and-closing-marks.jsxbin)<br />
[Download – Schweizer einzel](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/quotation-and-closing-marks/swiss-single-quotation-and-closing-marks.jsxbin)


# Anleitung zum Ablegen der Skriptdateien – macOS ab 10.0
1. Terminal öffnen
2. [Homebrew](https://brew.sh/index_de) installieren (sofern nicht installiert), folgenden Befehl ausführen:<br />
`/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`<br />
3. cURL installieren (sofern nicht installiert), folgenden Befehl ausführen:<br />
`brew install curl`<br />
4. Folgenden Befehl ausführen: (Beispiel)<br />
`curl -OL https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/delete-multiple-fixed-values/delete-multiple-fixed-values.jsxbin`<br />
Syntax: `curl` = Programm, `-OL` = O bedeutet, dass curl den Inhalt herunterlädt L bedeutet, dass curl der Umleitung folgt, `https://{url-zu-datei}` = URL zur Datei, die man herunterladen möchte, diese URL kann bei Klick auf "Download" generiert werden.
5. Die Datei wird unter `Macintosh HD/Benutzer/username` gespeichert.
6. Die Datei an den Pfad verschieben, wo es gebraucht wird, siehe README.md der einzelnen Skriptordner.

# Anleitung zum Ablegen der Skriptdateien – Windows 10
1. CMD als Administrator öffnen
2. Folgenden Befehl ausführen: (Beispiel)<br />
`curl -OL https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads/delete-multiple-fixed-values/delete-multiple-fixed-values.jsxbin`<br />
Syntax: `curl` = Programm, `-OL` = O bedeutet, dass curl den Inhalt herunterlädt L bedeutet, dass curl der Umleitung folgt, `https://{url-zu-datei}` = URL zur Datei, die man herunterladen möchte, diese URL kann bei Klick auf "Download" generiert werden.
5. Die Datei wird unter `C:\username` gespeichert.
6. Die Datei an den Pfad verschieben, wo es gebraucht wird, siehe README.md der einzelnen Skriptordner.