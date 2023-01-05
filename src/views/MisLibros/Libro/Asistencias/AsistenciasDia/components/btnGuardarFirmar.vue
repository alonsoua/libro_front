<template>
  <div v-if="can">
    <!-- <b-button
      v-if="can"
      variant="relief-success"
      class="mr-0 btn-sm mt-25"
      @click="$emit('processBtn')"
    >
      {{ btnText }}
    </b-button> -->

    <b-button
      class="mt-0 mr-0 pl-1 pr-1 btn-sm"
      variant="relief-success"
      v-b-modal="'modal-firma-'+idModal"
      title="Firma digital"
    >
      {{ btnText }}
      <feather-icon
        icon="FeatherIcon"

      />
    </b-button>
    <b-modal
      :id="'modal-firma-'+idModal"
      title="Firmar digital"
      ok-title="Firmar"
      cancel-title="Cancelar"
      cancel-variant="outline-secondary"
      size="md"
      no-close-on-backdrop
      centered
      @ok.prevent="$emit('processBtn')"
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
  BButton, BModal, VBModal,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  components: {
    BButton,
    BModal,
    VBModal,
  },
  directives: {
    Ripple,
  },
  props: {
    idModal: {
      type: Number,
      required: true,
    },
    btnText: {
      type: String,
      required: true,
    },
    text: {
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
