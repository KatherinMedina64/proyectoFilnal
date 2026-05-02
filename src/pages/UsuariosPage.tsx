import { useState } from 'react';
import { Plus } from 'lucide-react';
import { useUsuarios } from '../hooks/useUsuarios';
import UsuarioForm from '../components/forms/UsuarioForms';
import UsuariosTable from '../components/tables/UsuariosTable';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import type { CrearUsuarioDTO } from '../interfaces/Usuarios';

export default function UsuariosPage() {
    const { usuarios, loading, error, crear, eliminar } = useUsuarios();
    const [showModal, setShowModal] = useState(false);
    const [formError, setFormError] = useState<string | null>(null);

    const handleCrear = async (data: CrearUsuarioDTO) => {
        try {
            setFormError(null);
            await crear(data);
            setShowModal(false);
        } catch (err: any) {
            setFormError(err.message);
        }
    };

    const handleEliminar = async (id: number) => {
        if (!confirm('¿Confirmas eliminar este usuario?')) return;
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
                    <h1 className="text-2xl font-bold text-slate-800">Usuarios</h1>
                    <p className="text-slate-500 text-sm mt-1">{usuarios.length} usuario(s) registrado(s)</p>
                </div>
                <Button onClick={() => setShowModal(true)} icon={<Plus size={16} />}>
                    Nuevo Usuario
                </Button>
            </div>

            {error && <div className="bg-red-50 text-red-700 border border-red-200 rounded-xl px-4 py-3 text-sm">{error}</div>}

            <UsuariosTable usuarios={usuarios} loading={loading} onEliminar={handleEliminar} />

            <Modal open={showModal} onClose={() => setShowModal(false)} title="Crear Usuario">
                {formError && <p className="text-red-600 text-sm mb-3">{formError}</p>}
                <UsuarioForm onSubmit={handleCrear} onCancel={() => setShowModal(false)} />
            </Modal>
        </div>
    );
}