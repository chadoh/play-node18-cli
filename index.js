#!/usr/bin/env node --no-warnings

// importing as type json throws warning; silenced with --no-warnings above
import pkg from './package.json' assert {type: "json"}
import { parseArgs } from 'node:util'

const nodeV = process.versions['node'].split('.');
const reqNodeV = pkg.engines.node.split('.').map(n => parseInt(n.replace(/[^\d]/g, '')))

if (nodeV.length > 3) {
  console.error('Expected node version to have only three sections, got' + process.versions['node'])
  process.exit(1)
}

if (reqNodeV.length > 3) {
  console.error('Expected required node version to have only three sections, got' + pkg.engines.node)
  process.exit(1)
}

if(nodeV[0] < reqNodeV[0] || nodeV[1] < reqNodeV[1] || nodeV[2] < reqNodeV[2]) {
  console.error('Requires a node version matching ' + pkg.engines.node)
  process.exit(1)
}

const options = {
  verbose: {
    type: 'boolean',
    short: 'v',
    description: 'Use verbose output.',
  },
  color: {
    type: 'string',
    short: 'c',
    description: 'Color to use. Accepts any string.',
  },
  lol: {
    type: 'string',
    short: 'l',
    default: 'haha',
    description: `Laugh style to use. Default: "haha"`,
  },
  help: {
    type: 'boolean',
    short: 'h',
    description: 'Print this help documentation',
  }
}

const help = `An example CLI built using NodeJS>=18.3.0 with 0 dependencies.

Usage:

    ./index.js -vc green -l haha

Options:

    ${JSON.stringify(options)}
`

const args = parseArgs({ input: process.argv.slice(2), options })

if (args.values.help) {
  console.log(help)
  process.exit(0)
}

console.log('You called it correctly! Parsed arguments:', JSON.stringify(args))
