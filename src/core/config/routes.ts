import { AppRoute } from "@/models/general";


const routes: AppRoute[] = [
    {
        name: 'Pendientes',
        route: 'tasks',
        imagePath: '/assets/img/tasks-icon.png',
        description: 'Guarda pendientes con fecha y hora sobre tareas, compromisos, fechas cumpleaños, etc.',
        color: 'blue-400'
    },
    {
        name: 'Notas',
        route: 'notes',
        imagePath: '/assets/img/notes-icon.png',
        description: 'Guarda notas sobre ideas, conceptos, apuntes, etc. para recordarlos o copiarlos de manera fácil y rápida',
        color: 'orange-400'
    },
    {
        name: 'Dibujos',
        route: 'draws',
        imagePath: '/assets/img/draws-icon.png',
        description: 'Guarda dibujos para recordar conceptos o ideas de una manera más ilustrativa y dinámica',
        color: 'purple-400'
    }
];

export default routes;