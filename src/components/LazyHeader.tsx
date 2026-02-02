import React from 'react';
import { Header } from './Header';

// Note: Removed lazy loading as it was causing context issues with SwellAuthProvider
// The Header component needs to be rendered synchronously to access the auth context properly
export const LazyHeader = () => {
  return <Header />;
};
