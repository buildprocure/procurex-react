import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LoginPage } from './auth/LoginPage.jsx'
import { checkAuth } from './auth/auth'

checkAuth().then((user) => {
  if (!user) {
    createRoot(document.getElementById('root')).render(<LoginPage />);
    return 
  }    
    
  createRoot(document.getElementById('root')).render(<App user={user} />)
})
