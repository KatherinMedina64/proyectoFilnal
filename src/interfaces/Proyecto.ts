export interface Proyecto {
    id: number;
    nombre: string;
    descripcion?: string;
    usuarioId: number;
    creadoEn: string;
    usuario?: { nombre: string };
    tareas?: { id: number }[];
}

export interface CrearProyectoDTO {
    nombre: string;
    descripcion?: string;
    usuarioId: number;
}
