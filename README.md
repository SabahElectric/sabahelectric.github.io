# Sabah Electric Inc. website

Static, mobile-first marketing site for Sabah Electric Inc., led by electrician Sabah Toma, with 30+ years of experience. It is designed to publish with GitHub Pages from the repository root.

## Files

- **index.html** — page content and contact form fields.
- **styles.css** — visual system, responsive layouts, image galleries and reduced-motion support.
- **script.js** — mobile menu, scroll progress, section reveals, review cards and form state.
- **reviews.js** — approved client reviews and optional project photo references.
- **assets/** — original vector mark, generated illustrative service images, and real project and profile photos in `assets/project-gallery/`.
- **thanks.html** — post-submission confirmation page.

## Publish with GitHub Pages

In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, and save. GitHub Pages may take a few minutes to publish the first build. The site is live at https://sabahelectric.github.io/.

## Contact form setup

The form currently posts to FormSubmit at sabah@sabahelectric.ca. Before sharing the site:

1. Make sure sabah@sabahelectric.ca is a working inbox or forwards to one.
2. Submit a test inquiry from the published page.
3. Open the first FormSubmit verification email delivered to that inbox and activate the form. Until it is activated, FormSubmit holds submissions rather than forwarding them.
4. Test both the project inquiry and review form, and confirm the reply-to address is the customer’s email.

FormSubmit handles the form and emails submissions to the inbox; it is a third-party service. Do not request sensitive customer information in this public form. The form keeps its built-in spam challenge enabled and includes a hidden honeypot field.

When a custom domain is connected, update both `_next` addresses in index.html (project inquiry and review form) to the new domain’s thanks.html URL, then test again.

## Reviews and project photos

The site includes a review submission form with star rating, optional email and optional project photo uploads. FormSubmit sends those submissions to sabah@sabahelectric.ca for approval; GitHub Pages is static, so reviews are not published automatically.

After a review is confirmed, add it to `reviews.js` and place approved photos in `assets/reviews/`. Each review can include the client’s first initial, star rating, comment, confirmed-client label, project type and a small photo gallery. Do not publish a client’s review or photos without their consent.

## Project galleries and profile photo

The Industrial, Commercial and Residential cards begin with their original illustrative service image, then automatically rotate through the supplied Sabah Electric project photos. The gallery pauses while someone hovers or focuses a card, and it respects reduced-motion preferences. The person-behind-the-work card uses the supplied blue-shirt portrait first and flips to the work-suit portrait on hover or focus.

## Updating business details

Edit the text and phone/email details in index.html. Replace service images in assets/ using the same filenames to preserve the layout. Add project photos to `assets/project-gallery/` and list them in the matching gallery in script.js.

## Build notes

- No JavaScript framework, server, or build step is required.
- The SVG lightning mark was drawn for the site and uses the red descending-bolt direction in the supplied logo reference.
- The hero image and the first image on each service card are generated and labelled illustrative; the photos in `assets/project-gallery/` are real Sabah Electric work.
- CSS and JS links in index.html and thanks.html carry a `?v=` version. Change it whenever those files change so visitors’ browsers load the new version.
- GitHub Pages on the free plan requires the source repository to be public.
