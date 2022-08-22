<template>
  <asistenciaForm
    btnSubmit="Crear Asistencia"
    :asistencia="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import asistenciaForm from './components/AsistenciasForm.vue'

export default {
  components: {
    asistenciaForm,
  },
  data() {
    return {
      data: {
        rbd: '',
        nombre: '',
        insignia: '',
        correo: '',
        telefono: '',
        direccion: '',
        dependencia: '',
        idPeriodoActivo: '',
        estado: null,
      },
    }
  },
  methods: {
    ...mapActions({ createAsistencia: 'asistencias/addAsistencias' }),
    agregar(asistencia) {
      this.createAsistencia(asistencia).then(() => {
        const errorAsistencias = store.state.asistencias
        const errorMessage = errorAsistencias.errorMessage.errors
        if (!errorAsistencias.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Asistencia creado 👍',
              icon: 'CheckIcon',
              text: `El asistencia "${asistencia.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'asistencias',
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
