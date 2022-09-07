<template>
  <usuarioForm
    btnSubmit="Crear Usuario"
    :usuario="data"
    @processForm="agregar2"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import usuarioForm from './components/UsuariosForm.vue'

export default {
  components: {
    usuarioForm,
  },
  data() {
    return {
      data: {
        imagenPerfil: '',
        rut: '',
        nombres: '',
        primerApellido: '',
        segundoApellido: '',
        telefono: '',
        correo: '',
        direccion: '',
        idEstablecimiento: null,
        idRol: null,
        estado: null,
      },
    }
  },
  methods: {
    ...mapActions({ createUsuario: 'usuarios/addUsuarios' }),
    agregar2(usuario) {
      // this.$bvToast.toast('Toast body content', {

      //   title: `Variant`,
      //   variant: 'success',
      //   solid: true,
      // })
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Usuario creado 👍',
          text: `El usuario "${usuario.nombres} ${usuario.primerApellido}
            ${usuario.segundoApellido}" fue creado con éxito!`,
          icon: 'CheckIcon',
          variant: 'success',
          solid: true,
        },
      },
      {
        position: 'top-right',
        timeout: 4000,
      })
      // this.$swal({
      //   title: 'Error!',
      //   text: 'Ingreso de datos fraudulento!',
      //   icon: 'error',
      //   customClass: {
      //     confirmButton: 'btn btn-primary',
      //   },
      //   buttonsStyling: false,
      // })
    },
    agregar(usuario) {
      this.createUsuario(usuario).then(() => {
        const errorUsuarios = store.state.usuarios
        const errorMessage = errorUsuarios.errorMessage.errors
        if (!errorUsuarios.error) {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Usuario creado 👍',
              icon: 'CheckIcon',
              text: `El usuario "${usuario.nombre}" fue creado con éxito!`,
              variant: 'success',
            },
          },
          {
            position: 'bottom-right',
            timeout: 4000,
          })
          this.$router.replace({
            name: 'usuarios',
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
