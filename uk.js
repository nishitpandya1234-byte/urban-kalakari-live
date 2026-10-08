/* Urban Kalakari on Odoo: the site-wide code.

   make_odoo_pack.py fills in CFG and the presentation functions it lifts out of
   site.js (hero, offer strip, swipe card, rails, videos, drawer, search, shop
   filter chips, product gallery), and publishes the result as uk.js in the
   public urban-kalakari-live repo. The founders' head code is only a loader
   for it, so a fix reaches their site without them pasting anything. Every
   page gets it, pasted pages or not, which is how the header, the moving strip
   and the WhatsApp button reach Odoo's own shop, product, cart and login pages.

   Three kinds of page are drawn here rather than pasted:
   * /shop?uk=<category>   our category page (one Odoo page fewer per category)
   * /shop/<odoo product>  our product page, over Odoo's, which stays hidden
                           underneath and still does the adding to cart
   * /shop?ukp=<our id>    a product Odoo does not sell yet: our page, with
                           "Coming soon"; it forwards to Odoo's page once it does

   The money still moves through Odoo. Our cards add to Odoo's real cart and
   wishlist through the same two calls Odoo's own buttons make, and our forms
   save into Odoo CRM through the same endpoint Odoo's Form block posts to. */
(function () {
  "use strict";
  var CFG = {"chrome": "<div aria-label=\"Announcements\" class=\"announce\"> <div class=\"announce-track\"> <span>Free Shipping Above ₹500<\/span><span>Reviving Indian Classics<\/span><span>Meaningful Aesthetic Designs<\/span><span>Inspired by and Made in India<\/span><span aria-hidden=\"true\">Free Shipping Above ₹500<\/span><span aria-hidden=\"true\">Reviving Indian Classics<\/span><span aria-hidden=\"true\">Meaningful Aesthetic Designs<\/span><span aria-hidden=\"true\">Inspired by and Made in India<\/span> <\/div> <\/div><header class=\"header\"> <div class=\"wrap header-bar\"> <a aria-label=\"Urban Kalakari, home\" class=\"brand\" href=\"/\"> <img alt=\"Urban Kalakari\" class=\"brand-word\" height=\"40\" src=\"https://cdn.jsdelivr.net/gh/nishitpandya1234-byte/urban-kalakari-media@v2/static/logo/wordmark-on-white-400.png\" width=\"120\"/> <\/a> <nav aria-label=\"Primary\" class=\"nav\"> <a href=\"/\">Home<\/a> <a href=\"/shop\">Shop<\/a> <a href=\"/bulk-orders\">Bulk Orders<\/a> <a href=\"/about-us\">About us<\/a> <a href=\"/contact-us\">Contact us<\/a> <a href=\"/faq\">FAQ<\/a> <\/nav> <div class=\"header-actions\"> <button aria-label=\"Search products\" class=\"icon-btn\" data-open-search=\"\" type=\"button\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><circle cx=\"11\" cy=\"11\" r=\"7\"><\/circle><path d=\"m20 20-3.5-3.5\"><\/path><\/svg> <\/button> <a aria-label=\"Wishlist\" class=\"icon-btn\" href=\"/shop/wishlist\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z\"><\/path><\/svg> <span class=\"badge-count\" data-count=\"0\" data-wish-count=\"\"><\/span> <\/a> <a aria-label=\"Cart\" class=\"icon-btn\" href=\"/shop/cart\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z\"><\/path><path d=\"M3 6h18\"><\/path><path d=\"M16 10a4 4 0 0 1-8 0\"><\/path><\/svg> <span class=\"badge-count\" data-cart-count=\"\" data-count=\"0\"><\/span> <\/a> <a class=\"btn btn-ghost btn-signin\" data-signed-out=\"\" href=\"/web/login\">Login / Sign Up<\/a> <a class=\"profile-chip\" data-signed-in=\"\" hidden=\"\" href=\"/my\"> <span aria-hidden=\"true\" class=\"profile-initial\" data-profile-initial=\"\"><\/span> <span class=\"profile-name\" data-profile-name=\"\"><\/span> <\/a> <button aria-expanded=\"false\" aria-label=\"Open menu\" class=\"icon-btn nav-toggle\" data-open-drawer=\"\" type=\"button\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M3 6h18M3 12h18M3 18h18\"><\/path><\/svg> <\/button> <\/div> <\/div> <\/header><div class=\"drawer\" data-open=\"false\" id=\"drawer\"> <button aria-label=\"Close menu\" class=\"drawer-scrim\" data-close-drawer=\"\" tabindex=\"-1\" type=\"button\"><\/button> <div aria-label=\"Menu\" aria-modal=\"true\" class=\"drawer-panel\" role=\"dialog\"> <div class=\"drawer-head\"> <img alt=\"Urban Kalakari\" height=\"37\" src=\"https://cdn.jsdelivr.net/gh/nishitpandya1234-byte/urban-kalakari-media@v2/static/logo/wordmark-on-white-400.png\" width=\"110\"/> <button aria-label=\"Close menu\" class=\"icon-btn\" data-close-drawer=\"\" type=\"button\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M18 6 6 18M6 6l12 12\"><\/path><\/svg> <\/button> <\/div> <a href=\"/\">Home<\/a> <a href=\"/shop\">Shop<\/a> <a href=\"/bulk-orders\">Bulk Orders<\/a> <a href=\"/about-us\">About us<\/a> <a href=\"/contact-us\">Contact us<\/a> <a href=\"/faq\">FAQ<\/a> <a data-signed-out=\"\" href=\"/web/login\">Login / Sign Up<\/a> <a data-signed-in=\"\" hidden=\"\" href=\"/my\"><span data-profile-named=\"\" hidden=\"\"><span data-profile-fullname=\"\"><\/span><\/span><span data-profile-unnamed=\"\" hidden=\"\">My account<\/span><\/a> <a class=\"btn btn-accent\" href=\"https://wa.me/919601018223\" rel=\"noopener\" style=\"margin-top:18px\" target=\"_blank\">WhatsApp us<\/a> <\/div> <\/div><dialog aria-label=\"Search products\" class=\"search-dialog\" id=\"search-dialog\"> <form class=\"search-form\" id=\"search-form\" method=\"dialog\" role=\"search\"> <button aria-label=\"Search\" class=\"icon-btn search-go\" type=\"submit\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><circle cx=\"11\" cy=\"11\" r=\"7\"><\/circle><path d=\"m20 20-3.5-3.5\"><\/path><\/svg> <\/button> <input aria-label=\"Search products\" autocomplete=\"off\" enterkeyhint=\"search\" id=\"search-input\" placeholder=\"Search bottles, jars, zodiac signs…\" type=\"search\"/> <button aria-label=\"Close search\" class=\"icon-btn\" data-close-search=\"\" type=\"button\"> <svg aria-hidden=\"true\" fill=\"none\" stroke=\"currentColor\" stroke-linecap=\"round\" stroke-width=\"2\" viewbox=\"0 0 24 24\"><path d=\"M18 6 6 18M6 6l12 12\"><\/path><\/svg> <\/button> <\/form> <div class=\"search-results\" data-filler=\"a all an and band bedroom best buy copper coppers drink for in india jewellery jewelry kalakari me minimal my new of online price prices shop show the urban water with\" data-jump='[{\"terms\": [\"bottel\", \"bottle\", \"bottles\", \"flask\", \"flasks\", \"hydration\", \"lota\", \"lotas\", \"sipper\", \"sippers\"], \"url\": \"/shop?ukp=shop/copper-bottles\"}, {\"terms\": [\"zodiac\"], \"under\": [\"bottel\", \"bottle\", \"bottles\", \"flask\", \"flasks\", \"hydration\", \"lota\", \"lotas\", \"sipper\", \"sippers\"], \"url\": \"/shop?ukp=shop/copper-bottles\"}, {\"terms\": [\"personality\"], \"under\": [\"bottel\", \"bottle\", \"bottles\", \"flask\", \"flasks\", \"hydration\", \"lota\", \"lotas\", \"sipper\", \"sippers\"], \"url\": \"/shop?ukp=shop/copper-bottles\"}, {\"terms\": [\"engraving\"], \"under\": [\"bottel\", \"bottle\", \"bottles\", \"flask\", \"flasks\", \"hydration\", \"lota\", \"lotas\", \"sipper\", \"sippers\"], \"url\": \"/shop?ukp=shop/copper-bottles\"}, {\"terms\": [\"bedside\", \"carafe\", \"carafes\", \"decanter\", \"decanters\", \"jar\", \"jars\", \"jug\", \"jugs\", \"kalash\", \"matka\", \"pitcher\", \"pitchers\", \"surahi\"], \"url\": \"/shop?ukp=shop/copper-jars\"}, {\"terms\": [\"half\", \"hammered\", \"tulip\"], \"under\": [\"bedside\", \"carafe\", \"carafes\", \"decanter\", \"decanters\", \"jar\", \"jars\", \"jug\", \"jugs\", \"kalash\", \"matka\", \"pitcher\", \"pitchers\", \"surahi\"], \"url\": \"/shop?ukp=shop/copper-jars\"}, {\"terms\": [\"printed\"], \"under\": [\"bedside\", \"carafe\", \"carafes\", \"decanter\", \"decanters\", \"jar\", \"jars\", \"jug\", \"jugs\", \"kalash\", \"matka\", \"pitcher\", \"pitchers\", \"surahi\"], \"url\": \"/shop?ukp=shop/copper-jars\"}, {\"terms\": [\"shaded\"], \"under\": [\"bedside\", \"carafe\", \"carafes\", \"decanter\", \"decanters\", \"jar\", \"jars\", \"jug\", \"jugs\", \"kalash\", \"matka\", \"pitcher\", \"pitchers\", \"surahi\"], \"url\": \"/shop?ukp=shop/copper-jars\"}, {\"terms\": [\"cup\", \"cups\", \"glass\", \"glasses\", \"mug\", \"mugs\", \"straw\", \"tumbler\", \"tumblers\", \"tumblr\"], \"url\": \"/shop?ukp=shop/copper-tumblers\"}, {\"terms\": [\"bangle\", \"bangles\", \"bracelet\", \"bracelets\", \"cuff\", \"cuffs\", \"kada\", \"kadas\", \"wrist\", \"wristband\", \"wristbands\"], \"url\": \"/shop?ukp=shop/copper-bracelets\"}, {\"terms\": [\"engraved\"], \"under\": [\"bangle\", \"bangles\", \"bracelet\", \"bracelets\", \"cuff\", \"cuffs\", \"kada\", \"kadas\", \"wrist\", \"wristband\", \"wristbands\"], \"url\": \"/shop?ukp=shop/copper-bracelets\"}, {\"terms\": [\"engrave\"], \"under\": [\"bangle\", \"bangles\", \"bracelet\", \"bracelets\", \"cuff\", \"cuffs\", \"kada\", \"kadas\", \"wrist\", \"wristband\", \"wristbands\"], \"url\": \"/shop?ukp=shop/copper-bracelets\"}, {\"terms\": [\"finger\", \"ring\", \"rings\"], \"url\": \"/shop?ukp=shop/copper-rings\"}, {\"terms\": [\"bundle\", \"bundles\", \"combo\", \"combos\", \"gift\", \"gifting\", \"gifts\", \"hamper\", \"hampers\", \"pair\", \"pairs\", \"present\", \"set\", \"sets\"], \"url\": \"/shop?ukp=shop/combo-sets\"}]' id=\"search-results\"><\/div> <\/dialog><a aria-label=\"Chat with us on WhatsApp\" class=\"fab-whatsapp\" href=\"https://wa.me/919601018223?text=Hi%20Urban%20Kalakari%21%20I%20have%20a%20question%20about%20your%20products\" rel=\"noopener\" target=\"_blank\"> <svg aria-hidden=\"true\" fill=\"currentColor\" viewbox=\"0 0 24 24\"><path d=\"M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15s-.77.96-.94 1.16c-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.65-2.05-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.7.63.71.23 1.36.19 1.87.12.57-.08 1.75-.71 2-1.4.25-.69.25-1.28.17-1.4-.07-.13-.27-.2-.57-.35zM12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.87 9.87 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23a8.2 8.2 0 0 1 5.82 2.42 8.18 8.18 0 0 1 2.41 5.82c0 4.54-3.69 8.23-8.24 8.23z\"><\/path><\/svg> <\/a><div aria-live=\"polite\" class=\"toast\" id=\"toast\" role=\"status\"><\/div>", "cdn": "https://cdn.jsdelivr.net/gh/nishitpandya1234-byte/urban-kalakari-media@v2/", "live": "https://cdn.jsdelivr.net/gh/nishitpandya1234-byte/urban-kalakari-live@main/", "fallback": {"aquarius": "/shop?ukp=aquarius", "aries": "/shop?ukp=aries", "blossom-hour-copper-bottle": "/shop?ukp=blossom-hour-copper-bottle", "cancer": "/shop?ukp=cancer", "capricorn": "/shop?ukp=capricorn", "certified-overthinker": "/shop?ukp=certified-overthinker", "day-dreamer": "/shop?ukp=day-dreamer", "blue-shaded-dual-tone-bottle": "/shop?ukp=blue-shaded-dual-tone-bottle", "pink-shaded-dual-tone-bottle": "/shop?ukp=pink-shaded-dual-tone-bottle", "gemini": "/shop?ukp=gemini", "god-s-favourite-child": "/shop?ukp=god-s-favourite-child", "golden-hour-copper-bottle": "/shop?ukp=golden-hour-copper-bottle", "red-half-hammered-bottle": "/shop?ukp=red-half-hammered-bottle", "green-half-hammered-bottle": "/shop?ukp=green-half-hammered-bottle", "leo": "/shop?ukp=leo", "libra": "/shop?ukp=libra", "midnight-hour-copper-bottle": "/shop?ukp=midnight-hour-copper-bottle", "official-thirst-trap": "/shop?ukp=official-thirst-trap", "pisces": "/shop?ukp=pisces", "sagittarius": "/shop?ukp=sagittarius", "scorpio": "/shop?ukp=scorpio", "lavender-sipper-bottle": "/shop?ukp=lavender-sipper-bottle", "orange-sipper-bottle": "/shop?ukp=orange-sipper-bottle", "yellow-sipper-bottle": "/shop?ukp=yellow-sipper-bottle", "taurus": "/shop?ukp=taurus", "virgo": "/shop?ukp=virgo", "half-hammered-tulip-jar-coffee-brown": "/shop?ukp=half-hammered-tulip-jar-coffee-brown", "half-hammered-tulip-jar-orange-rust": "/shop?ukp=half-hammered-tulip-jar-orange-rust", "half-hammered-tulip-jar-sage-green": "/shop?ukp=half-hammered-tulip-jar-sage-green", "minimal-printed-bedroom-jar-cards-print": "/shop?ukp=minimal-printed-bedroom-jar-cards-print", "minimal-printed-bedroom-jar-copper-wavy": "/shop?ukp=minimal-printed-bedroom-jar-copper-wavy", "minimal-printed-bedroom-jar-pastel-floral": "/shop?ukp=minimal-printed-bedroom-jar-pastel-floral", "shaded-bedroom-jar-coffee-brown": "/shop?ukp=shaded-bedroom-jar-coffee-brown", "shaded-bedroom-jar-pastel-ivory-sage-green": "/shop?ukp=shaded-bedroom-jar-pastel-ivory-sage-green", "shaded-bedroom-jar-pastel-yellow-blue": "/shop?ukp=shaded-bedroom-jar-pastel-yellow-blue", "charcoal-gray-tumbler-with-copper-straw": "/shop?ukp=charcoal-gray-tumbler-with-copper-straw", "ivory-lavender-multi-shaded-tumbler-with-copper-straw": "/shop?ukp=ivory-lavender-multi-shaded-tumbler-with-copper-straw", "pink-beige-striped-tumbler-with-copper-straw": "/shop?ukp=pink-beige-striped-tumbler-with-copper-straw", "braided-copper-bracelet": "/shop?ukp=braided-copper-bracelet", "chain-style-copper-bracelet": "/shop?ukp=chain-style-copper-bracelet", "designer-personalized-name-engraved-copper-bracelet": "/shop?ukp=designer-personalized-name-engraved-copper-bracelet", "leaf-style-copper-bracelet": "/shop?ukp=leaf-style-copper-bracelet", "plain-personalized-name-engraved-copper-bracelet": "/shop?ukp=plain-personalized-name-engraved-copper-bracelet", "watch-style-copper-bracelet": "/shop?ukp=watch-style-copper-bracelet", "wavy-copper-ring": "/shop?ukp=wavy-copper-ring", "zig-zag-copper-ring": "/shop?ukp=zig-zag-copper-ring", "printed-bottle-jar-two-glasses": "/shop?ukp=printed-bottle-jar-two-glasses", "evil-eye-bottle-two-glasses": "/shop?ukp=evil-eye-bottle-two-glasses", "half-hammered-bottle-two-glasses": "/shop?ukp=half-hammered-bottle-two-glasses", "multi-shaded-blue-bottle-two-glasses": "/shop?ukp=multi-shaded-blue-bottle-two-glasses", "printed-bedroom-jar-two-glasses": "/shop?ukp=printed-bedroom-jar-two-glasses", "shaded-bedroom-jar-two-glasses": "/shop?ukp=shaded-bedroom-jar-two-glasses", "ring-bracelet-set": "/shop?ukp=ring-bracelet-set"}, "names": {}, "remap": {"/copper-bottles": "/shop?uk=copper-bottles", "/copper-jars": "/shop?uk=copper-jars", "/copper-tumblers": "/shop?uk=copper-tumblers", "/copper-bracelets": "/shop?uk=copper-bracelets", "/copper-rings": "/shop?uk=copper-rings", "/combo-sets": "/shop?uk=combo-sets", "/all-products": "/shop?uk=all", "/contactus": "/contact-us"}, "links": {"shop": "/shop", "wishlist": "/shop/wishlist", "contact": "/contact-us"}, "phone": "919601018223", "freeMin": 500};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var ROOT = "";          // the lifted search code prefixes this to every URL
  var catalog = [];       // ours, with Odoo's URL and price laid over each entry
  var oById = {};         // our product id -> the Odoo product it is sold as
  var oLoaded = false;    // true once Odoo's catalogue has actually been read
  var oList = [];         // Odoo's catalogue as read off its shop grid
  // the loader's cache-buster, so a fix shows within ten minutes, not a week
  var V = (window.UK && window.UK.v) || "";
  function live(path) { return CFG.live + path + (V ? "?v=" + V : ""); }

  function initCarousel() {
    var root = $("[data-carousel]");
    if (!root) return;
    var track = $("[data-track]", root);
    var slides = $$(".hero-slide", track);
    if (slides.length < 2) return;
    // Round 6 item 11: dots under the hero instead of arrows, and the images
    // turn every 2 seconds once the film has played.
    var dots = $$("[data-dot]", root);
    var index = 0;
    var timer;
    var paused = false;
    var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var IMAGE_MS = 2000;

    // Round 5 item 1: slide 1 is the hero film. Only the cut that suits the
    // screen is loaded, and it is swapped if the window crosses the breakpoint.
    var film = $(".hero-video", root);
    var phone = window.matchMedia("(max-width: 760px)");
    function pickFilm() {
      if (!film) return;
      var which = phone.matches ? "mobile" : "desktop";
      var src = film.getAttribute("data-src-" + which);
      if (film.getAttribute("data-which") === which) return;
      film.setAttribute("data-which", which);
      film.poster = film.getAttribute("data-poster-" + which);
      film.src = src;
      film.preload = "auto";
      if (index === 0) playFilm();
    }
    function playFilm() {
      if (!film || reduced) return;
      var kick = film.play();
      if (kick && kick.catch) kick.catch(function () {});
    }
    if (film) {
      pickFilm();
      if (phone.addEventListener) phone.addEventListener("change", pickFilm);
    }

    function isFilm(i) { return film && slides[i].hasAttribute("data-video-slide"); }

    function go(next) {
      index = (next + slides.length) % slides.length;
      // Transition first: a drag leaves it at "none", and setting the transform
      // before restoring it would jump straight to the new slide.
      track.style.transition = "transform .6s cubic-bezier(.5,0,.2,1)";
      track.style.transform = "translateX(" + (-index * 100) + "%)";
      dots.forEach(function (d, i) { d.setAttribute("aria-selected", i === index ? "true" : "false"); });
      slides.forEach(function (s, i) {
        if (i === index) s.removeAttribute("aria-hidden");
        else s.setAttribute("aria-hidden", "true");
      });
      if (film) {
        if (isFilm(index)) { film.currentTime = 0; playFilm(); }
        else { film.pause(); }
      }
      schedule();
    }
    // The film holds its slide for one full play, then the images take their
    // usual turn; the loop attribute covers anyone who pauses on it.
    function schedule() {
      clearTimeout(timer);
      if (reduced || paused) return;
      var ms = IMAGE_MS;
      if (isFilm(index)) {
        ms = film.duration && isFinite(film.duration) ? film.duration * 1000 + 300 : 10500;
      }
      timer = setTimeout(function () { go(index + 1); }, ms);
    }
    function start() { paused = false; schedule(); }
    function stop() { paused = true; clearTimeout(timer); }
    if (film) {
      film.addEventListener("loadedmetadata", function () { if (isFilm(index)) schedule(); });
    }

    dots.forEach(function (d, i) { d.addEventListener("click", function () { go(i); }); });

    // Round 8 item 2: the hero can be dragged. It used to accept a flick on a
    // touch screen only, and ignored the mouse entirely. Now a press and drag
    // moves the pictures with the pointer on any device, and letting go either
    // completes the change or snaps back, so it is obvious the hero responds to
    // being pulled. Vertical movement is still left to the page (touch-action:
    // pan-y in the CSS), and a drag swallows the click that follows it so the
    // slide's link is not opened by accident.
    var viewport = $(".hero-viewport", root);
    var sx = null, sy = 0, dragging = false, swiped = false, width = 0;

    function setOffset(dx) {
      track.style.transition = "none";
      track.style.transform = "translateX(calc(" + (-index * 100) + "% + " + dx + "px))";
    }
    function settle() {
      track.style.transition = "transform .45s cubic-bezier(.5,0,.2,1)";
      track.style.transform = "translateX(" + (-index * 100) + "%)";
    }

    viewport.addEventListener("pointerdown", function (e) {
      // Only a primary press, and never on the dots or a button inside a slide.
      if (e.button) return;
      sx = e.clientX; sy = e.clientY;
      dragging = false; swiped = false;
      width = viewport.clientWidth || 1;
      stop();
    });
    viewport.addEventListener("pointermove", function (e) {
      if (sx === null) return;
      var dx = e.clientX - sx, dy = e.clientY - sy;
      if (!dragging) {
        // Wait until the gesture has declared itself horizontal, so a vertical
        // scroll that starts on the hero still scrolls the page.
        if (Math.abs(dx) < 8 || Math.abs(dx) <= Math.abs(dy)) return;
        dragging = true;
        if (viewport.setPointerCapture) {
          try { viewport.setPointerCapture(e.pointerId); } catch (err) { /* older browsers */ }
        }
      }
      e.preventDefault();
      // Resist at the two ends, so the carousel feels bounded rather than broken.
      var atEnd = (index === 0 && dx > 0) || (index === slides.length - 1 && dx < 0);
      setOffset(atEnd ? dx * 0.35 : dx);
    });
    function release(e) {
      if (sx === null) return;
      var dx = e.clientX - sx;
      var moved = dragging;
      sx = null; dragging = false;
      if (moved) {
        swiped = true;
        // A short flick counts as much as a long drag: a fifth of the hero, or
        // 40px, whichever is smaller.
        var need = Math.min(width * 0.2, 40);
        if (Math.abs(dx) > need) go(index + (dx < 0 ? 1 : -1));
        else settle();
      }
      start();
    }
    viewport.addEventListener("pointerup", release);
    viewport.addEventListener("pointercancel", function () {
      if (sx === null) return;
      sx = null;
      if (dragging) { dragging = false; settle(); }
      start();
    });
    // A mouse drag on a picture otherwise starts the browser's own image drag.
    viewport.addEventListener("dragstart", function (e) { e.preventDefault(); });
    viewport.addEventListener("click", function (e) {
      if (swiped) { e.preventDefault(); e.stopPropagation(); swiped = false; }
    }, true);

    // At 2 seconds a slide, pausing on hover would stop the hero whenever the
    // mouse rests on it, so only keyboard focus pauses it.
    root.addEventListener("focusin", function (e) { if (e.target.matches(":focus-visible")) stop(); });
    root.addEventListener("focusout", start);
    playFilm();
    start();
  }

  function initOffer() {
    var strip = $("[data-offer]");
    if (!strip) return;
    var hours = parseFloat(strip.getAttribute("data-hours")) || 11;
    var period = hours * 3600 * 1000;
    var KEY = "uk:offer-end";
    var end = 0;
    try { end = parseInt(localStorage.getItem(KEY), 10) || 0; } catch (e) { /* private mode */ }
    function save() { try { localStorage.setItem(KEY, String(end)); } catch (e) { /* private mode */ } }
    var now = Date.now();
    // first visit, a tampered value, or a window that has run out: a fresh 11 h
    if (!end || end <= now || end - now > period) end = now + period;
    save();

    var clocks = $$("[data-offer-time]", strip);
    function pad(n) { return (n < 10 ? "0" : "") + n; }
    function tick() {
      var left = end - Date.now();
      if (left <= 0) {
        end = Date.now() + period;
        save();
        left = period;
      }
      var t = Math.ceil(left / 1000);
      var text = pad(Math.floor(t / 3600)) + "h " + pad(Math.floor(t / 60) % 60) + "m " + pad(t % 60) + "s";
      clocks.forEach(function (el) { el.textContent = text; });
    }
    tick();
    setInterval(tick, 1000);
  }

  function initSwipe() {
    var sec = $("[data-swipe]");
    if (!sec) return;
    var card = $(".swipe-card-red", sec);
    var hintText = $("[data-swipe-hint-text]", sec);
    var pop = $("[data-swipe-pop]", sec);
    var again = $("[data-swipe-reset]", sec);
    if (!card) return;
    var HINT = hintText ? hintText.textContent : "";
    var REJECTED = sec.getAttribute("data-rejected") || "You rejected the red flag";
    var popTimer;

    function done() { return sec.hasAttribute("data-swiped"); }

    function reject() {
      card.classList.remove("is-dragging");
      card.style.transform = "";
      sec.setAttribute("data-swiped", "-1");
      if (hintText) hintText.textContent = "Green flag";
      if (pop) {
        pop.textContent = REJECTED + " 🎉";
        pop.classList.remove("is-on");
        void pop.offsetWidth;            // restart the pop animation
        pop.classList.add("is-on");
        // Round 8 item 3: it says its piece and gets out of the way. The
        // founders asked for a second and a half; round 7 had it at half a
        // second, which was gone before it had been read.
        clearTimeout(popTimer);
        popTimer = setTimeout(function () { pop.classList.remove("is-on"); }, 1500);
      }
      if (again) again.hidden = false;
    }
    function reset() {
      sec.removeAttribute("data-swiped");
      if (hintText) hintText.textContent = HINT;
      if (pop) { clearTimeout(popTimer); pop.classList.remove("is-on"); pop.textContent = ""; }
      if (again) again.hidden = true;
    }

    $$("[data-swipe-go]", sec).forEach(function (b) {
      b.addEventListener("click", function () {
        if (done()) reset(); else reject();
      });
    });
    if (again) again.addEventListener("click", reset);

    // drag with mouse or finger; vertical movement still scrolls the page
    var x0 = null, dx = 0;
    card.addEventListener("pointerdown", function (e) {
      if (done()) return;
      x0 = e.clientX; dx = 0;
      card.classList.add("is-dragging");
      if (card.setPointerCapture) card.setPointerCapture(e.pointerId);
    });
    card.addEventListener("pointermove", function (e) {
      if (x0 === null) return;
      dx = e.clientX - x0;
      // only left is the way out; to the right it drags stiffly
      var shown = dx < 0 ? dx : dx * 0.25;
      card.style.transform = "translateX(" + shown + "px) rotate(" + (shown / 18) + "deg)";
    });
    function release() {
      if (x0 === null) return;
      x0 = null;
      card.classList.remove("is-dragging");
      if (dx < -70) reject();
      else card.style.transform = "";
    }
    card.addEventListener("pointerup", release);
    card.addEventListener("pointercancel", release);
    card.addEventListener("dragstart", function (e) { e.preventDefault(); });

    // Round 8 item 3: no self-swiping. The founders asked for the auto swipe
    // on scroll to go, for the second time (round 7 item 3 removed it and it was
    // put back the same day). The IntersectionObserver that swiped the card for
    // anyone who only scrolled, the scroll listener that swiped it partway
    // through the sticky hold, and the hold itself are all gone. The card moves
    // when it is dragged or when the button is pressed, and at no other time.
  }

  function initInviewPlay() {
    $$("video[data-inview-play]").forEach(function (v) {
      v.muted = true;
      if (!window.IntersectionObserver) { v.play(); return; }
      new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            var kick = v.play();
            if (kick && kick.catch) kick.catch(function () {});
          } else { v.pause(); }
        });
      }, { threshold: 0.3 }).observe(v);
    });
  }

  function initRails() {
    $$("[data-rail]").forEach(function (wrap) {
      var track = $("[data-rail-track]", wrap);
      var prev = $("[data-rail-prev]", wrap);
      var next = $("[data-rail-next]", wrap);
      if (!track) return;

      function step() {
        var card = track.firstElementChild;
        // One card plus the gap, so a click lands the next card at the edge
        // rather than half of one.
        return card ? card.getBoundingClientRect().width + 24 : 300;
      }

      function sync() {
        var max = track.scrollWidth - track.clientWidth;
        // 2px of slack: sub-pixel layout means scrollLeft rarely hits max exactly.
        if (prev) prev.hidden = track.scrollLeft <= 2;
        if (next) next.hidden = track.scrollLeft >= max - 2;
      }

      function go(dir) {
        track.scrollBy({ left: dir * step(), behavior: "smooth" });
      }

      if (prev) prev.addEventListener("click", function () { go(-1); });
      if (next) next.addEventListener("click", function () { go(1); });
      track.addEventListener("scroll", sync, { passive: true });
      window.addEventListener("resize", sync);
      sync();
    });
  }

  function initVideos() {
    var cards = $$(".video-card");

    function silence(except) {
      cards.forEach(function (c) {
        if (c === except) return;
        var v = $("video", c);
        if (v) { v.muted = true; }
        c.classList.remove("is-loud");
      });
    }

    cards.forEach(function (card) {
      var video = $("video", card);
      var btn = $(".video-sound", card);
      if (!video) return;

      // The clips are muted so browsers will start them without a gesture --
      // an autoplaying clip with sound is blocked everywhere. Sound is opt-in.
      video.muted = true;

      function play() {
        var kick = video.play();
        if (kick && kick.catch) { kick.catch(function () {}); }
      }

      // The About-page clips are 50 seconds each and carry preload="none", so
      // they cost nothing until they are actually on screen. Everything else
      // starts straight away, as it did before.
      if (video.hasAttribute("data-autoplay-in-view") && window.IntersectionObserver) {
        new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            if (e.isIntersecting) { play(); }
            else { video.pause(); video.muted = true; card.classList.remove("is-loud"); }
          });
        }, { threshold: 0.35 }).observe(card);
      } else {
        play();
      }

      function toggle() {
        var loud = video.muted;
        if (loud) { silence(card); }
        video.muted = !loud;
        card.classList.toggle("is-loud", loud);
        if (loud) {
          video.play();
          btn.setAttribute("aria-label", "Mute this testimonial");
        } else {
          btn.setAttribute("aria-label", "Unmute this testimonial");
        }
      }

      if (btn) { btn.addEventListener("click", toggle); }
      // On an Instagram card the picture is a link out (item 17), so only the
      // speaker button toggles sound there -- clicking the clip follows the link.
      if (!card.classList.contains("journey-card")) {
        video.addEventListener("click", toggle);
      }
    });
  }

  function initDrawer() {
    var drawer = $("#drawer");
    if (!drawer) return;
    var toggle = $("[data-open-drawer]");

    function open() {
      drawer.setAttribute("data-open", "true");
      if (toggle) toggle.setAttribute("aria-expanded", "true");
      document.body.style.overflow = "hidden";
      var first = drawer.querySelector("a");
      if (first) first.focus();
    }
    function close() {
      drawer.setAttribute("data-open", "false");
      if (toggle) toggle.setAttribute("aria-expanded", "false");
      document.body.style.overflow = "";
      if (toggle) toggle.focus();
    }
    if (toggle) toggle.addEventListener("click", open);
    $$("[data-close-drawer]").forEach(function (b) { b.addEventListener("click", close); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && drawer.getAttribute("data-open") === "true") close();
    });
  }

  function initSearch() {
    var dialog = $("#search-dialog");
    var openBtn = $("[data-open-search]");
    if (!dialog || !openBtn || !dialog.showModal) return;
    var input = $("#search-input");
    var results = $("#search-results");
    var form = $("#search-form");

    /* Round 10 item 1: Enter, and the magnifier beside the box, resolve the
       whole query to a page instead of leaving the shopper on the grid. A query
       that names one of the six categories -- "bottle", "bottles", "sipper",
       "kada", "gift set" -- opens that category's page; one that names an
       edition opens the category scrolled to it. Before this, the only submit
       in the form was the close cross, so Enter shut the search.

       The table is rendered into the page by build_site.py (jump_table), so it
       is there whether or not catalog.json has arrived, and a word that could
       mean two categories was struck from it at build time: those keep showing
       the results grid, which is where a shopper picks between them. */
    var jump = [];
    var filler = {};
    try { jump = JSON.parse(results.getAttribute("data-jump") || "[]"); } catch (e) { jump = []; }
    (results.getAttribute("data-filler") || "").split(" ").forEach(function (w) {
      if (w) filler[w] = 1;
    });

    // One edit apart, counting a swap of two neighbours as one: that covers
    // "bottel" for "bottle" and "tumblr" for "tumbler", the misspellings people
    // actually type. Both words under five letters is left alone -- at that
    // length one edit reaches a different word ("jugs" is not "mugs"), and the
    // short category words are all spelled out in the table anyway.
    function near(a, b) {
      if (a === b) return true;
      var la = a.length, lb = b.length;
      if (la - lb > 1 || lb - la > 1) return false;
      if (la < 5 && lb < 5) return false;
      var i = 0;
      while (i < la && i < lb && a.charAt(i) === b.charAt(i)) i++;
      if (i === la || i === lb) return true;          // one is the other plus a letter
      if (la === lb) {
        if (a.slice(i + 1) === b.slice(i + 1)) return true;             // one letter differs
        return a.charAt(i) === b.charAt(i + 1) && a.charAt(i + 1) === b.charAt(i) &&
          a.slice(i + 2) === b.slice(i + 2);                            // two swapped
      }
      return la > lb ? a.slice(i + 1) === b.slice(i) : b.slice(i + 1) === a.slice(i);
    }

    function matches(terms, word) {
      for (var i = 0; i < terms.length; i++) {
        if (terms[i] === word || near(terms[i], word)) return true;
      }
      return false;
    }

    // The query must be nothing but words belonging to one page, once the words
    // that name no category are dropped ("copper", "buy", "online"). "copper
    // bottles" and "shop jars online" are a page; "leo bottle" is not, because
    // "leo" is left over, and that is a product search, not a category.
    //
    // An edition row is allowed its category's words too, so "zodiac bottles"
    // counts as one query; the row that matched the most words of its own then
    // wins, which is what keeps plain "bottles" on the category page rather than
    // splitting four ways between its editions.
    function destination(q) {
      var words = q.toLowerCase().replace(/[^a-z0-9\s]+/g, " ").split(/\s+/).filter(Boolean);
      if (!words.length) return "";
      var best = null, bestScore = 0, tied = false;
      for (var i = 0; i < jump.length; i++) {
        var row = jump[i], own = 0, left = 0;
        for (var w = 0; w < words.length; w++) {
          if (matches(row.terms, words[w])) own++;
          else if (!(row.under && matches(row.under, words[w])) && !filler[words[w]]) left++;
        }
        if (!own || left) continue;
        if (own > bestScore) { best = row.url; bestScore = own; tied = false; }
        else if (own === bestScore && row.url !== best) tied = true;
      }
      return tied ? "" : (best || "");     // two pages fit it equally: show the grid
    }

    function submit() {
      var q = input.value.trim();
      var url = destination(q);
      if (!url) {
        // Not a category. One product and one only: open it. Anything else
        // stays put with the grid showing, which is what was typed for.
        var hits = ranked(q);
        if (hits.length === 1) url = hits[0].url;
      }
      if (!url) { render(input.value); input.focus(); return; }
      dialog.close();
      window.location.href = ROOT + url;
    }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      submit();
    });
    $("[data-close-search]").addEventListener("click", function () { dialog.close(); });

    openBtn.addEventListener("click", function () {
      dialog.showModal();
      input.focus();
      // Round 9 item 10: opening the search with nothing typed offers a few
      // products to start from, and a different few each time it is opened.
      render(input.value);
    });

    // Round 8 item 12: each word of the query is matched on its own against
    // everything the product says about itself (build_site.py search_text), so
    // "blue jar" finds a jar whose colourway is blue even though those two
    // words are nowhere adjacent, and "gift" or "water" find something at all.
    // Matching the query as one substring of name + category + edition, which
    // is what it did before, found only what was already named on the tile.
    // Words are matched at the start of a word, not anywhere inside one. Plain
    // substring matching made "ring" hit every product whose copy says "bring",
    // which is most of them. A prefix still catches the plurals and the tenses
    // that matter -- "jar" finds "jars", "engrav" finds "engraved".
    function has(haystack, word) { return (" " + haystack).indexOf(" " + word) > -1; }

    function score(p, words) {
      var text = p.t || (p.name + " " + p.category + " " + p.edition).toLowerCase();
      var name = p.name.toLowerCase();
      var keys = p.k || "";
      var points = 0;
      for (var i = 0; i < words.length; i++) {
        if (!has(text, words[i])) return -1;            // every word must appear
        // a word in the name counts for more than one buried in a description,
        // so "leo" leads with the Leo bottle rather than whatever mentions Leo,
        // and a word this category is known by ("gift") beats a passing mention
        if (name.indexOf(words[i]) === 0) points += 4;
        else if (has(name, words[i])) points += 3;
        else if (has(keys, words[i])) points += 2;
        else points += 1;
      }
      return points;
    }

    // Round 9 item 10: what to offer before anything has been typed. One
    // product from each category first, so the suggestions show the range
    // rather than nine bottles, then filled out at random from the rest.
    var GRID = 9;
    function shuffled(list) {
      var a = list.slice();
      for (var i = a.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var t = a[i]; a[i] = a[j]; a[j] = t;
      }
      return a;
    }
    function recommended() {
      var pool = shuffled(catalog), seen = {}, first = [], rest = [];
      pool.forEach(function (p) {
        var c = p.category || "";
        if (!seen[c]) { seen[c] = 1; first.push(p); } else { rest.push(p); }
      });
      return first.concat(rest).slice(0, GRID);
    }

    // Every product the query matches, best first. Shared, so what Enter opens
    // when there is exactly one match is the same product the grid is showing.
    function ranked(q) {
      q = (q || "").trim().toLowerCase();
      if (!q) return [];
      var words = q.split(/\s+/).filter(Boolean);
      return catalog.map(function (p) { return { p: p, s: score(p, words) }; })
        .filter(function (h) { return h.s >= 0; })
        .sort(function (a, b) { return b.s - a.s; })
        .map(function (h) { return h.p; });
    }

    function render(q) {
      q = q.trim().toLowerCase();
      var hits = q ? ranked(q) : recommended();
      var total = hits.length;
      hits = hits.slice(0, GRID);
      if (!hits.length) {
        results.innerHTML = '<p class="search-empty">Nothing matches “' + esc(q) + '”. Try “zodiac”, “jar” or “engrave”.</p>';
        return;
      }
      // Round 9 item 9: the hits are product tiles in a three-across grid --
      // picture, name, price -- rather than a list of rows.
      var head = q
        ? (total > hits.length
            ? '<p class="search-head">Closest ' + hits.length + ' of ' + total + ' matches</p>' : "")
        : '<p class="search-head">Popular right now</p>';
      results.innerHTML = head + '<div class="search-grid">' + hits.map(function (p) {
        return '<a class="search-tile" href="' + esc(ROOT + p.url) + '">' +
          '<span class="search-tile-media"><img src="' + esc(ROOT + p.img) + '" alt="" loading="lazy"></span>' +
          '<span class="search-tile-name">' + esc(p.name) + '</span>' +
          '<span class="search-tile-meta">' + esc(p.edition || p.category) + '</span>' +
          '<span class="search-tile-price">' + rupees(p.price) + '</span></a>';
      }).join("") + '</div>';
    }

    var debounce;
    input.addEventListener("input", function () {
      clearTimeout(debounce);
      debounce = setTimeout(function () { render(input.value); }, 120);
    });
  }

  function initShop() {
    var toolbar = $("[data-filter]");
    if (!toolbar) return;
    var count = $("[data-shop-count]");

    $$("[data-filter]").forEach(function (chip) {
      chip.addEventListener("click", function () {
        var want = chip.getAttribute("data-filter");
        $$("[data-filter]").forEach(function (c) { c.classList.toggle("is-active", c === chip); });
        // S11 split the jar colourways into their own pages, so a card is one
        // buyable thing again; data-sellable still covers the combo sets, which
        // kept their variant picker
        var shown = 0;
        $$("[data-category]").forEach(function (section) {
          var on = want === "all" || section.getAttribute("data-category") === want;
          section.hidden = !on;
          if (on) {
            $$(".card", section).forEach(function (card) {
              shown += parseInt(card.getAttribute("data-sellable"), 10) || 1;
            });
          }
        });
        if (count) count.textContent = shown + (shown === 1 ? " item" : " items");
        if (want !== "all") {
          var target = document.getElementById(want);
          if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      });
    });
  }

  function addonAmount() {
    var addon = $("[data-addon]");
    return addon && addon.checked
      ? Number(addon.getAttribute("data-addon-price")) || 0 : 0;
  }

  function initZoom() {
    if (!$("[data-zoom-open]")) return null;
    var dlg = document.createElement("dialog");
    if (!dlg.showModal) return null;
    var svg = function (d) {
      return '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">' + d + "</svg>";
    };
    dlg.className = "zoom-dialog";
    dlg.setAttribute("aria-label", "Product image viewer");
    dlg.innerHTML =
      '<div class="zoom-stage"><img alt="" draggable="false"></div>' +
      '<button class="zoom-btn zoom-close" type="button" aria-label="Close viewer">' + svg('<path d="M6 6l12 12M18 6 6 18"/>') + "</button>" +
      '<button class="zoom-btn zoom-prev" type="button" aria-label="Previous image">' + svg('<path d="m15 5-7 7 7 7"/>') + "</button>" +
      '<button class="zoom-btn zoom-next" type="button" aria-label="Next image">' + svg('<path d="m9 5 7 7-7 7"/>') + "</button>" +
      '<div class="zoom-bar">' +
        '<button class="zoom-btn zoom-out" type="button" aria-label="Zoom out">' + svg('<path d="M5 12h14"/>') + "</button>" +
        '<span class="zoom-count" aria-live="polite"></span>' +
        '<button class="zoom-btn zoom-in" type="button" aria-label="Zoom in">' + svg('<path d="M12 5v14M5 12h14"/>') + "</button>" +
      "</div>";
    document.body.appendChild(dlg);

    var stage = $(".zoom-stage", dlg), im = $("img", stage);
    var prevBtn = $(".zoom-prev", dlg), nextBtn = $(".zoom-next", dlg), count = $(".zoom-count", dlg);
    var urls = [], idx = 0, s = 1, tx = 0, ty = 0, MAX = 5, TAP_ZOOM = 2.5;

    function apply(ease) {
      stage.classList.toggle("is-easing", !!ease);
      stage.classList.toggle("is-zoomed", s > 1.01);
      im.style.transform = "translate(" + tx + "px," + ty + "px) scale(" + s + ")";
    }
    // Never let the picture be dragged off: an edge stops at the screen's edge.
    function clamp() {
      var mx = Math.max(0, (im.offsetWidth * s - stage.clientWidth) / 2);
      var my = Math.max(0, (im.offsetHeight * s - stage.clientHeight) / 2);
      tx = Math.min(mx, Math.max(-mx, tx));
      ty = Math.min(my, Math.max(-my, ty));
    }
    // Zoom to scale n while the point under (px, py) stays where it is.
    function zoomAt(n, px, py, ease) {
      n = Math.min(MAX, Math.max(1, n));
      var r = stage.getBoundingClientRect();
      var cx = px - r.left - r.width / 2, cy = py - r.top - r.height / 2;
      tx = cx - (cx - tx) * (n / s);
      ty = cy - (cy - ty) * (n / s);
      s = n;
      if (s === 1) { tx = 0; ty = 0; }
      clamp(); apply(ease);
    }
    function zoomCentre(factor) {
      var r = stage.getBoundingClientRect();
      zoomAt(s * factor, r.left + r.width / 2, r.top + r.height / 2, true);
    }
    function show(i) {
      idx = (i + urls.length) % urls.length;
      s = 1; tx = 0; ty = 0; apply(false);
      im.src = urls[idx];
      var many = urls.length > 1;
      prevBtn.hidden = nextBtn.hidden = !many;
      count.textContent = many ? (idx + 1) + " / " + urls.length : "";
    }

    var pts = {}, drag = null, pinch = null, moved = false, downOnImg = false;
    var dist = function (a, b) { return Math.hypot(a.x - b.x, a.y - b.y); };

    stage.addEventListener("pointerdown", function (e) {
      stage.setPointerCapture(e.pointerId);
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pts);
      if (ids.length === 1) {
        moved = false; downOnImg = e.target === im;
        drag = { x: e.clientX, y: e.clientY, tx: tx, ty: ty };
      } else if (ids.length === 2) {
        pinch = { d: dist(pts[ids[0]], pts[ids[1]]) || 1, s: s };
        drag = null; moved = true;
      }
    });
    stage.addEventListener("pointermove", function (e) {
      if (!pts[e.pointerId]) return;
      pts[e.pointerId] = { x: e.clientX, y: e.clientY };
      var ids = Object.keys(pts);
      if (pinch && ids.length === 2) {
        var a = pts[ids[0]], b = pts[ids[1]];
        zoomAt(pinch.s * dist(a, b) / pinch.d, (a.x + b.x) / 2, (a.y + b.y) / 2, false);
      } else if (drag) {
        var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
        if (Math.abs(dx) + Math.abs(dy) > 6) moved = true;
        if (s > 1 && moved) {
          stage.classList.add("is-dragging");
          tx = drag.tx + dx; ty = drag.ty + dy;
          clamp(); apply(false);
        }
      }
    });
    function release(e) {
      if (!pts[e.pointerId]) return;
      delete pts[e.pointerId];
      stage.classList.remove("is-dragging");
      if (pinch) {
        // Lifting one finger of a pinch must not turn into a drag or a tap.
        if (Object.keys(pts).length < 2) pinch = null;
        drag = null;
        return;
      }
      if (!drag || e.type !== "pointerup") { drag = null; return; }
      var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      drag = null;
      if (!moved) {
        if (s > 1.01) zoomAt(1, e.clientX, e.clientY, true);
        else if (downOnImg) zoomAt(TAP_ZOOM, e.clientX, e.clientY, true);
        else dlg.close();
      } else if (s <= 1.01 && urls.length > 1 && Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        show(idx + (dx < 0 ? 1 : -1));
      }
    }
    stage.addEventListener("pointerup", release);
    stage.addEventListener("pointercancel", release);
    stage.addEventListener("wheel", function (e) {
      e.preventDefault();
      zoomAt(s * Math.exp(-e.deltaY * 0.0015), e.clientX, e.clientY, false);
    }, { passive: false });

    $(".zoom-close", dlg).addEventListener("click", function () { dlg.close(); });
    prevBtn.addEventListener("click", function () { show(idx - 1); });
    nextBtn.addEventListener("click", function () { show(idx + 1); });
    $(".zoom-in", dlg).addEventListener("click", function () { zoomCentre(1.6); });
    $(".zoom-out", dlg).addEventListener("click", function () { zoomCentre(1 / 1.6); });
    dlg.addEventListener("keydown", function (e) {
      if (e.key === "ArrowRight" && urls.length > 1) show(idx + 1);
      else if (e.key === "ArrowLeft" && urls.length > 1) show(idx - 1);
      else if (e.key === "+" || e.key === "=") zoomCentre(1.6);
      else if (e.key === "-") zoomCentre(1 / 1.6);
      else return;
      e.preventDefault();
    });
    dlg.addEventListener("close", function () { document.documentElement.style.overflow = ""; });
    window.addEventListener("resize", function () { if (dlg.open) { clamp(); apply(false); } });

    return {
      open: function (list, i) {
        urls = list.filter(Boolean);
        if (!urls.length) return;
        show(i > 0 ? i : 0);
        document.documentElement.style.overflow = "hidden";
        dlg.showModal();
      }
    };
  }

  function initProduct() {
    var main = $(".gallery-main img");

    // S10: the swap used to snap, because the new file was assigned straight
    // onto the visible element. Fade out, decode the next one off-screen, then
    // fade back in -- so there is never a blank frame mid-transition.
    function setMain(url) {
      if (!main || !url) return;
      var wrap = main.parentElement;
      var next = new Image();
      next.src = url;
      if (wrap) wrap.classList.add("is-swapping");
      var show = function () {
        main.removeAttribute("srcset");
        main.removeAttribute("sizes");
        main.src = url;
        if (wrap) requestAnimationFrame(function () { wrap.classList.remove("is-swapping"); });
      };
      if (next.decode) { next.decode().then(show, show); }
      else { next.onload = show; next.onerror = show; }
    }

    var zoomBtn = $("[data-zoom-open]");
    var zoom = initZoom();
    // Round 4 item 6: whatever the main image is showing is what the viewer opens.
    function setZoom(url) { if (zoomBtn && url) zoomBtn.setAttribute("data-zoom", url); }

    $$(".gallery-thumb").forEach(function (btn) {
      btn.addEventListener("click", function () {
        $$(".gallery-thumb").forEach(function (b) { b.setAttribute("aria-current", "false"); });
        btn.setAttribute("aria-current", "true");
        setMain(btn.getAttribute("data-full"));
        setZoom(btn.getAttribute("data-zoom"));
      });
    });

    function group(selector, onPick) {
      $$(selector).forEach(function (btn) {
        btn.addEventListener("click", function () {
          $$(selector).forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
          btn.setAttribute("aria-pressed", "true");
          setMain(btn.getAttribute("data-img"));
          setZoom(btn.getAttribute("data-zoom"));
          onPick(btn);
        });
      });
    }

    if (zoom && zoomBtn) {
      var openZoom = function () {
        // The gallery's own images, in order, so the viewer can step through
        // them; a variant photo that is not among them is shown on its own.
        var urls = $$(".gallery-thumb").map(function (b) { return b.getAttribute("data-zoom"); });
        var cur = zoomBtn.getAttribute("data-zoom");
        if (urls.indexOf(cur) < 0) urls = [cur];
        zoom.open(urls, urls.indexOf(cur));
      };
      zoomBtn.addEventListener("click", openZoom);
      if (main) main.addEventListener("click", openZoom);
    }

    // Round 8 item 32: the copper straw add-on. The figure on show is the base
    // price plus whatever is ticked, so a colourway change and the checkbox both
    // go through refreshPrice() rather than writing the text themselves.
    var priceEl = $("[data-price]");
    var addonBox = $("[data-addon]");

    function refreshPrice() {
      if (!priceEl) return;
      var base = Number(priceEl.getAttribute("data-base")) || 0;
      priceEl.textContent = rupees(base + addonAmount());
    }

    group("[data-variant]", function (btn) {
      var name = $("[data-variant-name]");
      if (name) name.textContent = btn.getAttribute("data-name");
      var p = btn.getAttribute("data-price");
      if (priceEl && p) {
        priceEl.setAttribute("data-base", p);
        refreshPrice();
      }
    });

    if (addonBox) addonBox.addEventListener("change", refreshPrice);

    group("[data-print]", function (btn) {
      var name = $("[data-print-name]");
      if (name) name.textContent = btn.getAttribute("data-print");
    });

    var eng = $("[data-engrave]");
    var preview = $("[data-engrave-preview]");
    if (eng && preview) {
      eng.addEventListener("input", function () {
        preview.textContent = eng.value.trim() || "Your name here";
      });
    }
  }

  function store(kind) {
    try { return window[kind]; } catch (e) { return null; }
  }
  function sget(key) { var s = store("sessionStorage"); try { return s ? s.getItem(key) : null; } catch (e) { return null; } }
  function sset(key, v) { var s = store("sessionStorage"); try { if (s) s.setItem(key, v); } catch (e) { /* private mode */ } }

  var toastTimer;
  function toast(message) {
    var el = $("#toast");
    if (!el) return;
    el.textContent = message;
    el.setAttribute("data-show", "true");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { el.removeAttribute("data-show"); }, 2600);
  }

  function editing() {
    return document.body.classList.contains("editor_enable");
  }

  /* ---------- header, moving strip, WhatsApp button (every page) ---------- */

  function sessionInfo() {
    try { return (window.odoo && window.odoo.__session_info__) || {}; } catch (e) { return {}; }
  }

  // Odoo's header stays in the page, hidden, because Odoo keeps its cart and
  // wishlist counts up to date in it. Ours reads them from there.
  function odooCount(sel) {
    var el = $("#top " + sel);
    var n = el ? parseInt(el.textContent, 10) : NaN;
    return isNaN(n) ? 0 : n;
  }

  function setCount(attr, n) {
    $$("[" + attr + "]").forEach(function (el) { el.setAttribute("data-count", n); el.textContent = n; });
  }

  function syncCounts() {
    var cart = parseInt(sget("website_sale_cart_quantity"), 10);
    setCount("data-cart-count", isNaN(cart) ? odooCount(".my_cart_quantity") : cart);
    setCount("data-wish-count", odooCount(".my_wish_quantity"));
  }

  function setCartCount(n) {
    sset("website_sale_cart_quantity", n);
    $$("#top .my_cart_quantity").forEach(function (el) { el.textContent = n; el.classList.toggle("d-none", !n); });
    setCount("data-cart-count", n);
  }

  function wishIds() {
    try { return JSON.parse(sget("wishlist_product_ids") || "[]") || []; } catch (e) { return []; }
  }

  function signedInName() {
    // the logged-in customer's dropdown is the one holding the log-out link
    var out = $('#top a[href*="/web/session/logout"]');
    var dd = out && out.closest(".dropdown, .o_header_user_menu, li");
    var t = dd && $(".dropdown-toggle", dd);
    var name = t ? t.textContent.replace(/\s+/g, " ").trim() : "";
    var info = sessionInfo();
    return name || info.partner_display_name || info.name || "";
  }

  function showSignedIn() {
    var info = sessionInfo();
    var inside = info.is_public === false || !!$('#top a[href*="/web/session/logout"]');
    $$(".uk-chrome [data-signed-out]").forEach(function (el) { el.hidden = inside; });
    $$(".uk-chrome [data-signed-in]").forEach(function (el) { el.hidden = !inside; });
    if (!inside) return;
    var name = signedInName() || "My account";
    $$(".uk-chrome [data-profile-name]").forEach(function (el) { el.textContent = name.split(" ")[0]; });
    $$(".uk-chrome [data-profile-fullname]").forEach(function (el) { el.textContent = name; });
    $$(".uk-chrome [data-profile-named]").forEach(function (el) { el.hidden = false; });
    $$(".uk-chrome [data-profile-initial]").forEach(function (el) { el.textContent = name.charAt(0).toUpperCase(); });
  }

  function markCurrent() {
    var here = location.pathname.replace(/\/+$/, "") || "/";
    $$(".uk-chrome .nav a, .uk-chrome .drawer-panel > a").forEach(function (a) {
      var to = (a.getAttribute("href") || "").split("#")[0].split("?")[0].replace(/\/+$/, "") || "/";
      var on = to === here || (to === "/shop" && /^\/(shop|copper-|combo-sets|all-products)/.test(here));
      if (on) a.setAttribute("aria-current", "page"); else a.removeAttribute("aria-current");
    });
  }

  function injectChrome() {
    var wrap = $("#wrapwrap");
    if (!wrap || $(".uk-chrome")) return;
    var box = document.createElement("div");
    box.className = "uk uk-chrome";
    box.innerHTML = CFG.chrome;
    wrap.insertBefore(box, wrap.firstChild);
    document.documentElement.classList.add("uk-has-chrome");
    markCurrent();
    showSignedIn();
    syncCounts();
    // Odoo's own buttons (product page, cart page) update its hidden header;
    // ours follows them
    if (window.MutationObserver) {
      var mo = new MutationObserver(syncCounts);
      $$("#top .my_cart_quantity, #top .my_wish_quantity").forEach(function (el) {
        mo.observe(el, { childList: true, characterData: true, subtree: true });
      });
    }
  }

  /* ---------- Odoo's catalogue ---------- */

  // Read off Odoo's shop grid: name, address, ids, price, sold out. One page of
  // the grid per request, so a large catalogue is a few requests, then kept
  // for ten minutes so moving between pages does not repeat it.
  var CACHE = "uk:odoo-products";
  var CACHE_MS = 10 * 60 * 1000;

  function money(el) {
    if (!el) return 0;
    return parseFloat(el.textContent.replace(/[^0-9.]/g, "")) || 0;
  }

  function readGrid(doc) {
    return $$("article.oe_product_cart", doc).map(function (card) {
      var a = $(".o_wsale_products_item_title a", card) || $("a.oe_product_image_link", card);
      var href = a ? a.getAttribute("href") : "";
      var wish = $("[data-product-template-id]", card);
      var tmpl = wish ? parseInt(wish.getAttribute("data-product-template-id"), 10) : NaN;
      if (isNaN(tmpl)) { var m = /-(\d+)(?:[?#].*)?$/.exec(href); tmpl = m ? parseInt(m[1], 10) : 0; }
      var pidEl = $("[data-product-id]", card) || $('input[name="product_id"]', card);
      var pid = pidEl ? parseInt(pidEl.getAttribute("data-product-id") || pidEl.value, 10) : 0;
      var priceBox = $(".product_price", card);
      var sale = priceBox && ($('[data-oe-expression*="price_reduce"] .oe_currency_value', priceBox) ||
                              $(".oe_currency_value", priceBox));
      var base = priceBox && $("del .oe_currency_value", priceBox);
      var ribbon = $(".o_ribbons, .o_wsale_ribbon", card);
      return {
        name: (card.getAttribute("aria-label") || (a ? a.textContent : "")).replace(/\s+/g, " ").trim(),
        url: href.split("?")[0],
        tmpl: tmpl, pid: pid || 0,
        price: money(sale), mrp: money(base),
        soldOut: !!(ribbon && /sold\s*out|out\s*of\s*stock/i.test(ribbon.textContent))
      };
    }).filter(function (p) { return p.url && p.name; });
  }

  function fetchGrid() {
    var seen = {}, all = [];
    function page(url, left) {
      return fetch(url, { credentials: "same-origin" })
        .then(function (r) { if (!r.ok) throw new Error(r.status); return r.text(); })
        .then(function (html) {
          var doc = new DOMParser().parseFromString(html, "text/html");
          readGrid(doc).forEach(function (p) { if (!seen[p.url]) { seen[p.url] = 1; all.push(p); } });
          var next = $('.products_pager a.page-link[rel="next"], .products_pager li.page-item:not(.disabled) a[rel="next"]', doc);
          if (!next) {
            // pagers without rel="next": the link after the active page
            var act = $(".products_pager li.page-item.active", doc);
            var sib = act && act.nextElementSibling;
            next = sib && !sib.classList.contains("disabled") ? $("a", sib) : null;
          }
          var to = next && next.getAttribute("href");
          if (to && left > 0 && to !== url) return page(to, left - 1);
          return all;
        });
    }
    return page("/shop?ppg=120", 12);
  }

  function odooProducts() {
    try {
      var c = JSON.parse(sget(CACHE) || "null");
      if (c && Date.now() - c.t < CACHE_MS && c.list && c.list.length) return Promise.resolve(c.list);
    } catch (e) { /* stale or broken cache: read again */ }
    return fetchGrid().then(function (list) {
      if (!list.length) return list;     // don't keep "nothing" for ten minutes
      sset(CACHE, JSON.stringify({ t: Date.now(), list: list }));
      return list;
    });
  }

  // Our names and Odoo's need not be the same: "Leo Copper Bottle" here is
  // "Leo" in Odoo, "God's Favourite Child Copper Bottle" is "God's Favourite".
  // Exact first, then with the words every bottle shares taken off, then one
  // name's words all inside the other's, but only when that picks exactly one.
  function norm(s) {
    return String(s || "").toLowerCase().replace(/&/g, " and ").replace(/['’]/g, "")
      .replace(/[^a-z0-9]+/g, " ").trim();
  }
  function core(s) {
    return norm(s).replace(/\b(copper|bottles?|and)\b/g, " ").replace(/\s+/g, " ").trim();
  }
  function within(small, big) {
    var b = " " + big + " ";
    return small.split(" ").every(function (w) { return b.indexOf(" " + w + " ") > -1; });
  }

  function matchProducts(ours, odoo) {
    var map = {}, taken = {};
    var byNorm = {}, byCore = {};
    // the copper straw is an add-on, sold with a tumbler, never a card of ours
    odoo = odoo.filter(function (o) { return !/\bstraw\b/i.test(o.name); });
    odoo.forEach(function (o) {
      (byNorm[norm(o.name)] = byNorm[norm(o.name)] || []).push(o);
      (byCore[core(o.name)] = byCore[core(o.name)] || []).push(o);
    });
    function claim(id, o) { map[id] = o; taken[o.url] = 1; }
    // pass 1: a name the founders pinned, or an exact match
    ours.forEach(function (p) {
      var pinned = CFG.names[p.id];
      var hit = (pinned && byNorm[norm(pinned)]) || byNorm[norm(p.name)] || byCore[core(p.name)];
      if (hit && hit.length === 1 && !taken[hit[0].url]) claim(p.id, hit[0]);
    });
    // pass 2: one name contained in the other, unambiguous both ways
    ours.forEach(function (p) {
      if (map[p.id]) return;
      var mine = core(p.name);
      if (!mine) return;
      var hits = odoo.filter(function (o) {
        var theirs = core(o.name);
        return !taken[o.url] && theirs && (within(theirs, mine) || within(mine, theirs));
      });
      if (hits.length !== 1) return;
      var rivals = ours.filter(function (q) {
        if (map[q.id] || q.id === p.id) return false;
        var c = core(q.name), t = core(hits[0].name);
        return within(t, c) || within(c, t);
      });
      if (!rivals.length) claim(p.id, hits[0]);
    });
    return map;
  }

  function rupees(n) {
    return "₹" + Number(n || 0).toLocaleString("en-IN");
  }
  // site.js has its own; its regex holds both quote marks, which the brace
  // matcher in make_odoo_pack.py would read as the start of a string
  function esc(s) {
    var map = { "&": "&amp;", "<": "&lt;", ">": "&gt;", "\"": "&quot;", "'": "&#39;" };
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) { return map[c]; });
  }

  /* ---------- our product cards, wired to Odoo ---------- */

  function cardOf(el) { return el.closest("article.card[data-product]"); }

  function wireCards() {
    var wished = wishIds();
    // product links outside the cards: hero slides, gifting picks
    $$(".uk a[data-uk-pid]").forEach(function (a) {
      var o = oById[a.getAttribute("data-uk-pid")];
      a.setAttribute("href", o ? o.url : soonUrl(a.getAttribute("data-uk-pid")));
    });
    $$(".uk article.card[data-product]").forEach(function (card) {
      var id = card.getAttribute("data-product");
      var o = oById[id];
      var add = $("[data-add]", card);
      var wish = $("[data-wish]", card);
      if (!o) {
        if (!oLoaded) return;        // Odoo not read: leave the card as it is
        // not on sale in Odoo yet: the card still opens our page for it
        card.classList.add("uk-not-in-odoo");
        $$("a.card-media, .card-name a", card).forEach(function (a) { a.setAttribute("href", soonUrl(id)); });
        if (add) { add.disabled = true; add.textContent = "Coming soon"; }
        if (wish) wish.hidden = true;
        return;
      }
      $$("a.card-media, .card-name a", card).forEach(function (a) { a.setAttribute("href", o.url); });
      var price = $("[data-card-price]", card);
      if (price && o.price) price.textContent = rupees(o.price);
      var box = $(".card-price", card);
      var mrp = box && $("s.mrp", box);
      if (box && o.price) {
        if (o.mrp > o.price) {
          if (!mrp) { mrp = document.createElement("s"); mrp.className = "mrp"; box.insertBefore(mrp, box.firstChild); box.insertBefore(document.createTextNode(" "), mrp.nextSibling); }
          mrp.textContent = rupees(o.mrp);
        } else if (mrp) { mrp.remove(); }
      }
      if (add && o.soldOut) { add.disabled = true; add.textContent = "Sold out"; }
      if (wish) wish.setAttribute("aria-pressed", wished.indexOf(o.pid) > -1 ? "true" : "false");
    });
  }

  function rpc(url, params) {
    return fetch(url, {
      method: "POST", credentials: "same-origin",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ jsonrpc: "2.0", method: "call", id: Date.now(), params: params })
    }).then(function (r) { return r.json(); }).then(function (d) {
      if (d.error) throw d.error;
      return d.result;
    });
  }

  function onAdd(btn) {
    var card = cardOf(btn);
    var o = card && oById[card.getAttribute("data-product")];
    if (!o) {   // Odoo not read yet, or not sold there: the product search
      var a = card && $(".card-name a", card);
      if (a) location.href = a.getAttribute("href");
      return;
    }
    // engraving or a colour to pick: that happens on Odoo's product page
    if (btn.hasAttribute("data-needs-options") || !o.pid) { location.href = o.url; return; }
    btn.disabled = true;
    rpc("/shop/cart/add", { product_template_id: o.tmpl, product_id: o.pid, quantity: 1 })
      .then(function (res) {
        btn.disabled = false;
        if (res && typeof res.cart_quantity === "number") setCartCount(res.cart_quantity);
        if (res && res.quantity === 0) { toast("That one is sold out."); return; }
        toast("Added to cart.");
      })
      .catch(function () { location.href = o.url; });   // let Odoo's page do it
  }

  function onWish(btn) {
    var card = cardOf(btn);
    var o = card ? oById[card.getAttribute("data-product")] : null;
    var pdp = !card && btn.closest("[data-uk-odoo]");
    if (pdp) o = oById[ourIdFor(parseInt(pdp.getAttribute("data-uk-odoo"), 10))];
    if (!o || !o.pid) { if (o) location.href = o.url; return; }
    var ids = wishIds();
    if (ids.indexOf(o.pid) > -1) { location.href = CFG.links.wishlist; return; }
    rpc("/shop/wishlist/add", { product_id: o.pid })
      .then(function () {
        ids.push(o.pid);
        sset("wishlist_product_ids", JSON.stringify(ids));
        btn.setAttribute("aria-pressed", "true");
        var n = odooCount(".my_wish_quantity") + 1;
        $$("#top .my_wish_quantity").forEach(function (el) { el.textContent = n; el.classList.remove("d-none"); });
        setCount("data-wish-count", n);
        toast("Saved to your wishlist.");
      })
      .catch(function () { location.href = o.url; });
  }

  function initCardClicks() {
    document.addEventListener("click", function (e) {
      var add = e.target.closest && e.target.closest(".uk [data-add]");
      if (add) { e.preventDefault(); onAdd(add); return; }
      var wish = e.target.closest && e.target.closest(".uk [data-wish]");
      if (wish) { e.preventDefault(); onWish(wish); }
    });
  }

  /* ---------- search ---------- */

  // Our catalogue drives the search (it carries every product's words), with
  // each hit pointed at Odoo's page for it. Once Odoo's catalogue is read, a
  // product Odoo does not sell yet drops out of the results.
  function loadCatalog() {
    return fetch(live("catalog.json")).then(function (r) { return r.json(); }).then(function (list) {
      list.forEach(function (p) {
        if (!/^https?:/.test(p.img)) p.img = CFG.cdn + p.img;
        p.url = CFG.fallback[p.id] || "/shop";
      });
      return list;
    });
  }

  function overlayOdoo(list) {
    list.forEach(function (p) {
      var o = oById[p.id];
      if (!o) return;              // stays on its "Coming soon" page
      p.url = o.url;
      if (o.price) p.price = o.price;
    });
    return list;
  }

  function soonUrl(id) { return "/shop?ukp=" + encodeURIComponent(id); }

  /* ---------- forms: bulk inquiry and contact, into Odoo CRM ---------- */

  function validate(form) {
    var ok = true;
    $$(".field", form).forEach(function (field) {
      var control = $("input, select, textarea", field);
      if (!control) return;
      var valid = control.checkValidity();
      field.toggleAttribute("data-invalid", !valid);
      if (!valid && ok) { control.focus(); ok = false; }
    });
    return ok;
  }

  function lead(kind, f) {
    var g = function (k) { return (f.get(k) || "").toString().trim(); };
    if (kind === "bulk") {
      return {
        name: "Bulk order inquiry: " + (g("company") || g("name")) + (g("purpose") ? " (" + g("purpose") + ")" : ""),
        contact_name: g("name"), phone: g("phone"), email_from: g("email"), partner_name: g("company"),
        description: g("requirement") + "\n\nCompany: " + g("company") + "\nCity: " + g("city") +
                     "\nPurpose: " + g("purpose") + "\n(From the Bulk Orders page)"
      };
    }
    return {
      name: "Website message from " + g("name"),
      contact_name: g("name"), phone: g("phone"), email_from: g("email"),
      description: g("message") + "\n\n(From the Contact us page)"
    };
  }

  function whatsappText(kind, f) {
    var g = function (k) { return (f.get(k) || "").toString().trim(); };
    return kind === "bulk"
      ? "Hi Urban Kalakari, a bulk order inquiry.\nName: " + g("name") + "\nCompany: " + g("company") +
        "\nCity: " + g("city") + "\nPurpose: " + g("purpose") + "\n" + g("requirement")
      : "Hi Urban Kalakari, I'm " + g("name") + ".\n" + g("message");
  }

  function thanks(form, kind, failed, f) {
    var card = document.createElement("div");
    card.className = "form-card uk-form-done";
    card.setAttribute("role", "status");
    var wa = "https://wa.me/" + CFG.phone + "?text=" + encodeURIComponent(whatsappText(kind, f));
    card.innerHTML = failed
      ? '<h2>That did not go through.</h2><p>Nothing was lost: send the same message on WhatsApp and we will pick it up from there.</p>' +
        '<p><a class="btn btn-accent" target="_blank" rel="noopener" href="' + wa + '">Send it on WhatsApp</a></p>'
      : '<h2>Thank you! Our team will contact you soon.</h2><p>We have your ' + (kind === "bulk" ? "inquiry" : "message") +
        '. Someone from Urban Kalakari will get back to you, usually on WhatsApp, sometimes by email.</p>' +
        '<p><a class="btn btn-accent" href="' + CFG.links.shop + '">Keep browsing</a> ' +
        '<a class="btn btn-ghost" target="_blank" rel="noopener" href="https://wa.me/' + CFG.phone + '">Message us now</a></p>';
    form.replaceWith(card);
    card.scrollIntoView({ block: "center", behavior: "smooth" });
  }

  function initOdooForms() {
    $$(".uk form[data-form]").forEach(function (form) {
      var kind = form.getAttribute("data-form");
      $$(".field input, .field select, .field textarea", form).forEach(function (control) {
        control.addEventListener("input", function () {
          if (control.checkValidity()) control.closest(".field").removeAttribute("data-invalid");
        });
      });
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        if (!validate(form)) return;
        var f = new FormData(form);
        var body = new FormData();
        var values = lead(kind, f);
        Object.keys(values).forEach(function (k) { if (values[k]) body.append(k, values[k]); });
        try { if (window.odoo && window.odoo.csrf_token) body.append("csrf_token", window.odoo.csrf_token); } catch (err) { /* none */ }
        var btn = $('button[type="submit"]', form);
        if (btn) btn.disabled = true;
        fetch("/website/form/crm.lead", { method: "POST", body: body, credentials: "same-origin" })
          .then(function (r) { return r.json(); })
          .then(function (d) { thanks(form, kind, !(d && d.id), f); })
          .catch(function () { thanks(form, kind, true, f); });
      });
    });
  }

  /* ---------- shop landing ---------- */

  // Our six category tiles sit in the drop zone above Odoo's product grid on
  // /shop. On /shop itself they replace the grid, as on the preview site; on a
  // search or a category the grid shows and the tiles step aside.
  function markShop() {
    var bare = location.pathname.replace(/\/+$/, "") === "/shop" && !location.search;
    if (!$(".uk-shop-top")) return;
    document.documentElement.classList.toggle("uk-shop-landing", bare);
    document.documentElement.classList.toggle("uk-shop-listing", !bare);
  }

  /* ---------- links that moved since the pages were pasted ----------
     The pasted pages keep the addresses they were pasted with. CFG.remap moves
     them on (a category page is /shop?uk=... now, not a page of its own), and
     until the founders give Contact us an address, links to it are hidden. */

  function fixLinks(scope) {
    $$(".uk a[href]", scope).forEach(function (a) {
      var h = a.getAttribute("href");
      var path = h.split("#")[0];
      if (CFG.remap[path]) { a.setAttribute("href", CFG.remap[path]); return; }
      if (!CFG.links.contact && /^\/contact-?us(?:[#?\/]|$)/.test(h)) {
        var li = a.parentElement && a.parentElement.tagName === "LI" ? a.parentElement : null;
        (li || a).hidden = true;
      }
    });
  }

  /* ---------- pages drawn here: category, product, coming soon ---------- */

  function unwait() { document.documentElement.classList.remove("uk-wait"); }

  function fragment(path) {
    return fetch(live(path)).then(function (r) {
      if (!r.ok) throw new Error(r.status);
      return r.text();
    });
  }

  // Our markup goes at the top of Odoo's #wrap; the founders' own blocks stay
  function mount(html, before) {
    var wrap = $("#wrap") || $("main");
    var box = document.createElement("div");
    box.className = "uk uk-drawn";
    box.innerHTML = html;
    wrap.insertBefore(box, before || wrap.firstChild);
    fixLinks(box);
    $$("[data-year]", box).forEach(function (el) { el.textContent = new Date().getFullYear(); });
    return box;
  }

  function ownPage() {
    if (location.pathname.replace(/\/+$/, "") !== "/shop") return null;
    var q = new URLSearchParams(location.search);
    if (q.get("uk")) return { kind: "c", id: q.get("uk") };
    if (q.get("ukp")) return { kind: "p", id: q.get("ukp") };
    return null;
  }

  // Odoo's product page: /shop/<slug>-<template id>
  function odooProductPage() {
    var m = /^\/shop\/[^\/]+-(\d+)\/?$/.exec(location.pathname);
    return m && $("#product_detail") ? parseInt(m[1], 10) : 0;
  }

  function ourIdFor(tmpl) {
    for (var id in oById) if (oById[id].tmpl === tmpl) return id;
    return null;
  }

  function title(name) {
    document.title = name + " | Urban Kalakari";
  }

  /* Our product page, standing in for Odoo's. Odoo's own page is still in the
     document, hidden: its price is the one shown, and when the product has an
     engraving field or a choice to make, our button fills Odoo's form and
     presses Odoo's own Add to cart, so the order carries exactly what Odoo's
     page would have sent. */
  function odooNum(el) { return el ? parseFloat(el.textContent.replace(/[^0-9.]/g, "")) || 0 : 0; }

  function pdpFromOdoo(box, o) {
    var odoo = $("#product_details") || document;
    var price = odooNum($(".product_price .oe_price .oe_currency_value", odoo));
    var mrp = odooNum($(".product_price del .oe_currency_value", odoo)) ||
              odooNum($(".product_price .oe_default_price:not(.d-none) .oe_currency_value", odoo));
    var amount = $("[data-price]", box);
    if (amount && price) {
      amount.setAttribute("data-base", price);
      amount.textContent = rupees(price);
      var s = $(".pdp-price s.mrp", box);
      if (mrp > price) {
        if (!s) { s = document.createElement("s"); s.className = "mrp"; amount.parentNode.insertBefore(s, amount); amount.parentNode.insertBefore(document.createTextNode(" "), amount); }
        s.textContent = rupees(mrp);
      } else if (s) { s.remove(); }
    }
    var odooAdd = $('[name="add_to_cart"]', odoo);
    var wrapHidden = odooAdd && odooAdd.closest(".d-none");
    var ribbon = $(".o_wsale_ribbon", $("#product_detail") || document);
    var soldOut = !odooAdd || odooAdd.disabled || !!wrapHidden ||
                  !!(ribbon && /sold\s*out|out\s*of\s*stock/i.test(ribbon.textContent));
    // engraving: only where Odoo has the attribute, and at Odoo's charge
    var engrave = $(".engrave-box", box);
    if (engrave) {
      if (!engraveAttr(odoo)) engrave.hidden = true;
      else initEngraveCharge(box, o, odoo, price);
    }
    // the straw is its own Odoo product; no product, no tick box
    var straw = $("[data-addon]", box);
    if (straw && !strawProduct()) straw.closest(".addon-box").hidden = true;
    if (soldOut) {
      $$(".buy-row [data-add]", box).forEach(function (b) { b.disabled = true; });
      var first = $(".buy-row .btn-add", box);
      if (first) first.textContent = "Sold out";
      var buy = $(".buy-row [data-buy-now]", box);
      if (buy) buy.hidden = true;
    }
    var wish = $(".buy-row [data-wish]", box);
    if (wish) wish.setAttribute("aria-pressed", wishIds().indexOf(o.pid) > -1 ? "true" : "false");
    box.setAttribute("data-uk-odoo", o.tmpl);
  }

  /* Engraving on Odoo is a never-a-variant attribute: a free "No engraving"
     value and a free-text "Name" value that carries the charge. Odoo draws the
     text field only after "Name" is ticked, so it is the radios we read. */
  function engraveAttr(odoo) {
    var custom = $(".js_add_cart_variants input.no_variant[data-is-custom]", odoo);
    if (!custom) return null;
    var plain = $$('.js_add_cart_variants input[name="' + custom.name + '"]', odoo)
      .filter(function (r) { return r !== custom; })[0] || null;
    return { custom: custom, plain: plain };
  }

  // the attribute values Odoo would send, with the engraving one set by `named`
  function chosenValues(odoo, eng, named, noVariantOnly) {
    var ids = [];
    $$(".js_add_cart_variants input.js_variant_change:checked, .js_add_cart_variants select.js_variant_change", odoo)
      .forEach(function (el) {
        if (eng && el.name === eng.custom.name) return;
        if (noVariantOnly && !el.classList.contains("no_variant")) return;
        var v = parseInt(el.value, 10);
        if (v) ids.push(v);
      });
    if (eng) {
      var pick = named ? eng.custom : eng.plain;
      if (pick) ids.push(parseInt(pick.value, 10));
    }
    return ids;
  }

  function initEngraveCharge(box, o, odoo, base) {
    var eng = engraveAttr(odoo);
    var input = $("[data-engrave]", box);
    var hint = $(".engrave-box label .hint", box);
    var amount = $("[data-price]", box);
    var extra = 0;
    var ask = function (named) {
      return rpc("/website_sale/get_combination_info", {
        product_template_id: o.tmpl, product_id: false, add_qty: 1, parent_combination: [],
        combination: chosenValues(odoo, eng, named, false)
      }).then(function (r) { return r && r.price; });
    };
    var show = function () {
      if (!amount || !base) return;
      var named = input && input.value.trim();
      amount.setAttribute("data-base", base + (named ? extra : 0));
      var addon = $("[data-addon]", box);
      if (addon) addon.dispatchEvent(new Event("change", { bubbles: true }));
      else amount.textContent = rupees(base + (named ? extra : 0));
    };
    Promise.all([ask(true), ask(false)]).then(function (p) {
      extra = p[0] && p[1] ? Math.max(0, p[0] - p[1]) : 0;
      if (hint) hint.textContent = extra ? "(+ " + rupees(extra) + ", up to 12 characters)" : "(free, up to 12 characters)";
      show();
    }).catch(function () {});
    if (input) input.addEventListener("input", show);
  }

  function strawProduct() {
    for (var i = 0; i < oList.length; i++) if (/\bstraw\b/i.test(oList[i].name)) return oList[i];
    return null;
  }

  // A product Odoo does not sell yet: our page, but nothing to buy
  function pdpComingSoon(box, id) {
    var row = $(".buy-row", box);
    if (row) {
      var p = null;
      for (var i = 0; i < catalog.length; i++) if (catalog[i].id === id) p = catalog[i];
      var text = "Hi Urban Kalakari, when will the " + (p ? p.name : id) + " be available?";
      row.innerHTML = '<button class="btn btn-ghost" type="button" disabled>Coming soon</button>' +
        '<a class="btn btn-accent" target="_blank" rel="noopener" href="https://wa.me/' + CFG.phone +
        "?text=" + encodeURIComponent(text) + '">Ask on WhatsApp</a>';
    }
    $$(".engrave-box, .addon-box", box).forEach(function (el) { el.hidden = true; });
  }

  function qty(box) {
    var input = $("[data-qty-input]", box);
    return Math.max(1, Math.min(99, parseInt(input && input.value, 10) || 1));
  }

  function initPdpButtons(box) {
    box.addEventListener("click", function (e) {
      var q = e.target.closest("[data-qty]");
      if (q) {
        var input = $("[data-qty-input]", box);
        input.value = Math.max(1, Math.min(99, (parseInt(input.value, 10) || 1) + parseInt(q.getAttribute("data-qty"), 10)));
        return;
      }
      var add = e.target.closest(".buy-row [data-add]");
      if (!add) return;
      e.preventDefault();
      e.stopPropagation();
      pdpAdd(box, add, add.hasAttribute("data-buy-now"));
    }, true);
  }

  function pdpAdd(box, btn, buyNow) {
    var tmpl = parseInt(box.getAttribute("data-uk-odoo"), 10);
    var o = null;
    for (var id in oById) if (oById[id].tmpl === tmpl) o = oById[id];
    if (!o) return;
    var odoo = $("#product_details");
    var n = qty(box);
    var name = (($("[data-engrave]", box) || {}).value || "").trim();
    var eng = odoo && engraveAttr(odoo);
    var strawBox = $("[data-addon]", box);
    var withStraw = strawBox && strawBox.checked && strawProduct();
    var done = function () {
      if (withStraw) {
        var s = strawProduct();
        return rpc("/shop/cart/add", { product_template_id: s.tmpl, product_id: s.pid, quantity: n })
          .then(function (res) { if (res && typeof res.cart_quantity === "number") setCartCount(res.cart_quantity); });
      }
    };
    var after = function () {
      if (buyNow) { location.href = "/shop/cart"; return; }
      btn.disabled = false;
      toast("Added to cart.");
    };
    btn.disabled = true;
    var params = { product_template_id: o.tmpl, product_id: o.pid, quantity: n };
    if (eng) {
      // the name goes on the order line as Odoo's own free-text value
      params.no_variant_attribute_value_ids = chosenValues(odoo, eng, !!name, true);
      params.product_custom_attribute_values = name
        ? [{ custom_product_template_attribute_value_id: parseInt(eng.custom.value, 10), custom_value: name }]
        : [];
    }
    rpc("/shop/cart/add", params)
      .then(function (res) {
        if (res && typeof res.cart_quantity === "number") setCartCount(res.cart_quantity);
        if (res && res.quantity === 0) { btn.disabled = false; toast("That one is sold out."); return; }
        return Promise.resolve(done()).then(after, after);
      })
      .catch(function () { btn.disabled = false; toast("That did not go through. Please try again."); });
  }

  /* ---------- Odoo's own pages, under our page head ----------
     Login, sign-up, cart, wishlist, checkout and the customer's account stay
     Odoo's: that is where accounts, orders and payments are. They get our
     crumbs + big title above them, and uk.css restyles what Odoo draws. */
  var ODOO_PAGES = [
    [/^\/web\/login\/?$/, "Account", "Login or sign up", "An account is required to place an order, it is how you track it afterwards."],
    [/^\/web\/signup\/?$/, "Account", "Create your account", "It takes a minute. Your orders and your wishlist stay with it."],
    [/^\/web\/reset_password\/?$/, "Account", "Reset your password", ""],
    [/^\/shop\/cart\/?$/, "Cart", "Your cart", ""],
    [/^\/shop\/wishlist\/?$/, "Wishlist", "Your wishlist", ""],
    [/^\/shop\/(checkout|address)\/?$/, "Checkout", "Checkout", ""],
    [/^\/shop\/(payment|extra_info)\/?$/, "Checkout", "Payment", ""],
    [/^\/shop\/confirmation\/?$/, "Order", "Thank you for your order", ""],
    [/^\/my\/?$/, "Account", "My account", ""],
    [/^\/my\/(orders|invoices|account|security)/, "Account", "My account", ""]
  ];

  function odooHead() {
    var path = location.pathname;
    for (var i = 0; i < ODOO_PAGES.length; i++) {
      var row = ODOO_PAGES[i];
      if (!row[0].test(path)) continue;
      var box = document.createElement("div");
      box.className = "uk uk-odoo-head";
      box.innerHTML = '<div class="wrap page-head"><p class="crumbs"><a href="/">Home</a> / ' + esc(row[1]) +
        "</p><h1>" + esc(row[2]) + "</h1>" + (row[3] ? '<p class="lede">' + esc(row[3]) + "</p>" : "") + "</div>";
      var wrap = $("#wrap") || $("main");
      if (!wrap) return;
      wrap.insertBefore(box, wrap.firstChild);
      document.documentElement.classList.add("uk-odoo-page");
      return;
    }
  }

  /* ---------- cart and checkout totals ----------
     Odoo shows "-" for delivery until a method is picked, and no tax line when
     prices already include GST. The founders want "Free" and a GST line. Odoo
     redraws the summary on every quantity change, so this re-runs on change. */
  function cartTotals() {
    var free = CFG.freeMin || 0;
    $$('table[name="cart_total_table"]').forEach(function (table) {
      var total = odooNum($('tr[name="o_order_total"] .oe_currency_value', table));
      var row = $('tr[name="o_order_delivery"]', table);
      if (row) {
        var dash = $('[name="o_message_no_dm_set"]', row);
        var money = $(".monetary_field", row);
        var picked = !dash || dash.classList.contains("d-none");
        var charge = odooNum(money && $(".oe_currency_value", money));
        var label = $(".uk-delivery", row);
        if (!label) {
          label = document.createElement("span");
          label.className = "uk-delivery";
          (money || dash).parentNode.appendChild(label);
        }
        var text = picked ? (charge ? "" : "Free") : (total >= free ? "Free" : "Added at checkout");
        if (label.textContent !== text) label.textContent = text;
        row.classList.toggle("uk-delivery-on", !!text);
      }
      var last = $('tr[name="o_order_total"]', table);
      if (last && !$(".uk-gst", table)) {
        var tr = document.createElement("tr");
        tr.className = "uk-gst";
        tr.innerHTML = '<td colspan="3" class="border-0 ps-0 pe-0 pt-0 pb-2 text-muted small text-end">All prices include GST</td>';
        last.parentNode.insertBefore(tr, last.nextSibling);
      }
    });
  }

  function initCartTotals() {
    if (!/^\/shop\/(cart|checkout|address|payment|confirmation|extra_info)\/?$/.test(location.pathname)) return;
    cartTotals();
    var busy = false;
    new MutationObserver(function () {
      if (busy) return;
      busy = true;
      requestAnimationFrame(function () { cartTotals(); busy = false; });
    }).observe(document.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["class"] });
  }

  /* ---------- boot ---------- */

  function boot() {
    if (window.__ukBooted) return;
    window.__ukBooted = true;
    var html = document.documentElement;
    if (!editing()) { injectChrome(); odooHead(); }
    markShop();
    fixLinks();
    $$(".uk [data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    initOdooForms(); initCardClicks(); initCartTotals();
    // search reads `catalog` each time it renders, so it can open before the
    // catalogue lands; until then it offers nothing rather than failing
    if ($("#search-dialog")) initSearch();
    initDrawer();

    var ours = loadCatalog().catch(function () { return []; });
    var theirs = odooProducts().then(function (list) { oLoaded = list.length > 0; return list; })
                               .catch(function () { return []; });
    var matched = Promise.all([ours, theirs]).then(function (both) {
      oList = both[1];
      if (both[0].length && both[1].length) oById = matchProducts(both[0], both[1]);
      catalog = overlayOdoo(both[0]);
    });

    var own = editing() ? null : ownPage();
    var tmpl = editing() ? 0 : odooProductPage();
    var drawn;
    if (own && own.kind === "c") {
      drawn = fragment("c/" + own.id + ".html").then(function (h) {
        mount(h);
        html.classList.add("uk-own");
        var h1 = $(".uk-drawn h1");
        if (h1) title(h1.textContent.trim());
      });
    } else if (own && own.kind === "p") {
      var page = fragment("p/" + own.id + ".html");
      drawn = matched.then(function () {
        var o = oById[own.id];
        if (o) { location.replace(o.url); return new Promise(function () {}); }
        return page.then(function (h) {
          var box = mount(h);
          html.classList.add("uk-own");
          pdpComingSoon(box, own.id);
          var h1 = $("h1", box);
          if (h1) title(h1.textContent.trim());
          initProduct();
        });
      });
    } else if (tmpl) {
      drawn = matched.then(function () {
        var id = ourIdFor(tmpl);
        if (!id) throw new Error("not one of ours");
        return fragment("p/" + id + ".html").then(function (h) {
          var box = mount(h);
          html.classList.add("uk-pdp-on");
          pdpFromOdoo(box, oById[id]);
          initPdpButtons(box);
          initProduct();
        });
      });
    } else {
      drawn = Promise.resolve();
    }

    drawn.catch(function () { /* fall back to Odoo's own page */ }).then(function () {
      unwait();
      initCarousel(); initOffer(); initSwipe(); initInviewPlay(); initRails(); initVideos();
      initShop();
      return matched;
    }).then(function () {
      wireCards();
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
