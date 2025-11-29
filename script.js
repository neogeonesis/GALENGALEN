const draggables = document.querySelectorAll('.draggable');
let currentElement = null;
let startX = 0, startY = 0, initialLeft = 0, initialTop = 0;
let zIndexCounter = 1; // Para que el elemento que toques se ponga encima de los otros

draggables.forEach(element => {
    element.addEventListener('mousedown', (e) => {
        currentElement = element;
        
        // Calcular la posición inicial del ratón
        startX = e.clientX;
        startY = e.clientY;
        
        // Obtener la posición actual del elemento (parseando los pixels a números)
        const rect = currentElement.getBoundingClientRect();
        initialLeft = rect.left;
        initialTop = rect.top;

        // Traer al frente
        zIndexCounter++;
        currentElement.style.zIndex = zIndexCounter;
    });
});

document.addEventListener('mousemove', (e) => {
    if (!currentElement) return;

    // Calcular cuánto se movió el ratón
    const deltaX = e.clientX - startX;
    const deltaY = e.clientY - startY;

    // Aplicar la nueva posición
    currentElement.style.left = `${initialLeft + deltaX}px`;
    currentElement.style.top = `${initialTop + deltaY}px`;
});

document.addEventListener('mouseup', () => {
    currentElement = null; // Soltar el elemento
});
