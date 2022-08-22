<template>
  <div v-if="selectedLibro">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <librosForm
        btnSubmit="Editar Libro"
        :libro="selectedLibro"
        @processForm="editar"
      />
    </b-overlay>
  </div>
</template>

<script>

import { BOverlay } from 'bootstrap-vue'
import { mapActions, mapState } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import librosForm from './components/LibrosForm.vue'

export default {
  components: {
    librosForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('libros', ['selectedLibro']),
  },
  methods: {
    ...mapActions({ updateLibro: 'libros/updateLibro' }),
    editar(libro) {
      this.spinner = true
      this.updateLibro(libro).then(() => {
        const errorLibros = store.state.libros
        const errorMessage = errorLibros.errorMessage.errors
        if (!errorLibros.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Libro editado 👍',
              text: `El libro "${libro.nombre}" fue editado con éxito!`,
              icon: 'CheckIcon',
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
        } else if (errorLibros.error) {
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
        this.spinner = false
      })
    },
  },
}
</script>
