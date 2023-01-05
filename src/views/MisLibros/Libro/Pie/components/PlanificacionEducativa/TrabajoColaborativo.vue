<template>
  <b-tabs
    class="mt-2"
    vertical
    fill
    nav-wrapper-class="nav-vertical"
    active-tab-class="font-weight-bold"
  >
    <div
      v-for="(menu, key) in submenus"
      :key="key"
      v-if="menu.can"
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
              style="margin-top: 4px;"
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

        <acciones
          v-if="menu.index === 'a'"
          class="mt-2"
        />

        <apoyos
          v-if="menu.index === 'b'"
          class="mt-2"
        />
      </b-tab>
    </div>
  </b-tabs>
</template>

<script>
import popover from '../../../../../components/Form/popover.vue'
import {
  BTabs, BTab, BCardText, BCard, BCardTitle,
} from 'bootstrap-vue'

import acciones from './TrabajoColaborativo/Acciones.vue'
import apoyos from './TrabajoColaborativo/Apoyos.vue'
// import especialistas from '../EquipoAula/IdentificacionEquipo/Especialistas.vue'
// import docentesPie from '../EquipoAula/IdentificacionEquipo/DocentesPie.vue'
// import coordinacion from '../EquipoAula/IdentificacionEquipo/Coordinacion.vue'

export default {
  components: {
    popover,
    BCardText,
    BTabs,
    BTab,
    BCard,
    BCardTitle,

    // componentes
    acciones,
    apoyos,
    // especialistas,
    // docentesPie,
    // coordinacion,
  },
  props: {
    submenus: {
      type: Array,
      required: true,
    }
  },
  data() {
    return {
    }
  },
  methods: {
  },
}
</script>
