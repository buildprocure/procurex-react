// Same app registration used for the old backend-mediated flow - just with
// a "Single-page application" platform + redirect URI added in Entra
// admin center, alongside its existing Web platform.
export const msalConfig = {
  auth: {
    clientId: import.meta.env.VITE_AZURE_CLIENT_ID,
    authority: `https://login.microsoftonline.com/${import.meta.env.VITE_AZURE_TENANT_ID}`,
    redirectUri: window.location.origin,
    postLogoutRedirectUri: window.location.origin,
  },
  cache: {
    // sessionStorage (not localStorage) so a signed-in tab's MSAL cache
    // doesn't leak into every other tab/window on the same origin.
    cacheLocation: 'sessionStorage',
    storeAuthStateInCookie: false,
  },
}

// Only identity claims are needed here - no custom API scope, since the
// backend still mints and trusts its own auth_token JWT (see
// AuthController#msalLogin) rather than validating Microsoft's token on
// every request.
export const loginRequest = {
  scopes: ['openid', 'profile', 'email'],
}
