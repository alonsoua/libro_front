<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <!-- REPEAT -->
    <!-- :style="{height: trHeight}" -->
    <b-form-group
      label="Registro de participantes"
      label-for="participantes"
      class="mb-1 mt-1 h3"
    />
    <b-form
      ref="form"
      class="repeater-form overflow-auto border-light"
      style="min-height: 340px !important; max-height: 340px !important; margin: 0px 0px 0px 0px; padding: 20px 18px 0px 18px;"
      @submit.prevent="repeateAgain"
    >
      <b-alert
        v-if="items.length === 0"
        variant="primary"
        show
      >
        <div class="alert-body">
          <span>No existen participantes agregados.</span>
        </div>
      </b-alert>
      <b-row
        v-for="(item, index) in items"
        :id="item.id"
        :key="item.id"
        ref="row"
      >

        <!-- FECHA -->
        <b-col md="4">
          <b-form-group
            label="Participantes"
            label-for="participantes"
            :label-for="'participantes-'+item.id"
          >
            <v-select
              v-if="item.tipo === 'select'"
              :id="'participantes-'+item.id"
              v-model="item.participantes"
              class="mr-0"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              input-id="idParticipante"
              label="text"
              :options="optionsParticipantes"
              placeholder="Selecciona el participante"
              :getOptionLabel="option => option.text"
              @input="seleccionaParticipante(item)"
            />

            <b-form-input
              v-if="item.tipo === 'input'"
              id="participantes"
              placeholder="Ingresa el nombre del participante"
              v-model="item.participantes"
            />
              <!-- :reduce="option => option.id" -->
              <!-- :selectable="option => option.disabled === true ? false : true"
              deselect="false"
              :disabled="item.disabled"-->
          </b-form-group>
        </b-col>

        <!-- ROL -->
        <b-col md="4">
          <b-form-group
            label="Rol del participante"
            :label-for="'rol-'+item.id"
          >
            <div
              v-if="typeof item.participantes !== 'undefined' && item.tipo === 'select'"
            >
              <div>
                <h5 class="mt-1">{{ item.participantes['rol'] }}</h5>
              </div>
            </div>
            <b-form-input
              v-if="item.tipo === 'input'"
              id="rol"
              placeholder="Ingresa el rol del participante"
              v-model="item.rol"
            />
          </b-form-group>
        </b-col>


        <!-- FIRMA -->
        <b-col
          lg="3"
          md="3"
        >
          <b-form-group
            label="Firma"
            label-for="firma"
            class="text-center"
          >
            <firmas
              v-if="typeof item.participantes !== 'undefined' ? true : false"
              :idUsuario.sync="item.participantes.id"
              :nombreCompleto.sync="item.participantes.nombre"
              :data.sync="item"
              text="Firmar participación en el registro de trabajo con la comunidad y entorno escolar"
            />
              <!-- @processFirma="firmar" -->
          </b-form-group>
        </b-col>

        <!-- Remove Button -->
        <b-col
          lg="1"
          md="1"
          class="text-right"
        >
          <b-button
            v-ripple.400="'rgba(234, 84, 85, 0.15)'"
            variant="outline-danger"
            class="mt-0 mt-md-2 pl-1 pr-1"
            @click="removeItem(index)"
          >
            <feather-icon
              icon="TrashIcon"
            />
          </b-button>
        </b-col>
        <b-col cols="12">
          <hr class="mt-0">
        </b-col>
      </b-row>
    </b-form>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="outline-primary"
      class="mt-25 pl-1 pr-1"
      @click="repeateAgain"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Agregar participante</span>
    </b-button>

    <b-button
      v-ripple.400="'rgba(255, 255, 255, 0.15)'"
      variant="outline-primary"
      class="mt-25 float-right pl-1 pr-1"
      @click="repeateAgainDesdeCero"
    >
      <feather-icon
        icon="PlusIcon"
        class="mr-25"
      />
      <span>Agregar participante desde cero</span>
    </b-button>

    <b-row class="mt-2">
        <!-- Field: FECHA -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Fecha"
            label-for="fecha"
          >
            <b-form-datepicker
              v-model="apoyo.fechaInicio"
              id="fechaInicio"
              placeholder="Selecciona una fecha"
              hide-header
              :date-format-options="{
                year: 'numeric',
                month: 'short',
                day: '2-digit',
                weekday: 'short'
              }"
              start-weekday="1"
              locale="es-CL"
              :date-disabled-fn="dateDisabled"
              label-help=""
            />
              <!-- :state="v$.apoyo.acuerdos.$error === true
              ? false
              : null"
              @blur.native="v$.apoyo.acuerdos.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.apoyo.acuerdos.$error"
              id="acuerdosInfo"
            >
              <p v-for="error of v$.apoyo.acuerdos.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <!-- Field: OBJETIVOS -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Objetivos(s)"
            label-for="objetivos"
          >
            <b-form-textarea
              id="objetivos"
              placeholder="Ingresa los objetivos"
              v-model="apoyo.objetivos"
            />
              <!-- :state="v$.apoyo.acuerdos.$error === true
              ? false
              : null"
              @blur.native="v$.apoyo.acuerdos.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.apoyo.acuerdos.$error"
              id="acuerdosInfo"
            >
              <p v-for="error of v$.apoyo.acuerdos.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

        <!-- Field: ACTIVIDADES -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Actividad"
            label-for="actividad"
          >
            <b-form-textarea
              id="actividad"
              placeholder="Ingresa la actividad"
              v-model="apoyo.actividad"
            />
          </b-form-group>
        </b-col>

        <!-- Field: ACUERDOS COMPROMISOS -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Acuerdo(s) y/o compromiso(s)"
            label-for="acuerdoCompromiso"
          >
            <b-form-textarea
              id="acuerdoCompromiso"
              placeholder="Ingresa los acuerdos y/o compromisos"
              v-model="apoyo.acuerdoCompromiso"
            />
          </b-form-group>
        </b-col>

        <!-- Field: RESULTADOS -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Resultado(s)"
            label-for="resultados"
          >
            <b-form-textarea
              id="resultados"
              placeholder="Ingresa los resultados"
              v-model="apoyo.resultados"
            />
          </b-form-group>
        </b-col>

      </b-row>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BAlert,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'
