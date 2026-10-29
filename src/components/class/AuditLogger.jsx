import { Component } from 'react'

class AuditLogger extends Component {
  constructor(props) {
    super(props)
    this.state = {
      logs: [],
      toast: '',
    }
    this.timer = null
    this.handleStorage = this.handleStorage.bind(this)
    this.clearLogs = this.clearLogs.bind(this)
  }

  componentDidMount() {
    const saved = localStorage.getItem('auditLogs')
    if (saved) {
      this.setState({ logs: JSON.parse(saved) })
    }
    window.addEventListener('storage', this.handleStorage)
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.action !== this.props.action && this.props.action) {
      const newLog = {
        id: this.props.action.id,
        text: this.props.action.text,
        time: new Date().toLocaleTimeString(),
      }
      this.setState({
        logs: [newLog, ...this.state.logs],
        toast: this.props.action.text,
      })
    }

    if (prevState.logs !== this.state.logs) {
      localStorage.setItem('auditLogs', JSON.stringify(this.state.logs))
    }

    if (prevState.toast !== this.state.toast && this.state.toast) {
      clearTimeout(this.timer)
      this.timer = setTimeout(() => {
        this.setState({ toast: '' })
      }, 2500)
    }
  }

  componentWillUnmount() {
    clearTimeout(this.timer)
    window.removeEventListener('storage', this.handleStorage)
  }

  handleStorage(e) {
    if (e.key === 'auditLogs' && e.newValue) {
      this.setState({ logs: JSON.parse(e.newValue) })
    }
  }

  clearLogs() {
    this.setState({ logs: [] })
  }

  render() {
    const { logs, toast } = this.state

    return (
      <div className="card">
        <div className="row">
          <h3>Audit Log</h3>
          {logs.length > 0 && (
            <button onClick={this.clearLogs}>Clear</button>
          )}
        </div>
        {logs.length === 0 ? (
          <p className="empty">No activity yet.</p>
        ) : (
          <ul className="logs">
            {logs.map((log) => (
              <li key={log.id}>
                <span>{log.text}</span>
                <span className="time">{log.time}</span>
              </li>
            ))}
          </ul>
        )}
        {toast && <div className="toast">{toast}</div>}
      </div>
    )
  }
}

export default AuditLogger
