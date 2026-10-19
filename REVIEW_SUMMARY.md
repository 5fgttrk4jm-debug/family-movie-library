# Family Movie Library — photo reconciliation

All **30 original photographs** were visually reviewed. They contain **366 identified appearances**, representing **336 original photo-confirmed catalog entries** after repeated views are combined. The supplementary ZIP adds **9 physical records from 6 photos**. An additional **1 owner-confirmed entry** brings the current inventory to **346 entries**. This includes **345 video entries and 1 CD-ROM storytelling kit**. **The estimated 360-title inventory is not verified.** This is not a count of individual films inside every box set or a count of tested discs.

**43 entries were added from the photos**. **18 original entries were not located** and remain in the audit and `inventory_unconfirmed.csv`. Not located does not mean not owned.

## Metadata and posters

| Status | Confirmed entries |
| --- | ---: |
| Verified work metadata | 259 |
| Exact API match | 27 |
| Saved TMDB match | 26 |
| Needs metadata | 34 |

**312 confirmed entries have sourced poster references.** Saved results were retained; limited API searches of 43 eligible gaps added 27 exact matches. No credential was saved or embedded. Public TMDB work pages supplied additional sourced corrections. 312 confirmed entries have validated local poster files; 0 references are not cached, and 34 entries have no reliable poster reference. 292 unique local poster images, including unconfirmed records, have been validated. Work posters can differ from disc packaging; TV artwork is labeled as series art. Entries without artwork use their source photograph.

The rating pass revisited all 182 original gaps. Cards now include sourced film certifications, explicitly labeled TV series guidance and verified Not Rated release labels. Main-feature, theatrical and constituent-film references state their scope. UK labels are not converted to US ratings. See `RATING_REVIEW.md` and `rating_review.csv` for every outcome and source.

## Repeated views and distinct copies

- IMG_5571 and IMG_5572 show the same 21-title stack. Flyboys appears additionally in IMG_5572.
- IMG_5579 and IMG_5580 show the same nine packages. These groups account for 30 repeated appearances.
- **Jurassic World: Fallen Kingdom**: Original Blu-ray + DVD package plus supplementary Blu-ray disc in IMG_5608.
- **Pokémon Detective Pikachu**: DVD case in IMG_5568 and Blu-ray in IMG_5569.
- **Monsters, Inc.**: Blu-ray in IMG_5567; DVD in repeated IMG_5579/5580 group.
- **The Expanse: Season 1**: DVD in IMG_5588; Blu-ray in IMG_5562.
- **The Muppet Movie**: DVD edition code 40547 in IMG_5574; 11068 in IMG_5578.
- **The Penguins of Madagascar**: Widescreen blue DVD in IMG_5578; Full Screen green DVD in IMG_5571/5572.
- The claimed second copies of The Closer seasons 1 and 3 have no separate package evidence; they remain unconfirmed.
- Longmire has six inner season packages in one outer sleeve. Five Clone Wars season cases replace the old aggregate row.

## Important corrections

- 1971 → **1917**; Chocolate → **Chocolat**; Slaw Moe → **Slow Moe**.
- The Med Brothers → **The Wild Brothers: Adventure 8 — Deep-Sea Canoe**.
- Bob the Builder: Big Adventures → **Little Robots: Big Adventures**.
- Popcorns: Complete Season One → **3-2-1 Penguins!: Complete Season 1**.
- VeggieTales: Complete DVD Collection → **Ribbits!: The Complete DVD Collection**.
- The Berenstain Bears: Dandelion… → **The Bellflower Bunnies: Dandelion & the Silver Screen / At the Science Academy**.
- The Blu-ray Expanse set is **Season 1**, not Season 2.
- The animated Platinum Edition **101 Dalmatians (1961)** replaces the incorrect 1996 poster.
- Sully is a Blu-ray movie; Operation Fortune is labeled 4K UHD; Detective Pikachu has separate DVD and Blu-ray copies.
- American Outlaws / Young Guns II is one double-feature package. LEGO Star Wars, Balto, Karate Kid, Harry Potter, and other box sets remain packages with contents notes.

## Remaining evidence limits

Geronimo and The Girl with the Dragon Tattoo have no assigned poster because their photographed spines do not establish the film version confidently. Several specialist DVDs have no reliable metadata or poster match. Complete contents of some sets are unreadable. Partially clipped or obscured background spines in IMG_5573 and IMG_5586 are not invented as titles. The source photos establish visible packaging, not disc condition, playback, or the presence of every disc inside a closed case.

## Original entries not located

- #46: Tomb Raider
- #51: Little House on the Prairie
- #64: The Closer: Season 4
- #65: The Closer: Season 1 (second copy)
- #66: The Closer: Season 3 (second copy)
- #80: The Emperor’s New Groove
- #139: The Princess and the Frog
- #150: VeggieTales: The Toy That Saved Christmas
- #151: VeggieTales: The Ultimate Silly Song Countdown
- #152: VeggieTales: The Star of Christmas
- #158: The Prince of Egypt
- #174: The LEGO Movie
- #180: The Hobbit: An Unexpected Journey
- #181: The Hobbit: The Desolation of Smaug
- #182: The Hobbit: The Battle of the Five Armies
- #211: The Christmas Shoes
- #217: The Suicide Squad
- #269: Curious George: A Very Monkey Christmas

Some of these may be set contents; none is counted as a separate photographed package without evidence.

## Validation and local handoff

The offline builder, provenance checks, generated links, and client behavior tests are provided in this folder. The catalog version passed seven real Chromium checks: initial collection, mobile widths of 390px and 320px, accent-normalized search, combined filters, inventory views, and keyboard/dialog behavior. No console errors, image failures, external requests, or uncached poster entries were recorded. Desktop and mobile screenshots are retained in `qa/`. The expanded My picks browser check also passed: edition selection, persistence, removal focus, clipboard fallback, print layout and mobile dialog. 

The original catalog site was deployed with user approval. This updated `publish/` directory and `family-movie-site-final.zip` add My picks; these files are prepared locally for the next deployment.

## Source records

Original catalog: `originals/catalog.json`. Saved matching output: `catalog_matched.json`. Photograph checksums: `source_photos/manifest.json`. Human readings: `photo_reconciliation.json`. Public metadata sources: `metadata_reviews.json` and `metadata_source` in `catalog_audit.csv`. Poster availability: `poster_availability.csv`. The resumable cache manifest records image dimensions and SHA-256 hashes in `poster_cache.json`. Source photos are copied to the candidate with metadata stripped; untouched originals remain local.

