# ADR 0001: Conventional Commits als Commit-Konvention

**Status:** Angenommen · **Datum:** 30.09.2026

## Kontext

Ab Modul M1 gelangen alle Änderungen über Feature-Branches und Pull Requests
nach `main`. Damit die Historie lesbar bleibt, brauchen Commit-Messages ein
einheitliches Format.

## Entscheidung

Wir verwenden [Conventional Commits](https://www.conventionalcommits.org/):
`<typ>: <beschreibung>`, z.B. `docs: add ADR for commit convention`. Die
Beschreibung ist englisch, im Imperativ und klein geschrieben.

## Begründung

Der Typ einer Änderung ist auf einen Blick erkennbar, und die Messages sind
maschinenlesbar, z.B. für automatische Changelogs. In diesem Lernprojekt kommt
hinzu: Das Präfix zwingt dazu, sich vor jedem Commit bewusst zu machen, was man
committet und wie es sich einordnen lässt. Das Abwägen ist hier eine
willkommene Übung.

## Konsequenzen

Die Präfixe müssen gelernt werden. Damit das den Fortschritt nicht bremst,
stellt Claude Code vor jedem Commit die Präfix-Liste zur Auswahl bereit.
Gelernt wird durch Anwendung (*learning by doing*).
