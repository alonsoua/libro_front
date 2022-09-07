<template>
  <div class="auth-wrapper auth-v1 px-2">
    <div class="auth-inner py-2">

      <!-- Login v1 -->
      <b-card class="mb-0">
        <b-link class="brand-logo">
          <vuexy-logo />

          <h2 class="brand-text text-primary ml-1">
            Sie
          </h2>
        </b-link>

        <b-card-title class="mb-1">
          Bienvenido al sistema Sie! 👋
        </b-card-title>
        <b-card-text class="mb-2">
          Inicie sesión en su cuenta y comience la aventura.
        </b-card-text>

        <!-- form -->
        <b-form
          class="auth-login-form mt-2"
          @submit.prevent="submit"
        >

          <!-- rut -->
          <b-form-group
            label="Rut"
            label-for="rut"
          >
            <b-form-input
              id="rut"
              v-model="form.rut"
              name="login-rut"
              placeholder="Ingresa tu rut (XX.XXX.XXX-X)"
              autofocus
              :state="v$.form.rut.$error === true
                ? false
                : null"
              @blur.native="v$.form.rut.$touch"
              @keyup="form.rut = formatRut(form.rut)"
            />
            <b-form-invalid-feedback
              v-if="v$.form.rut.$error"
              id="rutInfo"
            >
              <p v-for="error of v$.form.rut.$errors" :key="error.$uid">
                {{ error.$message }}
              </p>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- contraseña -->
          <b-form-group>
            <div class="d-flex justify-content-between">
              <label for="password">Contraseña</label>
              <!-- <b-link :to="{name:'auth-forgot-password-v1'}">
                <small>olvidó su contraseña?</small>
              </b-link> -->
            </div>
            <b-input-group
              class="input-group-merge"
              :class="v$.form.password.$error === true ? 'is-invalid':null"
            >
              <b-form-input
                id="password"
                v-model="form.password"
                :type="passwordFieldType"
                class="form-control-merge"
                name="login-password"
                placeholder="Ingresa tu contraseña"
                :state="v$.form.password.$error === true
                  ? false
                  : null"
                @blur.native="v$.form.password.$touch"
              />

              <b-input-group-append is-text>
                <feather-icon
                  class="cursor-pointer"
                  :icon="passwordToggleIcon"
                  @click="togglePasswordVisibility"
                />
              </b-input-group-append>
            </b-input-group>
            <b-form-invalid-feedback
              v-if="v$.form.password.$error"
              id="passwordInfo"
            >
            <p v-for="error of v$.form.password.$errors" :key="error.$uid">
              {{ error.$message }}
            </p>
            </b-form-invalid-feedback>
          </b-form-group>

          <!-- checkbox -->
          <b-form-group>
            <b-form-checkbox
              id="remember-me"
              v-model="status"
              name="checkbox-1"
            >
              Recordarme
            </b-form-checkbox>
          </b-form-group>

          <!-- submit button -->
          <b-button
            variant="primary"
            type="submit"
            block
            :disabled="v$.form.$error"
          >
            <b-spinner
              v-if="cargando"
              label="Iniciando Sesión"
              small
            >
            </b-spinner>
            Iniciar Sesión
          </b-button>
        </b-form>

        <div class="divider mt-2">
          <div class="divider-text">
            Softinnova
          </div>
        </div>

        <!-- social button -->
        <!-- <div class="auth-footer-btn d-flex justify-content-center">
          <b-button
            href="javascript:void(0)"
            variant="facebook"
          >
            <feather-icon icon="FacebookIcon" />
          </b-button>
        </div> -->
      </b-card>
      <!-- /Login v1 -->
    </div>
  </div>
</template>

<script>

// ETIQUETAS
import {
  BButton, BForm, BFormInput, BFormGroup, BCard, BLink, BCardTitle, BCardText,
  BInputGroup, BInputGroupAppend, BFormCheckbox, BFormInvalidFeedback, BSpinner,
} from 'bootstrap-vue'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'
import VuexyLogo from '@core/layouts/components/Logo.vue'

// STORE
import store from '@/store/index'
// VUEX
import { mapActions, mapGetters, mapMutations } from 'vuex'

// MIXINS
import { togglePasswordVisibility } from '@core/mixins/ui/forms'
import { rut } from '@core/mixins/ui/rut'

// VALIDACIONES
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'


export default {
  components: {
    // BSV
    BButton,
    BForm,
    BFormInput,
    BFormGroup,
    BCard,
    BCardTitle,
    BLink,
    VuexyLogo,
    BCardText,
    BInputGroup,
    BInputGroupAppend,
    BFormCheckbox,
    BFormInvalidFeedback,
    BSpinner,
  },
  mixins: [togglePasswordVisibility, rut],
  data() {
    return {
      // userEmail: '',
      cargando: false,
      form: [],
      rut: '',
      password: '',
      status: '',
      // validation rules
      // email,
    }
  },
  setup() {
    return {
      v$: useVuelidate(),
    }
  },
  validations() {
    return {
      form: {
        rut: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
        password: {
          $autoDirty: true,
          required: helpers.withMessage('El campo es requerido.', required),
        },
      }
    }
  },
  computed: {
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    ...mapGetters({
      authenticated: 'auth/authenticated',
      user: 'auth/user',
      authErrorMessage: 'auth/authErrorMessage',
    }),
    passwordToggleIcon() {
      return this.passwordFieldType === 'password' ? 'EyeIcon' : 'EyeOffIcon'
    },
    imgUrl() {
      if (store.state.appConfig.layout.skin === 'dark') {
        // eslint-disable-next-line vue/no-side-effects-in-computed-properties
        this.sideImg = require('@/assets/images/pages/login-v2-dark.svg')
        return this.sideImg
      }
      return this.sideImg
    },
  },
  methods: {
    ...mapActions({
      signIn: 'auth/signIn',
    }),
    ...mapMutations('auth', ['SET_ERROR']),
    submit() {
      this.spinner = true
      this.v$.form.$touch()
      if (!this.v$.form.$invalid) {
        // Envía el form a la action signIn
        const rut = this.form.rut.replace('-', '').replace('.', '').replace('.', '')
        const form = {
          rut,
          password: this.form.password
        }
        this.signIn(form).then(response => {
          if (response === undefined && this.authErrorMessage === null) {
            localStorage.setItem('userData', JSON.stringify(this.user))
            // this.$ability.update(this.user.permisos)

            this.$toast({
              component: ToastificationContent,
              position: 'top-right',
              props: {
                title: `Bienvenido ${this.user.nombre}`,
                icon: 'CoffeeIcon',
                variant: 'primary',
                text: `Has iniciado sesión correctamente
                  como ${this.user.rolActivo}.
                Ahora puedes comenzar a explorar! 👋`,
              },
            },
            {
              timeout: 4000,
            })
            this.$router.replace({
              name: 'home',
            })
          }
          // else if (response === 'email&pass') {
          //   this.alert = true
          //   this.alertErrorMessage = 'El correo electrónico o la contraseña, son incorrectos!'
          // }
          // if (this.authErrorMessage === 'Usuario Inactivo') {
          //   this.alert = true
          //   this.alertErrorMessage = 'El usuario asociado al correo electrónico ingresado, se encuentra Inactivo!'
          //   store.commit('auth/SET_ERROR', null)
          // }
          this.spinner = false
        }).catch(() => {
          this.alert = false
          this.alertErrorMessage = ''
          store.auth.commit('SET_ERROR', null)
        })
      }
    },
  },
}
</script>

<style lang="scss">
@import '@core/scss/vue/pages/page-auth.scss';
</style>
