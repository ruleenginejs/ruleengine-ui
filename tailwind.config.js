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
        "9sp": ['0.5625rem', { lineHeight: '0.9rem' }],
        "11sp": ['0.6875rem', { lineHeight: '1rem' }],
        "13sp": ['0.8125rem', { lineHeight: '1.1375rem' }],
      },
      opacity: {
        38: '0.38',
      },
      borderRadius: {
        "3sp": '0.1875rem'
      },
      spacing: {
        "7sp": '0.4375rem',
        "9sp": '0.5625rem',
        "21sp": '1.3125rem',
        "35sp": '2.1875rem',
        "38sp": '2.375rem',
        "120sp": '7.5rem'
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
