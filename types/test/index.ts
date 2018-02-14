import Vue from 'vue'
import VueRaven from '../../src'

Vue.use(VueRaven)

const app = new Vue()

app.$raven.captureException(new Error('foo'))