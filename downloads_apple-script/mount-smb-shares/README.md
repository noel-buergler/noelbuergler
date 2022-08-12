# Erläuterung zum Skript
## mount-smb-shares.scpt
Dieses Skript mountet SMB-Shares beim Starten des Macs.<br />

## Anpassung des Skripts
Zuerst muss das Skript angepasst werden mit dem entsprechenden SMB-Share sowie Ordner, auf dem man zugreifen möchte.<br />
Der Ordner kann auch weggelassen werden, wenn der komplette SMB-Share gemountet werden soll.
![Anpassung des Skripts](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads_apple-script/images/mount-smb-shares_1.png)

## Exportieren des Skripts
Danach muss das Skript exportiert und als App gespeichert werden. Der Speicherort kann frei gewählt werden:
![Exportieren](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads_apple-script/images/mount-smb-shares_2.png)
![Speichern als App](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads_apple-script/images/mount-smb-shares_3.png)

## Hinterlegen des Skripts
Die Applikation muss dann unter `Systemeinstellungen > Benutzer:innen & Gruppen > Nutzer > Anmeldeobjekte` hinterlegt werden:
![Hinterlegen als Anmeldeobjekt](https://raw.githubusercontent.com/noel-buergler/noelbuergler/main/downloads_apple-script/images/mount-smb-shares_4.png)