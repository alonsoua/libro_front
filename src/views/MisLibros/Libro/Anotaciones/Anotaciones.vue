<template>
  <b-overlay
    :show="!cargando"
    spinner-variant="primary"
    :variant="$store.state.appConfig.layout.skin"
    v-if="$can('read', 'anotaciones')"
  >
    <b-card
      aria-hidden="true"
      class="mb-0"
    >
      <b-form>
        anotaciones
      </b-form>
    </b-card>
  </b-overlay>
</template>

<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BForm, BFormInvalidFeedback,
  BMedia, BButton, BAvatar, BOverlay, BCard, BTab, BTabs
} from 'bootstrap-vue'

// Componentes //

export default {
  components: {
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BForm,
    BFormInvalidFeedback,
    BMedia,
    BButton,
    BAvatar,
    BOverlay,
    BCard,
    BTab,
    BTabs,
  },
  data() {
    return {
      cargando: true,
      // email,
      // required,
    }
  },
  props: {
  },
  methods: {
  },
}
</script>
