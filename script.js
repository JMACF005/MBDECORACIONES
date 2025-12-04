const projectData = [
    // La imagen no tiene días de inicio, solo números de tarea y duraciones. 
    // Usaremos los días que te di, pero ajustaremos la presentación.
    // Días ajustados para coincidir con la apariencia de la imagen.

    // FASE: Definición (Azul - #3b82f6)
    { id: 1, name: "Definición de Idea Principal", startDay: 1, endDay: 7, phase: "Planificación y Definición", color: "#3b82f6" },
    { id: 2, name: "Redacción y Mercado Objetivo", startDay: 8, endDay: 9, phase: "Planificación y Definición", color: "#3b82f6" },
    { id: 3, name: "Antecedentes y Justificación", startDay: 10, endDay: 14, phase: "Planificación y Definición", color: "#3b82f6" },

    // FASE: Factibilidad y Organización (Verde - #22c55e)
    { id: 4, name: "Estudio de Factibilidad Técnica", startDay: 15, endDay: 19, phase: "Organización y Factibilidad", color: "#22c55e" },
    { id: 5, name: "Estudio de Factibilidad Económica", startDay: 20, endDay: 24, phase: "Organización y Factibilidad", color: "#22c55e" },
    { id: 6, name: "Estructuración del Organigrama", startDay: 25, endDay: 29, phase: "Organización y Factibilidad", color: "#22c55e" },
    { id: 7, name: "Misión, Visión y Valores", startDay: 30, endDay: 35, phase: "Organización y Factibilidad", color: "#22c55e" },


    // FASE: Terreno (Púrpura - #a855f7)
    { id: 8, name: "Localización Física del Proyecto", startDay: 36, endDay: 40, phase: "Terreno", color: "#a855f7" },
    { id: 9, name: "Evaluación del Terreno (70 m²)", startDay: 41, endDay: 43, phase: "Terreno", color: "#a855f7" },
    
    // FASE: Presupuesto (Naranja - #f97316)
    { id: 10, name: "Presupuesto de Adquisición y Construcción", startDay: 44, endDay: 45, phase: "Presupuesto", color: "#f97316" },
    { id: 11, name: "Presupuesto Completo del Local", startDay: 46, endDay: 50, phase: "Presupuesto", color: "#f97316" },
    { id: 12, name: "Presupuesto de Herramientas y Vehículos", startDay: 51, endDay: 51, phase: "Presupuesto", color: "#f97316" },

    // FASE: Revisión y Cierre (Rojo - #ef4444)
    { id: 13, name: "Revisión y Organización de Cálculos", startDay: 52, endDay: 53, phase: "Monitoreo y Revisión", color: "#ef4444" },
    { id: 14, name: "Revisión Final de Presupuesto", startDay: 54, endDay: 54, phase: "Monitoreo y Revisión", color: "#ef4444" },
    { id: 15, name: "Creación Monitoreo y Evaluación", startDay: 55, endDay: 56, phase: "Monitoreo y Revisión", color: "#ef4444" },
    { id: 16, name: "Tabla de Indicadores", startDay: 57, endDay: 58, phase: "Monitoreo y Revisión", color: "#ef4444" },
    { id: 17, name: "Redacción Resultados Esperados", startDay: 59, endDay: 60, phase: "Organización y Revisión (Auditoría)", color: "#ef4444" },
    { id: 18, name: "Organización y Auditoría", startDay: 61, endDay: 68, phase: "Organización y Revisión (Auditoría)", color: "#ef4444" },
];

const totalDays = 68;
const phasesMap = projectData.reduce((acc, task) => {
    acc[task.phase] = task.color;
    return acc;
}, {});

function renderLegendAndTasksInfo() {
    const legendContainer = document.getElementById('legend-container');
    const tasksInfoList = document.getElementById('tasks-info-list');
    
    legendContainer.innerHTML = '<h3>Legend</h3>';
    tasksInfoList.innerHTML = '';

    const phases = {};
    projectData.forEach(task => {
        if (!phases[task.phase]) {
            phases[task.phase] = { color: task.color, tasks: [] };
        }
        phases[task.phase].tasks.push(task);
    });

    let currentTaskNumber = 1;
    for (const phaseName in phases) {
        // 1. Renderizar Leyenda (Sección superior)
        const legendItem = document.createElement('div');
        legendItem.className = 'legend-item';
        legendItem.innerHTML = `
            <span class="legend-color" style="background-color: ${phases[phaseName].color};"></span>
            <span>${phaseName}</span>
        `;
        legendContainer.appendChild(legendItem);

        // 2. Renderizar Títulos de Fase y Tareas (Sección inferior)
        const phaseTitle = document.createElement('h3');
        phaseTitle.className = 'legend-section';
        phaseTitle.textContent = phaseName;
        tasksInfoList.appendChild(phaseTitle);

        phases[phaseName].tasks.forEach(task => {
            const duration = task.endDay - task.startDay + 1;
            const item = document.createElement('div');
            item.className = 'task-info-item';
            item.innerHTML = `
                <span>${currentTaskNumber++}. ${task.name}</span>
                <span>Días: ${duration}</span>
            `;
            tasksInfoList.appendChild(item);
        });
    }
}

function renderTimelineHeader() {
    const header = document.getElementById('timeline-header');
    header.innerHTML = '';
    
    // Marcadores para 1, 2, 3... y luego cada 5 (o ajustado)
    const markersToShow = [1, 2, 3, 4];
    for(let d = 5; d <= totalDays; d += 5) {
        markersToShow.push(d);
    }
    if (!markersToShow.includes(totalDays)) markersToShow.push(totalDays);

    markersToShow.forEach(day => {
        const percentage = ((day - 1) / totalDays) * 100;
        
        const marker = document.createElement('div');
        marker.className = 'day-marker';
        marker.style.left = `${percentage}%`;
        
        // Etiqueta de día
        const label = document.createElement('span');
        label.className = 'day-label';
        label.textContent = day;
        label.style.left = `${percentage}%`;

        header.appendChild(marker);
        header.appendChild(label);
    });
}

function renderTasksBars() {
    const tasksBarsList = document.getElementById('tasks-bars-list');
    tasksBarsList.innerHTML = '';

    projectData.forEach((task) => {
        const duration = task.endDay - task.startDay + 1;
        const startPercentage = ((task.startDay - 1) / totalDays) * 100;
        const widthPercentage = (duration / totalDays) * 100;

        const row = document.createElement('div');
        row.className = 'task-row-bar';
        row.innerHTML = `
            <div 
                class="task-bar" 
                style="left: ${startPercentage}%; width: ${widthPercentage}%; background-color: ${task.color};"
                title="${task.name} | Duración: ${duration} días | Fase: ${task.phase} "
            >
                
            </div>
        `;
        tasksBarsList.appendChild(row);
    });
}

// Ejecutar funciones al cargar
document.addEventListener('DOMContentLoaded', () => {
    renderLegendAndTasksInfo();
    renderTimelineHeader();
    renderTasksBars();
});
