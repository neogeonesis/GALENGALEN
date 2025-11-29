// script.js - CÓDIGO FINAL DE ARRASTRE (Más compatible)
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
            e.dataTransfer.setData('text/plain', 'drag'); 
        }
    });

    // 2. PERMITE EL SOLTADO Y LA REORDENACIÓN (dragover)
    // Usamos esta función para decirle al navegador: "Sí, puedes soltar aquí."
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        
        const target = e.target.closest('.item-galeria');
        if (target && target !== draggedItem) {
            
            // Lógica simple para mover el elemento si la posición cambia
            const rect = target.getBoundingClientRect();
            const esAntes = e.clientY < rect.top + rect.height / 2;

            if (esAntes) {
                // Mover antes
                galeria.insertBefore(draggedItem, target);
            } else {
                // Mover después
                galeria.insertBefore(draggedItem, target.nextSibling);
            }
        }
    });

    // 3. FIN DEL ARRASTRE (dragend)
    galeria.addEventListener('dragend', () => {
        if (draggedItem) {
            draggedItem.classList.remove('arrastrando');
        }
        draggedItem = null;
    });

    // 4. NECESARIO PARA COMPATIBILIDAD (dragenter)
    galeria.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
});
