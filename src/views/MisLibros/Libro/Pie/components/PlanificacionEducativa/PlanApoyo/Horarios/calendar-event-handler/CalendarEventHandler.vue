<template>
  <div>
    <b-sidebar
      id="sidebar-add-new-event"
      sidebar-class="sidebar-lg"
      :visible="isEventHandlerSidebarActive"
      bg-variant="white"
      shadow
      backdrop
      no-header
      right
      @change="(val) => $emit('update:is-event-handler-sidebar-active', val)"
    >
      <template #default="{ hide }">
        <!-- Header -->
        <div class="d-flex justify-content-between align-items-center content-sidebar-header px-2 py-1">
          <h5 class="mb-0">
            {{ event.id ? 'Editar': 'Agregar' }} Horario
          </h5>
          <div>
            <feather-icon
              v-if="event.id"
              icon="TrashIcon"
              title="Eliminar horario"
              class="cursor-pointer"
              @click="$emit('remove-event', event); hide();"
            />
            <feather-icon
              class="ml-1 cursor-pointer"
              icon="XIcon"
              size="16"
              @click="hide"
            />
          </div>
        </div>

        <validation-observer
          #default="{ handleSubmit }"
          ref="refFormObserver"
        >
          <!-- Form -->
          <b-alert
            v-if="optionsApoyos.length === 0"
            variant="primary"
            show
            class="text-center mt-25 mr-25 ml-25 pb-2 pt-1"
          >
            <div class="alert-title h4 text-primary pt-1">
              <b>Importante!</b>
            </div>
            <div class="alert-body">
              <span>Para agregar un horario, debe seleccionar al <br>menos un
                "Apoyo(s) especializado(s) requerido(s)"
                en el formulario "Registrar plan de apoyo individual".</span>
            </div>
          </b-alert>
          <b-form
            class="p-2"
            @submit.prevent="submitOption()
              ? handleSubmit(onSubmit)
              : ''"
            @reset.prevent="resetForm"
          >
            <!-- @submit.prevent="handleSubmit(onSubmit)" -->

            <!-- DIA -->
            <b-form-group
              label="Apoyo especializado *"
              label-for="event-apoyoEspecializado"
            >
              <v-select
                v-model="horario.apoyoEspecializado"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="title"
                :options="optionsApoyos"
                placeholder="Selecciona el apoyo"
                :class="v$.horario.apoyoEspecializado.$error === true
                  ? 'border-danger rounded'
                  : ''"
                :disabled="optionsApoyos.length === 0"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.horario.apoyoEspecializado.$error"
                id="apoyoEspecializadoInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.horario.apoyoEspecializado.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>

            </b-form-group>

            <!-- DIA -->
            <b-form-group
              label="Día *"
              label-for="event-dia"
            >
              <v-select
                v-model="horario.dia"
                :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
                label="name"
                :options="optionsDias"
                placeholder="Selecciona el día"
                :class="v$.horario.dia.$error === true
                  ? 'border-danger rounded'
                  : ''"
                :disabled="optionsApoyos.length === 0"
              />
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.horario.dia.$error"
                id="diaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.horario.dia.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>

            </b-form-group>

            <!-- Hora Inicio -->
            <b-form-group
              label="Hora Inicio *"
              label-for="hora-inicio"
            >
              <!-- :state="getValidationState(validationContext)" -->
              <!-- <flat-pickr
                v-model="eventLocal.start"
                class="form-control"

              /> -->

              <b-input-group>
                <cleave
                  id="time"
                  v-model='horario.hora_inicio'
                  :class="v$.horario.hora_inicio.$error === true
                  ? 'form-control border-danger rounded'
                  : 'form-control'"
                  :raw="false"
                  :options="time"
                  placeholder="hh:mm"
                  :disabled="optionsApoyos.length === 0"
                />

                <b-input-group-append>
                  <b-form-timepicker
                    v-model='horario.hora_inicio'
                    button-only
                    size='sm'
                    @keyup='formatHoraInput(horario.hora_inicio)'
                    aria-controls='hora_inicio'
                    hide-header
                    right
                    locale='es-CL'
                    no-close-button
                  />
                </b-input-group-append>
              </b-input-group>
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.horario.hora_inicio.$error"
                id="diaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.horario.hora_inicio.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>

            <!-- Hora Termino -->
            <b-form-group
              label="Hora Termino *"
              label-for="hora-termino"
            >
              <!-- :state="getValidationState(validationContext)" -->
              <!-- <flat-pickr
                v-model="eventLocal.start"
                class="form-control"

              /> -->

              <b-input-group>
                <cleave
                  id="time"
                  v-model='horario.hora_termino'
                  class="form-control"
                  :raw="false"
                  :options="time"
                  placeholder="hh:mm"
                  :class="v$.horario.hora_termino.$error === true
                  ? 'form-control border-danger rounded'
                  : 'form-control'"
                  :disabled="optionsApoyos.length === 0"
                />

                <b-input-group-append>
                  <b-form-timepicker
                    v-model='horario.hora_termino'
                    button-only
                    size='sm'
                    @keyup='formatHoraInput(horario.hora_termino)'
                    aria-controls='hora_termino'
                    hide-header
                    right
                    locale='es-CL'
                    no-close-button
                  />
                </b-input-group-append>
              </b-input-group>
              <!-- Mensajes Error Validación -->
              <div
                v-if="v$.horario.hora_termino.$error"
                id="diaInfo"
                class="text-danger text-right"
                style="font-size: 0.857rem;"
              >
                <p v-for="error of v$.horario.hora_termino.$errors" :key="error.$uid">
                  {{ error.$message }}
                </p>
              </div>
            </b-form-group>

            <!-- All Day -->
            <!-- <b-form-group>
              <b-form-checkbox
                v-model="eventLocal.allDay"
                name="check-button"
                switch
                inline
              >
                Todos los días
              </b-form-checkbox>
            </b-form-group> -->

            <!-- Form Actions -->
            <div class="d-flex mt-2">
              <b-button
                v-ripple.400="'rgba(255, 255, 255, 0.15)'"
                variant="primary"
                class="mr-2"
                type="submit"
                :disabled="v$.horario.$errors.length > 0
                  ? optionsApoyos.length === 0
                  : optionsApoyos.length === 0 "
              >
                {{ event.id ? 'Editar Horario' : 'Agregar Horario ' }}
              </b-button>
              <b-button
                v-ripple.400="'rgba(186, 191, 199, 0.15)'"
                type="reset"
                variant="outline-secondary"
                @click="hide"
              >
                Cancelar
              </b-button>
            </div>
          </b-form>
        </validation-observer>
      </template>
    </b-sidebar>
  </div>
