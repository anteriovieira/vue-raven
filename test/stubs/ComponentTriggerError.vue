<template>
  <div>
    <button @click="trigger">Trigger error</button>
  </div>
</template>

<script>
export default {
  name: 'Component',
  methods: {
    trigger () {
      this.$raven.captureException(new Error('foo'))
    }
  }
}
</script>

