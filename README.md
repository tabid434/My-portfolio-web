# Talha Abid / Portfolio

An editorial portfolio built with Next.js 16, React 19, TypeScript, Tailwind CSS 4, Motion, and React Three Fiber. Server-rendered project pages are backed by a factual content model in `src/lib/portfolio.ts`.

## Local Development

```sh
npm install
npm run dev
```

Open the URL printed by Next.js. The default is http://localhost:3000.

```sh
npm run lint
npm run build
npx playwright install chromium
npm test
```

Playwright uses an isolated production server on port 3100. Screenshots are written to the ignored `test-results/` directory. Tests do not send real email; the success UI is tested with an explicitly mocked provider-accepted response. Tracing is disabled for the continuously rendered WebGL scene.

## Email Delivery / Required Before Launch

The contact form calls `POST /api/contact`. The server sends a plain-text email through Resend to `talhaabid353@gmail.com`, with the visitor's address as Reply-To. No provider credentials are included in client code.

Set these variables in `.env.local` for local use, or in your hosting provider's environment settings:

| Variable | Purpose |
| --- | --- |
| `SITE_URL` | Exact deployed origin, for example your confirmed HTTPS portfolio URL. Also controls canonical URLs and sitemap. |
| `RESEND_API_KEY` | A Resend API key with sending permission. Keep it secret. |
| `CONTACT_FROM_EMAIL` | A sender on a verified Resend domain, such as `Portfolio <hello@your-verified-domain.com>`. |
| `UPSTASH_REDIS_REST_URL` | Upstash Redis REST endpoint for deployment-wide rate limiting. |
| `UPSTASH_REDIS_REST_TOKEN` | Secret Upstash Redis REST token. |

Use `.env.example` as the variable reference. The production endpoint fails closed when email credentials or the shared limiter are absent. It does not pretend a message was sent. It validates origin, content type, body size, and field lengths; uses a honeypot; and applies a conservative global limit of five messages per ten minutes. Configure edge/WAF limits as an additional control for a publicly promoted deployment.

Deploy to a Node-capable Next.js host, not a static-only export. Set environment variables before building. Submit one real test enquiry after configuration, check Resend's delivered event, and confirm receipt in Talha's inbox. Provider acceptance alone does not guarantee inbox delivery. Domain verification, quota, spam filtering, and credentials cannot be verified without the owner's provider access.

## Content and Assets

- All project capabilities and the 200K+ download count come from the supplied briefs. No other business metrics or project dates were invented.
- Brackets is recorded as July 2023 to February 2026. DEVFIED is recorded from February 2026 onward, with TUDU as the named application.
- The local resume and portrait were retrieved from the supplied older portfolio, `https://develoverz.netlify.app/`. No newer resume was attached. Replace `public/Talha_Abid_Resume.pdf` with the current approved PDF when available.
- Education is recorded as BS Software Engineering, Gift University, batch March 2019, GPA 3.21. No graduation date is inferred.
- Project compositions are labeled interface/workflow studies, not claimed to be production screenshots. Current approved project screenshots can replace these compositions later.
- `public/property-study.jpg` is a reference property photograph from Unsplash (`photo-1600585154340-be6161a56a0c`), used only inside the Kaido conceptual media composition. It is not represented as a client property or completed client video.
- The canonical fallback uses the known older portfolio origin. Set `SITE_URL` to the actual deployment origin before launch.

## Performance and Accessibility

The architectural scene is loaded in a separate client bundle. Geometry is simplified on mobile; DPR is capped; offscreen rendering stops; reduced motion renders on demand. WebGL unavailability retains a static architectural fallback and all content. The scene is decorative and never blocks interaction.

Native links and document scrolling are preserved. Navigation uses a modal dialog on mobile for focus containment and Escape support. Theme initialization is handled by next-themes without a hydration-dependent icon mismatch. The contextual cursor supplements rather than removes the system pointer, and is disabled on touch and reduced-motion devices.