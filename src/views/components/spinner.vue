<template>
  <div class="d-flex justify-content-center mb-1">
    <b-spinner
      v-if="!size"
      style="width: 3rem; height: 3rem;"
      label="Cargando..."
      variant="primary"
    />
    <b-spinner
      v-else-if="size == 'medium'"
      label="Cargando..."
      variant="primary"
    />
    <b-spinner
      v-else-if="size == 'small'"
      small
      label="Cargando..."
      variant="primary"
    />
  </div>
</template>

<script>
import {
  BSpinner,
} from 'bootstrap-vue'

export default {
  components: {
    BSpinner,
  },
  props: {
    size: {
      type: String,
      required: false,
    },
  },
}
</script>
