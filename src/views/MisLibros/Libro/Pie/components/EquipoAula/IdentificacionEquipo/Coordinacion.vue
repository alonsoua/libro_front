<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    class="mb-25"
  >
    <b-row>
      <b-col md="8">
        <b-card-text
          style="margin-top: 8px;"
          class="h5 mb-1"
        >
          Coordinación del Programa
        </b-card-text>
      </b-col>
      <b-col md="4" class="mt-2">
      </b-col>
    </b-row>
    <b-form
      ref="form"
      :style="{height: trHeight}"
      class="repeater-form mt-0 overflow-auto border-light"
      style="min-height: 380px !important; max-height: 380px !important; margin: 0px 0px 15px 0px; padding: 20px 18px 0px 18px;"
      @submit.prevent="repeateAgain"
    >
      <!-- Row Loop -->
      <b-row
        class=""
        ref="row"
      >

        <!-- EN EL ESTABLECIMIENTO -->
        <b-col md="9">
          <b-form-group
            label="En el establecimiento"
            label-for="establecimiento"
          >
            <b-form-input
              v-model="coordinacion.establecimiento"
              id="establecimiento"
              type="text"
              placeholder="Ingresa el coordinador en el establecimiento"
              :plaintext="!$can('update', nombre_permiso)"
            />
          </b-form-group>
        </b-col>

        <!-- FIRMA EN EL ESTABLECIMIENTO -->
        <b-col md="2">
          <b-form-group
            label="Firma"
            label-for="firma"
            class="text-center"
          >
            <firmas
              :idModal="1"
              :data.sync="item"
              :modulo="nombre_permiso"
              text="Firmar identificación de equipo de aula como coordinador en el establecimiento"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <hr class="mt-0">
        </b-col>

        <!-- EN EL DAEM -->
        <b-col md="9">
          <b-form-group
            label="En el DAEM (si el PIE es comunal)"
            label-for="daem"
          >
            <b-form-input
              v-model="coordinacion.daem"
              id="daem"
              type="text"
              placeholder="Ingresa el coordinador en DAEM"
              :plaintext="!$can('update', nombre_permiso)"
            />
          </b-form-group>
        </b-col>

        <!-- FIRMA EN EL DAEM -->
        <b-col md="2">
          <b-form-group
            label="Firma"
            label-for="firma"
            class="text-center"
          >
            <firmas
              :idModal="2"
              :data.sync="item"
              :modulo="nombre_permiso"
              text="Firmar identificación de equipo de aula como coordinador en el DAEM"
            />
          </b-form-group>
        </b-col>

        <b-col cols="12">
          <hr class="mt-0">
        </b-col>


        <!-- CON REDES DE APOYO -->
        <b-col md="9">
          <b-form-group
            label="Con redes de apoyo"
            label-for="redes"
          >
            <b-form-input
              v-model="coordinacion.redes"
              id="redes"
              type="text"
              placeholder="Ingresa el coordinador de redes de apoyo"
              :plaintext="!$can('update', nombre_permiso)"
            />
          </b-form-group>
        </b-col>

        <!-- FIRMA CON REDES DE APOYO -->
        <b-col md="2">
          <b-form-group
            label="Firma"
            label-for="firma"
            class="text-center"
          >
            <firmas
              :idModal="3"
              :data.sync="item"
              :modulo="nombre_permiso"
              text="Firmar identificación de equipo de aula como red de apoyo"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <colLinea />

    </b-form>
    <!-- Action Buttons -->
    <b-row
      ref="row"
    >
      <b-col md="8">
      </b-col>

      <b-col md="4">
        <btnSubmit
          v-if="cargando"
          class="mt-0 mb-1 pr-1 pl-1 float-right"
          variant="primary"
          :btnText="btnSubmit"
          :modulo="nombre_permiso"
          @processBtn="submitOption"
        />
      </b-col>

    </b-row>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BForm, BFormGroup, BFormInput, BRow, BCol, BButton, BOverlay, BCardTitle,
  BCardText,
} from 'bootstrap-vue'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'
import vSelect from 'vue-select'
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

// COMPONENTES RECICLADOS
import colLinea from '../../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../../components/Form/btnSubmit.vue'
import firmas from '../../../../../../components/firmas.vue'

export default {
  components: {
    // ETIQUETAS
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,

    // COMPONENTES RECICLADOS
    colLinea,
    btnSubmit,
    firmas,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      nombre_permiso: 'pieI1',
      cargando: true,
      item: {},
      coordinacion: {
        daem: 'Daniela Herrera Duarte',
        establecimiento: 'Paola Frez Ojeda',
        redes: 'Carmen Tapia Pradenas',
      },
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
