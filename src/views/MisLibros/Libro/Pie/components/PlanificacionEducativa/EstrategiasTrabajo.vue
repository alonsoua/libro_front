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
      <!-- Row Loop -->
      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >

        <!-- NOMBRE -->
        <b-col md="2">
          <b-form-group
            label="Estrategias de participación"
            label-for="estrategia"
          >
            <div
              v-if="item.id <= 3"
            >
              <b>{{ item.estrategia }}</b>
            </div>
            <div
              v-else
            >
              <b>Otras acciones</b>
            </div>
          </b-form-group>
        </b-col>

        <!-- DESCRIPCIÓN -->
        <b-col md="3">
          <b-form-group
            label="Descripción"
            label-for="descripcion"
          >
            <b-form-textarea
              v-model="item.descripcion"
              id="descripcion"
              type="text"
              placeholder="Ingresa la descripción"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- DESCRIPCIÓN -->
        <b-col md="3">
          <b-form-group
            label="Seguimiento"
            label-for="seguimiento"
          >
            <b-form-textarea
              v-model="item.seguimiento"
              id="seguimiento"
              type="text"
              placeholder="Ingresa el seguimiento"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- Evaluación -->
        <b-col md="3">
          <b-form-group
            label="Evaluación"
            label-for="evaluacion"
          >
            <b-form-textarea
              v-model="item.evaluacion"
              id="evaluacion"
              type="text"
              placeholder="Ingresa la evaluación"
              row="2"
            />
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <b-col
          v-if="index > 3"
          lg="1"
          md="1"
          class=""
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="mt-0 mt-md-4 float-right"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="TrashIcon"
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
        <span>Agregar otra acción</span>
      </b-button>

      <!-- OBSERVACIONES -->
      <b-row class="mt-3">
        <b-col>
          <b-form-group
            label="Observaciones"
            label-for="observaciones"
          >
            <b-form-textarea
              id="observaciones"
              placeholder="Ingresa las observaciones"
              v-model="observaciones"
              rows="4"
            />
              <!-- :state="v$.reunion.acuerdos.$error === true
              ? false
              : null"
              @blur.native="v$.reunion.acuerdos.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.reunion.acuerdos.$error"
              id="acuerdosInfo"
            >
              <p v-for="error of v$.reunion.acuerdos.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
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

// Componentes //
import colLinea from '../../../../../components/Form/colLinea.vue'
import btnSubmit from '../../../../../components/Form/btnSubmit.vue'

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


      cargando: true,
      items: [
        {
          id: 1,
          estrategia: 'En la planificacion',
          descripcion: '',
          seguimiento: '',
          evaluación: '',
        },
        {
          id: 2,
          estrategia: 'En el proceso de aprendizaje',
          descripcion: '',
          seguimiento: '',
          evaluación: '',
        },
        {
          id: 3,
          estrategia: 'En la evaluación',
          descripcion: '',
          seguimiento: '',
          evaluación: '',
        },
        {
          id: 4,
          estrategia: 'Otras Acciones',
          descripcion: '',
          seguimiento: '',
          evaluación: '',
        },
      ],
      observacion: '',
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
    btnSubmit: {
      type: String, // Texto del boton
      default: 'Actualizar Estrategia',
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
