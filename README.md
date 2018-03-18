# VueRaven


[![npm (scoped with tag)](https://img.shields.io/npm/v/vue-raven/latest.svg?style=flat-square)](https://npmjs.com/package/vue-raven)
[![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)
[![npm](https://img.shields.io/npm/dt/vue-raven.svg?style=flat-square)](https://npmjs.com/package/vue-raven)
[![CircleCI](https://img.shields.io/circleci/project/github/anteriovieira/vue-raven.svg?style=flat-square)](https://circleci.com/gh/anteriovieira/vue-raven)
[![Codecov](https://img.shields.io/codecov/c/github/anteriovieira/vue-raven.svg?style=flat-square)](https://codecov.io/gh/anteriovieira/vue-raven)
[![donate](https://img.shields.io/badge/donate-%E2%99%A5-ff5f5f.svg)](https://patreon.com/anteriovieira)

 > VueRaven automatically reports uncaught JavaScript exceptions triggered from vue component, and provides a API for reporting your own errors. The captured errors will be reported to the sentry where you can get an overview of your application. If you do not already have a [Sentry account](https://sentry.io), creating your account will be the first step to using this package.

## Installation

```bash
npm install --save vue-raven
# or
yarn add vue-raven
```

## Usage

To get started, you need to configure VueRaven to use your [Sentry DSN](https://docs.sentry.io/quickstart/#configure-the-dsn):

### Bundler (Webpack, Rollup)

```js
import Vue from 'vue'
import VueRaven from 'vue-raven'

Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/<project>'
})
```

### Browser

```html
<!-- Include after Vue -->

<!-- Local files -->
<script src="vue-raven/dist/vue-raven.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-raven"></script>

<script>
Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/<project>'
})

const app = new Vue({
  el: '#app',
  // ...
}) 
</script>
```

> Only these settings allow VueRaven capture any uncaught exception.

## Options

| Option  | Type | Default  | Info |
| ------------- | ------------- | ------------- | ------------- |
| dsn  | `String` | `null` | The Data Source Name |
| public_dsn | `String` | `null` | If value omitted it will be generated using dsn value, by removing private key part. |
| public_key | `String` | `null` | Will be ignored if dsn provided. |
| private_key | `String` | `null` | Will be ignored if dsn provided. |
| host | `String` | `sentry.io` | Will be ignored if dsn provided. |
| protocol | `String` | `https` | Will be ignored if dsn provided. |
| project_Id | `String` | `null` | Will be ignored if dsn provided. |
| path | `String` | `null` | Will be ignored if dsn provided. |
| disableAutoReport | `Boolean` | `false` | Disable auto report |

## Reporting Errors

### Disable auto report

By default vueraven will report the errors captured automatically, but you can disable using the `disableAutoReport` option:

```js
import Vue from 'vue'
import VueRaven from 'vue-raven'

Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/<project>'
  disableAutoReport: true,
})
```

### Report errors manually

In some cases you may want to report erros manually, for this you will have the [reven-js](https://docs.sentry.io/clients/javascript/) api available at the instance of the component.

```js
// my-component
export default {
  methods: {
    // ...
    async saveUser() {
      try {
        await User.save(/* data */)
      } catch (err) {
        this.$raven.captureException(err)
      }
    }
  }
}
```

or

```js
import {Raven} from 'vue-raven';

// my-component
export default {
  methods: {
    // ...
    async saveUser() {
      try {
        await User.save(/* data */)
      } catch (err) {
        Raven.captureException(err)
      }
    }
  }
}
```

## Environment

By default VueRaven defines the environment as production, but you are free to configure this option.

```js
import Vue from 'vue'
import VueRaven from 'vue-raven'

Vue.use(VueRaven, {
  dsn: 'https://<key>@sentry.io/<project>'
  dev: process.env.NODE_ENV !== 'production',
})
```

## Live demo

We create a small [example](https://jsfiddle.net/anteriovieira/cprfeqrj/) so you can see the plugin in action.

[jsfiddle](https://jsfiddle.net/anteriovieira/cprfeqrj/)

![error](https://raw.githubusercontent.com/anteriovieira/vue-raven/master/examples/media/error.png)

## License

[MIT](http://opensource.org/licenses/MIT)
