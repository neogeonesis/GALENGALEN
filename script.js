// script.js - Funcionalidad simple de arrastre y reordenación (NO guarda el orden)
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // 1. Maneja el inicio del arrastre
    galeria.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.item-galeria'); 
        if (item) {
            draggedItem = item;
            
            // Añade clase visual para mostrar que se está arrastrando
            setTimeout(() => {
                draggedItem.classList.add('arrastrando');
            }, 0); 
            e.dataTransfer.setData('text/plain', item.id || 'dragged'); 
        }
    });

    // 2. Maneja el final del arrastre
    galeria.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('arrastrando');
        }
        draggedItem = null;
    });

    // 3. Permite la acción de soltar (crucial)
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        const target = e.target.closest('.item-galeria');
        
        if (target && target !== draggedItem) {
            const rect = target.getBoundingClientRect();
            const esAntes = e.clientY < rect.top + rect.height / 2; 

            if (esAntes) {
                galeria.insertBefore(draggedItem, target);
            } else {
                galeria.insertBefore(draggedItem, target.nextSibling); 
            }
        }
    });
    
    // 4. Previene errores en el arrastre
    galeria.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
});
