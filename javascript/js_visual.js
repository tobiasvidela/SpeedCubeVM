//            CONSTANTES
const playlist_aprender = {
  'principiante':"https://www.youtube.com/watch?v=GyY0OxDk5lI&list=PL1PfvzSCMX0cpBi5-qcKT45f4aZu7sGQO",
  'cfop':"https://www.youtube.com/watch?v=979lycubm9E&list=PLFbghVhL6Hm6Nax2itiPeVgFmmx3A7UWP",
  'roux':"https://www.youtube.com/watch?v=ilkF7cxQV2o&list=PLL7KvA5mhPX0qCIiG_kBdVl0yiTSpGENa"
}

//            VARIABLES

let lastScrollPosition = window.scrollY;
let navbar = document.querySelector('nav');
let isScrollingToSection = false; // Variable para controlar si el scroll es por click

//            FUNCIONALIDAD
// Función para manejar el scroll
function handleScroll() {
  const currentScrollPosition = window.scrollY;
  
  // Solo mostramos la navbar si el scroll es manual (no por click) y hacia arriba
  if (!isScrollingToSection) {
    navbar.classList.toggle('nav-hidden', currentScrollPosition > lastScrollPosition); 
  }
  
  lastScrollPosition = currentScrollPosition;

  updateActiveSection()
}

// Manejador para los clicks en enlaces internos
document.querySelectorAll('nav ul li a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    isScrollingToSection = true; // Activamos la bandera
    navbar.classList.add('nav-hidden'); // Ocultamos la navbar
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {  // Verificamos que el elemento exista
      targetElement.scrollIntoView({ behavior: 'smooth' });

      document.querySelectorAll('nav ul li a').forEach(a => a.classList.remove('active'));
      this.classList.add('active');
      
      // Restauramos la bandera después de que termine el scroll suave
      setTimeout(() => {
        isScrollingToSection = false;
      }, 1000);
    }
  });
});

// Función para obtener la sección actual
function getCurrentSection() {
  const sections = document.querySelectorAll('section');
  const navbarHeight = navbar.offsetHeight;
  
  // Punto de referencia: un poco después del inicio de la ventana para considerar el navbar
  const scrollPosition = window.scrollY + navbarHeight + 50;

  for (const section of sections) {
    const sectionTop = section.offsetTop;
    const sectionBottom = sectionTop + section.offsetHeight;
    
    // Si la posición actual está dentro de esta sección
    if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
      return section.id;
    }
  }
  
  // Si estamos al final de la página, retornamos la última sección
  if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
    return sections[sections.length - 1].id;
  }
  
  return null;
}

// Función para actualizar la sección activa
function updateActiveSection() {
  const currentSectionId = getCurrentSection();
  
  if (currentSectionId) {
    document.querySelectorAll('nav ul li a').forEach(a => {
      const href = a.getAttribute('href');
      a.classList.toggle('active', href === `#${currentSectionId}`);
    });
  }
}

// Función para ir a las playlists de aprender más
function ir_a_aprender_mas(btn_name) {
  window.open(playlist_aprender[btn_name],'_blank');
}

// Manejador de los clicks en los botones
document.querySelectorAll('#seccion-metodos .btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    ir_a_aprender_mas(btn.getAttribute('name'))
  });
});

// Función para mostrar u ocultar el precio de los cubos
function priceToggle(elemento) {
  const precio = elemento.querySelector('.precio');

  if (precio.classList.contains('visible')) {
    precio.classList.remove('visible');
  } else {
    precio.classList.add('visible');
  }
}

//            LLAMADAS

let ticking = false;
window.addEventListener('scroll', function() {
  if (!ticking) {
    window.requestAnimationFrame(function() {
      handleScroll();
      ticking = false;      
    });
    ticking = true;
  }
});

// Actualizamos la sección activa al cargar la página
document.addEventListener('DOMContentLoaded', updateActiveSection);

// Actualizamos la sección activa cuando cambie el tamaño de la ventana
window.addEventListener('resize', updateActiveSection);