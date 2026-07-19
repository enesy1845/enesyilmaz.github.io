# Legacy Site Inventory

Phase: 0 - repository audit and planning.

Scope: current static portfolio at repository root. No files were removed, moved, or rewritten during this inventory.

## Repository Shape

| Item         | Type                 | Current role                                     | Classification | Notes                                                                                                       |
| ------------ | -------------------- | ------------------------------------------------ | -------------- | ----------------------------------------------------------------------------------------------------------- |
| `AGENTS.md`  | Root documentation   | Project operating rules for the migration        | Keep           | Added for the migration workflow.                                                                           |
| `README.md`  | Root documentation   | Minimal GitHub repository title                  | Rewrite        | Needs project purpose, setup, phase notes, and deployment guidance in a later phase.                        |
| `index.html` | Root website file    | Single-page static portfolio                     | Rewrite        | Contains all visible content, metadata, CDN links, and page structure. Preserve until replacement is ready. |
| `style.css`  | Root CSS file        | Custom Bootstrap overrides and legacy styling    | Replace        | Useful as visual reference only. New site should use Tailwind and tokens.                                   |
| `script.js`  | Root JavaScript file | Console log only                                 | Remove later   | No user-facing behavior. Keep until legacy site is replaced.                                                |
| `images/`    | Media directory      | Portfolio screenshots, profile/background images | Verify         | Assets need optimization, dimensions, alt text review, and usage confirmation.                              |

## CSS And JavaScript

| File or dependency               | Use                                                                                   | Classification | Notes                                                                                           |
| -------------------------------- | ------------------------------------------------------------------------------------- | -------------- | ----------------------------------------------------------------------------------------------- |
| `style.css`                      | Custom color variables, hero background, buttons, cards, navbar, contact list, footer | Replace        | Some color intent can inform the future palette, but implementation should not be carried over. |
| `script.js`                      | Logs `Portfolio site is loaded and ready!`                                            | Remove later   | No production value in the future Next.js app.                                                  |
| Bootstrap CSS CDN                | Layout, navbar, cards, buttons, grid, spacing                                         | Replace        | New architecture explicitly avoids Bootstrap.                                                   |
| Bootstrap JS CDN                 | Mobile navbar collapse                                                                | Replace        | Future navigation should be a small React client component only where needed.                   |
| Font Awesome CDN                 | LinkedIn, YouTube, certificate, email, GitHub icons                                   | Replace        | Use a controlled inline icon set or limited icon package if justified.                          |
| Google Fonts `Pacifico`          | Navbar brand script font                                                              | Replace        | Future production fonts should be local and license-confirmed.                                  |
| CSS `font-family: IBM Plex Sans` | Body font reference                                                                   | Verify         | The font is referenced but not loaded by the legacy page.                                       |

## Image And Media Assets

