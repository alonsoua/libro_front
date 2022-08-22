<template>
  <b-row
    v-if="$route.meta.breadcrumb || $route.meta.pageTitle"
    class="content-header"
  >

    <!-- Content Left -->
    <b-col
      class="content-header-left mb-2"
      cols="12"
      md="9"
    >
      <b-row class="breadcrumbs-top">
        <b-col cols="12">
          <h2 class="content-header-title float-left pr-1 mb-0">
            {{ $route.meta.pageTitle }}
          </h2>
          <div class="breadcrumb-wrapper">
            <b-breadcrumb>
              <b-breadcrumb-item to="/">
                <feather-icon
                  icon="HomeIcon"
                  size="16"
                  class="align-text-top"
                />
              </b-breadcrumb-item>
              <b-breadcrumb-item
                v-for="item in $route.meta.breadcrumb"
                :key="item.text"
                :active="item.active"
                :to="item.to"
              >
                {{ item.text }}
              </b-breadcrumb-item>
            </b-breadcrumb>
          </div>
        </b-col>
      </b-row>
    </b-col>

    <!-- Content Right -->
    <b-col
      v-if="$route.meta.configs === true"
      class="content-header-right text-md-right d-md-block d-none mb-1"
      md="3"
      cols="12"
    >
      <b-dropdown
        variant="link"
        no-caret
        toggle-class="p-0"
        right
      >

        <template #button-content>
          <b-button
            v-ripple.400="'rgba(255, 255, 255, 0.15)'"
            variant="primary"
            class="btn-icon"
          >
            <feather-icon icon="SettingsIcon" />
          </b-button>
        </template>

        <template
          v-for="item in $route.meta.breadcrumb"
          :active="item.active"
          :to="item.to"
        >
          <!-- Configuraciones: LIBRO ABIERTO -->
          <!-- <template
          >
          {{item}}
          </template> -->
          <!-- :to="{ name: 'apps-todo' }" -->
          <template
            v-if="item.text === 'Libro Abierto'"
          >
            <template
              v-for="config in item.optionsConfigs"
            >
              <b-dropdown-item
                :to="{ name: config.to }"
              >
                <feather-icon
                  :icon="config.icon"
                  size="16"
                />
                <span class="align-middle ml-50">{{ config.txtBtn }}</span>
              </b-dropdown-item>
            </template>
          </template>
          <!-- <b-dropdown-item
            v-if="item.text === 'Libro Abierto' && item.configs === true"
          >
            <feather-icon
              icon="ToolIcon"
              size="16"
            />
            <span class="align-middle ml-50">Configurar Asignaturas</span>
          </b-dropdown-item>

          <b-dropdown-item
            v-if="item.text === 'Libro Abierto' && item.active === true"
          >
            <feather-icon
              icon="ToolIcon"
              size="16"
            />
            <span class="align-middle ml-50">Configurar Promedios</span>
          </b-dropdown-item> -->

        </template>
      </b-dropdown>
    </b-col>
  </b-row>
</template>

<script>
import {
  BBreadcrumb, BBreadcrumbItem, BRow, BCol, BDropdown, BDropdownItem, BButton,
} from 'bootstrap-vue'
import Ripple from 'vue-ripple-directive'

export default {
  directives: {
    Ripple,
  },
  components: {
    BBreadcrumb,
    BBreadcrumbItem,
    BRow,
    BCol,
    BDropdown,
    BDropdownItem,
    BButton,
  },
}
</script>
