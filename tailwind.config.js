module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "window-background": "var(--window-background)",
        "foreground": "var(--foreground)",
        "focus-border": "var(--focus-border)",

        "input-placeholder-foreground": "var(--input-placeholder-foreground)",
        "input-background": "var(--input-background)",
        "input-foreground": "var(--input-foreground)",

        "action-bar-background": "var(--action-bar-background)",
        "action-bar-border": "var(--action-bar-border)",
        "action-bar-active-background": "var(--action-bar-active-background)",
        "action-bar-active-foreground": "var(--action-bar-active-foreground)",
        "action-bar-inactive-background": "var(--action-bar-inactive-background)",
        "action-bar-inactive-foreground": "var(--action-bar-inactive-foreground)",
        "action-bar-disabled-foreground": "var(--action-bar-disabled-foreground)",

        "tab-background": "var(--tab-background)",
        "tab-inactive-background": "var(--tab-inactive-background)",
        "tab-inactive-foreground": "var(--tab-inactive-foreground)",
        "tab-active-background": "var(--tab-active-background)",
        "tab-active-foreground": "var(--tab-active-foreground)",
        "tab-border": "var(--tab-border)",
        "tab-scroll-hover-foreground": "var(--tab-scroll-hover-foreground)"
      },
      outline: {
        blue: ['1px solid var(--focus-border)', '-1px'],
      },
      fontSize: {
        xxs: ['0.5625rem', { lineHeight: '0.9rem' }],
        xs: ['0.6875rem', { lineHeight: '1rem' }],
        sm: ['0.8125rem', { lineHeight: '1.1375rem' }]
      },
      opacity: {
        38: '0.38',
      },
      borderRadius: {
        3: '0.1875rem'
      },
      spacing: {
        1.6: '0.4375rem',
        2.1: '0.5625rem',
        5.1: '1.3125rem',
        8.7: '2.1875rem',
        9.1: '2.375rem',
        28.5: '7.5rem'
      },
      minWidth: {
        fit: "fit-content"
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
