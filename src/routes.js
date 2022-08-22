import { lazy } from 'react'

export const tools = [
  {
    name: 'Generators',
    key: 'generators',
    items: [
      {
        name: 'UUID / NanoID',
        key: 'uuid',
        component: lazy(() => import('./pages/tools/generators/uuid'))
      },
      {
        name: 'Calculator',
        key: 'calc',
        component: lazy(() => import('./pages/tools/generators/calc'))
      }
    ]
  }
]

function generateRoutes (groups) {
  let routes = {}
  for (const group of groups) {
    for (const route of group.items) {
      routes[`/${group.key}/${route.key}`] = route
    }
  }
  return routes
}

export const routes = generateRoutes(tools)
