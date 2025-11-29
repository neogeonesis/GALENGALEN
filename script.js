// script.js - CÓDIGO MINIMALISTA Y ROBUSTO PARA EL ARRASTRE
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // 1. INICIO DEL ARRASTRE (dragstart)
    galeria.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.item-galeria');
        if (item) {
            draggedItem = item;
            setTimeout(() => {
                draggedItem.classList.add('arrastrando');
            }, 0);
            // Esto es crucial para la compatibilidad del arrastre
            e.dataTransfer.setData('text/plain', 'drag'); 
        }
    });

    // 2. FIN DEL ARRASTRE (dragend)
    galeria.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('arrastrando');
        }
        draggedItem = null;
    });

    // 3. SOBRE EL ELEMENTO (dragover): PERMITE EL SOLTADO
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); 

        const target = e.target.closest('.item-galeria');
        if (target && target !== draggedItem) {
            
            // Lógica para reordenar
            const rect = target.getBoundingClientRect();
            const esAntes = e.clientY < rect.top + rect.height / 2;

            if (esAntes) {
                galeria.insertBefore(draggedItem, target);
            } else {
                galeria.insertBefore(draggedItem, target.nextSibling);
            }
        }
    });

    // 4. NECESARIO PARA COMPATIBILIDAD
    galeria.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
});
