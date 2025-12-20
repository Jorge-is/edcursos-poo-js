import Usuario from "./Usuario.js"

export default class Alumno extends Usuario {
    constructor(nombres, apellidos, correo, activo, cursosInscritos) {
        super(nombres, apellidos, correo, activo)
        this.cursosInscritos = cursosInscritos
    }
}