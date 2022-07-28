<template>
  <b-form-group
    label-cols-sm="3"
    label-align-sm="center"
    label-size="sm"
    label-for="filterInput"
    class="mb-0"
  >
    <b-input-group size="sm">
      <b-form-input
        id="filterInput"
        v-model="filtro"
        placeholder="Buscar..."
        @keyup="sendFiltro"
      />
      <b-input-group-append>
        <b-button
          class="btn-sm"
          :disabled="!filtro"
          @click="resetFiltro"
        >
          Limpiar
        </b-button>
      </b-input-group-append>
    </b-input-group>
  </b-form-group>
</template>

<script>
import {
  BFormGroup, BInputGroup, BFormInput, BButton, BInputGroupAppend,
} from 'bootstrap-vue'

export default {
  components: {
    BButton,
    BFormGroup,
    BFormInput,
    BInputGroup,
    BInputGroupAppend,
  },
  props: {
    filter: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      filtro: null,
    }
  },
  mounted() {
    this.filtro = this.filter
  },
  methods: {
    sendFiltro() {
      this.$emit('update:filter', this.filtro)
    },
    resetFiltro() {
      this.filtro = ''
      this.sendFiltro()
    },
  },
}
</script>
