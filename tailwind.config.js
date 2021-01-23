module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "window-background": "var(--window-background)",
        "foreground": "var(--foreground)",
        "focus-border": "var(--focus-border)",
        "scroll-hover-foreground": "var(--scroll-hover-foreground)",

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

        "side-bar-background": "var(--side-bar-background)",
        "side-bar-section-header-border": "var(--side-bar-section-header-border)",
        "side-bar-title-foreground": "var(--side-bar-title-foreground)",
        "side-bar-border": "var(--side-bar-border)",

        "list-hover-background": "var(--list-hover-background)",
        "list-active-selection-background": "var(--list-active-selection-background)",
        "list-active-selection-foreground": "var(--list-active-selection-foreground)",
        "list-inactive-selection-background": "var(--list-inactive-selection-background)",
        "list-inactive-foreground": "var(--list-inactive-foreground)",

        "graph-background": "var(--graph-background)",
        "graph-foreground": "var(--graph-foreground)",
        "graph-round-border": "var(--graph-round-border)",
        "graph-error-background": "var(--graph-error-background)",
        "graph-node-background": "var(--graph-node-background)",
        "graph-node-header-background": "var(--graph-node-header-background)",
        "graph-node-header-blue-background": "var(--graph-node-header-blue-background)",
        "graph-node-header-green-background": "var(--graph-node-header-green-background)",
        "graph-node-border": "var(--graph-node-border)",
        "graph-active-port-backgound": "var(--graph-active-port-backgound)",
        "graph-inactive-port-backgound": "var(--graph-inactive-port-backgound)",
        "graph-inactive-port-border": "var(--graph-inactive-port-border)",
        "graph-link-active-port-backgound": "var(--graph-link-active-port-backgound)",
        "graph-connection-background": "var(--graph-connection-background)",

        "link-control-backgound": "var(--link-control-backgound)"
      },
      outline: {
        blue: ['1px solid var(--focus-border)', '-1px'],
      },
      fontSize: {
        "8sp": ['0.5rem', { lineHeight: '0.85rem' }],
        "9sp": ['0.5625rem', { lineHeight: '0.9rem' }],
        "10sp": ['0.625rem', { lineHeight: '0.95rem' }],
        "11sp": ['0.6875rem', { lineHeight: '1rem' }],
        "12sp": ['0.75rem', { lineHeight: '1.0687rem' }],
        "13sp": ['0.8125rem', { lineHeight: '1.1375rem' }],
        "15sp": ['0.9375rem'],
        "18sp": ['1.125rem'],
      },
      opacity: {
        38: '0.38',
      },
      borderRadius: {
        "3sp": '0.1875rem',
        "5sp": '0.3125rem'
      },
      spacing: {
        "2sp": '0.125rem',
        "3sp": '0.1875rem',
        "5sp": '0.3125rem',
        "7sp": '0.4375rem',
        "9sp": '0.5625rem',
        "11sp": '0.6875rem',
        "21sp": '1.3125rem',
        "22sp": '1.375rem',
        "30sp": '1.875rem',
        "33sp": '2.0625rem',
        "35sp": '2.1875rem',
        "38sp": '2.375rem',
        "120sp": '7.5rem',
        "180sp": "11.25rem",
        "210sp": "13.125rem"
      },
      minWidth: {
        fit: "fit-content"
      },
      minHeight: {
        fit: "fit-content",
        "210sp": "13.125rem"
      },
      transitionProperty: {
        height: 'height',
      },
      transformOrigin: {
        "center-left": 'center left'
      },
      cursor: {
        'col-resize': 'col-resize',
        'row-resize': 'row-resize'
      },
      borderWidth: {
        3: '3px',
      },
      lineHeight: {
        "30sp": "1.875rem"
      },
      boxShadow: {
        "0-2-4": '0 2px 4px 0 var(--shadow-50)',
        "0-1-2": '0 1px 2px 0 var(--shadow-30)',
        "0-0-2": '0 0 2px 0 var(--shadow-100)',
      },
      zIndex: {
        9999: '9999',
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
