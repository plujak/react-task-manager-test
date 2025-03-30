/**
 * Jest configuration for the task manager app
 */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|tsx)$': [
      'ts-jest', 
      {
        tsconfig: 'tsconfig.json',
      }
    ],
    '^.+\\.(js|jsx)$': 'babel-jest',
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTestsJest.ts'],
  testMatch: ['**/__tests__/**/*.test.(ts|tsx|js|jsx)'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@testing-library)/',
  ],
}; 