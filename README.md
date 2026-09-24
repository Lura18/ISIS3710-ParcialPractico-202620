# ISIS3710-ParcialPractico-202620
Laura Sofia Sarmiento - 202113056

punto 1

Revise la accesibilidad y usabilidad de la aplicación y escriba los resultados de al menos 5 errores identificados
en la interfaz. Use las herramientas Lighthouse y/o AxeDevTools sobre cada una de las páginas disponibles.
Para esto agregue en el archivo README una estructura como la siguiente:

# | Ubicación (archivo y linea) | Herramienta que lo detectó | Regla o principio incumplido | Por que es un problema o caso específico | Corrección

1 | src/app/[locale]/page.tsx (líneas 4-34) | Lighthouse / Axe | Contraste de color | En la pantalla principal, el texto y los botones tienen contraste bajo en algunos elementos sobre fondo claro. Esto afecta la legibilidad para usuarios con baja visión y dificulta la comprensión del propósito del campo. | Aumentar el contraste de texto y botones, usar una etiqueta visible o aria-label en el input de búsqueda y mantener un color de texto con relación WCAG AA.

2 | src/app/[locale]/auth/login/page.tsx (líneas 17-58) | Axe | Labels asociados a inputs | Los campos de correo y contraseña están definidos con labels, pero la estructura visual no siempre refuerza claramente el vínculo semántico para usuarios de lector de pantalla. Si el formulario se ampliara o se modificara, podría perderse la relación accesible entre label e input. | Mantener labels explícitos y persistentes, usar `htmlFor` con `id`, y verificar que los elementos tengan una jerarquía semántica clara.

3 | src/app/[locale]/auth/register/page.tsx (líneas 13-90) | Lighthouse | Formulario largo sin agrupación ni instrucciones | El registro tiene varios campos consecutivos sin una estructura clara de agrupación ni mensajes de ayuda. Esto aumenta la carga cognitiva y puede dificultar el proceso para usuarios con baja experiencia digital o necesidades de apoyo cognitivo. | Agrupar campos por secciones, añadir texto guía y mantener un orden visual consistente con mensajes de ayuda.

4 | src/components/UserMenu.tsx (líneas 13-21) | Axe / Lighthouse | Elementos interactivos sin nombre accesible | El botón “+ Crear Plan” y los iconos de logout pueden no ser interpretados con suficiente claridad por tecnologías de asistencia si no tienen un nombre accesible explícito. Esto afecta a usuarios que navegan por teclado o con lectores de pantalla. | Añadir `aria-label` o texto visible alternativo y asegurar que todos los botones tengan un nombre accesible.

5 | src/app/[locale]/plans/page.tsx (líneas 7-57) | Lighthouse | Uso inadecuado de imágenes y texto alternativo | Las imágenes de los planes usan `img` sin `alt` descriptivo, lo que elimina información útil para usuarios de lector de pantalla. Además, el contenido se presenta como una grilla de tarjetas sin jerarquía textual clara. | Añadir `alt` descriptivo a cada imagen y garantizar que cada tarjeta tenga un título y texto equivalente accesible.