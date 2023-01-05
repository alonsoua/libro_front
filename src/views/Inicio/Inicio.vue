<template>
  <div>
    <b-row>
      <b-col md="12">
        <b-card title="Versión beta de Libro Digital 📚">
          <b-card-text>Esta es una versión beta del sistema libro digital pie, las opciones que aparecen en plomo aún se están desarrollando.</b-card-text>
          <b-card-text>Para consultas y observaciones nos puede contactar al whats app<b-link
            href="+56964049857"
            target="_blank"
          >
            +56 9 6404 9857
          </b-link>.</b-card-text>
        </b-card>
      </b-col>
      <b-col md="12">
        <b-card title="Primeros pasos 🚶🏽‍♀️">
          <b-card-text>Cada menú y submenu de la vista PIE, tiene la misma enumeración que los títulos del documento oficial.</b-card-text>
          <b-card-text>Si estás recién comenzando te recomendamos tener el documento oficial como guía.</b-card-text>
          <b-card-text>Para ir a la vista PIE, seleccione abrir en cualquiera de los libros.</b></b-card-text>
        </b-card>
      </b-col>
      <b-col md="12">

        <mis-libros-vue />
      </b-col>
    </b-row>

  </div>
</template>

<script>
import { BCard, BCardText, BLink, BRow, BCol } from 'bootstrap-vue'
import MisLibrosVue from '../MisLibros/MisLibros.vue'

export default {
  components: {
    BCard,
    BCardText,
    BLink,
    BRow,
    BCol,

    MisLibrosVue,
  },
}
</script>

<style>

</style>
