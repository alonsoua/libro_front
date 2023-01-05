<template>
  <div>
    <b-row>

      <!-- Field: Meses -->
      <b-col
        cols="12"
        md="12"
      >
        <b-form-group
          label="Mes"
          label-for="mes"
        >
          <v-select
            v-model="mes"
            placeholder="Selecciona un mes..."
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="texto"
            :options="mesesOption"
            :reduce="option => option.id"
          />
        </b-form-group>
      </b-col>
      <!-- Field: DIAS -->
      <!-- <b-col
        cols="6"
        md="6"
      >
        <b-form-group
          label="Curso"
          label-for="curso"
        >
          <v-select
            v-model="curso"
            placeholder="Selecciona un curso..."
            :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
            label="texto"
            :options="cursosOption"
            :reduce="option => option.id"
          />
        </b-form-group>
      </b-col> -->
    </b-row>

    <asistencias-alumnos-mes
      :mesSelected="mes"
    />

  </div>
</template>

<script>

import {
  BRow, BCol, BFormGroup,
} from 'bootstrap-vue'
import vSelect from 'vue-select'

// COMPONENTES HIJOS
import AsistenciasAlumnosMes from './AsistenciasMes/AsistenciasAlumnosMes.vue'

import { mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    vSelect,

    // COMPONENTES HIJOS
    AsistenciasAlumnosMes,
  },
  data() {
    return {
      mes: 12,
      mesesOption: [
        {
          id: 3,
          texto: 'Marzo'
        },
        {
          id: 4,
          texto: 'Abril'
        },
        {
          id: 5,
          texto: 'Mayo'
        },
        {
          id: 6,
          texto: 'Junio'
        },
        {
          id: 7,
          texto: 'Julio'
        },
        {
          id: 8,
          texto: 'Agosto'
        },
        {
          id: 9,
          texto: 'Septiembre'
        },
        {
          id: 10,
          texto: 'Octubre'
        },
        {
          id: 11,
          texto: 'Noviembre'
        },
        {
          id: 12,
          texto: 'Diciembre'
        },
      ],
    }
  },
  computed: {
    ...mapGetters({ getLibroSelected: 'libros/getLibroSelected', }),
    // Vuexy
  },
  watch: {
    getLibroSelected(val) {
      this.cargarAsistenciasMensual(this.getLibroSelected.id)
    },
    mes(val) {
      this.cargarAsistenciasMensual(this.getLibroSelected.id)
    }
  },
  mounted() {
    this.cargarAsistenciasMensual(this.getLibroSelected.id)
  },
  methods: {
    ...mapActions({
      fetchAsistenciasMensual: 'asistencias/fetchAsistenciasMensual',
    }),
    cargarAsistenciasMensual(id_curso) {
      const data = {
        id_curso,
        mes: this.mes
      }

      this.fetchAsistenciasMensual(data).then(() => {})
    },
  }
}
</script>
