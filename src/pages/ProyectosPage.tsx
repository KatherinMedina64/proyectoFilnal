import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useProyectos } from '../hooks/useProyectos';
import { useUsuarios } from '../hooks/useUsuarios';
import ProyectoForm from '../components/forms/ProyectoForm';
import ProyectosTable from '../components/tables/ProyectosTable';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import type { CrearProyectoDTO } from '../interfaces/Proyecto';

export default function ProyectosPage() {
    const { proyectos, loading, error, crear, eliminar } = useProyectos();
    const { usuarios } = useUsuarios();

    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleCrear = async (data: CrearProyectoDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowModal(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Confirmas eliminar este proyecto? Esto también eliminará sus tareas.')) return;

        try {
            await eliminar(id);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Proyectos</h1>
                    <p className="text-slate-500 text-sm mt-1">
                        {proyectos.length} proyecto(s) registrado(s)
                    </p>
                </div>

                <Button onClick={() => setShowModal(true)} icon={<Plus size={16} />}>
                    Nuevo Proyecto
                </Button>
            </div>

            {error && (
                <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">
                    {error}
                </div>
            )}

            <ProyectosTable
                proyectos={proyectos}
                loading={loading}
                onEliminar={handleEliminar}
            />

            <Modal open={showModal} onClose={() => setShowModal(false)} title="Crear Proyecto">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}

                <ProyectoForm
                    onSubmit={handleCrear}
                    onCancel={() => setShowModal(false)}
                    usuarios={usuarios}
                />
            </Modal>
        </div>
    );
}