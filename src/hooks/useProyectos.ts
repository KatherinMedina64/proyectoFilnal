import { useState, useEffect, useCallback } from 'react';
import { proyectoService } from '../services/proyectoService';
import type { Proyecto, CrearProyectoDTO } from '../interfaces/Proyecto';

export const useProyectos = () => {
    const [proyectos, setProyectos] = useState<Proyecto[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await proyectoService.getAll();
            setProyectos(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { cargar(); }, [cargar]);

    const crear = async (payload: CrearProyectoDTO) => {
        const nuevo = await proyectoService.create(payload);
        setProyectos((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const eliminar = async (id: number) => {
        await proyectoService.remove(id);
        setProyectos((prev) => prev.filter((p) => p.id !== id));
    };

    return { proyectos, loading, error, cargar, crear, eliminar };
};