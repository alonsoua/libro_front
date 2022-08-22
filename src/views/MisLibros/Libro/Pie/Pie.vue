<template>
  <!-- Menu Info: Input Fields -->
  <!-- justified -->
  <b-tabs
    style="margin: -12px 0px -30px !important;"
    align="center"
    fill
    v-model="tabIndex"
  >
    <!-- fill -->
    <div
      v-for="(menu, key) in menus"
      :key="key"
    >

      <b-tab lazy :active="menu.active">
        <template #title>
          <span class="d-none d-sm-inline">
            {{ menu.index }}.
            {{ menu.abreviatura }}
          </span>
        </template>

        <colLinea
          style="margin-top: -14px; margin-bottom: 20px;"
        />

        <!-- ENCABEZADO -->
        <div class="meetup-header d-flex align-items-center">
          <div class="meetup-day">

            <!-- INDEX -->
            <h4 class="mb-0 ml-1">
              {{ menu.index }}
            </h4>
          </div>
          <div class="ml-1">

            <!-- TÍTULO -->
            <b-card-title
              v-if="menu.titulo !== ''"
              class="mb-25"
              style="margin-top: 4px;"
            >
              {{ menu.titulo }}
              <!-- INFORMATIVO -->
              <popover
                v-if="menu.informacion !== ''"
                class="float-right"
                id="0"
                btnVariant="flat-secondary"
                :texto="menu.informacion"
                direccion="right"
                style="margin-left: -6px; margin-top: -15px; margin-bottom: -10px;"
              />
            </b-card-title>

            <!-- TEXTO -->
            <b-card-text
              v-if="menu.texto !== ''"
              class="mr-4 mb-0 text-secondary"
            >
              {{ menu.texto }}
            </b-card-text>
          </div>
        </div>

        <colLinea
          ancho="100%"
          align="center"
          class="mt-2 mb-25"
        />

        <!-- COMPONENTS -->

        <equipo-aula
          v-if="menu.index == 'I'"
          :submenus="menu.submenus"
        />

        <planificacion-educativa
          v-if="menu.index == 'II'"
          :submenus="menu.submenus"
        />

        <implementacion-evaluacion
          v-if="menu.index == 'III'"
          :submenus="menu.submenus"
        />

        <actividades
          v-if="menu.index == 'IV'"
          :submenus="menu.submenus"
        />

        <reuniones
          v-if="menu.index == 'V'"
          :submenus="menu.submenus"
        />
      </b-tab>
    </div>
  </b-tabs>
</template>
<script>

// Etiquetas //
import {
  BRow, BCol, BFormGroup, BFormInput, BFormInvalidFeedback, BCard,
  BMedia, BButton, BAvatar, BTab, BTabs, BCardText, BCardTitle
} from 'bootstrap-vue'

// Components //
import colLinea from '../../../components/Form/colLinea.vue'
import popover from '../../../components/Form/popover.vue'

import equipoAula from './components/EquipoAula.vue'
import planificacionEducativa from './components/PlanificacionEducativa.vue'
import implementacionEvaluacion from './components/ImplementacionEvaluacion.vue'
import actividades from './components/Actividades.vue'
import reuniones from './components/Reuniones.vue'


