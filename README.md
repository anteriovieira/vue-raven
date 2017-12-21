# VueRaven

[![npm](https://img.shields.io/npm/v/vue-raven.svg)](https://www.npmjs.com/package/vue-raven) [![vue2](https://img.shields.io/badge/vue-2.x-brightgreen.svg)](https://vuejs.org/)

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
  dns: 'https://<key>@sentry.io/<project>'
})
```

> Only these settings allow VueRaven capture any uncaught exception.

### Options

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

### Browser

```html
<!-- Include after Vue -->
<!-- Local files -->
<script src="vue-raven/dist/vue-raven.js"></script>

<!-- From CDN -->
<script src="https://unpkg.com/vue-raven"></script>
```

## Reporting Errors

### Disable auto report

By default vueraven will report the errors captured automatically, but you can disable using the `disableAutoReport` option:

```js
import Vue from 'vue'
import VueRaven from 'vue-raven'

Vue.use(VueRaven, {
  dns: 'https://<key>@sentry.io/<project>'
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

## Development

### Launch visual tests

```bash
npm run dev
```

### Launch Karma with coverage

```bash
npm run dev:coverage
```

### Build

Bundle the js and css of to the `dist` folder:

```bash
npm run build
```


## Publishing

The `prepublish` hook will ensure dist files are created before publishing. This
way you don't need to commit them in your repository.

```bash
# Bump the version first
# It'll also commit it and create a tag
npm version
# Push the bumped package and tags
git push --follow-tags
# Ship it 🚀
npm publish
```

## License

[MIT](http://opensource.org/licenses/MIT)
