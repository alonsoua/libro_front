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
        <div class="meetup-header d-flex align-items-center mt-2">
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
        <trabajo-familia
          v-if="menu.index === '1'"
          class="mb-3 ml-2 mr-2"
        />

        <trabajo-comunidad
          v-if="menu.index === '2'"
          class="mb-3 ml-2 mr-2"
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

// COMPONENTS
import colLinea from '../../../../components/Form/colLinea.vue'
import popover from '../../../../components/Form/popover.vue'

// HIJOS
import trabajoFamilia from './Actividades/TrabajoFamilia.vue'
import trabajoComunidad from './Actividades/TrabajoComunidad.vue'

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

    // COMPONENTS
    colLinea,
    popover,

    // HIJOS
    trabajoFamilia,
    trabajoComunidad,
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
