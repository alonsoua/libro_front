<template>
  <div class="text-nowrap">
    <feather-icon
      size="18"
      :class="`mr-50 text-${rolVariant}`"
      :icon="rolIcon"
    />
    <span class="align-text-top text-capitalize">{{ data.nombreRol }}</span>
  </div>
</template>

<script>
// import { BBadge } from 'bootstrap-vue'

export default {
  components: {
    // BBadge,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      rolIcon: 'LoaderIcon',
      rolVariant: 'primary',
      roles: [
        {
          rol: 'Super Administrador',
          icon: 'ServerIcon',
          variant: 'info',
        },
        {
          rol: 'Administrador Daem',
          icon: 'StarIcon',
          variant: 'warning',
        },
        {
          rol: 'Director',
          icon: 'AwardIcon',
          variant: 'danger',
        },
        {
          rol: 'Inspector General',
          icon: 'BookmarkIcon',
          variant: 'primary',
        },
        {
          rol: 'Inspector Asistente',
          icon: 'BookmarkIcon',
          variant: 'primary',
        },
        {
          rol: 'Jefe UTP',
          icon: 'PenToolIcon',
          variant: 'info',
        },
        {
          rol: 'Docente',
          icon: 'BookOpenIcon',
          variant: 'success',
        },
        {
          rol: 'Docente Pie',
          icon: 'BookOpenIcon',
          variant: 'success',
        },
        {
          rol: 'Asistente',
          icon: 'LayersIcon',
          variant: 'success',
        },
      ],
    }
  },
  mounted() {
    this.setRolValues()
  },
  methods: {
    setRolValues() {
      const { nombreRol } = this.data
      const {
        icon,
        variant,
      } = this.roles.find(ro => ro.rol === nombreRol)
      // console.log('icon :', icon)
      this.rolIcon = icon
      this.rolVariant = variant
    },
  },
}
</script>
