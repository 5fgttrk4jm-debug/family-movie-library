# Web cover review

Reviewed 37 confirmed catalog entries with no TMDB poster reference. Identified 26 representative cover references, recorded with source pages and evidence in `web_cover_reviews.json`. These are artwork decisions only: no TMDB IDs, movie years, ratings, formats, or collection contents are assigned from cover searches.

The downloader must fetch and decode each image before the builder serves it. `web_cover_summary.json` reports actual cached coverage separately from references and pending downloads. This session cannot resolve image-server hostnames; no newly sourced image is claimed as downloaded until the cache verifies it.

## Download and build

Run in the normal Linux terminal:

```sh
python3 /home/dan/Downloads/family-movie-linux-package/family-movie-linux/cache_web_covers.py --build
```

No API key is needed. This does not publish to GitHub. Rerunning retries failures and reuses files whose image decoding, size, and SHA-256 still verify. PNG, JPEG and WebP inputs are converted to stripped local JPEGs, limited to 600 × 900 pixels. The downloader rejects HTML and unsupported image redirects.

All valid artwork is copied into `publish/covers/` and the final ZIP. Failed downloads retain the existing source-photo fallback. The builder preserves the original 299 cached poster-bearing entries and keeps web covers separate from TMDB metadata. Cards show the complete artwork with its original proportions.

## Entries still held

| ID | Title | Reason |
|---|---|---|
| 23 | The Inheritance | Multiple films share the title; owned version unresolved. |
| 31 | American Outlaws / Young Guns II | Search results mostly substitute another two-film or four-film combination; no suitable exact front-cover asset established. |
| 106 | Pig Tales Vol. 3 | Results frequently confuse this with Angry Birds' Piggy Tales; no verified image asset found. |
| 133 | Where the Red Fern Grows | Original and remake both have DVD releases; owned version unresolved. |
| 177 | Gigi's First Day of School | Exact release is documented, but available images often show other Gigi stories or generic series art. |
| 272 | Geronimo | Several film versions; owned version unresolved. |
| 281 | Ribbits! Complete DVD Collection | Results show standalone adventures or the unrelated film Ribbit. |
| 328 | Jed & Roy McCoy Christmas Story Storytelling Kit | CD-ROM, not a film; no exact packaging asset established. |
| 332 | Gromit's Tail-Waggin' DVD | Bonus disc, not Curse of the Were-Rabbit; searches mostly return main-feature packaging. |
| 333 | Wars of Humanity, Combo Edition | Catalog listings establish the title but no suitable exact image asset. |
| 335 | The Girl with the Dragon Tattoo | Original and remake share title; owned version unresolved. |

The expected best case for this batch is 325 of 336 entries with locally cached artwork (299 original + 26 web covers), leaving 11 without a reference. Actual totals depend on successful downloads and appear in the machine-readable summary. The non-video CD-ROM is included in these catalog-entry totals.

Publisher and retail sources include Universal Pictures at Home, Universal's GRUV store, FishFlix, DVD Empire, Walmart, Newegg and other linked product listings. Representative reissue packaging is marked as such in the evidence; artwork does not verify an owned pressing.

No deployment was performed for this cover-art batch.

Downloaded 23 initial images and visually reviewed their artwork. Gigi front/back image was trimmed to its front half. Balto/Balto II now uses an alternate retail image after the first source returned an HTTP error. Two additional references for the exact Mortenson lecture and Wild Brothers Adventure 8 were located and await downloading and visual inspection.
