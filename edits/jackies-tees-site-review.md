# Jackie's Tees site review

## Overview
This report summarizes the main issues visible from a machine-readable review of the public site and pairs each issue with a practical fix. The strongest concern is that multiple routes appear to expose the same title and the same extracted page body, which can make Google treat distinct URLs as duplicates instead of unique pages.[page:6]

## Highest-priority fixes

### 1. Duplicate page identity across routes
The homepage, FAQ page, and Request Order page all returned the same page title, `Jackie's Tees & Custom Apparel | Beverly, MA`, in the extracted output.[page:6] The same extraction also showed the same main body content appearing across `/`, `/faq`, and `/request-order`, with the content reading like the Request Order page rather than unique route content.[page:6]

**Why this matters**
- Google relies heavily on titles, headings, and visible HTML content to understand what each URL should rank for.[page:6]
- If several URLs look the same to crawlers, they can be treated as duplicate or thin pages, which weakens indexing and ranking potential.[page:6]

**Fix**
- Give every important route its own unique `<title>`.
- Give every route its own `<meta name="description">`.
- Make sure each page has one unique `<h1>`.
- Ensure the first visible paragraph on each route is specific to that route.
- Verify that route-specific content exists in the server-rendered or statically rendered HTML, not only after client-side hydration.[page:6]

**Suggested page metadata**
| Route | Suggested title | Suggested H1 |
|---|---|---|
| `/` | `Custom T-Shirts & Apparel in Beverly, MA | Jackie's Tees` | `Custom Apparel Made Easy in Beverly, MA` |
| `/faq` | `FAQ | Ordering Custom Shirts at Jackie's Tees` | `Frequently Asked Questions` |
| `/request-order` | `Request a Custom Apparel Order | Jackie's Tees` | `Request a Custom Order` |
| `/contact` | `Contact Jackie's Tees | Beverly, MA` | `Contact Jackie's Tees` |
| `/request-quote` | `Get a Free Quote | Jackie's Tees` | `Get a Free Quote` |

### 2. Shared layout may be masking route-specific content to crawlers
The extracted output suggests crawlers may be seeing one repeated route state instead of unique content for each page.[page:6] Even if the site looks normal in a browser, this can still affect indexing, social link previews, and machine summaries.[page:6]

**Fix**
- If the site uses React, Next.js, Vite, or another client-rendered setup, confirm that each route produces unique HTML before JavaScript runs, or use proper SSR/SSG metadata APIs.
- Open `View Source` on each route and compare the title, meta description, H1, and first 150 to 200 words.
- If the source is too similar across routes, the route output needs to be separated at the template or rendering level.[page:6]

## Secondary fixes

### 3. CTA links may not be semantically separated well enough
The extracted content shows action links collapsing together as `Request OrderFree Quote` and similar combinations.[page:6] That usually means the links are visually separated with CSS but not clearly separated in the underlying markup or spacing structure.[page:2][page:6]

**Why this matters**
- It looks messy in text extraction.
- It can reduce clarity for assistive tech and parsers.
- It can create awkward link-preview or snippet output.[page:2][page:6]

**Fix**
- Wrap each CTA in its own block or flex container.
- Use proper spacing with margin or gap rather than relying only on inline styling.
- Make sure adjacent links have readable separation in the raw HTML.
- Prefer button-style links inside a semantic container such as a CTA group.

**Example**
```html
<div class="cta-group">
  <a href="/request-order" class="btn btn-primary">Request Order</a>
  <a href="/request-quote" class="btn btn-secondary">Free Quote</a>
</div>
```

```css
.cta-group {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
}
```

### 4. Route intros should be more specific
The site already communicates the business clearly, but route-level uniqueness should be stronger so that each page has a distinct topic and keyword target.[page:1][page:6]

