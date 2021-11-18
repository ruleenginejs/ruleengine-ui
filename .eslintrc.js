module.exports = {
  env: {
    node: true,
    browser: true,
    'vue/setup-compiler-macros': true
  },
  extends: [
    "plugin:vue/vue3-strongly-recommended",
    "eslint:recommended"
  ],
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "error" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "error" : "off",
    "quotes": "off",
    "semi": "off",
    "space-before-function-paren": ["error", {
      "anonymous": "always",
      "asyncArrow": "always",
      "named": "never"
    }],
    "standard/computed-property-even-spacing": "off",
    "vue/component-definition-name-casing": ["error", "kebab-case"],
    "vue/max-attributes-per-line": ["error", {
      "singleline": {
        "max": 5
      },
      "multiline": {
        "max": 1
      }
    }],
    "vue/html-self-closing": ["error", {
      "html": {
        "void": "always",
        "normal": "any",
        "component": "any"
      }
    }],
    "vue/singleline-html-element-content-newline": "off",
  }
}
