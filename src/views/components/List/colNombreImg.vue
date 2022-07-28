<template>
  <b-media vertical-align="center">
    <template #aside v-if="mostrarImg">
      <b-avatar
        size="32"
        :src="imagen"
        :text="avatarText(nombre)"
      />
    </template>

    <b-link
      v-b-modal="nombreModal"
      class="font-weight-bold d-block text-nowrap"
    >
      {{ nombre }}
    </b-link>
    <small class="text-muted">{{ txtMuted }}</small>
  </b-media>
</template>

<script>
import { BLink, BMedia, BAvatar } from 'bootstrap-vue'
import { avatarText } from '@core/utils/filter'

export default {
  components: {
    BLink,
    BMedia,
    BAvatar,
  },
  props: {
    mostrarImg: {
      type: Boolean,
      required: false,
    },
    imagen: {
      type: String,
      required: false,
    },
    nombre: {
      type: String,
      required: true,
    },
    txtMuted: {
      type: String,
      required: true,
    },
    nombreModal: {
      type: String,
      required: false,
    },
  },
  setup() {
    return {
      avatarText,
    }
  },
}
</script>
