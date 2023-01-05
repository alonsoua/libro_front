<template>
  <b-nav-item-dropdown
    right
    toggle-class="d-flex align-items-center dropdown-user-link"
    class="dropdown-user"
  >
    <template #button-content>
      <div class="d-sm-flex d-none user-nav">
        <p class="user-name font-weight-bolder mb-0">
          <!-- {{ user.nombre }} - {{ user.username }} -->
          {{ userData.fullName }}
        </p>
        <span class="user-status">
          {{ userData.nombre_rol }} | CSF
          <!-- {{ userData.role }} -->
        </span>
      </div>
      <b-avatar
        size="40"
        :src="userData.avatar"
        variant="light-primary"
        badge
        class="badge-minimal"
        badge-variant="success"
      >
        <feather-icon
          v-if="!userData.fullName"
          icon="UserIcon"
          size="22"
        />
      </b-avatar>
    </template>

    <!-- PERFIL -->
    <!-- :to="{ name: 'pages-profile'}" -->
    <!-- <b-dropdown-item
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="UserIcon"
        class="mr-50"
      />
      <span>Mi Perfil</span>
    </b-dropdown-item> -->

    <!-- Mensajes -->
    <!-- :to="{ name: 'apps-email' }" -->
    <!-- <b-dropdown-item
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="MailIcon"
        class="mr-50"
      />
      <span>Mensajes</span>
    </b-dropdown-item> -->

    <!-- PERFIL -->
    <!-- <b-dropdown-item
      :to="{ name: 'apps-chat' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="MessageSquareIcon"
        class="mr-50"
      />
      <span>Chat</span>
    </b-dropdown-item> -->

    <!-- <b-dropdown-divider /> -->

    <!-- AJUSTES -->
    <!-- :to="{ name: 'pages-account-setting' }" -->
    <!-- <b-dropdown-item
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="SettingsIcon"
        class="mr-50"
      />
      <span>Ajustes</span>
    </b-dropdown-item> -->

    <!-- FAQ -->
    <!-- <b-dropdown-item
      :to="{ name: 'pages-faq' }"
      link-class="d-flex align-items-center"
    >
      <feather-icon
        size="16"
        icon="HelpCircleIcon"
        class="mr-50"
      />
      <span>FAQ</span>
    </b-dropdown-item> -->

    <!-- HORARIO -->
    <!-- <b-dropdown-item
      link-class="d-flex align-items-center"
      :to="{ name: 'mi-horario'}"
    >
      <feather-icon
        size="16"
        icon="CalendarIcon"
        class="mr-50"
      />
      <span>Carga Horaria</span>
    </b-dropdown-item> -->

    <!-- Cerrar Sesión -->
    <b-dropdown-item
      link-class="d-flex align-items-center"
      @click="signOut"
    >
      <feather-icon
        size="16"
        icon="LogOutIcon"
        class="mr-50"
      />
      <span>Cerrar Sesión</span>
    </b-dropdown-item></b-nav-item-dropdown>
</template>

<script>
import {
  BNavItemDropdown, BDropdownItem, BDropdownDivider, BAvatar,
} from 'bootstrap-vue'
import { initialAbility } from '@/libs/acl/config'
import useJwt from '@/auth/jwt/useJwt'
import { avatarText } from '@core/utils/filter'

// VUEX
import { mapGetters, mapActions } from 'vuex'
import ToastificationContent from '@core/components/toastification/ToastificationContent.vue'

export default {
  components: {
    BNavItemDropdown,
    BDropdownItem,
    BDropdownDivider,
    BAvatar,
  },
  computed: {
    ...mapGetters({
      user: 'auth/user',
    }),
  },

  data() {
    return {
      userData: JSON.parse(localStorage.getItem('userData')),
      datosLocal: JSON.parse(localStorage.getItem('userData')),
      avatarText,
    }
  },
  mounted() {
    this.me(this.user)
    this.setUserData(this.datosLocal)
  },
  watch: {
    user(val) {
      if (val === null) {
        this.timeOut()
      }
    },
    datosLocal(val) {
      this.setUserData(val)
    },
  },
  methods: {
    ...mapActions({
      signOutAction: 'auth/signOut',
      attempt: 'auth/attempt',
    }),
    setUserData(user) {
      const fullName = `${user.nombre} ${user.primer_apellido} ${user.segundo_apellido}`
      this.userData = {
        fullName: fullName,
        avatar: null,
        rut: user.rut,
        dv: user.dv,
        nombre_rol: user.nombre_rol,
      }
    },
    me(user) {
      if (user) {
        this.attempt().then(() => {})
      }
    },
    logout() {
      // Remove userData from localStorage
      // ? You just removed token from localStorage. If you like, you can also make API call to backend to blacklist used token
      localStorage.removeItem(useJwt.jwtConfig.storageTokenKeyName)
      localStorage.removeItem(useJwt.jwtConfig.storageRefreshTokenKeyName)

      // Remove userData from localStorage
      localStorage.removeItem('userData')

      // Reset ability
      this.$ability.update(initialAbility)

      // Redirect to login page
      this.$router.push({ name: 'auth-login' })
    },
    timeOut() {
      this.$toast({
        component: ToastificationContent,
        props: {
          title: 'Cerrando Sesión...',
          icon: 'RefreshCcwIcon',
          variant: 'primary',
          text: `Hasta pronto ${this.userData.fullName}! 👋 `,
        },
      },
      {
        position: 'top-center',
        timeout: 2000,
      })

      localStorage.removeItem('userData')
      localStorage.removeItem('token')
      this.$router.replace({
        name: 'login',
      })
    },
    signOut() {
      // this.$toast({
      //   component: ToastificationContent,
      //   props: {
      //     title: 'Cerrando Sesión...',
      //     icon: 'RefreshCcwIcon',
      //     variant: 'primary',
      //     text: `Hasta pronto ${this.userData.nombre}! 👋 `,
      //   },
      // },
      // {
      //   position: 'top-center',
      //   timeout: 2000,
      // })

      this.signOutAction().then(() => {
        // localStorage.removeItem('userData')
        // localStorage.removeItem('token')
        // this.$router.replace({
        //   name: 'login',
        // })
      })
    },
  },
}
</script>
