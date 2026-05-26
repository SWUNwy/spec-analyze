# spec-analyze

**Spec-Driven Development analysis engine — transform vague product requirements into developer-ready specification documents.**

spec-analyze is an AI agent skill that guides large language models through a structured analysis pipeline: multi-perspective questioning → stress testing → solution convergence → annotated document output. The result is a set of three interconnected documents (proposal, design, tasks) with **machine-parseable annotations** that bridge the gap between product requirements and code implementation.

## Why spec-analyze?

Most requirement analysis tools produce unstructured documents that leave a gap between "what to build" and "how to build it." spec-analyze fills this gap with an **annotation framework** — structured metadata attached to every interactive component in the design, covering triggers, behaviors, states, error handling, and UI copy. These annotations are precise enough for:

- **Developers** to implement without ambiguity
- **Testers** to generate test cases from state definitions
- **AI coding agents** to consume directly as implementation specs
- **Designers** to verify visual and interaction details

---

## Architecture

```
spec-analyze/
├── SKILL.md                 # Main skill definition — routing, workflow, quality gates
├── references/
│   ├── personas.md           # 5 expert analysis personas
│   ├── scenario-stress-test.md  # 18 stress scenarios in 3 categories
│   ├── decision-log-format.md   # Structured decision recording
│   ├── output-templates.md      # Output templates + annotation framework
│   ├── quality-checklists.md    # QA checklists for all output types
│   └── web-research-guide.md    # Web research strategy guide
└── .gitignore
```

### Modular design

The skill follows a **progressive disclosure** pattern:

1. **SKILL.md** — Entry point. Contains the workflow, routing logic, and references to deeper modules.
2. **`references/`** — Loaded on demand. Each file covers one domain (personas, stress testing, output formatting, etc.), keeping the main file focused while enabling deep dives when needed.

---

## How It Works: The Analysis Pipeline

spec-analyze implements a 12-step pipeline with **4 quality gates**:

```
User Input
    │
    ▼
┌──────────────────────┐
│ 1. Route Assessment  │  ──  Lightweight / Standard / Full
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 2. Context Explore   │  ──  Read project files, check docs,
│    (+ Web Research)  │      optionally search web for competitive intel
└──────────┬───────────┘
           │  G1: Context completeness gate
           ▼
┌──────────────────────┐
│ 3. Persona Questions  │  ──  5 expert roles probe from different angles
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 4. Stress Testing     │  ──  "What if" scenarios push for edge cases
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 5. Converge           │  ──  2-3 approaches, Architecture Cleanliness
│    + Decision Log     │      assessment, structured decision recording
└──────────┬───────────┘
           │  G2: Convergence completeness gate
           ▼
┌──────────────────────┐
│ 6. Design Presentation│  ──  Section-by-section, user approves each
└──────────┬───────────┘
           │  G3: Output readiness gate
           ▼
┌──────────────────────┐
│ 7. Generate Output    │  ──  Templates matched to routing path
└──────────┬───────────┘
           ▼
┌──────────────────────┐
│ 8. Quality Self-Check │  ──  Run DoD checklist for current path
└──────────┬───────────┘
           │  G4: Self-review completion gate
           ▼
┌──────────────────────┐
│ 9. User Review        │  ──  Present output for final approval
└──────────┬───────────┘
           ▼
    ┌──────────┐
    │ Done /   │  ──  Full path → handoff to implementation planning
    │ writing- │
    │ plans    │
    └──────────┘
```

### Three Routing Paths

| Path | Complexity | Personas | Stress Test | Output | Use Case |
|------|-----------|----------|-------------|--------|----------|
| **Lightweight** | Quick question | None | No | Insight Brief (½ page) | Clarifying a requirement, quick feasibility check |
| **Standard** | Medium analysis | 2-3 most relevant | Yes | Analysis Report (1-2 pages) | Feature design, approach comparison, decision support |
| **Full** | Complete design | All 5 | Yes | proposal.md + design.md + tasks.md | Complex features needing complete spec-to-implementation handoff |

**Lightweight Upgrade Gate**: Before outputting a Lightweight result, the system auto-checks if the discussion crossed into implementation territory. If so, it proposes upgrading to Standard.

---

## The Annotation Framework (Full Path)

This is spec-analyze's core differentiator. Every interactive component in the design gets a structured annotation block with fields organized into three tiers:

### Three Annotation Tiers

| Tier | When to Use | Fields |
|------|-------------|--------|
| **L1 Core** | Simple interactions (hover tooltip, static display) | trigger / behavior / dismiss |
| **L2 Standard** | Complex interactions (modal, dropdown, form validation) | L1 + placement / style / state / timing |
| **L3 Complete** | Global/reusable components (DatePicker, Table) | L2 + accessibility / responsive / i18n |

