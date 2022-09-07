<template>
  <b-tabs
    class="mt-2"
    vertical
    fill
    nav-wrapper-class="nav-vertical"
    active-tab-class="font-weight-bold text-primary"
  >
    <div
      v-for="(menu, key) in submenus"
      :key="key"
    >
      <b-tab
        :active="menu.active"
        lazy
        :title="menu.index.toUpperCase()+`. `+menu.abreviatura"
      >
        <!-- ENCABEZADO -->
        <div class="meetup-header d-flex align-items-center">

          <div class="meetup-day">

            <!-- INDEX -->
            <h4 class="mb-0">
              {{ menu.index.toUpperCase() }}
            </h4>

          </div>

          <div class="ml-1">

            <!-- TÍTULO -->
            <b-card-title
              v-if="menu.titulo !== ''"
              class="mb-25 h4"
              style="margin-top: 4px; "
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

        <!-- HIJOS -->
        <aplicacion
          v-if="menu.index === 'a'"
          class="mt-2"
        />
        <realizadas
          v-if="menu.index === 'b'"
          class="mt-2"
        />

      </b-tab>
    </div>
  </b-tabs>
</template>

<script>
// ETIQUETAS
import {
  BTabs, BTab, BCardText, BCard, BCardTitle,
} from 'bootstrap-vue'

// RECICLADOS
import popover from '../../../../../components/Form/popover.vue'

// HIJOS
import aplicacion from './AplicacionEvaluacion/Aplicacion.vue'
import realizadas from './AplicacionEvaluacion/Realizadas.vue'

export default {
  components: {
    // ETIQUETAS
    BCardText,
    BTabs,
    BTab,
    BCard,
    BCardTitle,

    // RECICLADOS
    popover,

    // HIJOS
    aplicacion,
    realizadas,
  },
  props: {
    submenus: {
      type: Array,
      required: true,
    }
  },
}
</script>
