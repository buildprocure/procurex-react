import { callApi } from '../../auth/apiClient'

// GET /api/access-control/{userId}. {userId} is the logged-in user's email
// for now, URL-encoded - the backend doesn't have a real user id yet (see
// AccessControlController on the backend for the same note).
export function fetchAccessControl(userId="sam.supplier@buildprocure.com") {
  return callApi(`/access-control/${encodeURIComponent(userId)}`)
}
