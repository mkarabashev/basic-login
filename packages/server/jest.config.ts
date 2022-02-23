import { Config } from '@jest/types'

const config: Config.InitialOptions = {
    preset: 'ts-jest',
    roots: ['<rootDir>/src'],
    testMatch: ['**/__tests__/**/*.test.ts'],
    testEnvironment: 'node',
    setupFiles: [
        '<rootDir>/src/__tests__/helpers/testSetup.ts',
    ],
    setupFilesAfterEnv: [
        '<rootDir>/src/__tests__/helpers/integrationTestSetup.ts',
    ]
}

export default config