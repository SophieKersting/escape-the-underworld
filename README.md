# Entkomme dem Totenreich (escape-the-underworld)

Ein kleines Browserspiel als **Lernprojekt für DevOps, Cloud und professionelle
Softwareentwicklung**. Das Spiel selbst ist bewusst einfach gehalten, denn im
Mittelpunkt steht der Weg dorthin: Versionskontrolle, automatisierte Tests,
CI/CD, Containerisierung, Infrastructure as Code und Deployment in die Cloud.

- Spielidee und Scope: [GAME.md](GAME.md)
- Lernpfad und Fortschritt: [PLAN.md](PLAN.md)

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
  Schutzschichten sind geplant: GitHub Push Protection (M1) und ein
  Secret-Scan mit gitleaks (M5).

Details zu allen Modulen: [PLAN.md](PLAN.md)
