// Escucha el evento DOMContentLoaded y llama a la función loadBooks cuando la página esté completamente cargada
document.addEventListener('DOMContentLoaded', loadBooks);

// Función asíncrona para cargar los libros
async function loadBooks() {
    // Selecciona el contenedor donde se mostrarán las tarjetas de libros
    const bookContainer = document.getElementById('bookContainer');

    // Muestra un mensaje de carga y un GIF animado mientras se obtienen los datos de la API
    bookContainer.innerHTML = `
    <div class="loading-container">
       <span class="loading-text">Cargando...</span>
       <img src="./cthulu.gif" alt="Cargando..." class="loading-gif">        
    </div>
    `;

    try {
        // Realiza una solicitud a la API de OpenLibrary para buscar libros relacionados con "lovecraft"
        const response = await fetch('https://openlibrary.org/search.json?q=lovecraft');
        const data = await response.json(); // Convierte la respuesta en un objeto JSON

        // Limpia el contenido del contenedor (elimina el mensaje de carga)
        bookContainer.innerHTML = '';

        // Recorre los primeros 12 libros de los resultados obtenidos
        data.docs.slice(0, 12).forEach(book => {
            // Crea un elemento 'div' para cada libro
            const bookCard = document.createElement('div');
            bookCard.className = 'book-card'; // Asigna una clase CSS para estilizar la tarjeta

            // Rellena la tarjeta con datos del libro
            bookCard.innerHTML = `
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i || '11121667'}-M.jpg" alt="${book.title}">
                <h3>${book.title}</h3>
                <p>Autor: ${book.author_name ? book.author_name.join(', ') : 'Desconocido'}</p>
                <div class="synopsis" style="display: none;">${book.first_sentence ? book.first_sentence[0] : 'Sin sinopsis disponible.'}</div>
                <button>Leer más</button>
            `;

            // Selecciona el botón y la sinopsis dentro de la tarjeta
            const button = bookCard.querySelector('button');
            const synopsis = bookCard.querySelector('.synopsis');

            // Agrega un evento al botón para alternar la visibilidad de la sinopsis
            button.addEventListener('click', () => {
                if (synopsis.style.display === 'none') {
                    synopsis.style.display = 'block'; // Muestra la sinopsis
                    button.textContent = 'Ocultar'; // Cambia el texto del botón
                } else {
                    synopsis.style.display = 'none'; // Oculta la sinopsis
                    button.textContent = 'Leer más'; // Cambia el texto del botón
                }
            });

            // Agrega la tarjeta al contenedor de libros
            bookContainer.appendChild(bookCard);
        });
    } catch (error) {
        // Muestra un mensaje de error en caso de que falle la solicitud
        bookContainer.innerHTML = 'Ocurrió un error al cargar los libros.';
        console.error(error); // Imprime el error en la consola para depuración
    }
}


