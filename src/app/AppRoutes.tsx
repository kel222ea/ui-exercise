import * as React from 'react';
import { Route, Routes } from 'react-router-dom';
import { AdditionalPackages } from '../components/AdditionalPackages';
import { SemanticUIDemo } from '../components/SemanticUIDemo/SemanticUIDemo';
import { CodeComparisonTest } from '../components/SemanticUIDemo/CodeComparisonTest';

export const AppRoutes: React.FunctionComponent = () => (
  <Routes>
    <Route path="/" element={<AdditionalPackages />} />
    <Route path="/packages-and-repositories-demo" element={<AdditionalPackages />} />
    <Route path="/code-comparison-test" element={<CodeComparisonTest />} />
    <Route path="/semantic-ui-demo" element={<SemanticUIDemo />} />
  </Routes>
);