<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <!-- <b-form> -->
      <!-- Reunión Info: Input Fields -->
      <b-row>

        <!-- Field: ALUMNOS -->
        <b-col
          cols="12"
          md="12"
        >
          <b-form-group
            label="Plan de apoyos *"
            label-for="plan"
          >

            <v-select
              v-model="logros.alumnos"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              multiple
              label="title"
              :options="optionsAlumnos"
              placeholder="Selecciona el plan de apoyo"
            />
              <!-- :state="v$.logros.asistentes.$error === true
              ? false
              : null"
              @blur.native="v$.logros.asistentes.$touch" -->
            <!-- <b-form-invalid-feedback
              v-if="v$.logros.asistentes.$error"
              id="asistentesInfo"
            >
              <p v-for="error of v$.logros.asistentes.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback> -->
          </b-form-group>
        </b-col>

      </b-row>

      <!-- REPEAT -->
        <!-- :style="{height: trHeight}" -->
      <b-form-group
        label="Registro de logros"
        label-for="objetivos"
        class="mb-1 mt-1 h3"
      />
      <b-form
        ref="form"
        class="repeater-form overflow-auto border-light"
        style="min-height: 540px !important; max-height: 540px !important; margin: 0px 0px 0px 0px; padding: 20px 18px 0px 18px;"
        @submit.prevent="repeateAgain"
      >
        <b-alert
          v-if="items.length === 0"
          variant="primary"
          show
        >
          <div class="alert-body">
            <span>No existen logros agregados.</span>
          </div>
        </b-alert>
        <b-row
          v-for="(item, index) in items"
          :id="item.id"
          :key="item.id"
          ref="row"
        >

          <!-- ESTUDIANTES -->
          <b-col md="3">
            <b-form-group
              label="Estudiante(s)"
              :label-for="'fecha-'+item.id"
            >
              <v-select
                v-model="item.estudiantes"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                multiple
                label="title"
                :options="optionsEstudiantes"
                placeholder="Selecciona el o los estudiantes"
              />
            </b-form-group>
          </b-col>

          <!-- LOGROS -->
          <b-col md="4">
            <b-form-group
              label="Logros más relevantes"
              :label-for="'logros-'+item.id"
            >
              <b-form-input
              id="logros"
              placeholder="Ingresa los logros más relevantes"
              v-model="item.logros"
            />
            </b-form-group>
          </b-col>

          <!-- COMNENTARIOS Y SUGERENCIAS -->
          <b-col md="4">
            <b-form-group
              label="Comentarios y sugerencias"
              :label-for="'comentariosSugerencias-'+item.id"
            >
              <b-form-input
                id="comentariosSugerencias"
                placeholder="Ingresa los comentarios y sugerencias"
                v-model="item.comentarios"
              />
            </b-form-group>
          </b-col>


          <!-- FIRMA -->
          <!-- <b-col
            lg="1"
            md="1"
          >
            <b-form-group
              label="Firma"
              :label-for="'firma-'+item.id"
            >
              <firmas
                :data.sync="item"
                text="Firmar logros registrado para un estudiante o grupo de estudiantes"
              />
            </b-form-group>
          </b-col> -->

          <!-- Remove Button -->
          <b-col
            lg="1"
            md="1"
            class="mb-50 text-right"
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
        <span>Agregar logros</span>
      </b-button>
    </b-form>
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
      optionsAlumnos: [
        {
          value: 1,
          title: 'Catalina Gaete - Martín López',
        },
        {
          value: 2,
          title: 'Thomas Torres - Samanta Vásquez - Catalina Gaete - Martín López',
        },
        {
          value: 3,
          title: 'Felipe López',
        },
      ],
      optionsEstudiantes: [
        {
          value: 1,
          title: 'Catalina Gaete',
        },
        {
          value: 2,
          title: 'Martín López',
        },
        {
          value: 3,
          title: 'Thomas Torres',
        },
        {
          value: 4,
          title: 'Samanta Vásquez',
        },
        {
          value: 5,
          title: 'Felipe López',
        },
      ],

      // REPEAT
      items: [],
      nextTodoId: 1,
    }
  },
  props: {
    logros: {
      type: Object,
      required: true,
    },
  },
  validations() {
    return {
      logros: {
        rbd: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 8 caracteres.', maxLength(8)),
        },
        nombre: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 250 caracteres.', maxLength(250)),
        },
        abreviatura: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          maxLength: helpers.withMessage('Debe tener un máximo de 10 caracteres.', maxLength(10)),
        },
        correo: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
          email: helpers.withMessage('Debe ser un correo valido.', email),
        },
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
    //   console.log('this.v$ :', this.v$.logros)
    //   this.v$.logros.$touch()
    //   // if (!this.v$.logros.$invalid) {
    //   //   this.$emit('processForm', this.logros)
    //   // }
    // },

    // REPEAT
    repeateAgain() {
      this.items.push({
        id: this.nextTodoId += 1,
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
