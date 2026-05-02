import { useState, useEffect, useCallback } from 'react';
import { usuarioService } from '../services/usuarioService';
import type { Usuario, CrearUsuarioDTO } from '../interfaces/Usuarios';

export const useUsuarios = () => {
    const [usuarios, setUsuarios] = useState<Usuario[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const cargar = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const data = await usuarioService.getAll();
            setUsuarios(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { cargar(); }, [cargar]);

    const crear = async (payload: CrearUsuarioDTO) => {
        const nuevo = await usuarioService.create(payload);
        setUsuarios((prev) => [...prev, nuevo]);
        return nuevo;
    };

    const eliminar = async (id: number) => {
        await usuarioService.remove(id);
        setUsuarios((prev) => prev.filter((u) => u.id !== id));
    };

    return { usuarios, loading, error, cargar, crear, eliminar };
};