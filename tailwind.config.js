module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "input-placeholder-foreground": "var(--input-placeholder-foreground)",
        "input-background": "var(--input-background)",
        "input-foreground": "var(--input-foreground)",

        "focus-border": "var(--focus-border)",
        "window-background": "var(--window-background)",
        "foreground": "var(--foreground)"
      },
      outline: {
        blue: ['1px solid var(--focus-border)', '-1px'],
      },
      fontSize: {
        xs: ['0.6875rem', { lineHeight: '1rem' }],
        sm: ['0.8125rem', { lineHeight: '1.1375rem' }]
      },
      opacity: {
        38: '0.38',
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"]
    }
  },
  plugins: []
}
