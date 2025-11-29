// script.js - CÓDIGO FINAL DE ARRASTRE Y REORDENACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // Función auxiliar para obtener el elemento objetivo
    const obtenerElementoObjetivo = (e) => {
        // Busca todos los elementos de la galería que no sean el que estamos arrastrando
        const elementosRestantes = [...galeria.querySelectorAll('.item-galeria:not(.arrastrando)')];

        return elementosRestantes.reduce((masCercano, hijo) => {
            const box = hijo.getBoundingClientRect();
            // Calcula la distancia vertical entre el centro del elemento y el cursor
            const offset = e.clientY - box.top - box.height / 2;

            if (offset < 0 && offset > masCercano.offset) {
                return { offset: offset, element: hijo };
            } else {
                return masCercano;
            }
        }, { offset: -Infinity }).element;
    };

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

    // 2. REORDENACIÓN (dragover): Determina dónde colocar el elemento
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); 
        
        // Usamos la función robusta para encontrar el elemento más cercano
        const afterElement = obtenerElementoObjetivo(e);
        const currentElement = e.target.closest('.item-galeria');

        // Mueve el elemento arrastrado a la nueva posición
        if (afterElement == null) {
            // Si no hay un elemento después (estamos al final)
            if(draggedItem) galeria.appendChild(draggedItem);
        } else {
            // Mueve el elemento antes del objetivo
            if(draggedItem) galeria.insertBefore(draggedItem, afterElement);
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

