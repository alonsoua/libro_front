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

import establecimientoForm from './EstablecimientosForm.vue'

export default {
  components: {
    establecimientoForm,
  },
  data() {
    return {
      data: {
        insignia: '',
        rbd: '',
        nombre: '',
        abreviatura: '',
        correo: '',
        celular: '',
        nombre_calle: '',
        numero_calle: '',
      },
    }
  },
  methods: {
    ...mapActions({ addEstablecimiento: 'establecimientos/addEstablecimiento' }),
    agregar(establecimiento) {
      this.addEstablecimiento(establecimiento).then(() => {
        const errorEstablecimientos = store.state.establecimientos
        const errorMessage = errorEstablecimientos.errorMessage.errors
        if (!errorEstablecimientos.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Establecimiento creado 👍',
              icon: 'CheckIcon',
              text: `El establecimiento "${establecimiento.nombre}" fue guardado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'top-center',
            timeout: 3000,
          })
          // this.$router.replace({
          //   name: 'establecimientos',
          // })
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
