type BadgeVariant = 'PENDIENTE' | 'EN_PROGRESO' | 'COMPLETADA';

const styles: Record<BadgeVariant, string> = {
    PENDIENTE: 'bg-amber-100 text-amber-700 border-amber-200',
    EN_PROGRESO: 'bg-blue-100  text-blue-700  border-blue-200',
    COMPLETADA: 'bg-green-100 text-green-700 border-green-200',
};

const labels: Record<BadgeVariant, string> = {
    PENDIENTE: 'Pendiente',
    EN_PROGRESO: 'En progreso',
    COMPLETADA: 'Completada',
};

export default function Badge({ estado }: { estado: BadgeVariant }) {
    return (
        <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full border ${styles[estado]}`}>
            {labels[estado]}
        </span>
    );
}