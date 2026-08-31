import { useState } from 'react'
import { Anchor, Button } from '@zendeskgarden/react-buttons'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Alert } from '@zendeskgarden/react-notifications'
import { MD, SM, XXL } from '@zendeskgarden/react-typography'
import { FLORA_THEME } from './flora/theme'
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
  return (
    <header className="prototype-bar">
      <span>OAuth consent screen · prototype</span>
      <label>
        View
        <select value={screen} onChange={(event) => setScreen(event.target.value)}>
          {Object.entries(SCREENS).map(([key, item]) => (
            <option key={key} value={key}>{item.label}</option>
          ))}
        </select>
      </label>
    </header>
  )
}

function ErrorScreen() {
  return (
    <main className="page">
      <section className="error-card">
        <div className="error-mark">!</div>
        <XXL tag="h1" isBold>This link can’t be used</XXL>
        <MD>
          It may be broken or expired. Go back to the app that sent you here and try again. If that does not work, contact the person or team who gave you the link.
        </MD>
        <Button isPrimary isStretched onClick={() => window.location.reload()}>Go back</Button>
      </section>
    </main>
  )
}

function ConsentScreen({ data }) {
  const [outcome, setOutcome] = useState(null)

  if (outcome) {
    return (
      <main className="page">
        <section className="outcome-card">
          <div className={outcome === 'allowed' ? 'success-mark' : 'error-mark'}>
            {outcome === 'allowed' ? '✓' : '×'}
          </div>
          <XXL tag="h1" isBold>{outcome === 'allowed' ? 'Access allowed' : 'Access denied'}</XXL>
          <MD>This is a prototype. No access was granted or denied.</MD>
          <Button isStretched onClick={() => setOutcome(null)}>Return to consent</Button>
        </section>
      </main>
    )
  }

  return (
    <main className="page">
      <section className="consent-card" aria-label="OAuth consent">
        <div className="account-chip">acme.zendesk.com</div>
        <div className="identity">
          {data.logo
            ? <div className={`app-logo ${data.agent ? 'agent-logo' : ''}`}>{data.logo}</div>
            : <div className="app-logo-placeholder" aria-hidden="true" />}
          <div>
            <MD isBold>{data.client}</MD>
            <SM className="muted">by {data.company}</SM>
          </div>
        </div>
        {data.agent && (
          <Alert type="info" className="agent-notice">
            An external AI agent is asking for this access.
          </Alert>
        )}
        <XXL tag="h1" isBold>Allow {data.client} to access your Zendesk account?</XXL>
        <MD className="description">{data.description}</MD>
        <div className="account-line">
          <MD><strong>Account:</strong> acme.zendesk.com · Signed in as caroline@acme.com</MD>
        </div>
        <div className="divider" />
        <MD isBold tag="h2">This application would be able to:</MD>
        <ul className="permissions">
          {permissions.map((permission) => (
            <li className={permission.risk ? `permission ${permission.risk}` : 'permission'} key={permission.title}>
              <span className="permission-icon">{permission.risk ? '!' : '✓'}</span>
              <div>
                <MD isBold>{permission.title}</MD>
                <SM className="muted">{permission.detail}</SM>
              </div>
            </li>
          ))}
        </ul>
        <div className="duration">
          <MD>
            <strong>Access lasts until you or an admin revokes it, or until the token expires.</strong>
            {' '}You can revoke access at any time under your profile settings.
          </MD>
        </div>
        <div className="actions">
          <Button isStretched onClick={() => setOutcome('denied')}>Deny</Button>
          <Button isPrimary isStretched onClick={() => setOutcome('allowed')}>Allow</Button>
        </div>
        <Anchor href="#not-you" className="not-you">Not caroline@acme.com?</Anchor>
      </section>
    </main>
  )
}

function App() {
  const [screen, setScreen] = useState('logo')
  const data = SCREENS[screen]
  return (
    <ThemeProvider theme={FLORA_THEME}>
      <PrototypeBar screen={screen} setScreen={setScreen} />
      {data.error ? <ErrorScreen /> : <ConsentScreen data={data} />}
    </ThemeProvider>
  )
}

export default App
