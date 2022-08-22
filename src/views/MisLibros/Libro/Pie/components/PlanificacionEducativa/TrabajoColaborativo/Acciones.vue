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

      <!-- Action Buttons -->
      <!-- <b-row
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

      <colLinea /> -->

      <!-- Row Loop -->
      <b-row
        ref="row"
      >

        <!-- APOYOS ENTRE PROFESORES -->
        <b-col md="12">
          <b-form-group
            label="Entre profesores (educación especial y profesor regular) <Co-enseñanza>"
            label-for="profesores"
          >
            <b-form-textarea
              id="profesores"
              placeholder="Ingresa los apoyos entre profesores"
              v-model="acciones.profesores"
              rows="4"
            />
          </b-form-group>
        </b-col>

        <!-- APOYOS ENTRE PROFESORES Y ASISTENTES -->
        <b-col md="12">
          <b-form-group
            label="Entre profesores y asistentes de la educación (psicólogos, fonoaudiólogos, auxiliares, intérpretes, etc.)"
            label-for="profesoresasistentes"
          >
            <b-form-textarea
              id="profesoresasistentes"
              placeholder="Ingresa los apoyos entre profesores y asistentes"
              v-model="acciones.profesoresasistentes"
              rows="4"
            />
          </b-form-group>
        </b-col>

        <!-- APOYOS ENTRE ESTUDIANTES -->
        <b-col md="12">
          <b-form-group
            label="Entre estudiantes (Ej: Aprendizaje Colaborativo)"
            label-for="estudiantes"
          >
            <b-form-textarea
              id="estudiantes"
              placeholder="Ingresa los apoyos entre estudiantes"
              v-model="acciones.estudiantes"
              rows="4"
            />
          </b-form-group>
        </b-col>

        <!-- APOYOS CON LA FAMILIA -->
        <b-col md="12">
          <b-form-group
            label="Con la familia y entre familias"
            label-for="familia"
          >
            <b-form-textarea
              id="familia"
              placeholder="Ingresa los apoyos con la familia"
              v-model="acciones.familia"
              rows="4"
            />
          </b-form-group>
        </b-col>

        <!-- APOYOS CON LA FAMILIA -->
        <b-col md="12">
          <b-form-group
            label="Con la comunidad (con otras Escuelas, Centros Culturales, Servicios, etc)"
            label-for="comunidad"
          >
            <b-form-textarea
              id="comunidad"
              placeholder="Ingresa los apoyos con la comunidad"
              v-model="acciones.comunidad"
              rows="4"
            />
          </b-form-group>
        </b-col>

        <!-- OBSERVACIONES -->
        <b-col md="12">
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="acciones.observaciones"
              rows="4"
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
  BFormTextarea
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
    BFormTextarea,
    colLinea,
    btnSubmit,
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      acciones: [],
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
      default: 'Actualizar Panorama',
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
