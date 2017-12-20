import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

function plugin (Vue, options = {}) {
  // Merge options
  const _options = Object.assign({
    disableAutoReport: options.disableAutoReport || false,
    dsn: options.dsn || null,
    public_dsn: options.public_dsn || null,
    public_key: options.public_key || null,
    private_key: options.private_key || null,
    host: options.host || 'sentry.io',
    protocol: options.protocol || 'https',
    project_id: options.project_id || '',
    path: options.path || '/',
    config: {
      environment: options.dev ? 'development' : 'production'
    }
  }, options)

  // Generate DSN
  if (!options.dsn || !options.dsn.length) {
    options.dsn = `${options.protocol}://${options.public_key}` +
      `:${options.private_key}@${options.host}${options.path}${options.project_id}`
  }

  // Public DSN (without private key)
  if (!options.public_dsn || !options.public_dsn.length) {
    options.public_dsn = options.dsn.replace(/:\w+@/, '@')
  }

  // config raven
  Raven.config(_options.dsn, _options.config)

  if (!_options.disableAutoReport) {
    Raven.addPlugin(RavenVue, Vue)
  }

  // install Raven
  Raven.install()

  // add raven instance
  Vue.prototype.$raven = Raven
}

// Install by default if using the script tag
if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(plugin)
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Raven,
  version
}
