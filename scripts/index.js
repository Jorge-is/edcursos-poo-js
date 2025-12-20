import Curso from "./classes/Curso.js"
import Profesor from "./classes/Profesor.js"
import Alumno from "./classes/Alumno.js"

const elem = document.getElementById("cursos")

// Imprime un curso en el DOM
// Recibe un objeto de tipo Curso
function mostrarCurso(curso) {
    const hijo = document.createElement("div")
    hijo.classList.add("card")

    hijo.innerHTML = `
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
    elem.appendChild(hijo)
}

const formulario = document.getElementById("formCursos")

formulario.addEventListener("submit", e => {
    e.preventDefault()

    const target = e.target
    const curso = new Curso(target.nombreCurso.value, target.posterCurso.value, target.clasesCurso.value)

    // Mostrar el curso
    mostrarCurso(curso)

    // Limpiar los inputs del formulario
    formulario.reset()
})

const profesor1 = new Profesor("Juan", "Pérez", "juan@ed.team", true, ["React", "JavaScript"], 10)

const alumno1 = new Alumno("María", "Gómez", "maria@ed.team", false, ["React", "JavaScript"])
const alumno2 = new Alumno("Pedro", "López", "pedro@ed.team", true, ["React", "JavaScript"])

const cursoJS = new Curso("JavaScript", "https://edteam-media.s3.amazonaws.com/courses/original/7e1a6d6b-4f7e-4f1f-9275-6d1f5b8e3f12.jpg", 20)

cursoJS.setInscritos([...cursoJS.getInscritos(), alumno1])