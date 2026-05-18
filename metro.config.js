const { getDefaultConfig } = require("expo/metro-config");
const { withNativewind } = require("nativewind/metro");
const path = require("path");

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

module.exports = withNativewind(config, {
  input: path.resolve(__dirname, "./global.css"),
  inlineVariables: false,
  globalClassNamePolyfill: false,
});
