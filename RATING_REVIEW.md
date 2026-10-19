# Rating review — 19 October 2026

Reviewed all 182 confirmed entries that previously had no rating. Public studio/distributor pages, US storefronts, film guides, library catalogs and exact release listings were checked. Existing TMDB matches and posters were retained; no API calls or credentials were needed.

| Result for the original gaps | Entries |
| --- | ---: |
| Sourced rating or release label | 163 |
| Unresolved | 12 |
| Explicitly scoped reference | 6 |
| Not applicable to this media | 1 |

The complete collection now has **326 sourced film/TV/release labels**, **6 explicit feature/theatrical/constituent references**, **1 non-film media item**, and **12 unresolved ratings**.

## How cards present ratings

- Film certifications retain G, PG, PG-13, R, or NC-17.
- TV series guidance is labeled “Series rating”; individual episodes and physical releases can differ.
- “Not rated (NR)” is used only when a source explicitly describes that work or release as not rated. It is not an age recommendation.
- A feature or theatrical reference does not certify a box set or director’s cut. The card states that scope.
- Mixed film sets show the constituent ratings with links to each film source, rather than an invented overall certification.
- Previously retained non-US ratings are not relabeled as US ratings. Earlier reference labels remain in the provenance data.

## Remaining ratings needing evidence

- **#23 The Inheritance** — The photographed title does not establish the exact film version.
- **#40 Return of the Outlaws** — A specialist release was located, but no reliable US age-rating label was established.
- **#106 Pig Tales Vol. 3: Puffed Up Piglets / Time for a Change** — A specialist release was located, but no reliable US age-rating label was established.
- **#121 A Trip to the San Diego Zoo** — A specialist release was located, but no reliable US age-rating label was established.
- **#123 Jack and the Beanstalk: A Tale with a Twist** — A specialist release was located, but no reliable US age-rating label was established.
- **#215 LEGO Star Wars: The Padawan Menace / The Empire Strikes Out / The Yoda Chronicles** — The complete owned set/edition could not be tied to a reliable US rating label.
- **#257 Looney Tunes: Center Stage Collection** — The complete owned set/edition could not be tied to a reliable US rating label.
- **#268 Gigi: God’s Little Princess / The Legend of the Three Trees** — The complete owned set/edition could not be tied to a reliable US rating label.
- **#275 Intelligent Design vs. the Intelligent Design Movement** — A specialist release was located, but no reliable US age-rating label was established.
- **#281 Ribbits!: The Complete DVD Collection** — A specialist release was located, but no reliable US age-rating label was established.
- **#333 Wars of Humanity: Combo Edition** — A specialist release was located, but no reliable US age-rating label was established.
- **#350 X-Men Collection** — The complete owned set/edition could not be tied to a reliable US rating label.

For these entries, a clear photo of the front and back of the owned case, including its rating box and barcode, would help resolve the version or release label. Their ratings remain unavailable; they were not automatically labeled NR.

## Audit files

- `rating_review.csv`: before/after outcome for every original gap, including source URLs.
- `rating_reviews.json`: approved source decisions and constituent film ratings.
- `rating_review_baseline.json`: the original 182-entry review scope.
- `catalog_audit.csv`: the full catalog with current ratings and provenance.
- `rating_review_summary.json`: machine-readable counts.

This report describes the local deployment candidate. Use the deployment result and live site to establish which version has actually been published.
