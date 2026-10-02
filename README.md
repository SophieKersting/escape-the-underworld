# Entkomme dem Totenreich (escape-the-underworld)

Ein kleines Browserspiel als **Lernprojekt für DevOps, Cloud und professionelle
Softwareentwicklung**. Das Spiel selbst ist bewusst einfach gehalten, denn im
Mittelpunkt steht der Weg dorthin: Versionskontrolle, automatisierte Tests,
CI/CD, Containerisierung, Infrastructure as Code und Deployment in die Cloud.

- Spielidee und Scope: [GAME.md](GAME.md)
- Lernpfad und Fortschritt: [PLAN.md](PLAN.md)
- Architekturentscheidungen (ADRs): [docs/decisions/](docs/decisions/)

## Entstehung mit KI-Unterstützung

Das Projekt entsteht in Zusammenarbeit mit
[Claude Code](https://claude.com/claude-code), dem KI-Assistenten von
Anthropic für die Kommandozeile (CLI). Claude Code schreibt Code und
Konfiguration, erklärt jeden Schritt und fragt mein Verständnis gezielt ab.
Entscheidungen treffe ich selbst. Wie die Zusammenarbeit genau abläuft, ist in
[CLAUDE.md](CLAUDE.md) festgelegt.

## Stack

| Bereich                     | Werkzeug                          | Status           |
| --------------------------- | --------------------------------- | ---------------- |
| Versionskontrolle           | Git + GitHub                      | ✅               |
| CI/CD                       | GitHub Actions                    | geplant (M5, M8) |
| Containerisierung           | Docker                            | geplant (M6)     |
| Infrastructure as Code      | Terraform                         | geplant (M7)     |
| Cloud                       | Microsoft Azure                   | geplant (M7)     |
| App-Stack                   | wird in Modul M2 entschieden      | geplant (M2)     |

## Fortschritt

- **M0 — Werkzeugkasten & Repo-Setup:** Git und GitHub eingerichtet. Secrets
  und Datenschutz von Anfang an mitgedacht: Zugangsdaten liegen nur lokal
  außerhalb des Repos, Commits laufen über eine No-Reply-Adresse. Weitere
  Schutzschichten: GitHub Push Protection (aktiv seit M1) und ein Secret-Scan
  mit gitleaks (geplant, M5).
- **M1 — Git-Workflow:** Das Repo ist öffentlich, GitHub Push Protection ist
  aktiv. Für `main` gilt Branch Protection, damit dort stets ein geprüfter
  Stand liegt: keine direkten Pushes oder Force-Pushes, auch nicht für Admins.
  Jede Änderung entsteht auf einem Feature-Branch und gelangt per Pull Request
  nach `main`. Da ich allein arbeite, prüfe ich jeden PR im Self-Review anhand
  des Diffs. Gemergt wird per Squash and Merge, sodass `main` pro PR genau
  einen Commit nach
  [Conventional Commits](docs/decisions/0001-conventional-commits.md) erhält.

Details zu allen Modulen: [PLAN.md](PLAN.md)
