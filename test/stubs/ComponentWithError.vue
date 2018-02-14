<template>
  <div></div>
</template>

<script>
export default {
  name: 'Component',
  created() {
    try {
      throw new Error('foo')
    } catch (err) {
      this.$raven.captureException(err)
    }
  }
}
</script>

