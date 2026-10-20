import { Component, type ErrorInfo, type ReactNode } from 'react';
import { SceneFallback } from './SceneFallback';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GalaxyErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.warn('[GalaxySubsystem ErrorBoundary Caught]:', error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }
      return (
        <SceneFallback
          reason="error"
          onRetry={this.handleRetry}
        />
      );
    }

    return this.props.children;
  }
}

export default GalaxyErrorBoundary;
