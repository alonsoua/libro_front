<template>
  <b-overlay
    :show="cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
  >
    <b-card
      aria-hidden="true"
      class="mb-4"
      :bg-variant="$store.state.appConfig.layout.skin === 'semi-dark'
        ? 'light-primary'
        : $store.state.appConfig.layout.skin === 'light'
          ? 'light-primary'
          : ''"
    >

      <b-form>
        <b-row>
          <!-- PROFESOR JEFE -->
          <b-col
            xs="12"
            md="6"
          >
            <b-card-title
              class="text-left mb-25"
              style="margin-left: -5px;"
            >
                Profesor Jefe
            </b-card-title>
            <h5
              class="text-dark text-bold font-weight-normal text-left mt-1"
              style="margin-left: -5px;"
            >
                Paula Macarena Saavedra Sandoval
            </h5>
          </b-col>

          <!-- CURSO -->
          <b-col
            xs="12"
            md="6"
          >
            <b-card-title class="text-left mb-25">
                Curso
            </b-card-title>
            <v-select
              v-model="idCurso"
              placeholder="Selecciona el Curso"
              :dir="$store.state.appConfig.isRTL ? 'rtl' : 'ltr'"
              label="title"
              :options="cursosOption"
              :reduce="option => option.idCurso"
              input-id="idCurso"
              class="bg-light mb-2 mt-25"
              style="border-radius: 6px;"
              @input="changeLibro(idCurso)"
            />
          </b-col>

        </b-row>

        <!-- DETALLE DEL CURSO -->
        <b-tabs
          v-if="panorama.estilo || panorama.fortaleza || panorama.necesidad"
          class="mt-1"
          style="margin-left: -21px;"
        >
          <b-tab
            v-if="panorama.estilo"
            active
            title="Estilos y modos de aprendizaje"
            class="ml-2"
          >
            <b-card-text class="text-secondary" style="margin-left: -4px;">
              {{ panorama.estilo }}
            </b-card-text>
          </b-tab>
          <b-tab v-if="panorama.fortaleza" title="Fortalezas">
            <b-card-text class="text-secondary mb-2" style="margin-left: 17px;">
              {{ panorama.fortaleza }}
            </b-card-text>
          </b-tab>
          <b-tab v-if="panorama.necesidad" title="Necesidades de apoyo">
            <b-card-text class="text-secondary mb-2" style="margin-left: 17px;">
              {{ panorama.necesidad }}
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// ETIQUETAS
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BFormSelect, BCardText, BCardTitle,
  BTabs, BTab
} from 'bootstrap-vue'

import vSelect from 'vue-select'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, maxLength, email, helpers } from '@vuelidate/validators'
import { mapState, mapMutations, mapGetters, mapActions } from 'vuex'

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    vSelect,
    BOverlay,
    BCard,
    BFormSelect,
    BCardText,
    BCardTitle,
    BTabs,
    BTab,
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  data() {
    return {
      collapseType: 'border',
      cargando: false,
      idCurso: '',
      cursosOption: [],
      panorama:[],
    }
  },
  props: {
    libro: {
      type: Object,
      required: true,
    },
  },
  computed: {
    ...mapState('libros', ['libros']),
    ...mapGetters({
      getLibroSelected: 'libros/getLibroSelected',
      getPanorama: 'II_1_a_panorama/getPanorama',
    }),
  },
  watch: {
    getPanorama(getPanorama) {
      if (getPanorama.message !== 'Registro no existe') {
        this.panorama = getPanorama
      } else {
        this.panorama = {
          'estilo': false,
          'fortaleza': false,
          'necesidad': false,
        }
      }
    }
      // this.cargarPanorama(this.idCurso)
  },
  mounted() {
    this.idCurso = this.getLibroSelected.id
    this.cargarPanorama(this.idCurso)
    this.setCursosOption(this.libros)
  },
  methods: {
    ...mapMutations('libros', ['setLibro']),
    ...mapActions({
      fetchPanorama: 'II_1_a_panorama/fetchPanorama',
    }),
    cargarPanorama(idCurso) {
      this.cargando = true
      this.fetchPanorama(this.idCurso).then(() => {
        if (this.getPanorama.message !== 'Registro no existe') {
          this.panorama = this.getPanorama
        } else {
          this.panorama = {
            'estilo': false,
            'fortaleza': false,
            'necesidad': false,
          }
        }
        this.cargando = false
      })
    },
    changeLibro(id) {
      const libroSelected = this.libros.find(l => l.id === id)
      this.setLibro(libroSelected)
      this.idCurso = this.getLibroSelected.id
      this.cargarPanorama(this.idCurso)
    },
    setCursosOption(libros) {
      this.cargando = true
      libros.forEach(libro => {
        this.cursosOption.push({
          'idCurso': libro.id,
          'title': '1ero Básico '+libro.letra,
        })
        this.cargando = false
      })
    },
    submitOption() {
      this.v$.libro.$touch()
      // if (!this.v$.libro.$invalid) {
      //   this.$emit('processForm', this.libro)
      // }
    },
  },
}

</script>

<style lang="scss">
@import '@core/scss/vue/libs/vue-select.scss';
</style>