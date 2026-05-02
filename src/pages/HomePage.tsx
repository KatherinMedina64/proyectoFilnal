import { Link } from 'react-router-dom';
import { Users, FolderKanban, ClipboardList, ArrowRight, Zap, Shield, BarChart3 } from 'lucide-react';

const stats = [
    { label: 'Usuarios', icon: Users, to: '/usuarios', color: 'bg-blue-500' },
    { label: 'Proyectos', icon: FolderKanban, to: '/proyectos', color: 'bg-violet-500' },
    { label: 'Tareas', icon: ClipboardList, to: '/tareas', color: 'bg-emerald-500' },
];

const features = [
    { icon: Zap, title: 'Tiempo Real', desc: 'Datos siempre actualizados desde la API.' },
    { icon: Shield, title: 'Organización', desc: 'Gestiona equipos, proyectos y tareas en un solo lugar.' },
    { icon: BarChart3, title: 'Visibilidad', desc: 'Visualiza el estado de cada tarea en segundos.' },
];

export default function HomePage() {
    return (
        <div className="space-y-16">
            {/* Banner principal */}
            <section className="relative rounded-3xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white px-8 py-20 text-center overflow-hidden">
                <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-400 via-transparent to-transparent" />
                <div className="relative z-10 space-y-6">
                    <span className="inline-block bg-blue-600/30 border border-blue-500/40 text-blue-300 text-xs font-semibold px-4 py-1 rounded-full uppercase tracking-widest">
                        Plataforma de gestión
                    </span>
                    <h1 className="text-5xl sm:text-6xl font-extrabold tracking-tight leading-tight">
                        TaskFlow
                        <br />
                        <span className="text-blue-400">sin fricción</span>
                    </h1>
                    <p className="text-slate-300 text-lg max-w-xl mx-auto">
                        Administra usuarios, proyectos y tareas desde una interfaz centralizada conectada a tu API REST.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center pt-2">
                        <Link to="/proyectos"
                            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl transition-colors">
                            Ver Proyectos <ArrowRight size={18} />
                        </Link>
                        <Link to="/tareas"
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-6 py-3 rounded-xl border border-white/20 transition-colors">
                            Gestionar Tareas
                        </Link>
                    </div>
                </div>
            </section>

            {/* Cards de acceso rápido */}
            <section>
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Acceso rápido</h2>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    {stats.map(({ label, icon: Icon, to, color }) => (
                        <Link key={to} to={to}
                            className="group bg-white rounded-2xl p-6 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all flex items-center gap-4">
                            <div className={`${color} text-white p-3 rounded-xl`}>
                                <Icon size={24} />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{label}</p>
                                <p className="text-sm text-slate-500">Gestionar →</p>
                            </div>
                        </Link>
                    ))}
                </div>
            </section>

            {/* Features */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {features.map(({ icon: Icon, title, desc }) => (
                    <div key={title} className="bg-white rounded-2xl p-6 border border-slate-100 shadow-sm space-y-3">
                        <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                            <Icon size={20} />
                        </div>
                        <h3 className="font-semibold text-slate-800">{title}</h3>
                        <p className="text-sm text-slate-500 leading-relaxed">{desc}</p>
                    </div>
                ))}
            </section>
        </div>
    );
}