| Asset                        | Current use                  |            Size | Classification | Notes                                                                                                                                             |
| ---------------------------- | ---------------------------- | --------------: | -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| `images/bg.jpg`              | Hero background in CSS       |   660,905 bytes | Verify         | Potentially reusable only if it supports the new identity. Needs dimensions and optimization.                                                     |
| `images/profil.png`          | Likely profile image         | 1,632,870 bytes | Verify         | Current HTML references `images/profile.png`, so this asset is not displayed unless another file exists in production. Large for a profile image. |
| `images/ilc.png`             | ILC Language Centre card     |   416,613 bytes | Verify         | Potentially reusable project screenshot. Needs dimensions and image optimization.                                                                 |
| `images/ilc-acc.png`         | ILC Accommodation card       |   322,733 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/cuix.png`            | Cuix Agency card             |   255,602 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/architech.png`       | Architech card               |   138,268 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/yavuzalemdar.png`    | Yavuz Alemdar card           |    41,274 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/snap360.png`         | Snap360 Photography card     |   272,032 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/alemdarcreative.png` | Alemdar Creative Studio card |    82,713 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/5k.png`              | 5k Consultancy card          |   233,762 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/klasiktesbih.png`    | KlasikTesbih card            |   790,548 bytes | Verify         | Large PNG; likely replace with optimized WebP/AVIF later if retained.                                                                             |
| `images/omnitech.png`        | Omnitech Academy card        |   317,798 bytes | Verify         | Potentially reusable project screenshot.                                                                                                          |
| `images/quiver.png`          | Quiver Blog card             |   167,033 bytes | Verify         | Potentially reusable volunteer/project screenshot.                                                                                                |

Notes:

- Exact image dimensions were not measured in this phase because no local image identification tool was available.
- Later phases should measure dimensions, identify intrinsic aspect ratios, and produce optimized derivatives.
- There are no audio files or downloadable media directories in the current repository.

## Visible Page Sections

| Section        | Current content                                                                              | Classification | Notes                                                                                                                              |
| -------------- | -------------------------------------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| Fixed navbar   | Brand name and anchors to Portfolio, Experience, Certifications, Volunteer, YouTube, Contact | Rewrite        | Keep core navigation intent, replace one-page anchor model with route-based navigation.                                            |
| Hero           | Profile image, greeting, professional role line, My Work button, LinkedIn button             | Rewrite        | Professional role text is reusable but should be sharpened around Code, Thought, Craft. Profile image reference is broken locally. |
| Portfolio      | 11 project cards with screenshots and external links                                         | Rewrite        | Strong source for project inventory, but each entry needs role, period, responsibility, outcomes, and permission confirmation.     |
| Experience     | 7 experience cards with external links                                                       | Rewrite        | Useful source for professional evidence. Dates and claims need verification.                                                       |
| Certifications | LinkedIn certifications CTA                                                                  | Rewrite        | Keep as a link or migrate selected verified certifications.                                                                        |
| Volunteer      | Global Digital Data Literacy and Quiver Blog descriptions                                    | Rewrite        | Useful differentiator; claims need confirmation and careful privacy review.                                                        |
| YouTube        | Channel CTA and 3 embedded videos                                                            | Verify         | Reusable as evidence of teaching, but embeds are third-party performance and privacy costs.                                        |
| Contact        | Email, LinkedIn, GitHub                                                                      | Keep           | Convert email to `mailto:` or contact route later.                                                                                 |
| Footer         | Copyright 2025                                                                               | Verify         | Year and encoding should be corrected in later implementation.                                                                     |

## Project Entries

| Project                 | Current summary                                              | External URL                             | Classification | Migration notes                                                                        |
| ----------------------- | ------------------------------------------------------------ | ---------------------------------------- | -------------- | -------------------------------------------------------------------------------------- |
| ILC Language Centre     | Webflow-based responsive website for a UK language centre    | `https://ilcentres.com/`                 | Verify         | Confirm exact role, permission to show, and whether it should be a featured work item. |
| ILC Accommodation       | Webflow site for accommodation services                      | `https://www.ilcaccommodation.com/`      | Verify         | Confirm relation to ILC and scope of work.                                             |
| Cuix Agency             | Freelance Webflow update and improvement for Canadian agency | `https://www.cuix.ca/`                   | Verify         | Confirm agency/client relationship and what can be public.                             |
| Architech (Canada)      | Maintained and modernized corporate site under Cuix Agency   | `https://www.architech.ca/`              | Verify         | Potential confidentiality/client-agency risk; anonymize if needed.                     |
| Yavuz Alemdar           | WordPress site for US-based graphic designer                 | `https://www.yavuzalemdar.com/`          | Verify         | Confirm whether there were three related sites and exact responsibilities.             |
| Snap360 Photography     | WordPress photography services site                          | `https://www.snap360photography.com/`    | Verify         | Confirm status and permission.                                                         |
| Alemdar Creative Studio | Additional WordPress design portfolio                        | `https://www.alemdarcreativestudio.com/` | Verify         | Confirm relationship to Yavuz Alemdar work.                                            |
| 5k Consultancy          | WordPress site for UK consulting firm                        | `https://5kconsultancy.co.uk/`           | Verify         | Confirm exact branding capitalization and live status.                                 |
| KlasikTesbih            | E-commerce style WordPress site for Turkish brand            | `http://klasiktesbih.com/`               | Verify         | Uses insecure HTTP link; check HTTPS availability and current site status.             |
| Omnitech Academy        | WordPress site for online training platform                  | `https://omnitechacademy.com/`           | Verify         | Confirm role and whether project is current.                                           |
| Quiver Blog             | Volunteer UI enhancements and maintenance                    | `https://quiver.blog/`                   | Keep           | Good bridge between technical and volunteer work if permission is confirmed.           |

## Experience Entries

