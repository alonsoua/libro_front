<template>
  <b-tabs
    align="center"
    fill
  >
    <div
      v-for="(menu, key) in submenus"
      :key="key"
    >
      <b-tab
        lazy
        :active="menu.active"
      >

        <!-- MENU TAB -->
        <template #title>
          <span
            class="d-none d-sm-inline"
          >
            {{ menu.index }}.
            {{ menu.abreviatura }}
          </span>
        </template>

        <colLinea
          style="margin-top: -14px; margin-bottom: 20px;"
        />

        <!-- ENCABEZADO -->
        <div class="meetup-header d-flex align-items-center">
          <div class="meetup-day">

            <!-- INDEX -->
            <h4 :class="{ 'mb-0 ml-1' : true, 'text-primary': menu.index === '4' ||  menu.index === '5' }">
              {{ menu.index }}
            </h4>
          </div>
          <div class="my-auto ml-1">

            <!-- TÍTULO -->
            <b-card-title
              v-if="menu.titulo !== ''"
              class="mb-25"
              style="margin-top: 4px;"
            >
              <div
                :class="{ 'text-primary': menu.index === '4' ||  menu.index === '5' }"
              >
                {{ menu.titulo }}

                <!-- INFORMATIVO -->
                <popover
                  v-if="menu.informacion !== ''"
                  class="float-right"
                  id="0"
                  btnVariant="flat-secondary"
                  :texto="menu.informacion"
                  direccion="right"
                  style="margin-left: -6px; margin-top: -15px; margin-bottom: -10px;"
                />
              </div>
            </b-card-title>

            <!-- TEXTO -->
            <b-card-text
              v-if="menu.texto !== ''"
              class="mr-4 mb-0 text-secondary"
            >
              {{ menu.texto }}
            </b-card-text>
          </div>
        </div>

        <colLinea
          v-if="menu.index !== '4' && menu.index !== '5'"
          ancho="100%"
          align="center"
          class="mt-2"
        />

        <!-- COMPONENTS -->
        <estrategias-diversificadas
          v-if="menu.index === '1'"
          class="mt-3 mb-3"
          :submenus="menu.submenus"
        />
        <trabajo-colaborativo
          v-if="menu.index === '2'"
          class="mt-3 mb-3"
          :submenus="menu.submenus"
        />
        <diversidad-adecuacion
          v-if="menu.index === '3'"
          class="mt-3 mb-3"
          :submenus="menu.submenus"
        />
        <plan-apoyo
          v-if="menu.index === '4'"
          class="mt-1 mb-3"
          :submenus="menu.submenus"
        />

        <estrategias-trabajo
          v-if="menu.index === '5'"
          class="mt-3 mb-3"
          :submenus="menu.submenus"
        />
      </b-tab>
    </div>

  </b-tabs>
</template>
<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BTab, BTabs, BCardText, BCardTitle
} from 'bootstrap-vue'

// Componentes //
import colLinea from '../../../../components/Form/colLinea.vue'
import popover from '../../../../components/Form/popover.vue'
import estrategiasDiversificadas from './PlanificacionEducativa/EstrategiasDiversificadas.vue'
import trabajoColaborativo from './PlanificacionEducativa/TrabajoColaborativo.vue'
import diversidadAdecuacion from './PlanificacionEducativa/DiversidadAdecuacion.vue'
import planApoyo from './PlanificacionEducativa/PlanApoyo.vue'
import estrategiasTrabajo from './PlanificacionEducativa/EstrategiasTrabajo.vue'
// import notas from './Notas/Notas.vue'
// import asistencias from './Asistencias/Asistencias.vue'
// import anotaciones from './Anotaciones/Anotaciones.vue'

// import libroMenuAsistencia from './LibroMenuAsistencia.vue'

export default {
  components: {
    // Etiquetas
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BTab,
    BTabs,
    BCardText,
    BCardTitle,

    // Components
    colLinea,
    popover,
    estrategiasDiversificadas,
    trabajoColaborativo,
    diversidadAdecuacion,
    planApoyo,
    estrategiasTrabajo,
  },
  data() {
    return {}
  },
  props: {
    submenus: {
      type: Array,
      required: true,
    }
  },
  methods: {
  },
}
</script>
