// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require("eslint/config");
const expoConfig = require("eslint-config-expo/flat");
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");
const pluginQuery = require("@tanstack/eslint-plugin-query");

module.exports = defineConfig([
  expoConfig,
  ...pluginQuery.configs["flat/recommended"],
  eslintPluginPrettierRecommended,
  {
    rules: {
      "@typescript-eslint/consistent-type-imports": "error",
    },
  },
  {
    ignores: ["dist/*", ".expo/*", "node_modules/*"],
  },
]);
