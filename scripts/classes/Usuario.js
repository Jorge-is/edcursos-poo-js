export default class Usuario {
    constructor(nombres, apellidos, correo, activo) {
        this.nombres = nombres
        this.apellidos = apellidos
        this.correo = correo
        this.activo = activo
    }

    getNombres() {
        return this.nombres
    } 

    setNombres(nombres) {
        this.nombres = nombres
    }

    getApellidos() {
        return this.apellidos
    }

    setApellidos(apellidos) {
        this.apellidos = apellidos
    }

    getCorreo() {
        return this.correo
    }

    setCorreo(correo) {
        this.correo = correo
    }

    getActivo() {
        return this.activo
    }
    
    setActivo(activo) {
        this.activo = activo
    }
}
