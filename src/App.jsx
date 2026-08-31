import { useState } from 'react'
import { Button } from '@zendeskgarden/react-buttons'
import { ThemeProvider, DEFAULT_THEME } from '@zendeskgarden/react-theming'
import { Alert } from '@zendeskgarden/react-notifications'
import './App.css'

const SCREENS = {
  logo: { label: 'Standard · logo', client: 'Acme Analytics', company: 'Acme, Inc.', description: 'Connect Zendesk data to your Acme Analytics workspace.', logo: 'A' },
  noLogo: { label: 'Standard · no logo', client: 'Customer Health Dashboard', company: 'Northstar Labs', description: 'Show your support trends and customer health in one place.' },
  agent: { label: 'External AI agent', client: 'Claude for Zendesk', company: 'Anthropic', description: 'An external AI agent is asking to act on your behalf.', agent: true, logo: 'C' },
  error: { label: 'Broken link', error: true },
}

const permissions = [
  { title: 'Read all data', detail: 'This access is broad. It includes every resource that has a read permission.', risk: 'broad' },
  { title: 'View tickets', detail: 'Includes ticket fields, comments, attachments, and ticket history.' },
  { title: 'View users and organizations', detail: 'Includes customer and organization details.' },
  { title: 'View business rules', detail: 'Includes triggers, automations, and macros.' },
]

function PrototypeBar({ screen, setScreen }) {
  return <header className="prototype-bar">
    <span>OAuth consent screen · prototype</span>
    <label>View
      <select value={screen} onChange={(event) => setScreen(event.target.value)}>
        {Object.entries(SCREENS).map(([key, item]) => <option key={key} value={key}>{item.label}</option>)}
      </select>
    </label>
  </header>
}

function ErrorScreen() {
  return <main className="page"><section className="error-card">
    <div className="error-mark">!</div>
    <h1>This link can’t be used</h1>
    <p>It may be broken or expired. Go back to the app that sent you here and try again. If that does not work, contact the person or team who gave you the link.</p>
    <Button isPrimary className="return-button" onClick={() => window.location.reload()}>Go back</Button>
  </section></main>
}

function ConsentScreen({ data }) {
  const [outcome, setOutcome] = useState(null)
  if (outcome) return <main className="page"><section className="outcome-card">
    <div className={outcome === 'allowed' ? 'success-mark' : 'error-mark'}>{outcome === 'allowed' ? '✓' : '×'}</div>
    <h1>{outcome === 'allowed' ? 'Access allowed' : 'Access denied'}</h1>
    <p>This is a prototype. No access was granted or denied.</p>
    <Button className="return-button" onClick={() => setOutcome(null)}>Return to consent</Button>
  </section></main>

  return <main className="page"><section className="consent-card" aria-label="OAuth consent">
    <div className="account-chip">acme.zendesk.com</div>
    <div className="identity">
      {data.logo ? <div className={`app-logo ${data.agent ? 'agent-logo' : ''}`}>{data.logo}</div> : <div className="app-logo-placeholder" aria-hidden="true" />}
      <div><p className="app-name">{data.client}</p><p className="app-company">by {data.company}</p></div>
    </div>
    {data.agent && <Alert type="info" className="agent-notice">An external AI agent is asking for this access.</Alert>}
    <h1>Allow {data.client} to access your Zendesk account?</h1>
    <p className="description">{data.description}</p>
    <div className="account-line"><strong>Account:</strong> acme.zendesk.com <span>·</span> Signed in as caroline@acme.com</div>
    <div className="divider" />
    <h2>This application would be able to:</h2>
    <ul className="permissions">
      {permissions.map((permission) => <li className={permission.risk ? `permission ${permission.risk}` : 'permission'} key={permission.title}>
        <span className="permission-icon">{permission.risk ? '!' : '✓'}</span>
        <div><strong>{permission.title}</strong><p>{permission.detail}</p></div>
      </li>)}
    </ul>
    <div className="duration"><strong>Access lasts until you or an admin revokes it, or until the token expires.</strong><br />You can revoke access at any time under your profile settings.</div>
    <div className="actions">
      <Button className="deny-button" onClick={() => setOutcome('denied')}>Deny</Button>
      <Button isPrimary className="allow-button" onClick={() => setOutcome('allowed')}>Allow</Button>
    </div>
    <button type="button" className="not-you">Not caroline@acme.com?</button>
  </section></main>
}

function App() {
  const [screen, setScreen] = useState('logo')
  const data = SCREENS[screen]
  return <ThemeProvider theme={DEFAULT_THEME}>
    <PrototypeBar screen={screen} setScreen={setScreen} />
    {data.error ? <ErrorScreen /> : <ConsentScreen data={data} />}
  </ThemeProvider>
}

export default App
