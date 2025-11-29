// script.js - CÓDIGO FINAL DE ARRASTRE Y REORDENACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // Función auxiliar para detectar el elemento más cercano (Misma lógica robusta)
    const obtenerElementoObjetivo = (contenedor, y) => {
        const elementosRestantes = [...contenedor.querySelectorAll('.item-galeria:not(.arrastrando)')];

        return elementosRestantes.reduce((masCercano, hijo) => {
            const box = hijo.getBoundingClientRect();
            const offset = y - box.top - box.height / 2;

            if (offset < 0 && offset > masCercano.offset) {
                return { offset: offset, element: hijo };
            } else {
                return masCercano;
            }
        }, { offset: -Infinity }).element;
    };

    // 1. INICIO DEL ARRASTRE (dragstart) - ¡MODIFICACIÓN CLAVE AQUÍ!
    galeria.addEventListener('dragstart', (e) => {
        const item = e.target.closest('.item-galeria');

        // **************** CORRECCIÓN CLAVE: Verifica que el elemento arrastrado sea el contenedor ****************
        if (item && item.contains(e.target)) {
            // Impedimos que arrastre el enlace o la imagen si no tiene el atributo draggable
            e.dataTransfer.effectAllowed = 'move'; 
            draggedItem = item;
            
            setTimeout(() => {
                draggedItem.classList.add('arrastrando');
            }, 0); 
            e.dataTransfer.setData('text/plain', 'arrastrando'); 
        } else {
            // Si el elemento no es el contenedor, cancelamos el arrastre.
            e.preventDefault(); 
        }
    });

    // 2. REORDENACIÓN EN VIVO (dragover)
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        
        if (!draggedItem) return;

        const afterElement = obtenerElementoObjetivo(galeria, e.clientY);

        if (afterElement) {
            galeria.insertBefore(draggedItem, afterElement);
        } else {
            galeria.appendChild(draggedItem);
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
