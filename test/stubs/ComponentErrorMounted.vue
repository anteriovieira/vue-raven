<template>
  <div></div>
</template>

<script>
export default {
  name: 'ComponentMountedError',
  mounted () {
    throw new Error('Error in mounted')
  }
}
</script>