import Ripple from 'vue-ripple-directive'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES RECICLADOS
import firmas from '../../../../../../components/firmas.vue'

export default {
  components: {
    // ETIQUETAS
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BOverlay,
    BFormDatepicker,
    BFormTimepicker,
    BFormTextarea,
    BAlert,
    vSelect,

    // COMPONENTES RECICLADOS
    firmas,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  directives: {
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      cargando: true,
      optionsParticipantes: [
        {
          id: 1,
          text: 'Constanza Gaete - Apoderado',
          nombre: 'Constanza Gaete',
          rol: 'Apoderado',
        },
        {
          id: 2,
          text: 'Thomas Torres - Fonoaudiologo',
          nombre: 'Thomas Torres',
          rol: 'Fonoaudiologo',
        },
        {
          id: 3,
          text: 'Felipe López - Psicologo',
          nombre: 'Felipe López',
          rol: 'Psicologo',
        },

        {
          id: 4,
          text: 'Esteban Efrain Sanchez Vidal - Psicologo Pie',
          nombre: 'Esteban Efrain Sanchez Vidal',
          rol: 'Psicologo PIE',
        },
      ],

      // REPEAT
      items: [],
      nextTodoId: 1,
    }
  },
  props: {
    apoyo: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      apoyo: {
        // rbd: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
        // },
        // nombre: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        // },
        // abreviatura: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        // },
        // correo: {
        //   $autoDirty: true,
        //   required: helpers.withMessage('El campo es requerido.', required),
        //   email: helpers.withMessage('Debe ser un correo valido.', email),
        // },
      }
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
  methods: {
    seleccionaParticipante (participante) {
      console.log('participante :', participante)

    },


    dateDisabled(ymd, date) {
      // Disable weekends (Sunday = `0`, Saturday = `6`) and
      // disable days that fall on the 13th of the month
      const weekday = date.getDay()
      const day = date.getDate()
      // Return `true` if the date should be disabled
      // return weekday === 0 || weekday === 6 || day === 1
      return weekday === 0 || weekday === 6
    },
    // submitOption() {
    //   console.log('this.v$ :', this.v$.apoyo)
    //   this.v$.apoyo.$touch()
    //   // if (!this.v$.apoyo.$invalid) {
    //   //   this.$emit('processForm', this.apoyo)
    //   // }
    // },


    // REPEAT
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += 1,
        tipo: 'select',
      })

      this.$nextTick(() => {
        this.trAddHeight(this.$refs.row[0].offsetHeight)
      })
    },
    repeateAgainDesdeCero() {
      this.items.push({
        id: this.nextTodoId += 1,
        tipo: 'input',
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

<style lang="scss" scoped>
@import '@core/scss/vue/libs/vue-flatpicker.scss';
@import '@core/scss/vue/libs/vue-select.scss';
.repeater-form {
  overflow: hidden;
  transition: .35s height;
}
</style>
