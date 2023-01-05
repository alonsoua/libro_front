<template>
  <div class="d-flex justify-content-center">
    <div v-if="$can('firmar', modulo)">
      <b-button
        class="mt-0 mr-0 pl-1 pr-1"
        variant="gradient-success"
        v-b-modal="'modal-firma-'+idModal"
        title="Firmar"
      >
        Firma
        <feather-icon
          icon="FeatherIcon"

        />
      </b-button>
      <b-modal
        :id="'modal-firma-'+idModal"
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
    <div v-else-if="$can('readfirma', modulo)">
      <b-badge
        :variant="idModal%2 === 0 ? 'light-success' : 'light-danger'"
      >
        {{ idModal%2 === 0 ? 'Firmado' : 'No Firmado' }}
      </b-badge>
    </div>
  </div>
</template>

<script>
import {
  BButton, BBadge,
} from 'bootstrap-vue'
// VUEX
import { mapActions, mapGetters, mapMutations } from 'vuex'

export default {
  components: {
    BButton,
    BBadge,
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },
  mounted() {
    // console.log('user - ', this.user)
  },
  props: {
    idModal: {
      type: Number,
      default: 1,
    },
    modulo: {
      type: String,
      required: true,
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
