const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    requestTimeout: 7000
  },
  video: false,
})
