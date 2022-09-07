<template>
  <div v-if="true" class="d-flex justify-content-center">
    <b-button
      class="mt-0 mr-0 pl-1 pr-1"
      variant="gradient-success"
      v-b-modal.modal-firma
      title="Firmar"
    >
      Firma
      <feather-icon
        icon="FeatherIcon"

      />
    </b-button>
    <b-modal
      id="modal-firma"
      title="Firmar"
      ok-title="Firmar"
      cancel-title="Cancelar"
      cancel-variant="outline-secondary"
      size="md"
      no-close-on-backdrop
      centered
    >

      {{ text }}.
      <!-- @ok="agregar" -->
      <!-- <trabajo-familia-form
        :apoyo.sync="data"
        @processForm="agregar"
      /> -->
    </b-modal>
  </div>
</template>

<script>
import {
  BButton,
} from 'bootstrap-vue'

export default {
  components: {
    BButton
  },
  props: {
    idUsuario: {
      type: Number,
      required: false,
    },
    nombreCompleto: {
      type: String,
      required: false,
    },
    text: {
      type: String,
      required: false,
    },
    data: {
      type: Object,
      required: true,
    },
  },
}
</script>
