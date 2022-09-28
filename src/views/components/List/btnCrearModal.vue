<template>
  <!-- v-if="$can('create', modulo)" -->
   <div
    class="d-flex align-items-center justify-content-end"
  >
      <!-- v-b-modal.${modal} -->
    <b-button
      v-ripple.400="'rgba(113, 102, 240, 0.15)'"
      variant="primary"
      class="btn"
      @click="btnSubmit"
    >
      <span class="text-nowrap">{{ accion }} {{ texto }}</span>
    </b-button>
  </div>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
  },
  directives: {
    Ripple,
  },
  props: {
    texto: {
      type: String,
      required: true,
    },
    modulo: {
      type: String,
      required: false,
    },
    accion: {
      tyle: String,
      default: 'Crear',
    },
    modal: {
      tyle: String,
      default: true,
    }
  },
  methods: {
    btnSubmit() {
      this.$bvModal.show(this.modal)
    },
  },
}
</script>
