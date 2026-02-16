import { registerApplication, start } from 'single-spa'
import { constructApplications, constructLayoutEngine, constructRoutes } from 'single-spa-layout'

const routes = constructRoutes(
  (document.querySelector('#single-spa-layout') as HTMLTemplateElement) ??
    (() => {
      const template = document.createElement('template')
      template.innerHTML = `
        <single-spa-router>
          <route default>
            <h1>Orgst</h1>
          </route>
        </single-spa-router>
      `
      return template
    })(),
)

const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return System.import(name)
  },
})

const layoutEngine = constructLayoutEngine({ routes, applications })

applications.forEach(registerApplication)

layoutEngine.activate()
start()