### Field Definitions

```
L1 Common
──────────────────────────────────────
trigger   Trigger condition     hover / click / focus / scroll / blur
behavior  Behavior description  Show Tooltip / Expand dropdown / Submit / Navigate
dismiss   Dismiss condition     mouse leave / click outside / Esc / auto-dismiss

L2 Adds
──────────────────────────────────────
placement Display position      top / bottom / topRight / center / left
style     Visual details        color / spacing / font / z-index / content type
state     State behaviors       normal / empty / loading / error / overflow / countdown
timing    Animation & delay     200ms fade in / 100ms fade out / 300ms debounce

L3 Adds
──────────────────────────────────────
accessibility  Accessibility    Tab focus / Enter triggers / Esc closes / aria-label
responsive    Responsive        Touch fallback / small screen adaptation / print
i18n          Internationalization   Whether translation is needed
```

### State Specification Rules

State descriptions must cover two perspectives:

| Perspective | Requirement | Example |
|-------------|-------------|---------|
| **Dev perspective** | Describe component behavior in that state | `submitting: button loading + disabled, text "Logging in..."` |
| **Tester perspective** | Describe trigger-to-presentation path | `error: blur on invalid email → red border + "Invalid email format"` |

**Minimum state coverage**: normal + at least 2 non-normal states (loading / error / empty / countdown)

### Role ↔ Annotation Mapping

The annotation system is designed to serve all stakeholders:

| Role | Fields of Interest | Reason |
|------|-------------------|--------|
| Developer | trigger, behavior, dismiss, state (boundaries) | Implementation logic, boundary handling |
| Tester | state (all branches), trigger, dismiss | State transitions → test cases |
| UI Designer | style, placement, timing | Visual details, position, animation |

---

## Triple-Document Output (Full Path)

The Full path generates three interconnected documents:

### 1. proposal.md — Functional Requirements

Contains requirement overview, functional requirement table with three annotation columns per feature:

| ID | Description | Priority | Acceptance Criteria | Data Annotation | Interaction Annotation | UI Text Annotation |
|----|-------------|----------|--------------------|-----------------|----------------------|-------------------|

**Data Annotation** specifies: API source + format rule + boundary values
**Interaction Annotation** specifies: interaction grade (L1/L2/L3) + behavior description
**UI Text Annotation** specifies: all visible copy — placeholder, label, error, tooltip, button text

### 2. design.md — Component Design

Contains system architecture, interface design, data model, and component-level design with annotation blocks:

```
[Dev]   trigger:   input → blur triggers field validation
                  click "Log in" → triggers full validation + API call
[Dev·Tester] behavior:  blur: validate single field, error→red border + red error text
                  submit: full validation→pass→POST /api/auth/login
                  → success: localStorage.setItem('token') → redirect to home
                  → failure: Toast with backend error message
[UI]   style:     border-radius 4px, height 40px; focus border highlight
[Tester] state:    normal: empty form; focused: focus highlight;
                  error: red border + error text; submitting: button loading + disabled
[Dev]   dismiss:   success→redirect; failure→restore normal
```

Includes a **Field Specification Table** that connects every field across proposal (UI labels) → design (format constraints) → implementation (API paths).

### 3. tasks.md — Implementation Tasks

Task breakdown with annotation references that point back to specific sections in design.md:

```
> **Annotation references:**
> - Annotation block → design.md §5.1 @EmailPasswordForm
> - Field copy → design.md Appendix "Field Specification Table"
> - Data source → design.md §3
```

This design enables AI coding agents to read tasks.md, follow annotation references to design.md, and implement features without human translation.

---

## Quality Assurance System

Every output passes through checkpoints at each pipeline stage.

### Quality Gates (G1–G4)

| Gate | Location | What It Checks |
|------|----------|----------------|
| G1: Context completeness | Step 4 → 5 | Scope defined, project files read, web research done |
| G2: Convergence complete | Step 7 → 8 | ≥2 approaches compared, Architecture Cleanliness assessed, decisions logged |
| G3: Output readiness | Step 8 → 9 | Templates selected, all sections have data, output path set |
| G4: Self-review complete | Step 10 → 11 | No placeholders, fact/inference/hypothesis distinguished, no scope creep |

### Cross-Document Consistency Checks

- Proposal data annotation ↔ Design field specifications: field names match
- Proposal UI text ↔ Design field table: copy matches
- Proposal feature IDs ↔ Tasks: full coverage
- Task annotation references ↔ Design sections: one-to-one verified

### Role-Specific Review Checklists

Each stakeholder has a targeted checklist:

