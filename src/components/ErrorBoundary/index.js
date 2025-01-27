import {Component} from 'react'

class ErrorBoundary extends Component {
  state = {hasError: false, errorMessage: ''}

  static getDerivedStateFromError(error) {
    return {hasError: true, errorMessage: error.message}
  }

  componentDidCatch(error, info) {
    console.error('Error caught by ErrorBoundary:', error, info)
  }

  render() {
    const {hasError, errorMessage} = this.state
    const {children} = this.props
    if (hasError) {
      return (
        <div className="error-message">
          Something went wrong: {errorMessage}
        </div>
      )
    }

    return children
  }
}

export default ErrorBoundary
