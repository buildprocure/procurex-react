import { PublicClientApplication } from '@azure/msal-browser'
import { msalConfig } from './msalConfig'

export const msalClient = new PublicClientApplication(msalConfig)

let initialized = false

// Must run once, before any other MSAL API call (including
// handleRedirectPromise) - required by msal-browser.
export async function ensureMsalInitialized() {
  if (!initialized) {
    await msalClient.initialize()
    initialized = true
  }
}
