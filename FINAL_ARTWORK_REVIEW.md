# Final artwork update

Current local artwork coverage: **346/346 entries**.

The three film versions were identified explicitly by the owner and verified against the exact public TMDB title, year and cast/director. Existing catalog IDs and physical inventory information are preserved.

| Catalog ID | Movie | Year | TMDB movie ID | Format | Local poster |
|---|---|---|---|---|---|
| 272 | [Geronimo: An American Legend](https://www.themoviedb.org/movie/35588-geronimo-an-american-legend?language=en-US) | 1993 | 35588 | DVD | posters/9FNuwnhHngkblD6eVRXnmJN8kQq.jpg |
| 335 | [The Girl with the Dragon Tattoo](https://www.themoviedb.org/movie/65754-the-girl-with-the-dragon-tattoo?language=en-US) | 2011 | 65754 | Blu-ray | posters/8bokS83zGdhaXgN9tjidUKmAftW.jpg |
| 133 | [Where the Red Fern Grows](https://www.themoviedb.org/movie/30071-where-the-red-fern-grows?language=en-US) | 2003 | 30071 | DVD | posters/zUDxfnWLq73rQaa8YSHBDGx96ZS.jpg |

## Eight supplied enhanced covers

Six source filenames label a different title from the image itself. All eight were visually inspected and assigned by the actual pictured title. These user-provided enhanced images establish artwork provenance; they do not independently verify film versions, disc contents, ratings or packaging text.

| Source filename in ZIP | Actual pictured title | Existing catalog ID | Local image |
|---|---|---|---|
| American Outlaws - Young Guns II Double Feature.jpg | American Outlaws / Young Guns II | 31 | covers/enhanced-31.jpg |
| Gigis First Day of School.jpg | Pig Tales Vol. 3 | 106 | covers/enhanced-106.jpg |
| Gromits Tail-Waggin DVD.jpg | Ribbits! The Complete DVD Collection | 281 | covers/enhanced-281.jpg |
| Jed and Roy McCoy - A Christmas Story.jpg | Gigi's First Day of School | 177 | covers/enhanced-177.jpg |
| Pig Tales Vol 3.jpg | Wars of Humanity, Combo Edition | 333 | covers/enhanced-333.jpg |
| Ribbits - Complete DVD Collection.jpg | Jed & Roy McCoy: A Christmas Story | 328 | covers/enhanced-328.jpg |
| The Inheritance.jpg | The Inheritance | 23 | covers/enhanced-23.jpg |
| Wars of Humanity - Combo Edition.jpg | Gromit's Tail-Waggin' DVD | 332 | covers/enhanced-332.jpg |

Original supplied JPGs are preserved locally under `originals/enhanced_covers/`. Published copies have been resized and stripped of embedded metadata. Existing verified images for all unrelated titles are unchanged.

## Remaining covers

**None: all 346 catalog entries have validated local artwork.** This is artwork coverage, not verification of a 360-title inventory or every metadata field.

## Finish and validate

Run `bash /home/dan/Downloads/family-movie-linux-package/family-movie-linux/finish_final_artwork.sh` in the normal Linux terminal. It downloads saved poster references without an API key, builds the site, validates inventory/artwork preservation and all three movie posters, and runs Chromium checks on the three posters and eight enhanced covers. It does not deploy.

Final real-browser results are recorded in `qa/browser-results.json`. A previous browser report does not validate this new build. No deployment has been performed for this update.
