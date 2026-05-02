import { useForm } from 'react-hook-form';
import type { CrearTareaDTO } from '../../interfaces/Tarea';
import type { Proyecto } from '../../interfaces/Proyecto';
import type { Usuario } from '../../interfaces/Usuarios';
import Button from '../ui/Button';

interface Props {
    onSubmit: (data: CrearTareaDTO) => Promise<void>;
    onCancel: () => void;
    proyectos: Proyecto[];
    usuarios: Usuario[];
}

export default function TareaForm({ onSubmit, onCancel, proyectos, usuarios }: Props) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<CrearTareaDTO>();

    const campo = 'block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500';
    const err = 'border-red-400 bg-red-50';
    const normal = 'border-slate-200 bg-white';

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Título *</label>
                <input
                    {...register('titulo', {
                        required: 'El título es obligatorio',
                        minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    })}
                    className={`${campo} ${errors.titulo ? err : normal}`}
                    placeholder="Implementar autenticación..."
                />
                {errors.titulo && <p className="text-red-500 text-xs mt-1">{errors.titulo.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Descripción</label>
                <textarea
                    {...register('descripcion')}
                    rows={2}
                    className={`${campo} ${normal} resize-none`}
                    placeholder="Descripción opcional..."
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Proyecto *</label>
                <select
                    {...register('proyectoId', {
                        required: 'Selecciona un proyecto',
                        valueAsNumber: true,
                    })}
                    className={`${campo} ${errors.proyectoId ? err : normal}`}
                >
                    <option value="">-- Seleccionar proyecto --</option>
                    {proyectos.map((p) => (
                        <option key={p.id} value={p.id}>{p.nombre}</option>
                    ))}
                </select>
                {errors.proyectoId && <p className="text-red-500 text-xs mt-1">{errors.proyectoId.message}</p>}
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                    Asignar a Usuario <span className="text-slate-400 font-normal">(opcional)</span>
                </label>
                <select
                    {...register('usuarioId', { setValueAs: (v) => (v === '' ? null : Number(v)) })}
                    className={`${campo} ${normal}`}
                >
                    <option value="">-- Sin asignar --</option>
                    {usuarios.map((u) => (
                        <option key={u.id} value={u.id}>{u.nombre}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <Button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? 'Guardando...' : 'Crear Tarea'}
                </Button>
                <Button type="button" variant="ghost" onClick={onCancel}>Cancelar</Button>
            </div>
        </form>
    );
}