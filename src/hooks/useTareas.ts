import { useState, useEffect, useCallback } from 'react';
import { tareaService } from '../services/tareaService';
import type { Tarea, CrearTareaDTO, ActualizarTareaDTO } from '../interfaces/Tarea';

export const useTareas = (filtros?: { proyectoId?: number; estado?: string }) => {
    const [tareas, setTareas] = useState<Tarea[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await tareaService.getAll(filtros);
            setTareas(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, [filtros?.proyectoId, filtros?.estado]);

    useEffect(() => { cargar(); }, [cargar]);

    const crear = async (payload: CrearTareaDTO) => {
        const nueva = await tareaService.create(payload);
        setTareas((prev) => [...prev, nueva]);
        return nueva;
    };

    const actualizar = async (id: number, payload: ActualizarTareaDTO) => {
        const actualizada = await tareaService.update(id, payload);
        setTareas((prev) => prev.map((t) => (t.id === id ? actualizada : t)));
        return actualizada;
    };

    const eliminar = async (id: number) => {
        await tareaService.remove(id);
        setTareas((prev) => prev.filter((t) => t.id !== id));
    };

    return { tareas, loading, error, cargar, crear, actualizar, eliminar };
};