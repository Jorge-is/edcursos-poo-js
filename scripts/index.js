import Curso from "./classes/Curso.js"
import Profesor from "./classes/Profesor.js"
import Alumno from "./classes/Alumno.js"

const cursos = []
const profesores = []
const alumnos = []

// CURSOS
const contenedorCursos = document.getElementById("cursos")
const formCursos = document.getElementById("formCursos")

// Imprime un curso en el DOM
// Recibe un objeto de tipo Curso
function mostrarCurso(curso) {
    const card = document.createElement("div")
    card.classList.add("card")

    card.innerHTML = `
        <div class="img-container s-ratio-16-9 s-radius-tr s-radius-tl">
            <img src="${curso.getPoster()}" alt="${curso.getNombre()}" />
        </div>
        <div class="card__data s-border s-radius-br s-radius-bl s-pxy-2">
            <h3 class="t5 s-mb-2 s-center">${curso.getNombre()}</h3>
            <div class="s-center">
                <span class="small">Cantidad de clases: ${curso.getClases()}</span>
            </div>
        </div>
    `
    contenedorCursos.appendChild(card)
}

formCursos.addEventListener("submit", e => {
    e.preventDefault()

    const data = e.target
    const curso = new Curso(data.nombreCurso.value, data.posterCurso.value, data.clasesCurso.value)

    cursos.push(curso)

    // Mostrar el curso
    mostrarCurso(curso)

    // Limpiar los inputs del formulario
    formCursos.reset()
})

// USUARIOS
const tipoUsuario = document.getElementById("tipoUsuario")
const formUsuarios = document.getElementById("formUsuarios")
const listaProfesores = document.getElementById("listaProfesores")
const listaAlumnos = document.getElementById("listaAlumnos")
const camposProfesor = document.querySelectorAll(".solo-profesor")

tipoUsuario.addEventListener("change", e => {
    camposProfesor.forEach(campo => {
        campo.classList.toggle("s-none", tipoUsuario.value !== "profesor")
    })
})

formUsuarios.addEventListener("submit", e => {
    e.preventDefault()

    if (tipoUsuario.value) {
        alert("Seleccione un tipo de usuario")
        return
    }

    const data = e.target

    if (tipoUsuario.value === "profesor") {
        const profesor = new Profesor(
            data.nombres.value,
            data.apellidos.value,
            data.correo.value,
            data.activo.checked,
            [],
            data.calificacion.value
        )

        profesores.push(profesor)
        renderProfesor(profesor)
    }

    if (tipoUsuario.value === "alumno") {
        const alumno = new Alumno(
            data.nombres.value,
            data.apellidos.value,
            data.correo.value,
            data.activo.checked,
            []
        )

        alumnos.push(alumno)
        renderAlumno(alumno)
    }

    formUsuarios.reset()
    tipoUsuario.value = ""
})

// Renderizado de usuarios
function renderProfesor(profesor) {
    const li = document.createElement("li")
    li.textContent = `${profesor.nombres} ${profesor.apellidos} ⭐ ${profesor.calificacion}`
    listaProfesores.appendChild(li)
}

function renderAlumno(alumno) {
    const li = document.createElement("li")
    li.textContent = `${alumno.nombres} ${alumno.apellidos}`
    listaAlumnos.appendChild(li)
}