**Fix**
- Add a short, unique intro paragraph at the top of each important page.
- Use route-specific wording such as custom t-shirts, bulk orders, local pickup, screen printing, embroidery, and Beverly, MA where relevant.
- Avoid repeating the same general brand copy on every page.

## Local SEO improvements

### 5. Standardize business details site-wide
Business details are present, including local identity, hours, and contact info, which is a good base.[page:1] The current hours format is abbreviated as `Mon-Wed & Fri, 11am-4pm`, which leaves visitors inferring the rest.[page:1]

**Fix**
- Spell out closed days explicitly.
- Keep name, address, phone, and email formatting identical on every page.
- Use a lowercase display email such as `info@jackiestees.com` for cleaner presentation, even though email routing is case-insensitive.[page:3][page:4][page:5]

**Recommended hours format**
- Monday: 11am to 4pm
- Tuesday: 11am to 4pm
- Wednesday: 11am to 4pm
- Thursday: Closed
- Friday: 11am to 4pm
- Saturday: Closed or by appointment
- Sunday: Closed

### 6. Add unique metadata beyond the title tag
The extracted review mainly surfaced title duplication, but strong indexing also depends on route-specific descriptions and canonical URLs.[page:6]

**Fix**
- Add a unique meta description on every route.
- Add a canonical tag on every route.
- Add Open Graph title and description for link previews.
- Add structured local business data if not already present.

**Minimum head tags per page**
```html
<title>Request a Custom Apparel Order | Jackie's Tees</title>
<meta name="description" content="Request a custom t-shirt or apparel order from Jackie's Tees in Beverly, MA. Get help with quantity, design, sizing, and turnaround.">
<link rel="canonical" href="https://your-real-domain.com/request-order">
<meta property="og:title" content="Request a Custom Apparel Order | Jackie's Tees">
<meta property="og:description" content="Start a custom apparel order with Jackie's Tees in Beverly, MA.">
```

## Content and conversion improvements

### 7. Gallery and trust signals can work harder
The homepage already includes testimonials, contact info, and service framing, which gives it a good local-business foundation.[page:1] The next improvement is making the proof more concrete with real examples, because custom apparel customers often want visual reassurance before contacting a shop.[page:1]

**Fix**
- Add real photos of finished work.
- Add captions describing the job type, quantity, or customer type.
- Add a simple 3-step `How it works` section.
- Mention typical turnaround and pickup expectations in more than one place.

### 8. Clarify what makes the business different
The homepage headline is clear, but it can be more specific about what makes the shop the right choice.[page:1] Specific claims usually convert better than general ones for local service businesses.[page:1]

**Fix**
- Mention fast local pickup, one-off orders, bulk team orders, rhinestone work, embroidery, or personal design help if those are true.
- Replace broad phrases with concrete differentiators.

## Developer QA checklist

### Source checks
- Open `View Source` on `/`, `/faq`, `/contact`, `/request-order`, and `/request-quote`.
- Confirm each route has a unique title.
- Confirm each route has a unique meta description.
- Confirm each route has a unique H1.
- Confirm the first paragraph is route-specific.[page:6]

### Crawl checks
- Run the site through an SEO crawler after deployment.
- Check for duplicate titles.
- Check for duplicate meta descriptions.
- Check for duplicate H1 tags.
- Check canonical URLs.

### Visual checks
- Confirm CTA buttons do not visually run together on desktop or mobile.[page:2][page:6]
- Confirm button groups are separated in the DOM as well as visually.
- Confirm every route clearly signals its page purpose in the first screenful.

## Launch order
1. Fix route-level duplicate titles and duplicate main content.[page:6]
2. Confirm SSR or static HTML exposes unique page content to crawlers.[page:6]
3. Clean up CTA grouping and semantic spacing.[page:2][page:6]
4. Add route-specific descriptions, canonicals, and OG tags.[page:6]
5. Improve local SEO consistency for hours, contact details, and trust content.[page:1][page:6]
6. Add more real examples and clearer differentiation for conversion.[page:1]
