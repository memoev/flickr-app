module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  roots: ["<rootDir>/tests"],
  modulePaths: ["<rootDir>/tests"],
  testMatch: ["**/*.spec.ts"], // Adjust this pattern as needed
};
