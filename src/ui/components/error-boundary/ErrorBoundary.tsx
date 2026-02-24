import React, { type ReactNode } from 'react';
import { logger } from '../../../util/logger';
import { ErrorScreen } from './ErrorScreen';

type State = {
  hasError: boolean;
};

type Props = {
  children: ReactNode;
};

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    logger.error('Unhandled error', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <ErrorScreen />;
    }

    return this.props.children;
  }
}
