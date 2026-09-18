// Helpers for reading the pages_excluded / buttons_excluded lists that
// useAccessControl() exposes. Not wired into any page yet - use these once
// a page needs to hide a route it can't open directly, or an action button
// the current user isn't allowed to use (see AccessControlResponse on the
// backend for what populates these lists).
export function isPageExcluded(pagesExcluded, path) {
  return pagesExcluded.includes(path)
}

export function isButtonExcluded(buttonsExcluded, buttonId) {
  return buttonsExcluded.includes(buttonId)
}
