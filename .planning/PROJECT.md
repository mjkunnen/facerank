# FaceRank

## What This Is

FaceRank is een AI-powered gezichtsanalyse web app gericht op mannen 16-25 (looksmaxing/self-improvement community). Upload een selfie, krijg een gedetailleerde score, heat map, landen-ranking, nationaliteitsschatting, kapselsuggesties en een gepersonaliseerd glow-up plan. Freemium model: eerste resultaat deels zichtbaar (teaser), volledige analyse achter een $4.99/week paywall.

## Core Value

De gebruiker voelt na het uploaden van een foto onmiddellijk nieuwsgierigheid en urgentie om zijn volledige score te zien — de paywall voelt als een gesloten deur, niet als een verkoper.

## Requirements

### Validated

- ✓ Landing page met hero, CTA, social proof, feature pills — existing
- ✓ Selfie upload met resize naar 1024px en sessionStorage — existing
- ✓ Analyse-animatie (13s, 10 stappen, progress ring) — existing
- ✓ Results page met 6 feature componenten — existing
- ✓ Blur paywall overlay systeem (BlurOverlay component) — existing
- ✓ ScoreCard met FIFA-style tiers en count-up animatie — existing
- ✓ HeatMapPreview met strong/problem zone counts — existing
- ✓ GlowUpPlan met current→potential en difficulty badges — existing
- ✓ WorldMap met 10 landen ranking (1 zichtbaar, rest geblurd) — existing
- ✓ NationalityCard met 5 nationaliteiten (1 zichtbaar) — existing
- ✓ HairstyleRecs met 5 kapsels en match percentages — existing
- ✓ Dark mode design systeem met theme tokens — existing
- ✓ CSS animaties: scan-line, holo-border, noise overlay, CTA glow — existing
- ✓ Google Fonts: Space Grotesk, Inter, JetBrains Mono — existing

### Active

- [ ] AI Vision API integratie (GPT-4o of Gemini Flash) voor echte gezichtsanalyse
- [ ] Stripe subscription integratie ($4.99/week) met checkout flow
- [ ] Paywall unlock flow (locked→paid state management)
- [ ] Copywriting optimalisatie volgens vault-principes (bezit-taal, open loops, trust copy)
- [ ] Vercel deployment met custom domein
- [ ] Mobile-first polish en performance optimalisatie
- [ ] OG image / share card voor social virality

### Out of Scope

- Native mobile app — web-first, mobile browser is primary
- User accounts / auth — subscription only, geen profielen nodig voor v1
- Admin dashboard — niet nodig voor launch
- Multi-language — Engels only voor v1 (internationale doelgroep)
- Hairstyle try-on (AR) — te complex voor v1, placeholder CTA volstaat

## Context

**Bestaande codebase:** Next.js 16, React 19, Tailwind 4, GSAP, Framer Motion. 13 bestanden, volledig werkende UI flow van landing → scan → analyzing → results. Draait op mock data. API retourneert 501.

**Design systeem:** Dark mode (#070815 base), goud (#FFD700) accent, glassmorphism, noise texture, holographic borders. Geïnspireerd op FIFA Ultimate Team card design voor scores.

**Vault kennis:** 9 notes over copywriting, funnel building, buyer psychology, UI design patterns en animatie. Alle principes (Grease Chute, Zeigarnik, Endowment, bezit-taal, blur paywall ratio) zijn al deels geïmplementeerd.

**Doelgroep:** Mannen 16-25, looksmaxing community, TikTok-driven traffic. Identity trigger (#6) en social approval (#8) zijn de primaire drijfveren.

**Monetisatie:** $4.99/week subscription via Stripe. Charm pricing, "less than a coffee" reframe, cancel anytime prominent.

## Constraints

- **AI API**: GPT-4o Vision of Gemini Flash — moet gestructureerde JSON output genereren via mega-prompt
- **Budget**: Minimale infra-kosten, Vercel free/hobby tier
- **Performance**: < 3 sec load time op mobile 4G
- **Privacy**: Geen foto opslag server-side, analyse is instant en ephemeral

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Next.js 16 + Turbopack | Snelste DX, Vercel native | ✓ Good |
| SessionStorage voor state | Geen backend nodig voor flow, privacy-first | ✓ Good |
| Mock data fallback | App werkt altijd, zelfs zonder API | ✓ Good |
| $4.99/week pricing | Vault research: weekly framing verlaagt cancel-angst | — Pending |
| Blur paywall (niet hard lock) | Vault: 20-30% zichtbaar triggert curiosity, hard lock voelt als muur | ✓ Good |

## Evolution

This document evolves at phase transitions and milestone boundaries.

**After each phase transition:**
1. Requirements invalidated? → Move to Out of Scope with reason
2. Requirements validated? → Move to Validated with phase reference
3. New requirements emerged? → Add to Active
4. Decisions to log? → Add to Key Decisions
5. "What This Is" still accurate? → Update if drifted

**After each milestone:**
1. Full review of all sections
2. Core Value check — still the right priority?
3. Audit Out of Scope — reasons still valid?
4. Update Context with current state

---
*Last updated: 2026-03-29 after initialization*
