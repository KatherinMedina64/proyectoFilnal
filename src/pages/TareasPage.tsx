import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useTareas } from '../hooks/useTareas';
import { useProyectos } from '../hooks/useProyectos';
import { useUsuarios } from '../hooks/useUsuarios';
import TareaForm from '../components/forms/TareaForm';
import TareasTable from '../components/tables/TareasTable';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import type { CrearTareaDTO } from '../interfaces/Tarea';

export default function TareasPage() {
    const { tareas, loading, error, crear, eliminar } = useTareas();
    const { proyectos } = useProyectos();
    const { usuarios } = useUsuarios();

    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    // 🔥 CAMBIAR ESTADO (AQUÍ ESTABA FALTANDO)
    const handleCambiarEstado = async (id: number, estado: string) => {
        try {
            await fetch(`http://localhost:5000/api/tareas/${id}/estado`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ estado }),
            });
            window.location.reload(); // (temporal)

        } catch (err: any) {
            alert(err.message);
        }
    };

    const handleCrear = async (data: CrearTareaDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowModal(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Eliminar esta tarea?')) return;
        try {
            await eliminar(id);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">

            {/* HEADER */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">
                        Tareas
                    </h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {tareas.length} tarea(s) en total
                    </p>
                </div>

                <Button
                    onClick={() => setShowModal(true)}
                    icon={<Plus size={16} />}
                >
                    Nueva Tarea
                </Button>
            </div>

            {/* ERROR GENERAL */}
            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            {/* TABLA CON CAMBIO DE ESTADO */}
            <TareasTable
                tareas={tareas}
                loading={loading}
                onEliminar={handleEliminar}
                onCambiarEstado={handleCambiarEstado}
            />

            {/* MODAL CREAR */}
            <Modal
                open={showModal}
                onClose={() => setShowModal(false)}
                title="Crear Tarea"
            >
                {formError && (
                    <p className="text-red-600 text-sm mb-3">
                        {formError}
                    </p>
                )}

                <TareaForm
                    onSubmit={handleCrear}
                    onCancel={() => setShowModal(false)}
                    proyectos={proyectos}
                    usuarios={usuarios}
                />
            </Modal>
        </div>
    );
}