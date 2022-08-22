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
            <h4 class="mb-0 ml-1">
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

        <!-- COMPONENTS -->

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
// import lista from './Lista/Lista.vue'
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
    // lista,
    // notas,
    // libroPie,
    // asistencias,
    // anotaciones,
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
