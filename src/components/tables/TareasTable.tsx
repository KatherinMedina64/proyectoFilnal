import { Trash2, ClipboardList } from 'lucide-react';
import type { Tarea } from '../../interfaces/Tarea';
import Button from '../ui/Button';
import Badge from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

interface Props {
    tareas: Tarea[];
    loading: boolean;
    onEliminar: (id: number) => void;
    onCambiarEstado: (id: number, estado: string) => void;
}

export default function TareasTable({
    tareas,
    loading,
    onEliminar,
    onCambiarEstado
}: Props) {

    if (loading) {
        return (
            <div className="text-center py-12 text-slate-400 animate-pulse">
                Cargando tareas...
            </div>
        );
    }

    if (!tareas.length) {
        return (
            <EmptyState
                icon={ClipboardList}
                title="Sin tareas"
                description="Crea la primera tarea y asígnala a un usuario."
            />
        );
    }

    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
            <table className="w-full text-sm">
                <thead className="bg-slate-50 text-slate-600 font-semibold">
                    <tr>
                        <th className="text-left px-5 py-3">#</th>
                        <th className="text-left px-5 py-3">Título</th>
                        <th className="text-left px-5 py-3">Estado</th>
                        <th className="text-left px-5 py-3">Proyecto</th>
                        <th className="text-left px-5 py-3">Asignado a</th>
                        <th className="text-left px-5 py-3">Creado</th>
                        <th className="text-left px-5 py-3">Acciones</th>
                    </tr>
                </thead>

                <tbody>
                    {tareas.map((t) => (
                        <tr
                            key={t.id}
                            className="border-t border-slate-50 hover:bg-slate-50/50 transition-colors"
                        >
                            <td className="px-5 py-3 text-slate-400">{t.id}</td>

                            <td className="px-5 py-3 font-medium text-slate-800">
                                {t.titulo}
                            </td>

                            {/* ESTADO EDITABLE */}
                            <td className="px-5 py-3 flex items-center gap-2">
                                <Badge estado={t.estado} />

                                <select
                                    value={t.estado}
                                    onChange={(e) =>
                                        onCambiarEstado(t.id, e.target.value)
                                    }
                                    className="text-xs border border-slate-200 rounded px-2 py-1 bg-white"
                                >
                                    <option value="PENDIENTE">Pendiente</option>
                                    <option value="EN_PROGRESO">En progreso</option>
                                    <option value="COMPLETADA">Completada</option>
                                </select>
                            </td>

                            <td className="px-5 py-3 text-slate-600">
                                {t.proyecto?.nombre || `ID: ${t.proyectoId}`}
                            </td>

                            <td className="px-5 py-3 text-slate-500">
                                {t.usuario?.nombre || (
                                    <span className="text-slate-300 italic">
                                        Sin asignar
                                    </span>
                                )}
                            </td>

                            <td className="px-5 py-3 text-slate-400">
                                {new Date(t.createAt).toLocaleDateString('es-BO')}
                            </td>

                            <td className="px-5 py-3">
                                <Button
                                    variant="danger"
                                    onClick={() => onEliminar(t.id)}
                                    icon={<Trash2 size={14} />}
                                >
                                    Eliminar
                                </Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}