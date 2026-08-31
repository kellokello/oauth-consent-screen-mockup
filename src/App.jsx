import { useState } from 'react'
import { Anchor, Button } from '@zendeskgarden/react-buttons'
import { ThemeProvider } from '@zendeskgarden/react-theming'
import { Alert, Well } from '@zendeskgarden/react-notifications'
import { MD, XL } from '@zendeskgarden/react-typography'
import { FLORA_THEME } from './flora/theme'
import './App.css'

const SCREENS = {
  logo: { label: 'Standard · logo', client: 'Acme Analytics', company: 'Acme, Inc.', description: 'Connect Zendesk data to your Acme Analytics workspace.', logo: 'A' },
  noLogo: { label: 'Standard · no logo', client: 'Customer Health Dashboard', company: 'Northstar Labs', description: 'Show your support trends and customer health in one place.' },
  agent: { label: 'External AI agent', client: 'Claude for Zendesk', company: 'Anthropic', description: 'An external AI agent is asking to act on your behalf.', agent: true, logo: 'C' },
  error: { label: 'Broken link', error: true },
}

const permissions = [
  { title: 'Read all data', detail: 'This access is broad. It includes every resource that has a read permission.' },
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
      <Well className="auth-well">
        <XL tag="h1">This link can’t be used</XL>
        <MD>
          It may be broken or expired. Go back to the app that sent you here and try again. If that does not work, contact the person or team who gave you the link.
        </MD>
        <div className="actions">
          <Button isPrimary isStretched onClick={() => window.location.reload()}>Go back</Button>
        </div>
      </Well>
    </main>
  )
}

function ConsentScreen({ data }) {
  const [outcome, setOutcome] = useState(null)

  if (outcome) {
    return (
      <main className="page">
        <Well className="auth-well">
          <XL tag="h1">{outcome === 'allowed' ? 'Access allowed' : 'Access denied'}</XL>
          <MD>This is a prototype. No access was granted or denied.</MD>
          <div className="actions">
            <Button isStretched onClick={() => setOutcome(null)}>Return to consent</Button>
          </div>
        </Well>
      </main>
    )
  }

  return (
    <main className="page">
      <Well className={`auth-well${data.logo ? '' : ' no-logo'}`} aria-label="OAuth consent">
        <section className="section">
          <div className="identity">
            {data.logo && <div className={`app-logo ${data.agent ? 'agent-logo' : ''}`}>{data.logo}</div>}
            <div>
              <MD isBold>{data.client}</MD>
              <MD className="muted">by {data.company}</MD>
            </div>
          </div>
        </section>
        <section className="section">
          <XL tag="h1">Allow {data.client} to access your Zendesk account?</XL>
          <MD className="description">{data.description}</MD>
        </section>
        <section className="section">
          <MD>support.acme.com (acme.zendesk.com)</MD>
          <MD>Signed in as Caroline Kello (caroline@acme.com)</MD>
        </section>
        <section className="section">
          <hr className="auth-break" />
          {data.agent && (
            <Alert type="info" className="agent-notice">
              An external AI agent is asking for this access.
            </Alert>
          )}
          <MD isBold tag="h2">This application would be able to:</MD>
          <ul className="permissions">
            {permissions.map((permission) => (
              <li className="permission" key={permission.title}>
                <MD isBold>{permission.title}</MD>
                <MD className="muted permission-detail">{permission.detail}</MD>
              </li>
            ))}
          </ul>
        </section>
        <section className="section">
          <MD>Access lasts until you or an admin revokes it, or until the token expires.</MD>
          <Anchor className="duration-link" href="https://acme.zendesk.com/users/me">You can revoke access at any time under your profile settings.</Anchor>
          <div className="actions">
            <Button isStretched onClick={() => setOutcome('denied')}>Deny</Button>
            <Button isPrimary isStretched onClick={() => setOutcome('allowed')}>Allow</Button>
          </div>
          <div className="not-you">
            <MD>Not Caroline Kello? <Anchor href="#not-you">Sign in</Anchor> with a different account</MD>
          </div>
        </section>
      </Well>
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
