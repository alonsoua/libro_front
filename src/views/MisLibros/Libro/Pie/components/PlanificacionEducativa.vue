<template>
  <b-tabs
    align="left"
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
            class="d-none d-inline mb-25"
          >
            {{ menu.index }}.
            {{ menu.abreviatura }}
          </span>
        </template>

        <colLinea
          style="margin-top: -15px; margin-bottom: 24px;"
        />

        <!-- ENCABEZADO -->
        <div class="meetup-header d-flex align-items-center">
          <div class="meetup-day">

            <!-- INDEX -->
            <b-card-text
              v-if="menu.index !== '4' && menu.index !== '5'"
              class="mb-0 ml-2"
            >
              {{ menu.index }}
            </b-card-text>
            <b-card-title
              v-else
              class="mb-0 ml-2"
            >
              {{ menu.index }}
            </b-card-title>
          </div>
          <div class="my-auto ml-1">

            <!-- TÍTULO -->
            <b-card-text
              v-if="menu.index !== '4' && menu.index !== '5'"
              class="mb-25"
              style="margin-top: 0px;"
            >
              <div
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
            </b-card-text>
            <b-card-title
              v-else
              class="mb-25"
              style="margin-top: 0px;"
            >
              <div
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
              style="margin-bottom: 1px;"
            >
              {{ menu.texto }}
            </b-card-text>
          </div>
        </div>

        <colLinea
          ancho="100%"
          align="center"
          class="mt-1"
        />

        <!-- COMPONENTS -->
        <estrategias-diversificadas
          v-if="menu.index === '1'"
          class="mt-2 mb-25 ml-25 mr-25"
          :submenus="menu.submenus"
        />
        <trabajo-colaborativo
          v-if="menu.index === '2'"
          class="mt-2 mb-25 ml-25 mr-25"
          :submenus="menu.submenus"
        />
        <diversidad-adecuacion
          v-if="menu.index === '3'"
          class="mt-2 mb-25 ml-25 mr-25"
          :submenus="menu.submenus"
        />
        <plan-apoyo
          v-if="menu.index === '4'"
          class="mt-1 mb-3 ml-2 mr-2"
          :submenus="menu.submenus"
        />

        <estrategias-trabajo
          v-if="menu.index === '5'"
          class="mt-3 mb-2 ml-3 mr-3"
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
