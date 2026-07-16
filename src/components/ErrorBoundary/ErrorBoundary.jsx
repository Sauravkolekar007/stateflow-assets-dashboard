import { Component } from 'react'
import { FiRefreshCw, FiAlertTriangle } from 'react-icons/fi'

/**
 * Catches render-time errors in the component tree below it so one broken
 * card or widget can't take down the entire dashboard. This has to be a
 * class component — React does not yet expose an error-boundary hook.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // In production this is where you'd forward to an error-reporting
    // service (Sentry, LogRocket, etc).
    console.error('StateFlow crashed:', error, info)
  }

  handleReset = () => {
    this.setState({ hasError: false })
    window.location.href = '/'
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-6">
          <span className="w-14 h-14 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center mb-5">
            <FiAlertTriangle size={26} />
          </span>
          <h1 className="font-display font-bold text-xl mb-2">Something went wrong</h1>
          <p className="text-muted dark:text-muted-dark max-w-sm mb-6">
            An unexpected error occurred while rendering this page. Your favorites and
            settings are safe — they&rsquo;re saved in your browser.
          </p>
          <button
            onClick={this.handleReset}
            className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-accent text-white text-sm font-semibold hover:bg-accent-dark transition-colors"
          >
            <FiRefreshCw size={16} /> Reload dashboard
          </button>
        </div>
      )
    }

    return this.props.children
  }
}
