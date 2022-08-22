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
        Profesores especializados:
      </b-card-text>
      <!-- Row Loop -->
      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >

        <!-- NOMBRE -->
        <b-col md="5">
          <b-form-group
            label="Nombre"
            label-for="nombre"
          >
            <b-form-input
              v-model="item.nombre"
              id="nombre"
              type="text"
              placeholder="Ingresa el nombre"
            />
          </b-form-group>
        </b-col>

        <!-- ESPECIALIDAD -->
        <b-col md="6">
          <b-form-group
            label="Especialidad"
            label-for="especialidad"
          >
            <b-form-input
              v-model="item.especialidad"
              id="especialidad"
              type="text"
              placeholder="Ingresa la especialidad"
            />
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <b-col
          lg="1"
          md="1"
          class="mb-50"
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="mt-0 mt-md-2"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="TrashIcon"
              class="mr-25"
            />
            <span></span>
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr>
        </b-col>
      </b-row>
      <b-button
        v-ripple.400="'rgba(255, 255, 255, 0.15)'"
        variant="outline-primary"
        @click="repeateAgain"
      >
        <feather-icon
          icon="PlusIcon"
          class="mr-25"
        />
        <span>Agregar docente PIE</span>
      </b-button>

      <!-- Action Buttons -->

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
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {

      cargando: true,
      items: [
        {
          id: 1,
          nombre: 'Natalia Barrera García',
          especialidad: 'Prof Ed Física',
          telefono: '5697899879',
          correo: 'naty@gmail.com',
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