export default {
  components: {
    // Etiquetas
    BRow,
    BCol,
    BFormGroup,
    BFormInput,
    BFormInvalidFeedback,
    BMedia,
    BCard,
    BButton,
    BAvatar,
    BTab,
    BTabs,
    BCardText,
    BCardTitle,

    // Components
    colLinea,
    popover,
    equipoAula,
    planificacionEducativa,
    implementacionEvaluacion,
    actividades,
    reuniones
  },
  data() {
    return {
      tabIndex: 1,
      menus: [
        {
          active: true,
          index: 'I',
          abreviatura: 'Equipo',
          titulo: 'Equipo de aula',
          texto: '',
          informacion: 'El Equipo de Aula es aquel grupo de profesionales conformado por el o los profesores de aula respectivo, el profesor especialista, profesor especializado o psicopedagoga, y otros profesionales asistentes de la educación, asistentes de aula, intérpretes en lengua de señas chilena, etc., cuya finalidad común es el mejoramiento de la calidad de la enseñanza en un marco de valorización de la diversidad y de respeto por las diferencias individuales.',
          submenus: [
            {
              active: false,
              index: '1',
              abreviatura: 'Identificación del equipo de aula',
              titulo: 'Identificación del equipo de aula',
              texto: '',
              informacion: '',
              submenus: [],
            },
            {
              active: false,
              index: '2',
              abreviatura: 'Reuniones de coordinación',
              titulo: 'Reuniones de coordinación',
              texto: 'Es importante planificar las reuniones, definir los tiempos, el tema de la reunión, los responsables de convocar o de recordar las reuniones, de hacer las actas, de hacer seguimiento del cumplimiento de los compromisos y otros acuerdos.',
              informacion: 'Las reuniones de coordinación del equipo del aula, tienen el propósito de tomar decisiones respecto de la organización, planificación y la evaluación del equipo en relación a los roles, funciones y apoyos de cada uno, en los períodos designados en cada establecimiento.',
              submenus: [],
            },
          ]
        },
        {
          active: false,
          index: 'II',
          abreviatura: 'Planificación educativa',
          titulo: 'Planificación del proceso educativo',
          texto: '',
          informacion: '',
          submenus: [
            {
              active: true,
              index: '1',
              abreviatura: 'Estrategias diversificadas',
              titulo: 'Estrategias diversificadas',
              texto: '',
              informacion: '',
              submenus: [
                {
                  active: true,
                  index: 'a',
                  abreviatura: 'Panorama',
                  titulo: 'Panorama del curso (de todos los estudiantes)',
                  texto: 'Descripción de las características del curso, señalando sus principales fortalezas y necesidades de apoyo.',
                  informacion: '',
                },
                {
                  active: false,
                  index: 'b',
                  abreviatura: 'Estrategias',
                  titulo: 'Registro de las estrategias diversificadas que aplicará el profesor de educación regular para el curso',
                  texto: '',
                  informacion: 'Sugerencias de criterios para la evaluación de la estrategia: Recursos educativos responden a los distintos estilos de aprendizaje; Participación de todos los estudiantes, especialmente aquellos que presentan NEE; Logros de los objetivos planteados para la clase; Interacción entre los estudiantes; entre otros.',
                },
              ]
            },
            {
              active: false,
              index: '2',
              abreviatura: 'Trabajo colaborativo',
              titulo: 'Trabajo colaborativo',
              texto: '',
              informacion: '',
              submenus: [
                {
                  active: true,
                  index: 'a',
                  abreviatura: 'Acciones',
                  titulo: 'Acciones que se implementarán',
                  texto: '',
                  informacion: '',
                },
                {
                  active: false,
                  index: 'b',
                  abreviatura: 'Apoyos',
                  titulo: 'Organización de los apoyos',
                  texto: '',
                  informacion: '',
                },
              ]
            },
            {
              active: false,
              index: '3',
              abreviatura: 'Diversidad y adecuación',
              titulo: 'Respuesta a la diversidad y adecuaciones curriculares',
              texto: '',
              informacion: '',
              submenus: [
                {
                  active: true,
                  index: 'a',
                  abreviatura: 'Estudiantes',
                  titulo: 'Estrategias que se utilizarán para dar respuesta a la diversidad de estudiantes, en el aula común.',
                  texto: '',
                  informacion: '',
                },
                {
                  active: false,
                  index: 'b',
                  abreviatura: 'Adecuaciones',
                  titulo: 'Estrategias que se utilizarán para adecuar o flexibilizar el currículum, según corresponda.',
                  texto: '',
                  informacion: '',
                },
                {
                  active: false,
                  index: 'c',
                  abreviatura: 'Evaluaciones',
                  titulo: 'Estrategias y procedimientos de evaluación de aprendizaje con foco en la diversidad y en las necesidades educativas especiales.',
                  texto: '',
                  informacion: '',
                },
              ]
            },
            {
              active: false,
              index: '4',
              abreviatura: 'Plan de apoyo individual',
              titulo: 'Plan de apoyo individual (incluye los ajustes o adecuaciones curriculares)',
              texto: '',
              informacion: 'El Plan de Apoyo Individual (PAI), se define como la planificación del proceso de enseñanza aprendizaje para responder a las NEE que presenta el estudiante, después de un proceso de evaluación integral e interdisciplinaria, que incluye la organización, los profesionales responsables de los apoyos especializados y el tipo de ajuste o adecuaciones curriculares que el estudiante requiere o no, para progresar y participar en los aprendizajes del currículo nacional (incluye el punto 3 Respuesta a la Diversidad y Adecuaciones Curriculares).',
              submenus: [],
            },
            {
              active: false,
              index: '5',
              abreviatura: 'Estrategias de trabajo',
              titulo: 'Estrategias de trabajo con la familia y con la comunidad',
              texto: 'Considerar estrategias de participación y trabajo colaborativo en distintas etapas e instancias del proceso educativo (planificación, evaluación, experiencias de aprendizaje, etc.).',
              informacion: '',
              submenus: [],
            },
          ]
        },
        {
          active: false,
          index: 'III',
          abreviatura: 'Implementación y evaluación educativa',
          titulo: 'Registro de la implementación y evaluación del proceso educativo',
          texto: '',
          informacion: '',
          submenus: [
            {
              active: true,
              index: '1',
              abreviatura: 'Aplicación y evaluación',
              titulo: 'Aplicación y evaluación de las estrategias diversificadas y trabajo colaborativo',
              texto: '',
              informacion: '',
              submenus: [
                {
                  active: true,
                  index: 'a',
                  abreviatura: 'Acciones de aplicación',
                  titulo: 'Indicar las acciones de aplicación de las estrategias diversificadas planificadas, en los períodos estipulados previamente (Item II, 1.b).',
                  texto: '',
                  informacion: '',
                },
                {
                  active: false,
                  index: 'b',
                  abreviatura: 'Acciones realizadas',
                  titulo: 'Registro de acciones realizadas por el profesor o profesora de aula ya sea para la planificación conjunta de la respuesta educativa diversificada o para el seguimiento y evaluación del trabajo colaborativo, entre otras actividades.',
                  texto: '',
                  informacion: '',
                },
              ]
            },
            {
              active: false,
              index: '2',
              abreviatura: 'Apoyos para estudiante(s)',
              titulo: 'Registro de apoyos para cada estudiante o grupo de estudiantes',
              texto: 'Registrar, por estudiante o grupos de estudiantes, los apoyos específicos o actividades especiales que se realizan en forma individual o en pequeños grupos dentro o fuera del aula regular y el o las/os nombres de los profesionales que los entregan.',
              informacion: '',
            },
            {
              active: false,
              index: '3',
              abreviatura: 'Logros de aprendizaje',
              titulo: 'Registro de logros de aprendizaje',
              texto: 'Señalar los aprendizajes logrados por aquellos estudiantes que han recibido apoyos específicos, en los períodos definidos por el establecimiento.',
              informacion: 'La información contenida en esta tabla es de utilidad para el proceso de revaluación anual del/la estudiante.',
            },
          ]
        },
        {
          active: false,
          index: 'IV',
          abreviatura: 'Registro de actividades',
          titulo: 'Registro de actividades con la familia y la comunidad',
          texto: '',
          informacion: '',
          submenus: [
            {
              active: true,
              index: '1',
              abreviatura: 'Trabajo con la familia',
              titulo: 'Trabajo con la familia, apoderados y/o con el o la estudiante',
              texto: '',
              informacion: '',
              submenus: []
            },
            {
              active: false,
              index: '2',
              abreviatura: 'Trabajo con la comunidad',
              titulo: 'Trabajo con la comunidad y el entorno escolar',
              texto: '',
              informacion: '',
            },
          ]
        },
        {
          active: false,
          index: 'V',
          abreviatura: 'Reuniones',
          titulo: 'Acta de reuniones',
          texto: '',
          informacion: '',
          submenus: []
        },
      ]
    }
  },
  props: {
  },
  methods: {
  },
}
</script>
