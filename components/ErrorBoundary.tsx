import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  errorStr: string;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    errorStr: ""
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, errorStr: error.toString() };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: '20px', background: 'red', color: 'white', zIndex: 9999, position: 'absolute' }}>
          <h1>Something went wrong.</h1>
          <pre>{this.state.errorStr}</pre>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
