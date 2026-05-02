import axiosInstance from '../api/axiosInstance';
import type { Tarea, CrearTareaDTO, ActualizarTareaDTO } from '../interfaces/Tarea';

export const tareaService = {
    getAll: async (filtros?: { proyectoId?: number; estado?: string }): Promise<Tarea[]> => {
        const { data } = await axiosInstance.get<Tarea[]>('/tareas', { params: filtros });
        return data;
    },

    getById: async (id: number): Promise<Tarea> => {
        const { data } = await axiosInstance.get<Tarea>(`/tareas/${id}`);
        return data;
    },

    create: async (payload: CrearTareaDTO): Promise<Tarea> => {
        const { data } = await axiosInstance.post<Tarea>('/tareas', payload);
        return data;
    },

    update: async (id: number, payload: ActualizarTareaDTO): Promise<Tarea> => {
        const { data } = await axiosInstance.put<Tarea>(`/tareas/${id}`, payload);
        return data;
    },

    remove: async (id: number): Promise<void> => {
        await axiosInstance.delete(`/tareas/${id}`);
    },
};