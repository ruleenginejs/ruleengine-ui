import * as Components from "./components"

export default {
  install: (app) => {
    for (const component in Components) {
      app.component(Components[component].name, Components[component])
    }
  }
}

export * from "./components"
export * from "./utils"
