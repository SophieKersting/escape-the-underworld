# PLAN.md — Lernpfad

Regeln zum Ablauf stehen in CLAUDE.md. Jedes Modul durchläuft die vier Phasen
(Einordnung → Umsetzung → Geführter Durchgang → Festigung). Ein Modul gilt
erst als abgeschlossen, wenn Phase 4 durchlaufen ist — dann Checkbox setzen.

Nach Modul-Abschluss hier eintragen: `[x]` + Datum + 1 Satz "Kernaussage in
meinen Worten" (schreibe ich selbst, als Mini-Zusammenfassung).

## Module

- [x] **M0 — Werkzeugkasten & Repo-Setup** — abgeschlossen am 28.09.2026
  *Kernaussage:* Secrets und Datenschutz klärt man vor dem ersten Commit,
  nicht danach.
  Git installiert/konfiguriert, GitHub-Repo angelegt, Azure CLI eingerichtet,
  erstes minimales README (Was ist das, Lernprojekt DevOps, geplanter Stack),
  sinnvolle .gitignore. Erster Commit. Remote vorerst privat. 
  Begriffe: Repository, Commit, Remote.

- [x] **M1 — Git-Workflow** — abgeschlossen am 02.10.2026
  *Kernaussage:* Push Protection verhindert Push von sicherheitsrelevanten
  Inhalten (zB Keys) und Branch Protection erzwingt einen Workflow bei dem auf
  Feature-Branches entwickelt wird und Änderungen dann nur durch einen Pull
  Request auf main landen können.
  Branches, Pull Requests, Branch-Schutz auf main, sinnvolle Commit-Messages.
  Wir üben den Zyklus einmal komplett an einer README-Änderung. Git Repo 
  öffentlich schalten und GitHub Push Protection aktivieren.
  Begriffe: Branch, PR, Merge, Review, Feature-Branch-Workflow.

- [ ] **M2 — Grundgerüst der Anwendung**
  Tech-Stack entscheiden (ADR!), minimales lauffähiges Spielgerüst laut
  GAME.md — nur der kleinste spielbare Kern, lokal startbar.
  Begriffe: Projektstruktur, Dependencies, lokale Entwicklungsumgebung.

- [ ] **M3 — Automatisierte Tests**
  Test-Framework einrichten, eine Handvoll Unit-Tests für die Spiellogik.
  Was testet man, was nicht? Begriffe: Unit-Test, Test-Runner, Assertion,
  Testabdeckung (Coverage) — und warum 100 % Coverage kein Ziel ist.

- [ ] **M4 — Linting & Formatierung**
  Linter und Formatter einrichten, einmal absichtlich Fehler einbauen und
  vom Linter finden lassen. Begriffe: Linter, Linting, Formatter,
  Code-Style, "der Linter schlägt fehl".

- [ ] **M5 — CI: Continuous Integration**
  GitHub-Actions-Workflow: bei jedem PR laufen Lint + Tests, main ist nur
  per grünem PR erreichbar. Absichtlich einen roten PR erzeugen und fixen.
  Secret-Scan mit gitleaks als Pipeline-Schritt (optional zusätzlich als
  lokaler Pre-Commit-Hook, um "lokal vs. zentral prüfen" zu vergleichen).
  Begriffe: Pipeline, Workflow, Job, Step, "die Pipeline ist grün/rot".

- [ ] **M6 — Containerisierung**
  Dockerfile für die App, lokal bauen und starten. Image im CI bauen.
  Begriffe: Image, Container, Dockerfile, Registry, "das Image bauen".

- [ ] **M7 — Infrastructure as Code mit Terraform**
  Terraform-Grundlagen, Azure Resource Group + Container-Hosting (kleinste
  SKU) definieren, `plan`/`apply`/`destroy` verstehen und selbst ausführen.
  Begriffe: IaC, State, Provider, Ressource, "terraform apply/destroy".
  ⚠️ Ab hier entstehen potenziell Kosten → Destroy-Routine!

- [ ] **M8 — CD: Deployment nach Staging**
  Pipeline erweitern: nach grünem main-Build wird das Image deployed.
  Secrets sauber hinterlegen (GitHub Secrets), niemals im Repo.
  Begriffe: CD, Deployment, Staging, Secret, Service Principal.

- [ ] **M9 — Umgebungen: Staging & Produktion**
  Zweite Umgebung aus derselben Codebasis, Unterschied Konfiguration vs.
  Code. Manueller Freigabeschritt für Prod.
  Begriffe: Environment, Konfiguration, Promotion, Approval.

- [ ] **M10 — Betrieb: Logs, Healthcheck, Rollback**
  Healthcheck-Endpoint, Logs in Azure ansehen, ein Deployment absichtlich
  kaputt machen und zurückrollen. Begriffe: Monitoring, Healthcheck,
  Rollback, Incident, "das Deployment zurückrollen".

- [ ] **M11 — Abschluss: README, ADRs, Interview-Generalprobe**
  README mit Architekturdiagramm, ADRs vervollständigen. Dann ein
  simuliertes Bewerbungsgespräch (auf Deutsch, ~15 Fragen quer durch alle
  Module), Feedback zu Inhalt und Formulierungen. 
  Außerdem: ADR "Container Apps statt Kubernetes" schreiben (warum K8s hier
  Over-Engineering wäre) und in einem Satz im README aufgreifen.

## Parkplatz

Ideen, die unterwegs auftauchen, aber nicht ins aktuelle Modul gehören,
werden hier notiert statt umgesetzt:

- Optionales Zusatzmodul NACH M11: dasselbe Spiel einmal für ein lokales
  Mini-Kubernetes (kind oder minikube, kostenlos auf dem eigenen Rechner)
  verpacken — nur zum Konzepte-Anfassen (Pod, Service, Deployment), nicht
  für Produktion. Erst starten, wenn der Hauptpfad komplett steht.
