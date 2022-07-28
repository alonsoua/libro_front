<template>
  <!-- v-if="$can('create', modulo)" -->
  <div
    class="d-flex align-items-center justify-content-end"
  >
    <b-button
      variant="primary"
      class="btn-sm"
      @click="$emit('processAdd')"
    >
      <span class="text-nowrap">Crear {{ texto }}</span>
    </b-button>
  </div>
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
    texto: {
      type: String,
      required: true,
    },
    modulo: {
      type: String,
      required: true,
    },
  },
  methods: {
  },
}
</script>
