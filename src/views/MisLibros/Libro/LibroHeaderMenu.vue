<template>
  <div>

    <b-card
      aria-hidden="true"
      class="mt-1"
      style="margin-bottom: 12px; "
    >
      <!-- Menu Info: Input Fields -->
      <b-tabs
        v-model="tabIndex"
        style="margin: -10px 0px -26px 0px!important;"
        justified
        pills
      >
        <!-- Tab: Lista -->
        <b-tab lazy>
          <template #title>
            <feather-icon
              icon="ListIcon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Lista</span>
          </template>

        </b-tab>

        <!-- Tab: Notas -->
        <b-tab lazy>
          <template #title>
            <feather-icon
              icon="EditIcon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Notas</span>
          </template>
        </b-tab>

        <!-- Tab: Libro Pie -->
        <b-tab active lazy>
          <template #title>
            <feather-icon
              icon="FeatherIcon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Registro PIE</span>
          </template>
        </b-tab>

        <!-- Tab: Asistencia -->
        <b-tab lazy>
          <template #title>
            <feather-icon
              icon="CheckSquareIcon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Asistencias</span>
          </template>
        </b-tab>

        <!-- Tab: Anotaciones -->
        <b-tab lazy>
          <template #title>
            <feather-icon
              icon="ClipboardIcon"
              size="18"
              class="mr-0 mr-sm-50"
            />
            <span class="d-none d-sm-inline">Anotaciones</span>
          </template>
        </b-tab>

      </b-tabs>
    </b-card>

    <!-- COMPONENTES -->
    <b-card
      v-if="tabIndex === 0"
      aria-hidden="false"
    >
    <lista />
    </b-card>
    <b-card
      v-if="tabIndex === 1"
      aria-hidden="false"
    >
      <notas/>
    </b-card>
    <b-card
      v-if="tabIndex === 2"
    >
      <pie />
    </b-card>
    <b-card
      v-if="tabIndex === 3"
      aria-hidden="false"
    >
      <asistencias />
    </b-card>
    <b-card
      v-if="tabIndex === 4"
      aria-hidden="false"
    >
      <anotaciones />
    </b-card>
  </div>
</template>
<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BTab, BTabs,
  BCard
} from 'bootstrap-vue'

// Componentes //
import colLinea from '../../components/Form/colLinea.vue'
import lista from './Lista/Lista.vue'
import notas from './Notas/Notas.vue'
import pie from './Pie/Pie.vue'
import asistencias from './Asistencias/Asistencias.vue'
import anotaciones from './Anotaciones/Anotaciones.vue'

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
    BCard,
    BTab,
    BTabs,

    // Components
    colLinea,
    lista,
    notas,
    pie,
    asistencias,
    anotaciones,
  },
  data() {
    return {
      tabIndex: null,
      // required,
    }
  },
  watch: {
  },
  props: {
  },
  methods: {
  },
}
</script>
