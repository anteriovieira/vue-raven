import ComponentError from 'examples/ComponentError.vue'
import { createVM } from '../helpers/utils.js'

describe('ComponentError.vue', function () {
  it('should trigger an error', function () {
    const vm = createVM(
      this, `<component-error></Component-error>`,
      { components: { ComponentError }}
    )

    vm.trigglerError().should.eql('Test')
  })
})
