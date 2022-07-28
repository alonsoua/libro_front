<template>
  <b-button
    variant="primary"
    class="mb-1 mb-sm-0 mr-0 mr-sm-1 mt-1 btn-sm-block"
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
