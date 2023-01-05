<template>
  <div v-if="selectedPersona">
    <b-overlay
      :show="spinner"
      spinner-variant="primary"
      :variant="$store.state.appConfig.layout.skin"
    >
      <usuarios-form
        btnSubmit="Editar Usuario"
        :usuario="selectedPersona"
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

import UsuariosForm from './UsuariosForm.vue'

export default {
  components: {
    UsuariosForm,
    BOverlay,
  },
  data() {
    return {
      spinner: false,
    }
  },
  computed: {
    ...mapState('personas', ['selectedPersona']),
  },
  methods: {
    ...mapActions({ updatePersona: 'personas/updatePersona' }),
    editar(usuario) {
      console.log('usuario :', usuario)
      this.updatePersona(usuario).then(() => {
        const statusPersonas = store.state.personas.status
        if (statusPersonas === 'success') {
          this.$toast({
            component: ToastificationContent,
            props: {
              title: 'Usuario editado 👍',
              icon: 'CheckIcon',
              text: 'El usuario fue guardado con éxito!',
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
