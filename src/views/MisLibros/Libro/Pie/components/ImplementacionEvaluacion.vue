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
            <h4 class="mb-0 ml-2">
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
              <div class="d-flex">
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
          ancho="100%"
          align="center"
          class="mt-2"
        />

        <!-- HIJOS -->

        <aplicacion-evaluacion
          v-if="menu.index === '1'"
          class="mt-2 mb-3 ml-25 mr-2"
          :submenus="menu.submenus"
        />

        <apoyos-estudiantes
          v-if="menu.index === '2'"
          class="mt-1 mb-3 ml-2 mr-2"
          :submenus="menu.submenus"
        />

        <logros-aprendizaje
          v-if="menu.index === '3'"
          class="mt-1 mb-3 ml-2 mr-2"
          :submenus="menu.submenus"
        />

      </b-tab>
    </div>

  </b-tabs>
</template>
<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BTab, BTabs, BCardText, BCardTitle
} from 'bootstrap-vue'

// RECICLADOS
import colLinea from '../../../../components/Form/colLinea.vue'
import popover from '../../../../components/Form/popover.vue'

// HIJOS
import AplicacionEvaluacion from './ImplementacionEvaluacion/AplicacionEvaluacion.vue'
import ApoyosEstudiantes from './ImplementacionEvaluacion/ApoyosEstudiantes.vue'
import LogrosAprendizaje from './ImplementacionEvaluacion/LogrosAprendizaje.vue'

export default {
  components: {
    // ETIQUETAS
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

    // RECICLADOS
    colLinea,
    popover,

    // HIJOS
    AplicacionEvaluacion,
    ApoyosEstudiantes,
    LogrosAprendizaje,
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
}
</script>
