const projectData = [
    // Definición (Azul)
    { id: 1, name: "Definición de Idea Principal", startDay: 1, endDay: 7, phase: "Definición", color: "#3b82f6" },
    { id: 2, name: "Redacción y Mercado Objetivo", startDay: 8, endDay: 9, phase: "Definición", color: "#3b82f6" },
    { id: 3, name: "Antecedentes y Justificación", startDay: 10, endDay: 14, phase: "Definición", color: "#3b82f6" },

    // Factibilidad y Organización (Verde)
    { id: 4, name: "Estudio de Factibilidad Técnica", startDay: 15, endDay: 19, phase: "Factibilidad", color: "#22c55e" },
    { id: 5, name: "Estudio de Factibilidad Económica", startDay: 20, endDay: 24, phase: "Factibilidad", color: "#22c55e" },
    { id: 6, name: "Misión, Visión y Valores", startDay: 25, endDay: 29, phase: "Organización", color: "#22c55e" },
    { id: 7, name: "Estructuración del Organigrama", startDay: 30, endDay: 35, phase: "Organización", color: "#22c55e" },

    // Localización y Presupuesto (Púrpura y Naranja)
    { id: 8, name: "Localización Física del Proyecto", startDay: 40, endDay: 44, phase: "Terreno", color: "#a855f7" },
    { id: 9, name: "Evaluación del Terreno (70 m²)", startDay: 45, endDay: 47, phase: "Terreno", color: "#a855f7" },
    { id: 10, name: "Presupuesto de Adquisición y Construcción", startDay: 48, endDay: 49, phase: "Presupuesto", color: "#f97316" },
    { id: 11, name: "Presupuesto Completo del Local", startDay: 50, endDay: 54, phase: "Presupuesto", color: "#f97316" },
    { id: 12, name: "Presupuesto de Herramientas y Vehículos", startDay: 55, endDay: 55, phase: "Presupuesto", color: "#f97316" },

    // Revisión y Cierre (Rojo)
    { id: 13, name: "Revisión y Organización de Cálculos", startDay: 56, endDay: 57, phase: "Revisión", color: "#ef4444" },
    { id: 14, name: "Revisión Final de Presupuesto", startDay: 58, endDay: 58, phase: "Revisión", color: "#ef4444" },
    { id: 15, name: "Creación Monitoreo y Evaluación", startDay: 59, endDay: 60, phase: "Monitoreo", color: "#ef4444" },
    { id: 16, name: "Tabla de Indicadores", startDay: 61, endDay: 62, phase: "Monitoreo", color: "#ef4444" },
    { id: 17, name: "Redacción Resultados Esperados", startDay: 63, endDay: 64, phase: "Cierre", color: "#ef4444" },
    { id: 18, name: "Organización y Auditoría", startDay: 65, endDay: 68, phase: "Cierre", color: "#ef4444" },
];

const totalDays = 68;

function renderLegend() {
    const phases = projectData.reduce((acc, task) => {
        if (!acc[task.phase]) {
            acc[task.phase] = { color: task.color, count: 0 };
        }
        acc[task.phase].count++;
        return acc;
    }, {});

    const container = document.getElementById('legend-container');
    container.innerHTML = '<h2>Leyenda de Fases:</h2>';

    for (const phase in phases) {
        const item = document.createElement('div');
        item.className = 'legend-item';
        item.innerHTML = `
            <span class="legend-color" style="background-color: ${phases[phase].color};"></span>
            <span>${phase} (${phases[phase].count} tareas)</span>
        `;
        container.appendChild(item);
    }
}

function renderTimelineHeader() {
    const header = document.getElementById('timeline-header');
    const interval = Math.max(1, Math.ceil(totalDays / 15));

    header.innerHTML = `
        <div class="header-info">Actividad / Día</div>
        <div class="timeline-scale"></div>
    `;

    const scale = header.querySelector('.timeline-scale');

    for (let day = 1; day <= totalDays; day++) {
        const percentage = ((day - 1) / totalDays) * 100;

        if (day === 1 || day === totalDays || day % interval === 0) {
            const marker = document.createElement('div');
            marker.className = 'day-marker';
            marker.style.left = `${percentage}%`;
            marker.innerHTML = `<span class="day-label" style="left: ${percentage < 10 ? '0' : '50%'};">Día ${day}</span>`;
            scale.appendChild(marker);
        }
    }
}

function renderTasks() {
    const tasksList = document.getElementById('tasks-list');
    tasksList.innerHTML = '';

    projectData.forEach((task) => {
        const duration = task.endDay - task.startDay + 1;
        const startPercentage = ((task.startDay - 1) / totalDays) * 100;
        const widthPercentage = (duration / totalDays) * 100;

        const row = document.createElement('div');
        row.className = 'task-row';
        row.innerHTML = `
            <div class="task-info">${task.name} <br> <span style="color: ${task.color}; font-size: 0.8em; font-weight: bold;">[${task.phase}]</span></div>
            <div class="timeline">
                <div 
                    class="task-bar" 
                    style="left: ${startPercentage}%; width: ${widthPercentage}%; background-color: ${task.color};"
                    title="${task.name} (Días ${task.startDay} - ${task.endDay})"
                >
                    ${duration} días
                </div>
            </div>
        `;
        tasksList.appendChild(row);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderLegend();
    renderTimelineHeader();
    renderTasks();
});
