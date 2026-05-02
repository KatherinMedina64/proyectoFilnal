export type EstadoTarea = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';

export interface Tarea {
    id: number;
    titulo: string;
    descripcion?: string;
    estado: EstadoTarea;
    proyectoId: number;
    usuarioId?: number | null;
    createAt: string;
    proyecto?: { nombre: string };
    usuario?: { nombre: string } | null;
}

export interface CrearTareaDTO {
    titulo: string;
    descripcion?: string;
    proyectoId: number;
    usuarioId?: number | null;
}

export interface ActualizarTareaDTO extends Partial<CrearTareaDTO> {
    estado?: EstadoTarea;
}