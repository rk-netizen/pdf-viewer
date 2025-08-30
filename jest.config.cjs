module.exports = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
    moduleNameMapper: {
        "\\.(css)$": "identity-obj-proxy",
    },
};
