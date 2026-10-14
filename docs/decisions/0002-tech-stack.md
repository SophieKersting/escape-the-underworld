# ADR 0002: Tech-Stack für das Spiel

**Status:** Angenommen · **Datum:** 14.10.2026

## Kontext

Version 1 des Spiels (siehe [GAME.md](../../GAME.md)) läuft vollständig im
Browser: Hot-Seat ohne Netzwerk, Login oder Speicherung, mit wenigen
Bildschirmen und wenig Zustand. Für Modul M2 brauchen wir einen Stack, der
lokal startbar ist und sich in den späteren Modulen testen, containerisieren
und deployen lässt.

## Entscheidung

Wir bauen das Spiel als rein statische Webanwendung in **TypeScript ohne
UI-Framework** (*Vanilla*). Das Spielfeld wird als SVG dargestellt. Als
Build-Tool und Dev-Server dient **Vite**, als Laufzeitumgebung für die
Werkzeuge **Node.js** mit **npm**.

## Begründung

Die Optionen und ihre Vor- und Nachteile haben wir gemeinsam mit Claude Code
zusammengestellt; die Entscheidung habe ich auf dieser Grundlage getroffen.

Für wenige Bildschirme mit wenig Zustand wäre ein Framework wie React
Overhead. Ohne Framework bleibt der Code nachvollziehbar und lenkt nicht vom
DevOps-Fokus des Projekts ab. Ein Spiel-Framework wie Phaser lohnt sich erst
bei Echtzeit-Grafik. TypeScript ist Industriestandard im Frontend und deckt
Typfehler schon beim Build auf statt zur Laufzeit. Ein Backend wäre ohne
Netzwerkfunktionen überflüssig.

## Konsequenzen

TypeScript bringt einen Build-Schritt und etwas Konfiguration mit, beides
übernimmt weitgehend Vite. Die Spiellogik halten wir von der Darstellung
getrennt, damit sie ohne Browser per Unit-Test prüfbar ist (M3). Weil die App
statisch ist, genügt für Container und Hosting ein einfacher Webserver
(M6/M7). Sollte später Online-Mehrspieler kommen, braucht es ein Backend und
eine neue ADR.
