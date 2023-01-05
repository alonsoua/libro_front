<template>
  <div v-if="selectedLibro">
    <libro-header-info
      :libro="selectedLibro"
    />

    <libro-header-menu

    />

  </div>
</template>

<script>

import { mapActions, mapState, mapGetters } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import LibroHeaderInfo from './Libro/LibroHeaderInfo.vue'
import LibroHeaderMenu from './Libro/LibroHeaderMenu.vue'

export default {
  components: {
    LibroHeaderInfo,
    LibroHeaderMenu,
  },
  data() {
    return {
      data: {
        idCurso: 1,
        libro: '',
        estado: null,
      },
    }
  },
  computed: {
    ...mapGetters({ getLibros: 'libros/getLibros' }),
    ...mapState('libros', ['selectedLibro']),
  },
  watch: {
    getLibros(val) {
      this.totalRows = val.length
      this.items = []
      this.items = this.getLibros
    },
  },
  mounted() {
  },
  methods: {
    ...mapActions({ createLibro: 'libros/addLibros' }),
    agregar(libro) {
      this.createLibro(libro).then(() => {
        const errorLibros = store.state.libros
        const errorMessage = errorLibros.errorMessage.errors
        if (!errorLibros.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Libro creado 👍',
              icon: 'CheckIcon',
              text: `El libro "${libro.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'libros',
          })
        } else if (errorMessage.nombre) {
          this.$swal({
            title: 'Error!',
            text: `${errorMessage.nombre[0]}!`,
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        } else {
          this.$swal({
            title: 'Error!',
            text: 'Ingreso de datos fraudulento!',
            icon: 'error',
            customClass: {
              confirmButton: 'btn btn-primary',
            },
            buttonsStyling: false,
          })
        }
      })
    },
  },
}
</script>