| Entry                            | Current claims                                                                                  | Classification | Notes                                                                             |
| -------------------------------- | ----------------------------------------------------------------------------------------------- | -------------- | --------------------------------------------------------------------------------- |
| Vektorel Bilisim (2018)          | 6-month .NET training, 180 hours, .NET, C#, MS SQL                                              | Verify         | Turkish characters are currently encoded incorrectly in source display.           |
| AFP-Project (Part-Time)          | 1.5 years on distribution automation, C# and MS SQL                                             | Verify         | Needs period, organization context, confidentiality review, and clearer outcomes. |
| Blue Akademie (2020-2024)        | Taught C#, HTML/CSS, JavaScript, Python, intro ML; 120+ hours training and video tutorials      | Verify         | Good evidence for Thought/Education. Confirm dates and public wording.            |
| Seller Flash (Junior Full Stack) | Amazon dropshipping automation with C#, Vue.js, Docker; Scrum/Jira                              | Verify         | Confirm current company URL and what product details can be shown.                |
| Bilisim School (2021-...)        | Python and JS courses for ages 8-18; approximately 500 videos; Talent14 platform                | Verify         | Replace open-ended date with exact current status in later phase.                 |
| We'RHERE Data Engineering        | 2.5-month course; Azure Stream Analytics; end-to-end pipeline; real-time streaming              | Verify         | Confirm spelling, dates, and project details.                                     |
| LLM-based Quiz Project           | Four-person team; mentor from Netherlands; Python, FastAPI, Docker, PostgreSQL, Neo4j, LLM APIs | Verify         | Good candidate for detailed case study if sensitive details are removed.          |

## Volunteer Or Teaching Entries

| Entry                        | Current content                                                                                                   | Classification | Notes                                                                           |
| ---------------------------- | ----------------------------------------------------------------------------------------------------------------- | -------------- | ------------------------------------------------------------------------------- |
| Global Digital Data Literacy | Free Python and digital literacy courses across Turkey, Germany, Netherlands, Norway; team sizes and 70+ students | Verify         | Strong differentiator; verify numbers and avoid exposing private group details. |
| Quiver Blog (Norway)         | UI/UX update and maintenance for Thor Egil's blog                                                                 | Keep           | Confirm name spelling and permission.                                           |
| Blue Akademie                | Teaching programming and machine learning                                                                         | Keep           | Should be reframed as professional teaching experience.                         |
| Bilisim School               | Youth programming education and video tutorials                                                                   | Keep           | Strong Thought/Education evidence if verified.                                  |

## Certificates

| Certificate source           | Current state   | Classification | Notes                                                                                                                              |
| ---------------------------- | --------------- | -------------- | ---------------------------------------------------------------------------------------------------------------------------------- |
| LinkedIn certifications page | Single CTA only | Verify         | No individual certificates are listed in the repository. Later content model should include selected verified certifications only. |

## YouTube And Article References

| Reference              | URL                                                        | Classification | Notes                                                                              |
| ---------------------- | ---------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------- |
| YouTube channel        | `https://www.youtube.com/channel/UCwnYJAJrL6B48D73zvcWdeA` | Verify         | Keep as social/proof link if current.                                              |
| Embedded YouTube video | `https://www.youtube.com/embed/8tepLsXl1JI`                | Verify         | Replace eager embeds with links or lazy embeds later.                              |
| Embedded YouTube video | `https://www.youtube.com/embed/vHT6wbO0JKI`                | Verify         | Same performance/privacy concern.                                                  |
| Embedded YouTube video | `https://www.youtube.com/embed/qZ3CsxFVwPQ`                | Verify         | Same performance/privacy concern.                                                  |
| LinkedIn LLM quiz post | Long LinkedIn activity URL                                 | Verify         | Potential article/reference source, but use a cleaner canonical link if available. |

No standalone article files are present in the repository.

## External And Social Links

| Link                                                                        | Type                   | Classification | Notes                                                       |
| --------------------------------------------------------------------------- | ---------------------- | -------------- | ----------------------------------------------------------- |
| `https://www.linkedin.com/in/enes-yilmaz-026249286`                         | Social                 | Keep           | Used in hero and contact.                                   |
| `https://github.com/enesy1845`                                              | Social                 | Keep           | Used in contact.                                            |
| `https://www.linkedin.com/in/enes-yilmaz-026249286/details/experience/`     | Experience evidence    | Verify         | Used for two entries.                                       |
| `https://www.linkedin.com/in/enes-yilmaz-026249286/details/certifications/` | Certification evidence | Verify         | Used for certifications CTA.                                |
| `https://www.youtube.com/channel/UCwnYJAJrL6B48D73zvcWdeA`                  | Social/content         | Verify         | Third-party embed strategy needed.                          |
| Project and employer links listed above                                     | Work evidence          | Verify         | Later phase should check HTTP status and current ownership. |

