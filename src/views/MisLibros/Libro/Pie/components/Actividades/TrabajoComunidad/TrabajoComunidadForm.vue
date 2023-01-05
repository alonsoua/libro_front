<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="xl"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Trabajo"
    :ok-disabled="this.v$.actividad.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="cargando"
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

          <!-- PARTICIPANTES -->
          <b-col md="8">
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
                placeholder="Selecciona un participante..."
                :getOptionLabel="option => option.text"
                :reduce="option => option.id_persona_rol"
                @input="seleccionaParticipante(item)"
              />

              <b-form-input
                v-if="item.tipo === 'input'"
                :id="'participantes-'+item.id"
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
          <!-- <b-col md="4">
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
          </b-col> -->


          <!-- FIRMA -->
          <b-col
            lg="3"
            md="3"
          >
            <b-form-group
              label="Firma"
              :label-for="'firma-'+item.id"
              class="text-center"
            >
              <firmas
                v-if="typeof item.participantes !== 'undefined' ? true : false"
                :modulo="nombre_permiso"
                :idUsuario.sync="item.participantes.id"
                :nombreCompleto.sync="item.participantes.nombre"
                :data.sync="item"
                text="Firmar participación en el registro de trabajo con la familia, apoderados y/o con el o la estudiante"
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

      <!-- <b-button
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
      </b-button> -->

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
                v-model="actividad.fecha"
                id="fecha"
                placeholder="Abrir calendario"
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
                :state="v$.actividad.fecha.$error === true
                  ? false
                  : null"
                @blur.native="v$.actividad.fecha.$touch"
              />
                <!-- Mensajes Error Validación -->
                <b-form-invalid-feedback
                  v-if="v$.actividad.fecha.$error"
                  id="fechaInfo"
                  class="text-right"
                >
                  <p v-for="error of v$.actividad.fecha.$errors" :key="error.$uid">
                    {{ error.$message }}
                  </p>
                </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: OBJETIVOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Objetivos(s)"
              label-for="objetivo"
            >
              <b-form-textarea
                id="objetivo"
                placeholder="Ingresa los objetivo"
                v-model="actividad.objetivo"
                :state="v$.actividad.objetivo.$error === true
                  ? false
                  : null"
                @blur.native="v$.actividad.objetivo.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.actividad.objetivo.$error"
                id="objetivoInfo"
                class="text-right"
              >
                <p v-for="error of v$.actividad.objetivo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
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
                v-model="actividad.actividad"
                :state="v$.actividad.actividad.$error === true
                  ? false
                  : null"
                @blur.native="v$.actividad.actividad.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.actividad.actividad.$error"
                id="objetivoInfo"
                class="text-right"
              >
                <p v-for="error of v$.actividad.actividad.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: ACUERDOS COMPROMISOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Acuerdo(s) y/o compromiso(s)"
              label-for="acuerdo"
            >
              <b-form-textarea
                id="acuerdo"
                placeholder="Ingresa los acuerdos y/o compromisos"
                v-model="actividad.acuerdo"
                :state="v$.actividad.acuerdo.$error === true
                  ? false
                  : null"
                @blur.native="v$.actividad.acuerdo.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.actividad.acuerdo.$error"
                id="acuerdoInfo"
                class="text-right"
              >
                <p v-for="error of v$.actividad.acuerdo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: RESULTADOS -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Resultado(s)"
              label-for="resultado"
            >
              <b-form-textarea
                id="resultado"
                placeholder="Ingresa los resultado"
                v-model="actividad.resultado"
                :state="v$.actividad.resultado.$error === true
                  ? false
                  : null"
                @blur.native="v$.actividad.resultado.$touch"
              />
              <!-- Mensajes Error Validación -->
              <b-form-invalid-feedback
                v-if="v$.actividad.resultado.$error"
                id="acuerdoInfo"
                class="text-right"
              >
                <p v-for="error of v$.actividad.resultado.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>
        </b-row>
    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BAlert, BModal, VBModal,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import { heightTransition } from '@core/mixins/ui/transition'

import Ripple from 'vue-ripple-directive'
import { mapGetters, mapActions } from 'vuex'

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
    BModal,
    VBModal,
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
    'b-modal': VBModal,
    Ripple,
  },
  mixins: [heightTransition],
  data() {
    return {
      nombre_permiso: 'pieIV1',
      cargando: false,
      optionsParticipantes: [],

      // REPEAT
      items: [],
      nextTodoId: 1,
    }
  },
  computed: {
    ...mapGetters({
      getParticipantesPie: 'personas/getParticipantesPie',
      getLibroSelected: 'libros/getLibroSelected',
    }),
    // Vuexy
    sortOptions() {
      // Create an options list from our fields
      return this.fields
        .filter(f => f.sortable)
        .map(f => ({ text: f.label, value: f.key }))
    },
  },
  watch: {
    getParticipantesPie(val) {
      this.totalRows = val.length
      this.optionsParticipantes = []
      this.optionsParticipantes = this.getParticipantesPie
    },
    getLibroSelected(val) {
      this.cargarParticipantes(this.getLibroSelected.id)
    },
  },
  props: {
    nombreModal: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    actividad: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      actividad: {
        fecha: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        objetivo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 500 caracteres.', maxLength(500)),
        },
        actividad: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 500 caracteres.', maxLength(500)),
        },
        acuerdo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 500 caracteres.', maxLength(500)),
        },
        resultado: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 500 caracteres.', maxLength(500)),
        },
      }
    }
  },
  mounted() {
    this.cargarParticipantes(this.getLibroSelected.id)
    this.initTrHeight()
    if (typeof this.actividad.participantes !== 'undefined') {
      this.cargarItems(this.actividad.participantes)
    }
  },
  created() {
    window.addEventListener('resize', this.initTrHeight)
  },
  destroyed() {
    window.removeEventListener('resize', this.initTrHeight)
  },
  methods: {
    ...mapActions({
      fetchParticipantes: 'personas/fetchParticipantesPie',
    }),
    cargarParticipantes (idCurso) {
      this.cargando = true
      this.fetchParticipantes(idCurso).then(() => {
        this.cargando = false
      })
    },
    cargarItems(participantes) {
      this.items = []
      participantes.forEach(participante => {
        this.items.push({
          id: participante.id_persona_rol,
          tipo: 'select',
          participantes: participante.id_persona_rol, //
          rol: participante.nombre_rol,
        })
      })
    },
    seleccionaParticipante (participante) {
    },
    submitOption() {
      this.v$.actividad.$touch()
        // this.cargando = true
      if (!this.v$.actividad.$invalid) {
        if (this.items.length === 0) {
          alert('Debe agregar al menos un participante.')
        } else {
          let personas = []
          this.items.forEach(item => {
            personas.push(item.participantes)
          })
          const data = {
            fecha: this.actividad.fecha,
            texto_1: this.actividad.objetivo,
            texto_2: this.actividad.actividad,
            texto_3: this.actividad.acuerdo,
            texto_4: this.actividad.resultado,
            personas,
          }
          this.$emit('processForm', data)
        }
        // this.cargando = false
      }
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
        if (typeof this.$refs.form !== 'undefined') {
          this.trSetHeight(this.$refs.form.scrollHeight)
        }
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
