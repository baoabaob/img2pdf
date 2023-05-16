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
      },
      {
      name: 'Base64 String Encoder/Decoder',
        key: 'base64str',
        component: lazy(() => import('./pages/tools/generators/base64str'))
      },
      /*
      name: '你的工具的名字',
        key: '你的工具的唯一的key',
        component: lazy(() => import('./pages/tools/generators/你的工具的组件名'))
      },
      */
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
