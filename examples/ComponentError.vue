<template>
 <button @click="tiggerError()">Trigger error</button>
</tempalte>

<script>
export default {
  name: 'ComponentError',
  methods: {
    tiggerError() {
      throw new Error('Test')
    }
  }
}
</script>

