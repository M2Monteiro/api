/** @type {import('ts-jest').JestConfigWithTsJest} */

const { resolve } = require("path");
const root = resolve(__dirname);

module.exports = {
  rootDir: root,
  displayName: "root-tests",
  testMatch: ["<rootDir>/test/**/*.test.ts"],
  testEnvironment: "node",
  clearMocks: true,
  preset: "ts-jest",
  moduleNameMapper: {
    "^@src/(.*)$": "<rootDir>/src/$1",
    "^@services/(.*)$": "<rootDir>/src/services/$1",
    "^@utils/(.*)$": "<rootDir>/src/utils/$1",
    "^@controller/(.*)$": "<rootDir>/src/controller/$1",
    "^@middleware/(.*)$": "<rootDir>/src/middleware/$1",
    "^@repositories/(.*)$": "<rootDir>/src/repositories/$1",
    "^@router/(.*)$": "<rootDir>/src/router/$1",
    "^@container/(.*)$": "<rootDir>/src/container/$1",
    "^@config/(.*)$": "<rootDir>/config/$1",
    "^@database/(.*)$": "<rootDir>/src/database/$1",
    "^@entities/(.*)$": "<rootDir>/src/entities/$1",
  },
};
