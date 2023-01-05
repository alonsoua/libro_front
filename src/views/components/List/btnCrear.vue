<template>
    <!-- v-if="$can('create', modulo)" -->
  <div
    class="d-flex align-items-center "
    :class="posicion === 'end'
      ? 'justify-content-end'
      : 'justify-content-start'
    "
  >
    <b-button
      variant="primary"
      class="btn"
      @click="$emit('processAdd')"
    >
      <span class="text-nowrap">{{ accion }} {{ texto }}</span>
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
    accion: {
      tyle: String,
      default: 'Crear',
    },
    posicion: {
      tyle: String,
      default: 'end',
    }
  },
  methods: {
  },
}
</script>
