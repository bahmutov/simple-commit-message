#!/usr/bin/env node

'use strict'

const debug = require('debug')('simple')
const amIaDependency = require('am-i-a-dependency')
const isForced = process.argv.some(a => a === '--force')

if (!amIaDependency() && !isForced) {
  // top level install (we are running `npm i` in this project)
  debug('we are installing own dependencies')
  process.exit(0)
}

debug('installing this module as a dependency')

const path = require('path')
const fs = require('fs')

function clientPackageJsonFilename () {
  return path.join(process.cwd(), '..', '..', 'package.json')
}

function alreadyInstalled () {
  const filename = clientPackageJsonFilename()
  const pkg = require(filename)
  if (!pkg.release) {
    return false
  }
  if (!pkg.release.analyzeCommits) {
    return false
  }
  return true
}

function addPlugin () {
  const filename = clientPackageJsonFilename()
  const pkg = require(filename)
  if (!pkg.release) {
    pkg.release = {}
  }
  pkg.release.analyzeCommits = 'simple-commit-message'
  const text = JSON.stringify(pkg, null, 2) + '\n'
  fs.writeFileSync(filename, text, 'utf8')
  console.log('✅  set analyzeCommits plugin in', filename)
}

if (alreadyInstalled()) {
  debug('plugin analyzeCommits already set')
  process.exit(0)
}

console.log('⚠️  Installing release analyzeCommits plugin simple-commit-message')
addPlugin()
