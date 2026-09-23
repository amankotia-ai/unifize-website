/* ============================================================================
 * sanitize.mjs - turn scraped Webflow rich text into markup we are willing to
 * render on the new site.
 *
 * Webflow bodies carry three kinds of problem:
 *   1. Tags that must never ship: <script>, <input>, and <style> blocks whose
 *      global .custom-table / :root rules collide across posts and clobber our
 *      design tokens. Dropped with their contents.
 *   2. Structural noise: the <html>/<head>/<body>/<div>/<span> wrappers Webflow
 *      leaves behind when someone pastes a whole HTML document into an embed.
 *      Unwrapped, keeping the children.
 *   3. Presentational attributes: class, id, style, data-*. Webflow writes
 *      id="" on nearly every element. All dropped; our CSS styles by context.
 *
 * What survives is a small semantic subset the site's own styles can own.
 * ========================================================================== */

import { parse } from "node-html-parser";

/* Tags we render. Everything else is either unwrapped or dropped. */
const ALLOW = new Set([
  "h2", "h3", "h4", "p", "ul", "ol", "li", "strong", "em", "b", "i",
  "a", "br", "blockquote", "figure", "figcaption", "img",
  "table", "thead", "tbody", "tr", "th", "td", "sup", "sub", "code", "pre",
]);

/* Dropped along with everything inside them. */
const DROP = new Set([
  "script", "style", "head", "meta", "link", "input", "iframe",
  "object", "embed", "noscript", "form", "button", "svg",
]);

/* Kept only for their children: the wrappers, never the wrapper itself. */
const UNWRAP = new Set([
  "html", "body", "div", "span", "section", "article", "main",
  "header", "footer", "details", "summary", "label", "font", "center",
]);

/* Attributes worth keeping, per tag. Everything else goes. */
const ATTRS = {
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height"],
  td: ["colspan", "rowspan"],
  th: ["colspan", "rowspan", "scope"],
};

const SITE = /^https?:\/\/(?:www\.)?unifize\.com/i;

function cleanAttributes(el) {
  const tag = el.tagName.toLowerCase();
  const keep = ATTRS[tag] ?? [];
  for (const name of Object.keys(el.attributes)) {
    if (!keep.includes(name)) el.removeAttribute(name);
  }
  /* Internal links become relative so they survive the domain move, and shed
   * the utm_* params authors paste in from other tools. */
  if (tag === "a") {
    let href = el.getAttribute("href");
    if (href && SITE.test(href)) {
      href = href.replace(SITE, "") || "/";
      const [path, query] = href.split("?");
      if (query) {
        const kept = query.split("&").filter((kv) => !/^utm_/i.test(kv));
        href = kept.length ? `${path}?${kept.join("&")}` : path;
      }
      el.setAttribute("href", href);
    }
    if (href && /^https?:/i.test(href) && !SITE.test(href)) {
      el.setAttribute("target", "_blank");
      el.setAttribute("rel", "noopener noreferrer");
    }
  }
}

function walk(node, report) {
  for (const child of [...node.childNodes]) {
    if (child.nodeType !== 1) continue; // text nodes pass through untouched
    const tag = child.tagName.toLowerCase();

    if (DROP.has(tag)) {
      report.dropped[tag] = (report.dropped[tag] ?? 0) + 1;
      child.remove();
      continue;
    }

    walk(child, report); // clean descendants before reshaping this node

    if (UNWRAP.has(tag)) {
      report.unwrapped[tag] = (report.unwrapped[tag] ?? 0) + 1;
      child.replaceWith(...child.childNodes);
      continue;
    }

    if (!ALLOW.has(tag)) {
      report.unwrapped[tag] = (report.unwrapped[tag] ?? 0) + 1;
      child.replaceWith(...child.childNodes);
      continue;
    }

    cleanAttributes(child);
  }
}

/* Webflow authors are inconsistent about whether a body leads with h2 or h3.
 * If nothing is an h2, promote every level up one so our styles get a stable
 * top level to work with. */
function normaliseHeadings(root, report) {
  if (root.querySelectorAll("h2").length) return;
  const levels = [3, 4, 5, 6];
  if (!levels.some((l) => root.querySelectorAll(`h${l}`).length)) return;
  for (const level of levels) {
    for (const el of root.querySelectorAll(`h${level}`)) {
      const el2 = parse(`<h${level - 1}>${el.innerHTML}</h${level - 1}>`).firstChild;
      el.replaceWith(el2);
    }
  }
  report.headingsPromoted = true;
}

/* Collapse the empty paragraphs Webflow leaves behind. */
function dropEmpties(root, report) {
  for (const el of root.querySelectorAll("p, li")) {
    const text = el.structuredText.replace(/ /g, " ").trim();
    if (!text && !el.querySelector("img")) {
      el.remove();
      report.emptiesRemoved += 1;
    }
  }
}

export function sanitize(html, { promoteHeadings = true } = {}) {
  const report = { dropped: {}, unwrapped: {}, emptiesRemoved: 0, headingsPromoted: false };
  if (!html) return { html: "", report };

  const root = parse(html, { blockTextElements: { script: false, style: false } });
  walk(root, report);
  dropEmpties(root, report);
  if (promoteHeadings) normaliseHeadings(root, report);

  const out = root
    .toString()
    .replace(/\s+/g, " ")
    .replace(/>\s+</g, "><")
    .replace(/<p><\/p>/g, "")
    .trim();

  return { html: out, report };
}

/* Tag vocabulary of a blob, for verifying that nothing unexpected survived. */
export function tagsOf(html) {
  return [...new Set(parse(html).querySelectorAll("*").map((e) => e.tagName.toLowerCase()))].sort();
}
