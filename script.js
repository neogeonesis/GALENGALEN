// script.js - CÓDIGO FINAL DE ARRASTRE Y REORDENACIÓN
document.addEventListener('DOMContentLoaded', () => {
    const galeria = document.querySelector('.galeria');
    let draggedItem = null;

    // Función auxiliar para detectar el elemento más cercano y dónde insertarlo
    const obtenerElementoObjetivo = (contenedor, y) => {
        // Filtra los elementos de la galería que no sean el que se está arrastrando
        const elementosRestantes = [...contenedor.querySelectorAll('.item-galeria:not(.arrastrando)')];

        return elementosRestantes.reduce((masCercano, hijo) => {
            const box = hijo.getBoundingClientRect();
            // Calcula la distancia vertical (offset) entre el centro del elemento y el cursor (y)
            const offset = y - box.top - box.height / 2;

            // Busca el elemento más cercano que esté debajo del cursor (offset negativo más cercano a cero)
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
            
            // Añade una clase para el estilo visual (opacidad)
            setTimeout(() => {
                draggedItem.classList.add('arrastrando');
            }, 0); 
            // Establece datos para asegurar que el navegador permita la transferencia
            e.dataTransfer.setData('text/plain', 'arrastrando'); 
        }
    });

    // 2. REORDENACIÓN EN VIVO (dragover)
    // Este evento es clave para que el elemento se mueva mientras lo arrastras
    galeria.addEventListener('dragover', (e) => {
        e.preventDefault(); // Imprescindible para que la zona sea un destino válido de 'drop'
        
        if (!draggedItem) return;

        const afterElement = obtenerElementoObjetivo(galeria, e.clientY);

        // Si encontramos un elemento objetivo, movemos el draggedItem justo antes
        if (afterElement) {
            galeria.insertBefore(draggedItem, afterElement);
        } else {
            // Si afterElement es null, significa que estamos al final, lo añadimos al final
            galeria.appendChild(draggedItem);
        }
    });

    // 3. FIN DEL ARRASTRE (dragend)
    galeria.addEventListener('dragend', () => {
        if (draggedItem) {
            // Limpia el estilo de arrastre
            draggedItem.classList.remove('arrastrando');
        }
        draggedItem = null;
    });

    // 4. NECESARIO PARA COMPATIBILIDAD (dragenter)
    galeria.addEventListener('dragenter', (e) => {
        e.preventDefault();
    });
});
