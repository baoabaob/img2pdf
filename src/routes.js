import {lazy} from 'react'

export const tools = [{
    name: 'Generators',
    key: 'generators',
    items: [{
        name: 'UUID / NanoID',
        key: 'uuid',
        component: lazy(() => import('./pages/tools/generators/uuid'))
    }, {
        name: 'Calculator',
        key: 'calc',
        component: lazy(() => import('./pages/tools/generators/calc'))
    }, {
        name: 'Base64 String Encoder/Decoder',
        key: 'base64str',
        component: lazy(() => import('./pages/tools/generators/base64str'))
    }, {
        name: 'Convert to HEX/DEC/OCT/BIN',
        key: 'baseConvert',
        component: lazy(() => import('./pages/tools/generators/baseConvert.jsx'))
    },{
        name: 'Regular Expression Check',
        key: 'regular',
        component: lazy(()=>import('./pages/tools/generators/regular.jsx'))
    },{
        name: 'ImageToPDFConverter',
        key: 'imageToPDF',
        component: lazy(()=>import('./pages/tools/generators/ImageToPDFConverter.jsx'))
    },{
        name: 'PraiseMe',
        key: 'praiseMe',
        component: lazy(()=>import('./pages/tools/generators/PraiseMe.jsx'))
    }
    ]
}]

function generateRoutes(groups) {
    let routes = {}
    for (const group of groups) {
        for (const route of group.items) {
            routes[`/${group.key}/${route.key}`] = route
        }
    }
    return routes
}

export const routes = generateRoutes(tools)