<template>
  <b-button
    variant="relief-primary"
    class="mr-0 btn-sm-block"
    @click="$emit('processBtn')"
  >
    {{ btnText }}
  </b-button>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
  },
  props: {
    btnText: {
      type: String,
      required: true,
    },
  },
}
</script>
