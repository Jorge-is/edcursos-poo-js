import Curso from "./classes/Curso.js"
import Profesor from "./classes/Profesor.js"
import Alumno from "./classes/Alumno.js"

// TABS
const tabs = document.querySelectorAll(".tab")
const views = document.querySelectorAll(".view")

tabs.forEach(tab => {
    tab.addEventListener("click", () => {
        tabs.forEach(t => t.classList.remove("active"))
        views.forEach(v => v.classList.remove("active"))
        tab.classList.add("active")
        document.getElementById(tab.dataset.view).classList.add("active")
    })
})

// Listas de datos
const cursos = []
const profesores = []
const alumnos = []

// HELPERS
function correoExiste(correo) {
    return [...profesores, ...alumnos].some(u => u.correo === correo)
}

function estadoActivo(activo) {
    return activo ? "🟢 Activo" : "🔴 Inactivo"
}

// LOCAL STORAGE
function guardarStorage() {
    localStorage.setItem("cursos", JSON.stringify(cursos))
    localStorage.setItem("profesores", JSON.stringify(profesores))
    localStorage.setItem("alumnos", JSON.stringify(alumnos))
}

function cargarStorage() {

    JSON.parse(localStorage.getItem("cursos") || "[]").forEach(c => {
        const curso = new Curso(c.nombre, c.poster, c.clases)
        curso.setInscritos(c.inscritos || [])
        cursos.push(curso)
        mostrarCurso(curso)
    })

    JSON.parse(localStorage.getItem("profesores") || "[]").forEach(p => {
        const profesor = new Profesor(
            p.nombres, p.apellidos, p.correo, p.activo,
            p.cursosDictados || [], p.calificacion
        )
        profesores.push(profesor)
        renderProfesor(profesor)
    })

    JSON.parse(localStorage.getItem("alumnos") || "[]").forEach(a => {
        const alumno = new Alumno(
            a.nombres, a.apellidos, a.correo, a.activo,
            a.cursosInscritos || []
        )
        alumnos.push(alumno)
        renderAlumno(alumno)
    })

    cargarSelectores()
}

// CURSOS
const contenedorCursos = document.getElementById("cursos")
const formCursos = document.getElementById("formCursos")

// Imprime un curso en el DOM
// Recibe un objeto de tipo Curso
function mostrarCurso(curso) {
    const card = document.createElement("div")
    card.classList.add("card s-radius s-shadow")

    card.innerHTML = `
        <div class="img-container s-ratio-16-9">
            <img src="${curso.getPoster()}" alt="${curso.getNombre()}">
        </div>
        <div class="card__data s-pxy-2">
            <h3 class="t5">${curso.getNombre()}</h3>
            <span class="badge s-bg-blue s-mr-1">${curso.getClases()} clases</span>
            <span class="badge s-bg-green">${curso.getInscritos().length} inscritos</span>
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

    guardarStorage()
    cargarSelectores()

    // Limpiar los inputs del formulario
    formCursos.reset()
})

// PROFESORES
const formProfesor = document.getElementById("formProfesor")
const listaProfesores = document.getElementById("listaProfesores")

function renderProfesor(p) {
    const li = document.createElement("li")
    li.innerHTML = `<strong>${p.nombres} ${p.apellidos}</strong> ⭐ ${p.calificacion} (${estado(p.activo)})`
    listaProfesores.appendChild(li)
}

formProfesor.addEventListener("submit", e => {
    e.preventDefault()
    const d = e.target
    if (correoExiste(d.correo.value)) return alert("Correo ya registrado")

    const p = new Profesor(
        d.nombres.value, d.apellidos.value, d.correo.value,
        d.activo.checked, [], d.calificacion.value
    )
    profesores.push(p)
    renderProfesor(p)
    guardarStorage()
    cargarSelectores()
    d.reset()
})

// ALUMNOS
const formAlumno = document.getElementById("formAlumno")
const listaAlumnos = document.getElementById("listaAlumnos")

function renderAlumno(a) {
    const li = document.createElement("li")
    li.innerHTML = `<strong>${a.nombres} ${a.apellidos}</strong> (${estado(a.activo)})`
    listaAlumnos.appendChild(li)
}

formAlumno.addEventListener("submit", e => {
    e.preventDefault()
    const d = e.target
    if (correoExiste(d.correo.value)) return alert("Correo ya registrado")

    const a = new Alumno(
        d.nombres.value, d.apellidos.value, d.correo.value,
        d.activo.checked, []
    )
    alumnos.push(a)
    renderAlumno(a)
    guardarStorage()
    cargarSelectores()
    d.reset()
})

// ASIGNAR CURSOS
const selectProfesor = document.getElementById("selectProfesor")
const selectAlumno = document.getElementById("selectAlumno")
const selectCursoProfesor = document.getElementById("selectCursoProfesor")
const selectCursoAlumno = document.getElementById("selectCursoAlumno")

const btnAsignarProfesor = document.getElementById("btnAsignarProfesor")
const btnInscribirAlumno = document.getElementById("btnInscribirAlumno")

function cargarSelectores() {
    selectProfesor.innerHTML = profesores.map((p, i) =>
        `<option value="${i}">${p.nombres} ${p.apellidos}</option>`).join("")

    selectAlumno.innerHTML = alumnos.map((a, i) =>
        `<option value="${i}">${a.nombres} ${a.apellidos}</option>`).join("")

    selectCursoProfesor.innerHTML = cursos.map((c, i) =>
        `<option value="${i}">${c.getNombre()}</option>`).join("")

    selectCursoAlumno.innerHTML = selectCursoProfesor.innerHTML
}

btnAsignarProfesor.addEventListener("click", () => {
    const profesor = profesores[selectProfesor.value]
    const curso = cursos[selectCursoProfesor.value]
    profesor.cursosDictados.push(curso.getNombre())
    guardarStorage()
    alert("Profesor asignado")
})

btnInscribirAlumno.addEventListener("click", () => {
    const alumno = alumnos[selectAlumno.value]
    const curso = cursos[selectCursoAlumno.value]

    alumno.cursosInscritos.push(curso.getNombre())
    curso.setInscritos([...curso.getInscritos(), alumno.correo])

    guardarStorage()
    alert("Alumno inscrito")
})

// INIT
cargarStorage()