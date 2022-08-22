<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mb-2"
      @submit.prevent="repeateAgain"
    >
      <b-card-text
        style="margin-top: 8px;"
        class="mb-2 text-primary h4"
      >
        Coordinación del Programa:
      </b-card-text>
      <!-- Row Loop -->
      <b-row
        ref="row"
      >

        <!-- NOMBRE -->
        <b-col md="12">
          <b-form-group
            label="En el establecimiento"
            label-for="establecimiento"
          >
            <b-form-input
              v-model="coordinacion.establecimiento"
              id="establecimiento"
              type="text"
              placeholder="Ingresa el coordinador en el establecimiento"
            />
          </b-form-group>
        </b-col>

        <!-- NOMBRE -->
        <b-col md="12">
          <b-form-group
            label="En el DAEM (si el PIE es comunal)"
            label-for="daem"
          >
            <b-form-input
              v-model="coordinacion.daem"
              id="daem"
              type="text"
              placeholder="Ingresa el coordinador en el DAEM"
            />
          </b-form-group>
        </b-col>

        <!-- NOMBRE -->
        <b-col md="12">
          <b-form-group
            label="Con redes de apoyo"
            label-for="redes"
          >
            <b-form-input
              v-model="coordinacion.redes"
              id="redes"
              type="text"
              placeholder="Ingresa el coordinador de red de apoyo"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <colLinea />

      <!-- Action Buttons -->
      <b-row
        ref="row"
      >
        <b-col md="8">
        </b-col>

        <b-col md="4">
          <btnSubmit
            v-if="cargando"
            class="float-right"
            variant="primary"
            :btnText="btnSubmit"
            @processBtn="submitOption"
          />
        </b-col>

      </b-row>
    </b-form>
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BOverlay, BCardText,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'

import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

// Componentes //
import colLinea from '../../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../../components/Form/btnSubmit.vue'

export default {
  components: {
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardText,
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {

      cargando: true,
      coordinacion: [],
      nextTodoId: 2,
    }
  },
  mounted() {
    this.initTrHeight()
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  props: {
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Coordinación',
    },
  },
  methods: {
    submitOption() {
      console.log('this.v$ :', this.v$.asistencia)
      // this.v$.asistencia.$touch()
      // if (!this.v$.asistencia.$invalid) {
      //   this.$emit('processForm', this.asistencia)
      // }
    },
    // REPEATER
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += this.nextTodoId,
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    removeItem(index) {
      this.items.splice(index, 1)
      this.trTrimHeight(this.$refs.row[0].offsetHeight)
    },
    initTrHeight() {
      this.trSetHeight(null)
      this.$nextTick(() => {
        this.trSetHeight(this.$refs.form.scrollHeight)
      })
    },
  },
}
</script>