</template>

<script>
import {
  BSidebar, BForm, BFormGroup, BFormInput, BFormCheckbox, BAvatar, BFormTextarea,
  BButton, BFormInvalidFeedback, BFormTimepicker, BInputGroup, BInputGroupAppend,
  BAlert,
} from 'bootstrap-vue'
import vSelect from 'vue-select'
import flatPickr from 'vue-flatpickr-component'
import Ripple from 'vue-ripple-directive'

import { ValidationProvider, ValidationObserver } from 'vee-validate'
import formValidation from '@core/comp-functions/forms/form-validation'

import { mapActions, mapGetters } from 'vuex'

// CLEAVE
import Cleave from 'vue-cleave-component'
// eslint-disable-next-line import/no-extraneous-dependencies
import 'cleave.js/dist/addons/cleave-phone.us'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'

// FORMATOS
import { formatos } from '@core/mixins/ui/formatos'

import { ref, toRefs } from '@vue/composition-api'
import useCalendarEventHandler from './useCalendarEventHandler'
import useCalendar from '../useCalendar'

export default {
  components: {
    BButton,
    BSidebar,
    BForm,
    BFormGroup,
    BFormInput,
    BFormCheckbox,
    BFormTextarea,
    BAvatar,
    BFormInvalidFeedback,
    BFormTimepicker,
    BInputGroup,
    BInputGroupAppend,
    BAlert,
    vSelect,
    flatPickr,
    ValidationProvider,
    ValidationObserver,
    Cleave,
  },
  directives: {
    Ripple,
  },
  mixins: [formatos],
  model: {
    prop: 'isEventHandlerSidebarActive',
    event: 'update:is-event-handler-sidebar-active',
  },
  computed: {
    ...mapGetters({
      getPlanApoyoHorario: 'II_4_plan_apoyo/getPlanApoyoHorario',
    }),
  },
  props: {
    isEventHandlerSidebarActive: {
      type: Boolean,
      required: true,
    },
    event: {
      type: Object,
      required: true,
    },
    clearEventData: {
      type: Function,
      required: true,
    },
    apoyoEspecializado: {
      type: Array,
      required: true,
    },
    idPlanApoyo: {
      type: Number,
      required: false,
    },
  },
  data() {
    return {
      // datatimer
      time: {
        time: true,
        timePattern: ['h', 'm'],
      },
      horario: [

      ],
      optionsDias: [
        {
          id: 1,
          name: 'Lunes',
        },
        {
          id: 2,
          name: 'Martes',
        },
        {
          id: 3,
          name: 'Miércoles',
        },
        {
          id: 4,
          name: 'Jueves',
        },
        {
          id: 5,
          name: 'Viernes',
        }
      ],
      optionsApoyos: [],
    }
  },
  watch: {
    apoyoEspecializado (apoyos) {
      this.setApoyos(apoyos)
    },
    event (val) {
      if (val.start !== "" && val.end !== "") {
        this.setHorario(val)
      } else {
        this.resetForm()
      }
    },
    isEventHandlerSidebarActive (val) {
      if (!val) {
        // Creado para que no se vea que se está reseteando al momento de cerrar
        // el side form
        setTimeout(() => this.resetFormHorario(), 200);
      }
    },
  },
  validations() {
    return {
      horario: {
        apoyoEspecializado: {
          required: helpers.withMessage('El campo es requerido.', required),
        },
        dia: {
          required: helpers.withMessage('El campo es requerido.', required),
        },
        hora_inicio: {
          required: helpers.withMessage('El campo es requerido.', required),
        },
        hora_termino: {
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  mounted() {
    if (this.apoyoEspecializado.length > 0) {
      this.setApoyos(this.apoyoEspecializado)
    }
  },
  methods: {
    ...mapActions({
      fetchPlanApoyoHorario: 'II_4_plan_apoyo/fetchPlanApoyoHorario',
    }),
    resetFormHorario() {
      this.horario = {}
    },
    setApoyos(apoyos) {
      this.optionsApoyos = apoyos
      this.horario = []
    },
    setHorario(event) {
      // fetch con el id
      this.fetchPlanApoyoHorario(event.id).then(() => {
        if (typeof this.getPlanApoyoHorario.id_persona_rol !== undefined) {
          const {
            id,
            dia,
            hora_inicio,
            hora_termino,
            nombre,
            primer_apellido,
            segundo_apellido,
          } = this.getPlanApoyoHorario
          const personaApoyo = this.optionsApoyos.find(oa => oa.value === this.getPlanApoyoHorario.id_persona_rol)
          this.horario = {
            id,
            apoyoEspecializado: personaApoyo,
            dia: this.optionsDias[dia-1],
            hora_inicio,
            hora_termino,
          }
        } else {
          this.resetForm()
        }
      })
    },
    submitOption() {
      this.v$.horario.$touch()
      if (!this.v$.horario.$invalid) {
        const {
          id,
          dia,
          hora_inicio,
          hora_termino,
          apoyoEspecializado,
        } = this.horario
        console.log('this.horario :', this.horario)
        const fechaSeleccionada = this.fechaSeleccionada(dia)
        const start = this.formatoFechaCalendar(fechaSeleccionada, hora_inicio)
        const end = this.formatoFechaCalendar(fechaSeleccionada, hora_termino)

        this.eventLocal = {
          id, // idHorario
          idPlanApoyo: this.idPlanApoyo,
          dia: dia.id,
          hora_inicio: hora_inicio,
          hora_termino: hora_termino,
          id_plan_apoyo_persona: apoyoEspecializado.id_plan_apoyo_persona,
          title: apoyoEspecializado.title,
          start,
          end,
          url: '',
          allDay: false,
          extendedProps: {
            calendar: 'Todo',
            description: '',
            guests: [],
            location: '',
          },
        }
        return true
      } else {
        return false
      }
    },
    fechaSeleccionada(dia) {
      const fecha = new Date()

      // Obtiene el id del día actual
      // Lun => 1, Mar => 2, Mie => 3, Jue => 4, Vie => 5
      const idDia = fecha.getDay()

      // resta el dia.id seleccionado con el idDia actual
      // para entender la diferencia de días que hay con el día seleccionado
      // y si es un día que está antes o después del día actual.
      const diferencia = dia.id - idDia
      if (Math.sign(diferencia) === 1) {                  // Después
        fecha.setDate(fecha.getDate() + diferencia - 1);
      } else if (Math.sign(diferencia) === -1) {          // Antes
        fecha.setDate(fecha.getDate() + diferencia - 1);
      } else if (Math.sign(diferencia) === 0) {
        fecha.setDate(fecha.getDate() - 1);
      }

      return fecha
    }
  },
  setup(props, { emit }) {
    /*
     ? This is handled quite differently in SFC due to deadlock of `useFormValidation` and this composition function.
     ? If we don't handle it the way it is being handled then either of two composition function used by this SFC get undefined as one of it's argument.
     * The Trick:

     * We created reactive property `clearFormData` and set to null so we can get `resetEventLocal` from `useCalendarEventHandler` composition function.
     * Once we get `resetEventLocal` function which is required by `useFormValidation` we will pass it to `useFormValidation` and in return we will get `clearForm` function which shall be original value of `clearFormData`.
     * Later we just assign `clearForm` to `clearFormData` and can resolve the deadlock. 😎

     ? Behind The Scene
     ? When we passed it to `useCalendarEventHandler` for first time it will be null but right after it we are getting correct value (which is `clearForm`) and assigning that correct value.
     ? As `clearFormData` is reactive it is being changed from `null` to corrent value and thanks to reactivity it is also update in `useCalendarEventHandler` composition function and it is getting correct value in second time and can work w/o any issues.
    */
    const clearFormData = ref(null)

    const {
      eventLocal,
      resetEventLocal,
      calendarOptions,

      // UI
      onSubmit,
      guestsOptions,
    } = useCalendarEventHandler(toRefs(props), clearFormData, emit)


    const {
      refFormObserver,
      getValidationState,
      resetForm,
      clearForm,
    } = formValidation(resetEventLocal, props.clearEventData)

    clearFormData.value = clearForm

    return {
      // Add New Event
      eventLocal,
      calendarOptions,
      onSubmit,
      guestsOptions,

      // VALIDACIONES
      v$: useVuelidate(),

      // Form Validation
      resetForm,
      refFormObserver,
      getValidationState,
    }
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
@import '@core/scss/vue/libs/vue-flatpicker.scss';
</style>
