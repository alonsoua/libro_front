<template>
  <b-tabs
    justified
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
        <template #title>
          <span class="d-none d-sm-inline">
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
              class="mb-25 h5"
              style="margin-top: 4px;"
            >
              <div class="d-flex">
                {{ menu.titulo }}

                <!-- INFORMATIVO -->
                <popover
                  v-if="menu.informacion !== ''"
                  class=""
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
              class="mr-4 text-secondary"
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
        <identificacion-equipo
          v-if="menu.index === '1'"
          class="mt-3 mb-3"
        />

        <reuniones-coordinacion
          v-if="menu.index === '2'"
          class="mt-0 mb-3"
        />

      </b-tab>
    </div>
  </b-tabs>
</template>
<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BTab, BTabs, BCardText, BCard, BCardBody, BCardTitle
} from 'bootstrap-vue'

// Componentes //
import colLinea from '../../../../components/Form/colLinea.vue'
import popover from '../../../../components/Form/popover.vue'
import identificacionEquipo from './EquipoAula/IdentificacionEquipo.vue'
import reunionesCoordinacion from './EquipoAula/ReunionesCoordinacion.vue'

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
    BCard,
    BCardBody,
    BCardTitle,
    // Components
    colLinea,
    popover,
    identificacionEquipo,
    reunionesCoordinacion,
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
