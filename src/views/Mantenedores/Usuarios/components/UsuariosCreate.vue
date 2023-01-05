<template>
  <usuarioForm
    btnSubmit="Crear Usuario"
    :usuario="data"
    @processForm="agregar"
  />
</template>

<script>

import { mapActions } from 'vuex'
import store from '@/store/index'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

import usuarioForm from './UsuariosForm.vue'

export default {
  components: {
    usuarioForm,
  },
  data() {
    return {
      data: {
        rut: '',
        dv: '',
        nombre: '',
        primer_apellido: '',
        segundo_apellido: '',
        nombre_calle: '',
        numero: '',
        block: '',
        departamento: '',
        celular: '',
        correo: '',
        id_establecimiento: null,
        id_rol: null,
      },
    }
  },
  methods: {
    ...mapActions({
      createPersona: 'personas/addPersona',
      createUsuario: 'usuarios/addUsuario'
     }),
    agregar(usuario) {
      this.createPersona(usuario).then(() => {
        const statusPersonas = store.state.personas.status
        if (statusPersonas === 'success') {

          const rut = usuario.rut.substring(0, 5)
          const id_persona = store.state.personas.id_persona
          const data = {
            id_persona,
            password: rut,
          }

          this.createUsuario(data).then(() => {
            this.$toast({
              component: ToastificationContent,
              props: {
                title: 'Usuario guardado 👍',
                icon: 'CheckIcon',
                text: 'La clave de acceso del nuevo usuario son los 5 primeros digitos de su rut!',
                variant: 'success',
              },
            },
            {
              position: 'bottom-right',
              timeout: 6000,
            })
          })

          this.$router.replace({
            name: 'usuarios',
          })
        }
        else {
          this.$swal({
            title: 'Error!',
            text: store.state.personas.message,
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
