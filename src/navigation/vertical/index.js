/*

Array of object

Top level object can be:
1. Header
2. Group (Group can have navItems as children)
3. navItem

* Supported Options

/--- Header ---/

header

/--- nav Grp ---/

title
icon (if it's on top level)
tag
tagVariant
children

/--- nav Item ---/

icon (if it's on top level)
title
route: [route_obj/route_name] (I have to resolve name somehow from the route obj)
tag
tagVariant

*/
import inicio from './inicio'
import mantenedores from './mantenedores'
// import libros from './libros'
import matriculas from './matriculas'
import configuraciones from './configuraciones'

// Array of sections
export default [
  ...inicio,
  // ...libros,
  ...matriculas,
  ...mantenedores,
  ...configuraciones,
]
