// script.js - Maneja la funcionalidad de arrastrar y soltar (Drag and Drop)
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // 1. Maneja el inicio del arrastre:
    galeria.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.item-galeria');
        if (item) {
            draggedItem = item;
            // Añade una clase para efecto visual
            setTimeout(() => {
                draggedItem.classList.add('arrastrando');
            }, 0); 
        }
    });

    // 2. Maneja el final del arrastre:
    galeria.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('arrastrando');
        }
        draggedItem = null;
    });

    // 3. Permite y realiza la reordenación:
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); // Esencial para permitir el 'drop'
        const target = e.target.closest('.item-galeria');
        if (target && target !== draggedItem) {
            
            // Reordena el elemento arrastrado basándose en la posición del ratón
            const rect = target.getBoundingClientRect();
            const esAntes = e.clientY < rect.top + rect.height / 2; // ¿Estamos en la mitad superior?

            if (esAntes) {
                galeria.insertBefore(draggedItem, target);
            } else {
                galeria.insertBefore(draggedItem, target.nextSibling); // Insertar después
            }
        }
    });
});