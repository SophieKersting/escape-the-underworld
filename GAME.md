# GAME.md — Spielspezifikation

⚠️ **Diese Datei ist die einzige gültige Quelle für den Spiel-Scope.**
Was hier nicht steht, wird nicht gebaut — keine Platzhalter, keine Stubs,
keine "Vorbereitung" für Unerwähntes. Erweiterungen werden erst hier
eingetragen (durch mich), dann umgesetzt.

*(Claude Code darf beim Weiterentwickeln dieser Datei helfen und Rückfragen
stellen, aber nichts eigenmächtig ergänzen.)*

## Spielidee in Kürze

Arbeitstitel: **Entkomme dem Totenreich**

Ein kurzweiliges rundenbasiertes Kartenspiel-Seifenkistenrennen, bei dem die
Spielerfiguren je nach ausliegenden Karten auf einem Hex-Spielfeld bewegt
werden. Jeder Spieler spielt eine kleine Seele im Totenreich von Hades, die
zurück ins Reich der Lebenden entkommen möchte. Um sich fortbewegen und
Hindernisse überwinden zu können, bastelt sich die Seele einen behelfsmäßigen
Körper, der jedoch immer wieder auseinanderfällt, sodass Teile ersetzt werden
müssen — genutzt wird, was man findet: das Bein eines Riesen, der Rumpf eines
Minotaurus, eine Schwinge von Ikarus oder der Kopf eines Zyklopen.

*(Die Karten-/Körperteil-Mechanik ist Zukunftsmusik, siehe unten. Version 1
ist nur das nackte Wettrennen.)*

## Version 1 — der kleinste spielbare Kern

Genau das, was in Modul M2 gebaut wird. **Hot-Seat-Modus:** alle Spieler
spielen abwechselnd am selben Bildschirm/Gerät, es gibt keinerlei
Netzwerk-/Online-Funktionalität.

**Setup-Bildschirm**
- 1–6 Spieler; pro Spieler: Farbe wählbar, ab 2 Spielern Zugreihenfolge
  anpassbar
- Button "Spiel starten"

**Spielfeld & Aufstellung**
- Hex-Spielfeld, 6x6, insgesamt annähernd quadratische Form; Ausrichtung so,
  dass jedes Feld Nachbarn seitlich (links/rechts) sowie schräg vorne
  (links/rechts) und schräg hinten (links/rechts) hat
- Zu Beginn platziert jeder Spieler der Reihe nach seine Spielfigur (Kreis in
  Spielerfarbe) auf ein freies Feld der untersten Hex-Reihe; dabei wird
  angezeigt: "Spieler X — Wähle dein Startfeld"

**Spielzug**
- Angezeigt wird, wer dran ist: "Spieler X ist am Zug"
- Er wählt einen von zwei Buttons: "schräg links vor" oder "schräg rechts vor"
- Ist das Zielfeld frei, bewegt sich die Figur dorthin
- Ist das Zielfeld belegt oder liegt außerhalb des Spielfelds, bewegt sich
  die Figur **nicht** — der Zug verfällt (kurze Meldung anzeigen, z.B.
  "Feld belegt — Zug verfällt", damit es nicht wie ein Fehler wirkt)
- Danach ist der nächste Spieler in der Zugreihenfolge dran

**Spielende**
- Das Spiel endet, sobald die erste Figur ein Feld der obersten Reihe
  erreicht; der zugehörige Spieler wird als Sieger verkündet
- Danach Button: "Nochmal spielen / Zurück zum Setup"

**Jederzeit verfügbar**
- Button "Spiel beenden / Zurück zum Setup" (bricht die laufende Partie ohne
  Bestätigungsdialog ab)

## Explizit NICHT im Scope (Version 1)

Alles hier ist bewusst ausgeschlossen. Nicht bauen, nicht vorbereiten,
nicht als TODO anlegen:

- **Kein Online-Mehrspieler, keine Lobby, kein Netzwerkcode** — V1 ist
  ausschließlich Hot-Seat
- Kein Login / keine Benutzerkonten
- Keine Karten für Körperteile (Kopf, 2x Arm, 1x Rumpf, 2x Bein) mit
  Fähigkeiten
- Keine Hindernisse auf dem Spielfeld
- Keine KI-/Computergegner
- Keine Speicherung von Spielständen oder Statistiken
- Keine Soundeffekte / Animationen über das Nötigste hinaus

## Vielleicht später (kein Auftrag!)

- Online-Mehrspieler mit Lobby (guter Kandidat für ein Anschlussprojekt
  nach Abschluss aller DevOps-Module)
- **Karten-/Körperteil-Mechanik mit Fähigkeiten.** Design-Notiz als Kontext
  (KEIN Bauauftrag, V1 nicht dafür vorbereiten!): Jedes Körperteil hat einen
  eigenen Effekt, z.B. bewegt das linke Bein die Figur Y Schritte nach
  schräg links vor, das rechte Bein Z Schritte nach schräg rechts vor —
  ein Gigantenbein etwa 4 Schritte, ein einfaches Bein 1 Schritt. Pro Körperteil
  gibt es dann einen Button, dessen Beschriftung, Bild und Effekt vom
  ausliegenden Teil abhängen. Die zwei festen Buttons aus V1 entsprechen
  damit rückblickend "zwei einfachen Beinen" und werden bei
  Einführung dieser Mechanik zum Spezialfall des Systems (Umbau erfolgt als
  Refactoring unter Testabdeckung).
- Kollisionseffekte statt "Zug verfällt" (Verlust von Körperteilen, je nach
  Rumpfstärke) 
- Hindernisse und Ereignisfelder im Stil der griechischen Unterwelt
- Körperteil-Namen und Effekte angelehnt an griechische Mythologie
