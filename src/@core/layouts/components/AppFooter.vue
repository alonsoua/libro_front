<template>
  <p class="clearfix mb-0">
    <span class="float-right d-block d-md-inline-block">
      COPYRIGHT  © {{ new Date().getFullYear() }} |
      Desarrollado por
      <b-link
        class=""
        href="https://softinnova.cl"
        target="_blank"
      >Softinnova</b-link> |
      <span class="d-none d-sm-inline-block">Todos los derechos reservados</span>
    </span>

    <!-- <span class="float-md-right d-none d-md-block">Hecho a mano &amp; Hecho con
      <feather-icon
        icon="HeartIcon"
        size="21"
      />
    </span> -->
  </p>
</template>

<script>
import { BLink } from 'bootstrap-vue'

export default {
  components: {
    BLink,
  },
}
</script>
