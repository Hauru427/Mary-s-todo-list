module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  reporters: ["default", ["jest-junit", { outputDirectory: "tmp", outputName: "result.xml", classNameTemplate: "{filepath}" }]],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/app/javascript/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/app/javascript/setupTests.js'],
};