## Downloadable Documents

No downloadable documents, CV files, PDFs, or document assets are present in the repository.

## Reusable Text

| Text                             | Classification                     | Notes                                                                |
| -------------------------------- | ---------------------------------- | -------------------------------------------------------------------- |
| "Full Stack Python Developer     | AI & Machine Learning Practitioner | Web Designer"                                                        | Rewrite | Useful professional positioning, but should align with the new Code, Thought, Craft narrative. |
| Portfolio project summaries      | Rewrite                            | Good raw inventory; not enough for case studies.                     |
| Experience bullet points         | Rewrite                            | Useful facts, but need verification and improved wording.            |
| Volunteer education paragraph    | Rewrite                            | Strong differentiator; verify numbers and privacy-sensitive details. |
| Contact email and social handles | Keep                               | Confirm whether public Gmail remains preferred.                      |

## Duplicate Or Obsolete Assets

| Item                                 | Classification | Notes                                                                  |
| ------------------------------------ | -------------- | ---------------------------------------------------------------------- |
| `images/profile.png` reference       | Remove later   | Broken local reference; actual file appears to be `images/profil.png`. |
| `script.js`                          | Remove later   | Only logs to console.                                                  |
| Cache-busting query strings `?v=1.2` | Remove later   | Replace with framework asset hashing.                                  |
| `images/profil.png`                  | Verify         | Large and currently unused due to filename mismatch.                   |

No exact duplicate files were identified by filename. A later image audit should use hashes and visual comparison.

## Broken, Insecure, Or Risky Links

| Item                        | Classification | Notes                                                                  |
| --------------------------- | -------------- | ---------------------------------------------------------------------- |
| `images/profile.png?v=1.2`  | Replace        | Broken because the repository has `profil.png`, not `profile.png`.     |
| `http://klasiktesbih.com/`  | Verify         | Insecure HTTP URL; check HTTPS support and current status later.       |
| All `target="_blank"` links | Rewrite        | Add `rel="noopener noreferrer"` in the future implementation.          |
| YouTube iframes             | Verify         | Privacy and performance risk; use lazy loading or link-based previews. |

Live external HTTP status was not checked in this phase.

## Accessibility Weaknesses

| Issue                                            | Classification | Notes                                                           |
| ------------------------------------------------ | -------------- | --------------------------------------------------------------- |
| No skip link                                     | Replace        | Required for keyboard users.                                    |
| Fixed navbar can obscure anchored sections       | Rewrite        | Route-based pages and scroll-margin should handle this.         |
| Profile alt text is generic `profile`            | Rewrite        | Needs descriptive or decorative decision.                       |
| Project image alt text repeats titles            | Rewrite        | Better alt text should describe the image only when meaningful. |
| YouTube iframe titles are generic                | Rewrite        | Each embed needs a specific title if retained.                  |
| Icon-only semantics rely on Font Awesome visuals | Replace        | Ensure accessible names on future controls and links.           |
| Hover transforms on cards/buttons                | Rewrite        | Ensure reduced motion and non-hover alternatives.               |
| No explicit reduced-motion handling              | Replace        | Required in new motion system.                                  |

## SEO Weaknesses

| Issue                                   | Classification | Notes                                                                                               |
| --------------------------------------- | -------------- | --------------------------------------------------------------------------------------------------- |
| Single generic title                    | Rewrite        | Needs metadata architecture and route-specific titles.                                              |
| No meta description                     | Replace        | Add via Next.js Metadata API later.                                                                 |
| No canonical URL                        | Replace        | Central site config required.                                                                       |
| No Open Graph or Twitter metadata       | Replace        | Add for profile and content pages.                                                                  |
| No structured data                      | Replace        | Add supported `Person`, `WebSite`, `ProfilePage`, `CreativeWork`, `Article`, and breadcrumbs later. |
| One-page anchor structure               | Rewrite        | Route-based structure improves crawlability and content depth.                                      |
| No sitemap or robots route              | Replace        | Required in Phase 1 or SEO foundation.                                                              |
| Character encoding/content display risk | Verify         | Some tooling displayed mojibake for Turkish punctuation; source should be reviewed in UTF-8.        |

## Performance Weaknesses

