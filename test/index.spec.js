import { mount, createLocalVue } from '@vue/test-utils'
import sinon from 'sinon'
import _Raven from 'raven-js'
import VueRaven from '../src'
import ComponentRaw from './stubs/ComponentRaw'
import ComponentWithError from './stubs/ComponentWithError'
import ComponentTriggerError from './stubs/ComponentTriggerError'

describe('VueRaven', () => {
  describe('install', () => {
    it('should disable report', () => {
      const localVue = createLocalVue()

      localVue.use(VueRaven, {
        dsn: 'http://abc@example.com:80/2',
        disableReport: true
      })

      const wrapper = mount(ComponentRaw, { localVue })
      expect(typeof wrapper.vm.$raven).toBe('object')
      expect(typeof wrapper.vm.$raven.captureException).toBe('function')
      expect(wrapper.vm.$raven.captureException(new Error('foo'))).toBe(false)
    })
  })

  describe('usage', () => {
    let localVue

    beforeEach(() => {
      localVue = createLocalVue()

      localVue.use(VueRaven, {
        dsn: 'http://abc@example.com:80/2'
      })
    })

    it('should access the api Raven', () => {
      const wrapper = mount(ComponentRaw, { localVue })

      expect(typeof wrapper.vm.$raven.captureException).toBe('function')
    })

    it('should call captureException', () => {
      const spy = sinon.spy(_Raven, 'captureException')

      mount(ComponentWithError, { localVue })
      expect(spy.called).toBe(true)
      spy.restore()
    })

    it('should call captureException once', () => {
      const spy = sinon.spy(_Raven, 'captureException')

      mount(ComponentWithError, { localVue })
      expect(spy.calledOnce).toBe(true)
      spy.restore()
    })

    it('should trigger error', () => {
      const spy = sinon.spy(_Raven, 'captureException')
      const wrapper = mount(ComponentTriggerError, { localVue })

      wrapper.find('button').trigger('click')

      expect(spy.calledOnce).toBe(true)
      spy.restore()
    })
  })

  describe('errorHandler', () => {
    let localVue

    beforeEach(() => {
      sinon.stub(_Raven, 'captureException')
      localVue = createLocalVue()
    })

    afterEach(() => {
      _Raven.captureException.restore()
    })

    it('should call the existing error handler', () => {
      const errorHandler = sinon.stub()
      localVue.config.errorHandler = errorHandler
      localVue.use(VueRaven) // should override errorHandler

      const wrapper = mount(ComponentRaw, { localVue })
      const err = new Error('foo')
      const vm = wrapper.vm

      localVue.config.errorHandler(err, vm)

      expect(_Raven.captureException.calledOnce).toBe(true)
      expect(errorHandler.args[0][0]).toBe(err)
      expect(errorHandler.args[0][1]).toBe(vm)
    })
  })
})
