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

function estado(activo) {
    return activo ? "✔️ Activo" : "❌ Inactivo"
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
    card.classList.add("card")

    card.innerHTML = `
        <div class="img-container s-ratio-16-9 s-radius-tr s-radius-tl">
            <img src="${curso.getPoster()}" alt="${curso.getNombre()}">
        </div>
        <div class="card__data s-border s-radius-br s-radius-bl s-pxy-2">
            <h3 class="t5 s-mb-0 s-center">${curso.getNombre()}</h3>
            <div class="s-center">
                <span class="badge">📚 ${curso.getClases()} clases</span>
                <span class="badge">👥 ${curso.getInscritos().length} inscritos</span>
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

    guardarStorage()
    cargarSelectores()

    // Limpiar los inputs del formulario
    formCursos.reset()
})

// PROFESORES
const formProfesor = document.getElementById("formProfesor")
const tablaProfesores = document.getElementById("tablaProfesores")

function renderProfesor(profesor) {
    tablaProfesores.innerHTML += `
    <tr>
        <td>${profesor.nombres}</td>
        <td>${profesor.apellidos}</td>
        <td>${profesor.correo}</td>
        <td>${profesor.calificacion} ⭐</td>
        <td>${estado(profesor.activo)}</td>
    </tr>
    `
}

formProfesor.addEventListener("submit", e => {
    e.preventDefault()
    const data = e.target
    if (correoExiste(data.correo.value)) return alert("Correo ya registrado")

    const profesor = new Profesor(
        data.nombres.value, data.apellidos.value, data.correo.value,
        data.activo.checked, [], data.calificacion.value
    )
    profesores.push(profesor)
    renderProfesor(profesor)

    guardarStorage()
    cargarSelectores()

    formProfesor.reset()
})

// ALUMNOS
const formAlumno = document.getElementById("formAlumno")
const tablaAlumnos = document.getElementById("tablaAlumnos")

function renderAlumno(alumno) {    
    tablaAlumnos.innerHTML += `
    <tr>
        <td>${alumno.nombres}</td>
        <td>${alumno.apellidos}</td>
        <td>${alumno.correo}</td>
        <td>${estado(alumno.activo)}</td>
    </tr>
    `
}

formAlumno.addEventListener("submit", e => {
    e.preventDefault()
    const data = e.target
    if (correoExiste(data.correo.value)) return alert("Correo ya registrado")

    const alumno = new Alumno(
        data.nombres.value, data.apellidos.value, data.correo.value,
        data.activo.checked, []
    )
    alumnos.push(alumno)
    renderAlumno(alumno)
    
    guardarStorage()
    cargarSelectores()
    formAlumno.reset()
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