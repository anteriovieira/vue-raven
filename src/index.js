import Raven from 'raven-js'
import RavenVue from 'raven-js/plugins/vue'

function plugin (Vue, options = {}) {
  // Merge options
  const _options = Object.assign({
    disableReport: options.disableReport || false,
    disableAutoReport: options.disableAutoReport || false,
    dsn: options.dsn || '',
    public_dsn: options.public_dsn || '',
    public_key: options.public_key || '',
    private_key: options.private_key || '',
    host: options.host || 'sentry.io',
    protocol: options.protocol || 'https',
    project_id: options.project_id || '',
    path: options.path || '/',
    config: {
      environment: options.environment || 'production'
    }
  }, options)

  if (_options.disableReport) {
    const api = {}

    // fake api
    ;['captureException'].forEach(method => {
      api[method] = () => false
    })

    Vue.prototype.$raven = api
    return
  }

  // Generate DSN
  if (!_options.dsn || !_options.dsn.length) {
    _options.dsn = `${_options.protocol}://${_options.public_key}` +
      `:${_options.private_key}@${_options.host}${_options.path}${_options.project_id}`
  }

  // Public DSN (without private key)
  if (!_options.public_dsn || !_options.public_dsn.length) {
    _options.public_dsn = _options.dsn.replace(/:\w+@/, '@')
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
  Object.defineProperty(window, 'VueRaven', {
    get () {
      return plugin
    }
  })
}

export default plugin
const version = '__VERSION__'
// Export all components too
export {
  Raven,
  version
}
