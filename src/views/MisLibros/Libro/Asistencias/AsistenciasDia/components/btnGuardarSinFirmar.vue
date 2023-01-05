<template>
  <b-button
    v-if="can"
    variant="relief-primary"
    class="mr-0 btn-sm mt-25"
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
    can: {
      type: Boolean,
      required: true,
    },
  },
}
</script>
