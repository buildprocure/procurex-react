import './LoginPage.css'
import { login } from './auth'

export function LoginPage() {
  return (
    <div className="login-page">
      <div className="login-card">
        <h1 className="login-logo">Build Procure</h1>
        <p className="login-subtitle">Admin Console</p>

        <button className="login-btn" onClick={login}>
          <svg width="18" height="18" viewBox="0 0 21 21" aria-hidden="true">
            <rect x="1" y="1" width="9" height="9" fill="#f25022" />
            <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
            <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
            <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
          </svg>
          Sign in with Microsoft
        </button>

        <p className="login-footer">Use your Buildprocure work account to continue</p>
      </div>
    </div>
  )
}