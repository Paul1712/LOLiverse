// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: ["expo", "prettier", "react", "react-hooks"],
  plugins: ["prettier"],
  ignorePatterns: ["/dist/*"],
  rules: {
    "prettier/prettier": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/prop-types": "off",
    "react/jsx-filename-extension": "off",
  },
};
