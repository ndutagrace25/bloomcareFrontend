import React, { Component } from "react";

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ error: error,
        errorInfo: errorInfo });
    // logErrorToMyService()
  }

  render() {
    if (this.state.errorInfo) return <div>Error!</div>;
    return this.props.children;
  }
}

export default ErrorBoundary;
