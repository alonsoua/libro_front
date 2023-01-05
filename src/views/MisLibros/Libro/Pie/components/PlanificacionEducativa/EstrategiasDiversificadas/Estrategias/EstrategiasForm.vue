<template>
  <b-modal
    :id="nombreModal"
    :title="title"
    centered
    size="lg"
    cancel-title="Cancelar"
    cancel-variant="outline-secondary"
    ok-title="Guardar Estrategia"
    :ok-disabled="this.v$.estrategia.$errors.length > 0"
    @ok.prevent="submitOption"
  >
    <b-overlay
      :show="cargando"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <b-form>
        <!-- Reunión Info: Input Fields -->
        <b-row>

          <!-- Field: ESTRATEGIA -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Estrategia *"
              label-for="estrategia"
            >
              <b-form-textarea
                id="estrategia"
                placeholder="Ingresa la estrategia"
                v-model="estrategia.estrategia"
                rows="2"
                :state="v$.estrategia.estrategia.$error === true
                  ? false
                  : null"
                @blur.native="v$.estrategia.estrategia.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.estrategia.estrategia.$error"
                id="estrategiaInfo"
                class="text-right"
              >
                <p v-for="error of v$.estrategia.estrategia.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

          <!-- Field: AMBITO -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Ámbito o asignatura donde se aplicará *"
              label-for="id_asignatura"
            >
              <!-- <b-form-input
                id="id_asignatura"
                v-model="estrategia.id_asignatura"
                placeholder="Ingresa el ámbito o asignatura"
              /> -->

              <v-select
                v-model="estrategia.id_asignatura"
                placeholder="Selecciona una asignatura..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="asignaturasOption"
                :reduce="option => option.id"
                input-id="id_periodo"
                :class="v$.estrategia.id_asignatura.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.estrategia.id_asignatura.$error"
                id="id_asignaturaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.estrategia.id_asignatura.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: PERIODO -->
          <b-col
            cols="12"
            md="12"
          >
            <b-form-group
              label="Período de tiempo en que se aplicará *"
              label-for="periodo"
            >
              <!-- <b-form-input
                id="periodo"
                v-model="estrategia.periodo"
                placeholder="Ingresa el periodo"
              /> -->
              <v-select
                v-model="estrategia.id_periodo"
                placeholder="Selecciona un periodo..."
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="texto"
                :options="periodosOption"
                :reduce="option => option.id"
                input-id="id_periodo"
                :class="v$.estrategia.id_periodo.$error === true
                  ? 'border-danger rounded'
                  : ''"
              />
                <!-- :state="v$.estrategia.id_periodo.$error === true
                ? false
                : null"
                @blur.native="v$.estrategia.id_periodo.$touch" -->
              <div
                v-if="v$.estrategia.id_periodo.$error"
                id="id_periodoInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.estrategia.id_periodo.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>
          </b-col>

          <!-- Field: CRITERIOS -->
          <b-col
            cols="12"
            md="12"
          >
          <!-- INFORMATIVO -->
                  <!-- v-if="menu.informacion !== ''" -->
            <popover
              class="float-right"
              id="0"
              btnVariant="flat-secondary"
              :texto="informacion"
              direccion="right"
              style="margin-right: -4px; margin-top: -13px; margin-bottom: -8px;"
            />
            <b-form-group
              label="Criterios para la evaluación de la estrategia *"
              label-for="criterios"
            >

              <b-form-textarea
                id="criterios"
                placeholder="Ingresa los criterios"
                v-model="estrategia.criterios"
                rows="2"
                :state="v$.estrategia.criterios.$error === true
                  ? false
                  : null"
                @blur.native="v$.estrategia.criterios.$touch"
              />
              <b-form-invalid-feedback
                v-if="v$.estrategia.criterios.$error"
                id="criteriosInfo"
                class="text-right"
              >
                <p v-for="error of v$.estrategia.criterios.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </b-form-invalid-feedback>
            </b-form-group>
          </b-col>

        </b-row>

        <!-- <colLinea /> -->

        <!-- Action Buttons -->
        <!-- <btnSubmit
          v-if="cargando"
          variant="primary"
          :btnText="btnSubmit"
          @processBtn="submitOption"
        /> -->

      </b-form>

    </b-overlay>
  </b-modal>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BFormDatepicker, BFormTimepicker,
  BFormTextarea, BModal, VBModal
} from 'bootstrap-vue'
import vSelect from 'vue-select'

import { mapGetters, mapActions } from 'vuex'

// VALIDACIONES //
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'

// COMPONENTES
import popover from '../../../../../../../components/Form/popover.vue'
// import btnSubmit from '../../../../../../../components/Form/btnSubmit.vue'
// import colLinea from '../../../../../../../components/Form/colLinea.vue'

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
    vSelect,
    BModal,
    VBModal,

    // COMPONENTES
    popover,
    // colLinea,
    // btnSubmit,

  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      cargando: false,
      informacion: `Sugerencias de criterios para la evaluación de la estrategia: Recursos educativos responden a los distintos estilos de aprendizaje; Participación de todos los estudiantes, especialmente aquellos que presentan NEE; Logros de los objetivos planteados para la clase; Interacción entre los estudiantes; entre otros.`,
      // required,
      // email,
      periodosOption: [],
      asignaturasOption: [],
    }
  },
  computed: {
    ...mapGetters({
      getAsignaturasCurso: 'asignaturas/getAsignaturasCurso',
      getPeriodosEstablecimiento: 'periodos/getPeriodosEstablecimiento',
      getLibroSelected: 'libros/getLibroSelected',
      user: 'auth/user',
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
    getAsignaturasCurso(val) {
      this.asignaturasOption = []
      this.asignaturasOption = this.getAsignaturasCurso
    },
    getPeriodosEstablecimiento(val) {
      this.periodosOption = []
      this.periodosOption = this.getPeriodosEstablecimiento
    },
    getLibroSelected(val) {
      this.cargarAsignaturas(this.getLibroSelected.id)
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
    estrategia: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      estrategia: {
        estrategia: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 200 caracteres.', maxLength(200)),
        },
        id_asignatura: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        id_periodo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        criterios: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 200 caracteres.', maxLength(200)),
        },
      }
    }
  },
  mounted() {
    this.cargarAsignaturas(this.getLibroSelected.id)
    this.cargarPeriodos(this.user.id_establecimiento)
  },
  methods: {
    ...mapActions({
      fetchAsignaturasCurso: 'asignaturas/fetchAsignaturasCurso',
      fetchPeriodosEstablecimiento: 'periodos/fetchPeriodosEstablecimiento',
    }),
    cargarAsignaturas(idCurso) {
      // this.cargando = true
      this.fetchAsignaturasCurso(idCurso).then(() => {
        // this.cargando = false
      })
    },
    cargarPeriodos(idEstablecimiento) {
      // this.cargando = true
      this.fetchPeriodosEstablecimiento(idEstablecimiento).then(() => {
        // this.cargando = false
      })
    },
    submitOption() {
      this.v$.estrategia.$touch()
      if (!this.v$.estrategia.$invalid) {
        this.$emit('processForm', this.estrategia)
        // this.resetForm()
      }
    },
    resetForm() {
      this.estrategia = {
        estrategia: '',
        id_asignatura: null,
        id_periodo: null,
        criterios: '',
      }
      this.v$.$reset()
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
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
