import React from 'react';

const TestError = () => {
  // Intentionally throw an error for testing
  throw new Error("This is a test error!");

  return <div>This will never render.</div>;
};

export default TestError;
