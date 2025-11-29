// script.js - Maneja la funcionalidad de arrastrar y soltar (Drag and Drop)
document.addEventListener('DOMContentLoaded', () => {
    // La galería es el contenedor de los elementos arrastrables
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // 1. Maneja el inicio del arrastre:
    galeria.addEventListener('dragstart', (e) => {
        // Asegura que el elemento arrastrado sea el 'item-galeria'
        const item = e.target.closest('.item-galeria'); 
        if (item) {
            draggedItem = item;
            
            // Añade una clase para efecto visual (opacidad)
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
        e.preventDefault(); // Esencial para permitir la acción de 'drop'
        const target = e.target.closest('.item-galeria');
        
        // Verifica que estemos sobre otro elemento y que no sea el mismo que estamos arrastrando
        if (target && target !== draggedItem) {
            
            const rect = target.getBoundingClientRect();
            // Determina si estamos en la mitad superior o inferior del elemento objetivo
            const esAntes = e.clientY < rect.top + rect.height / 2; 

            if (esAntes) {
                // Inserta el elemento arrastrado justo antes del objetivo
                galeria.insertBefore(draggedItem, target);
            } else {
                // Inserta el elemento arrastrado justo después del objetivo
                galeria.insertBefore(draggedItem, target.nextSibling); 
            }
        }
    });
    
    // Buenas prácticas para asegurar que el arrastre funcione bien en todos los navegadores
    galeria.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
});