- **Dev**: Format constraints, boundary strategies, state coverage, API structure, error handling
- **Tester**: State → test case conversion, error category coverage, boundary values, trigger testability
- **UI**: Copy completeness, visual style, 3-state descriptions, responsive behavior, animation timing

---

## Personas: Multi-Perspective Analysis

The 5 personas are activated based on the routing path (Standard: 2-3 relevant, Full: all 5):

| Persona | Focus | Sample Question |
|---------|-------|-----------------|
| **Product Strategist** | PMF, value prop, segmentation, priority | "What's the minimum version that still delivers value?" |
| **Growth & Market Analyst** | Competition, adoption, business impact | "What would make users switch from their current solution?" |
| **User Advocate** | Journey, pain points, usability, error experience | "What's the most confusing moment for a first-time user?" |
| **System Architect** | Feasibility, data model, API contracts, reusability | "Where does this data come from? What if the API format changes?" |
| **Risk Challenger** | Edge cases, failure modes, security, assumptions | "What assumption, if wrong, would break the entire design?" |

Each persona has red flags (warning signals) and escalation paths (when to hand off to another persona).

---

## Stress Testing

During the divergence phase, the system applies relevant stress scenarios from an 18-scenario library:

| Category | Examples |
|----------|----------|
| **Data & Input Extremes** | Empty response, malformed data, max-length input, special characters, file boundary, extreme volume |
| **User Behavior Extremes** | Rapid repeat clicks, tab chaos, mid-flow abandon, back/forward abuse, offline→online |
| **System & Environment Failure** | Network timeout, API partial failure, auth token expiry, rate limiting, third-party outage, concurrent edit |

---

## Web Research Integration

When triggered, web research is integrated using the **As-is → Gap → Edge** framework:

| Phase | Content | Purpose |
|-------|---------|---------|
| **As-is** | Current industry standard, common approach, or competitor solution | Grounding |
| **Gap** | Where our approach differs from or falls short | Risk awareness |
| **Edge** | Where we can differentiate or improve | Opportunity |

Trigger conditions: competitive benchmarking, component/UX pattern validation, technology evaluation, compliance checks.

---

## Quality Gates (G1–G4) with Failure Handling

**Gate failure recovery:**
- DoD item not met → Roll back to preceding step, fill gap, then proceed
- User rejects output → Return to design presentation, re-iterate
- Same gate blocked twice → Pause and evaluate: is the routing path wrong?

---

## Installation

### As a Claude Code Skill

1. Clone this repository:
   ```bash
   git clone https://github.com/SWUNwy/spec-analyze.git
   ```

2. Install the skill:
   ```bash
   npx skills install spec-analyze -p /path/to/spec-analyze
   ```

3. The skill is now available. Claude Code will automatically trigger it when you describe product requirements, feature designs, or functional specs.

### Manual Setup

Copy or symlink the `SKILL.md` and `references/` directory to your Claude Code skills directory:

```bash
cp -r spec-analyze ~/.claude/skills/spec-analyze
```

---

## Usage

Once installed, simply describe your requirements naturally. spec-analyze handles routing automatically:

| You Say | What Happens |
|---------|-------------|
| "I need a login page with email and password validation" | Full path → proposal + design + tasks with annotations |
| "How should we handle the user profile edit flow?" | Standard path → Analysis Report with approach comparison |
| "What's the best way to display this data?" | Lightweight path → Insight Brief (upgradable) |

The system will assess the complexity, confirm the path with you, and walk through the pipeline step by step.

---

## Integration with Other Skills

spec-analyze is designed as the **second stage** in a larger workflow:

```
                  ┌─────────────┐
                  │ deep-analyze │ ← Exploration & brainstorming (Stage 1)
                  └──────┬──────┘
                         │ Requirements clarified
                         ▼
                  ┌─────────────┐
                  │ spec-analyze │ ← Requirement analysis + annotated output (Stage 2)
                  └──────┬──────┘
                         │ Proposal + Design + Tasks ready
                         ▼
                  ┌─────────────┐
                  │ writing-plans│ ← Implementation planning (Stage 3)
                  └─────────────┘
```

- **deep-analyze** (predecessor): Multi-perspective analysis without the annotation framework. Use for early exploration.
- **spec-analyze**: The annotated output system. Use when the output needs to be developer-ready.
- **writing-plans** (external skill): Consumes spec-analyze's Full path output to generate implementation plans.

---

## Project Structure Philosophy

The skill follows Claude Code skill best practices:

- **SKILL.md** stays focused (<250 lines) — it's the entry point and workflow definition
- **`references/`** contains domain-specific deep dives, loaded on demand
- Each reference file has a single responsibility — personas, stress testing, output formats, quality checks, web research

This modular structure enables progressive disclosure: the system only loads what it needs for the current pipeline step.

---

## License

MIT
