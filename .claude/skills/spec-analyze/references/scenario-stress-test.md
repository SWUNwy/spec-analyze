# Scenario Stress Test Library

A structured library of stress scenarios for spec-analyze's divergence phase. Select relevant scenarios based on the topic — not every scenario applies to every discussion.

## How to Use

During the Diverge phase:
1. Scan the three categories for scenarios relevant to the current requirement
2. Select 2-4 scenarios that would stress-test the proposed approach
3. Frame them as "what if" questions to the user
4. Record findings for the convergence phase

Select scenarios that would genuinely challenge the current approach. If no scenarios in a category apply, skip it entirely.

---

## Category 1: Data & Input Extremes

Test what happens at the boundaries of data validity and volume.

| Scenario | Key Question | When to Apply |
|----------|-------------|---------------|
| **Empty response** | API returns `[]` or `null` instead of expected data — how does each component handle it? | Any feature with API data fetching |
| **Malformed data** | API returns wrong type, missing fields, or unexpected enum values — does the frontend crash or gracefully degrade? | Features with strict data contracts |
| **Max-length input** | User pastes 10,000 characters into a 50-char field — what's the UX? Truncation? Validation error? Silent failure? | Any form/input component |
| **Special characters** | Input contains XSS payloads, SQL injection strings, or Unicode overflow — is sanitization in place? | Search, comment, profile fields |
| **File boundary** | Upload a 0-byte file, a 2GB file, a corrupt file, a wrong-format file — what happens for each? | File upload features |
| **Extreme volume** | Table renders 10,000 rows, dropdown has 5,000 options, notifications queue 200 items — does the UI freeze? | List/table/dropdown components |

## Category 2: User Behavior Extremes

Test how the system handles unexpected but realistic user actions.

| Scenario | Key Question | When to Apply |
|----------|-------------|---------------|
| **Rapid repeat** | User clicks "Submit" 10 times in 1 second — do you get 10 API calls? 10 duplicate records? | Any submit/action button |
| **Tab chaos** | User opens the same page in 2 tabs, submits different data from each — which state wins? | Forms, dashboards, editors |
| **Mid-flow abandon** | User starts a 5-step wizard, closes the tab at step 3, comes back next day — what state do they see? | Multi-step flows, checkout |
| **Back/Forward abuse** | User fills a form, clicks browser Back, then Forward — is the form state preserved? Lost? Corrupted? | Browser history-sensitive features |
| **Invisible actions** | User submits a form, then immediately navigates away — does the API call still complete? Toast still show? | Any async submission |
| **Offline then online** | User fills a form offline, submits — does it queue? Fail silently? Show confusing error? Viewport shift on reconnect? | Mobile web, PWA, weak-network scenarios |

## Category 3: System & Environment Failure

Test what happens when the surrounding system misbehaves.

| Scenario | Key Question | When to Apply |
|----------|-------------|---------------|
| **Network timeout** | API call takes 30s and then fails — does the UI show a spinner forever? Timeout message? Retry option? | Any API-dependent feature |
| **API partial failure** | Page needs 3 API calls; 2 succeed, 1 fails — does the page show partial data? Full error? Loading spinner stuck? | Dashboard, composite pages |
| **Auth token expiry** | User's token expires mid-session — do they lose unsaved work? Get a silent redirect? Confusing error toast? | Any authenticated feature |
| **Rate limiting** | API returns 429 — does the frontend retry blindly? Show a message? Rate-limit the UI button? | Search, polling, frequent-API features |
| **Third-party outage** | Payment gateway / map API / SMS provider is down — does the whole feature break? Graceful fallback? | Features with third-party dependencies |
| **Concurrent edit** | Two users edit the same record at the same time — last-write-wins? Conflict dialog? Merge? | Collaborative/admin features |

## Custom Scenario Generation

For requirements that don't fit the above categories, generate stress scenarios by asking:

1. **What's the one assumption that, if wrong, breaks the entire feature?**
2. **What would a deliberately adversarial user try to do with this component?**
3. **What external event (outside the system's control) would cause the most damage?**
4. **What's the most confusing error message a user could see, and how do we avoid it?**
5. **What would make a user lose trust in this feature after one bad experience?**
