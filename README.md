# EDcursos – Gestión de Cursos con POO en JavaScript

Aplicación web desarrollada con **JavaScript moderno (ES6+)** aplicando **Programación Orientada a Objetos (POO)** para la gestión de **Cursos, Profesores y Alumnos**.

El proyecto permite registrar usuarios, asignar profesores a cursos, inscribir alumnos y persistir la información usando **localStorage**, todo con una interfaz organizada mediante **pestañas**.

---

## 🚀 Funcionalidades

### 📘 Cursos
- Crear cursos con nombre, poster y cantidad de clases
- Listar cursos en formato cards
- Visualizar cantidad de alumnos inscritos

### 👨‍🏫 Profesores
- Registro de profesores
- Validación de correos únicos
- Estado activo / inactivo
- Calificación (1–10)
- Asignación de profesores a cursos

### 👨‍🎓 Alumnos
- Registro de alumnos
- Validación de correos únicos
- Estado activo / inactivo
- Inscripción de alumnos a cursos

### 🔗 Asignaciones
- Asignar profesores a cursos
- Inscribir alumnos en cursos
- Selectores dinámicos sincronizados

### 💾 Persistencia
- Guardado automático en `localStorage`
- Carga de datos al recargar la página

### 🎨 UI / UX
- Navegación por pestañas (Cursos | Profesores | Alumnos)
- Layout limpio y organizado
- Badges visuales para estado y métricas

---

## 🧱 Arquitectura del Proyecto

El proyecto sigue principios de **POO**:

### 📂 Clases principales
- `Usuario` (clase base)
- `Profesor` (hereda de Usuario)
- `Alumno` (hereda de Usuario)
- `Curso`

### 📂 Organización del Proyecto

```text
📁 project
│
├── assets/
│ ├── images/
│ └── styles.css
├── scripts/
│ ├── index.js
│ └── classes/
│ ├── Usuario.js
│ ├── Profesor.js
│ ├── Alumno.js
│ └── Curso.js
└── index.html
```

---

## 🛠️ Tecnologías Utilizadas

- HTML5
- CSS3 (EDteam UX + estilos personalizados)
- JavaScript ES6+
- localStorage
- Programación Orientada a Objetos

---

## 📸 Capturas 

### 📘 Vista Cursos
<img width="1621" height="919" alt="image" src="https://github.com/user-attachments/assets/0324e6d5-1e9b-48ae-ac98-eeab368f863f" />

### 👨‍🏫 Vista Profesores
<img width="1370" height="744" alt="image" src="https://github.com/user-attachments/assets/52bc917f-5c34-4d20-a715-5ad2bbb44b31" />

### 👨‍🎓 Vista Alumnos
<img width="1373" height="696" alt="image" src="https://github.com/user-attachments/assets/61031485-d88e-40b4-89ed-484b2a45641d" />

---

## 📦 Instalación y Uso

1. Clona el repositorio:
```bash
git clone https://github.com/Jorge-is/edcursos-poo-js.git
```

2. Ingresa al proyecto:
```bash
cd edcursos-poo-js
```

3. Abre el archivo `index.html` en tu navegador:

- Doble clic sobre el archivo  
o  
- Usando Live Server en VS Code (opcional)

> Proyecto desarrollado con fines académicos.
