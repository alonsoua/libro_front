<template>
  <hr :width="width" :align="align">
</template>

<script>

export default {
  props: {
    ancho: {
      type: String,
      default: 'xl',
    },
    align: {
      type: String,
      default: 'center',
    },
  },
  computed: {
    width() {
      let width
      if (this.ancho === 'xl') {
        width = 'auto'
      } else if (this.ancho === 'md') {
        width = '93%'
      } else if (this.ancho === 'sm') {
        width = '85%'
      } else if (this.ancho === 'xs') {
        width = '78%'
      } else {
        width = this.ancho
      }
      return width
    },
  },
}
</script>
