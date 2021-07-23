module.exports = {
  purge: false,
  darkMode: false,
  theme: {
    extend: {
      colors: {
        "window-background": "var(--v-window-background)",
        "foreground": "var(--v-foreground)",
        "background": "var(--v-background)",
        "focus-border": "var(--v-focus-border)",
        "scroll-hover-foreground": "var(--v-scroll-hover-foreground)",

        "input-placeholder-foreground": "var(--v-input-placeholder-foreground)",
        "input-background": "var(--v-input-background)",
        "input-foreground": "var(--v-input-foreground)",

        "action-bar-background": "var(--v-action-bar-background)",
        "action-bar-border": "var(--v-action-bar-border)",
        "action-bar-active-background": "var(--v-action-bar-active-background)",
        "action-bar-active-foreground": "var(--v-action-bar-active-foreground)",
        "action-bar-inactive-background": "var(--v-action-bar-inactive-background)",
        "action-bar-inactive-foreground": "var(--v-action-bar-inactive-foreground)",
        "action-bar-disabled-foreground": "var(--v-action-bar-disabled-foreground)",

        "tab-background": "var(--v-tab-background)",
        "tab-inactive-background": "var(--v-tab-inactive-background)",
        "tab-inactive-foreground": "var(--v-tab-inactive-foreground)",
        "tab-active-background": "var(--v-tab-active-background)",
        "tab-active-foreground": "var(--v-tab-active-foreground)",
        "tab-border": "var(--v-tab-border)",

        "side-bar-background": "var(--v-side-bar-background)",
        "side-bar-section-header-border": "var(--v-side-bar-section-header-border)",
        "side-bar-title-foreground": "var(--v-side-bar-title-foreground)",
        "side-bar-border": "var(--v-side-bar-border)",

        "list-active-selection-background": "var(--v-list-active-selection-background)",
        "list-active-selection-foreground": "var(--v-list-active-selection-foreground)",
        "list-inactive-selection-background": "var(--v-list-inactive-selection-background)",
        "list-inactive-foreground": "var(--v-list-inactive-foreground)",
        "list-hover-background": "var(--v-list-hover-background)",
        "list-focus-background": "var(--v-list-focus-background)",

        "graph-background": "var(--v-graph-background)",
        "graph-foreground": "var(--v-graph-foreground)",
        "graph-round-border": "var(--v-graph-round-border)",
        "graph-error-background": "var(--v-graph-error-background)",
        "graph-node-background": "var(--v-graph-node-background)",
        "graph-node-header-background": "var(--v-graph-node-header-background)",
        "graph-node-header-blue-background": "var(--v-graph-node-header-blue-background)",
        "graph-node-header-green-background": "var(--v-graph-node-header-green-background)",
        "graph-node-border": "var(--v-graph-node-border)",
        "graph-active-port-backgound": "var(--v-graph-active-port-backgound)",
        "graph-inactive-port-backgound": "var(--v-graph-inactive-port-backgound)",
        "graph-inactive-port-border": "var(--v-graph-inactive-port-border)",
        "graph-link-active-port-backgound": "var(--v-graph-link-active-port-backgound)",
        "graph-connection-background": "var(--v-graph-connection-background)",

        "link-control-backgound": "var(--v-link-control-backgound)",

        "fieldset-border": "var(--v-fieldset-border)",
        "fieldset-title-foreground": "var(--v-fieldset-title-foreground)",

        "button-foreground": "var(--v-button-foreground)",
        "button-background": "var(--v-button-background)",
        "button-hover-background": "var(--v-button-hover-background)",
        "button-secondary-foreground": "var(--v-button-secondary-foreground)",
        "button-secondary-background": "var(--v-button-secondary-background)",
        "button-secondary-hover-background": "var(--v-button-secondary-hover-background)",

        "dropdown-background": "var(--v-dropdown-background)",
        "dropdown-foreground": "var(--v-dropdown-foreground)",
        "dropdown-border": "var(--v-dropdown-border)",

        "suggest-background": "var(--v-suggest-background)",
        "suggest-border": "var(--v-suggest-border)",
        "suggest-foreground": "var(--v-suggest-foreground)",

        "checkbox-background": "var(--v-checkbox-background)",
        "checkbox-border": "var(--v-checkbox-border)",
        "checkbox-foreground": "var(--v-checkbox-foreground)"
      },
      outline: {
        blue: ['1px solid var(--v-focus-border)', '-1px'],
        button: ["1px solid var(--v-focus-border)", "2px"]
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
        "6sp": '0.375rem',
        "7sp": '0.4375rem',
        "9sp": '0.5625rem',
        "11sp": '0.6875rem',
        "18sp": '1.125rem',
        "21sp": '1.3125rem',
        "22sp": '1.375rem',
        "27sp": "1.6875rem",
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
        inherit: 'inherit',
        "22sp": '1.375rem',
        "30sp": "1.875rem"
      },
      boxShadow: {
        "0-2-4": '0 2px 4px 0 var(--v-shadow-50)',
        "0-1-2": '0 1px 2px 0 var(--v-shadow-30)',
        "0-0-2": '0 0 2px 0 var(--v-shadow-100)',
      },
      zIndex: {
        9999: '9999',
      }
    }
  },
  variants: {
    extend: {
      opacity: ["disabled"],
      outline: ["active"]
    }
  },
  plugins: []
}
