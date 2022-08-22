<template>
  <establecimientoForm
    btnSubmit="Crear Establecimiento"
    :establecimiento="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import establecimientoForm from './components/EstablecimientosForm.vue'

export default {
  components: {
    establecimientoForm,
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
    ...mapActions({ createEstablecimiento: 'establecimientos/addEstablecimientos' }),
    agregar(establecimiento) {
      this.createEstablecimiento(establecimiento).then(() => {
        const errorEstablecimientos = store.state.establecimientos
        const errorMessage = errorEstablecimientos.errorMessage.errors
        if (!errorEstablecimientos.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Establecimiento creado 👍',
              icon: 'CheckIcon',
              text: `El establecimiento "${establecimiento.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'establecimientos',
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
