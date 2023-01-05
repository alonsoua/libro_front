<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    class="mb-2"
  >
    <b-row>
      <b-col md="8">
        <b-card-text
          style="margin-top: 8px;"
          class="h5 mb-1"
        >
          Profesores especializados
        </b-card-text>
      </b-col>
      <b-col md="4" class="mt-2">
        <!-- <b-button
          v-if="$can('create', nombre_permiso)"
          v-ripple.400="'rgba(255, 255, 255, 0.15)'"
          variant="outline-primary float-right"
          @click="repeateAgain"
          class="mb-2 pr-1 pl-1"
        >
          <feather-icon
            icon="PlusIcon"
            class="mr-25"
          />
          <span>Agregar docente PIE</span>
        </b-button> -->
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
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >

        <!-- NOMBRE -->
        <b-col md="4">
          <b-form-group
            label="Nombre"
            label-for="nombre"
          >
            <b-form-input
              v-model="item.nombre"
              id="nombre"
              type="text"
              placeholder="Ingresa el nombre"
              :plaintext="!$can('update', nombre_permiso)"
            />
          </b-form-group>
        </b-col>

        <!-- ESPECIALIDAD -->
        <b-col md="5">
          <b-form-group
            label="Especialidad"
            label-for="especialidad"
          >
            <b-form-input
              v-model="item.especialidad"
              id="especialidad"
              type="text"
              placeholder="Ingresa la especialidad"
              :plaintext="!$can('update', nombre_permiso)"
            />
          </b-form-group>
        </b-col>

        <!-- FIRMAS -->
        <b-col md="2">
          <b-form-group
            label="Firma"
            label-for="firma"
            class="text-center"
          >
            <firmas
              :idModal="index"
              :data.sync="item"
              :modulo="nombre_permiso"
              text="Firmar identificación de equipo de aula como docente PIE"
            />
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <b-col
          v-if="$can('delete', nombre_permiso)"
          lg="1"
          md="1"
          class="mb-50"
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="mt-0 mt-md-2 pr-1 pl-1"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="TrashIcon"
            />
            <span></span>
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr class="mt-0">
        </b-col>
      </b-row>
    </b-form>
    <b-button
      v-if="$can('create', nombre_permiso)"
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="outline-primary float-right"
      @click="repeateAgain"
      class="mb-2 mt-25 pr-1 pl-1"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Agregar docente PIE</span>
    </b-button>
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

// CCOMPONENTES RECICLADOS
import colLinea from '../../../../../../components/Form/colLinea.vue'
import firmas from '../../../../../../components/firmas.vue'

export default {
  components: {
    BOverlay,
    BForm,
    BRow,
    BCol,
    BButton,
    BFormGroup,
    BFormInput,
    BCardTitle,
    BCardText,

    // CCOMPONENTES RECICLADOS
    colLinea,
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
      items: [
        {
          id: 1,
          nombre: 'Estefanía Andrea Vergara Reyes',
          especialidad: 'Profesor de Educación Diferencial',
          telefono: '5697899879',
          correo: 'estefania@gmail.com',
        },
      ],
      phone: {
        phone: true,
        phoneRegionCode: 'CL',
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