| Issue                                          | Classification | Notes                                                             |
| ---------------------------------------------- | -------------- | ----------------------------------------------------------------- |
| Bootstrap CSS and JS from CDN                  | Replace        | Ships broad framework for simple layout.                          |
| Font Awesome from CDN                          | Replace        | Large third-party icon dependency.                                |
| Google Fonts from CDN                          | Replace        | Third-party font request; future should self-host licensed fonts. |
| Large PNG screenshots                          | Verify         | Optimize and convert where appropriate.                           |
| Large profile image                            | Verify         | `profil.png` is 1.6 MB.                                           |
| Eager YouTube iframes                          | Replace        | Heavy third-party embeds load in the main page.                   |
| No image width/height on portfolio screenshots | Replace        | CLS risk; future must reserve dimensions.                         |
| Inline cache-control meta tags                 | Remove later   | Not a robust cache strategy.                                      |

## Third-Party CDN Dependencies

| Dependency       | URL                                                                            | Classification | Future direction                                  |
| ---------------- | ------------------------------------------------------------------------------ | -------------- | ------------------------------------------------- |
| Google Fonts     | `https://fonts.googleapis.com/css2?family=Pacifico&display=swap`               | Replace        | Self-host confirmed fonts.                        |
| Bootstrap CSS    | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css`      | Replace        | Use Tailwind and local CSS tokens.                |
| Font Awesome CSS | `https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css`    | Replace        | Use a small controlled icon set.                  |
| Bootstrap JS     | `https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js` | Replace        | Use small client components only where necessary. |
| YouTube embeds   | `https://www.youtube.com/embed/...`                                            | Verify         | Use lazy loading or external links.               |

## Existing GitHub Pages Assumptions

| Assumption                                      | Classification | Notes                                                                                   |
| ----------------------------------------------- | -------------- | --------------------------------------------------------------------------------------- |
| Root `index.html` is the production entry point | Replace        | Next.js will eventually replace root architecture after inventory and phased migration. |
| Static assets live under root `images/`         | Rewrite        | Future assets should move to `public/images/` after migration decisions.                |
| Query-string cache busting                      | Remove later   | Framework build hashing should replace this.                                            |
| No build step                                   | Replace        | Future app will require npm scripts and OpenNext build/preview.                         |
| GitHub Pages repository naming                  | Verify         | Future target is Cloudflare Workers, not GitHub Pages hosting.                          |

## Confidential Or Sensitive Content Risks

| Item                                                           | Classification | Notes                                                                                    |
| -------------------------------------------------------------- | -------------- | ---------------------------------------------------------------------------------------- |
| Client/agency work through Cuix and Architech                  | Verify         | Confirm permission and avoid overstating ownership.                                      |
| AFP distribution automation                                    | Verify         | Potential business process details; anonymize if case study is created.                  |
| Seller Flash automation                                        | Verify         | Avoid exposing proprietary dropshipping automation details.                              |
| LLM quiz project architecture                                  | Verify         | Remove internal URLs, credentials, user data, or mentor/client identities unless public. |
| Global Digital Data Literacy student counts and team structure | Verify         | Avoid exposing private students or internal group details.                               |

## Content That Needs Confirmation

- Correct spelling and diacritics for Enes Yilmaz, Vektorel Bilisim, Bilisim School, We'RHERE, and all client names.
- Whether `enes.yilmaz1845@gmail.com` should remain the public contact address.
- Current availability and ownership of every external project URL.
- Exact role, dates, responsibilities, and outcomes for each project.
- Which projects can be shown publicly with screenshots.
- Which projects should become detailed case studies.
- Whether YouTube videos should be embedded or linked.
- Which certificates should be listed individually.
- Whether the 2025 copyright year should remain or become dynamic.

## Recommended Keep/Rewrite/Replace Summary

Keep:

- Contact channels: LinkedIn and GitHub.
- Project and experience list as raw migration inventory.
- Quiver Blog volunteer story if permission is confirmed.

Rewrite:

- Hero positioning and professional summary.
- All project summaries into typed project records and case studies.
- Experience and volunteer copy into clearer, verified professional evidence.

Replace:

- Bootstrap, Font Awesome, Google Fonts CDN dependency model.
- One-page anchor navigation with route-based App Router pages.
- Eager YouTube embeds with lazy previews or content links.
- Legacy CSS implementation with Tailwind plus tokens.

Verify:

- All claims, dates, external links, screenshots, certificates, and public contact details.
- Image dimensions, optimization options, and alt text.

Remove later:

- `script.js`, cache-busting query strings, broken `profile.png` reference, and obsolete legacy assets after migration is complete.
