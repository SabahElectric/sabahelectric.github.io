# Sabah Electric Inc. website

Static, mobile-first marketing site for Sabah Electric Inc., led by electrician Sabah Toma, with 30+ years of experience. It is designed to publish with GitHub Pages from the repository root.

## Files

- **index.html** — page content and contact form fields.
- **styles.css** — visual system, responsive layouts and reduced-motion support.
- **script.js** — mobile menu, scroll progress, section reveals and form state.
- **assets/** — original vector mark and generated illustrative photography.
- **thanks.html** — post-submission confirmation page.

## Publish with GitHub Pages

In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose **main** and **/ (root)**, and save. GitHub Pages may take a few minutes to publish the first build. The site address for this repository should be https://sabahelectric.github.io/.

## Contact form setup

The form currently posts to FormSubmit at sabah@sabahelectric.ca. Before sharing the site:

1. Make sure sabah@sabahelectric.ca is a working inbox or forwards to one.
2. Submit a test inquiry from the published page.
3. Open the first FormSubmit verification email delivered to that inbox and activate the form.
4. Test again and confirm the reply-to address is the customer’s email.

FormSubmit handles the form and emails submissions to the inbox; it is a third-party service. Do not request sensitive customer information in this public form. The form keeps its built-in spam challenge enabled and includes a hidden honeypot field.

When a custom domain is connected, update the form’s _next address in index.html to the new domain’s thanks.html URL, then test again.

## Updating business details

Edit the text and phone/email details in index.html. Replace service images in assets/ using the same filenames to preserve the layout. Keep the visual service photos described as illustrative until actual Sabah Electric project photos are available.

The founder panel currently uses Sabah’s initials. The supplied image asset is the existing logo, and LinkedIn requires sign-in to retrieve the profile portrait in this workflow. Replace the initials with a photo Sabah has approved for the website when one is available.

## Build notes

- No JavaScript framework, server, or build step is required.
- The SVG lightning mark was drawn for the site and uses the red descending-bolt direction in the supplied logo reference.
- All generated job-site images are illustrative, not documentation of completed Sabah Electric projects.
- GitHub Pages on the free plan requires the source repository to be public.
