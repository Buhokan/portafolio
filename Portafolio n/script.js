// Animación de escritura para el título principal
function escribirTexto(elemento, texto, velocidad = 100) {
    let i = 0;
    elemento.textContent = '';
    
    const intervalo = setInterval(() => {
        if (i < texto.length) {
            elemento.textContent += texto.charAt(i);
            i++;
        } else {
            clearInterval(intervalo);
        }
    }, velocidad);
}

// Efecto de scroll suave para todos los enlaces que apuntan a secciones
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        
        if (targetId === '#' || targetId === '#barrasuperior') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        } else {
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        }
    });
});

// Cambio de estilo de la barra superior al hacer scroll
window.addEventListener('scroll', () => {
    const barra = document.querySelector('.barra-superior');
    const botonInicio = document.querySelector('.boton-inicio');
    
    if (window.scrollY > 100) {
        barra.classList.add('scrolled');
        botonInicio.classList.add('visible');
    } else {
        barra.classList.remove('scrolled');
        botonInicio.classList.remove('visible');
    }
});

// Animación de aparición de elementos al hacer scroll
const observador = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

// Aplicar animación a todas las habilidades, proyectos y contactos
document.addEventListener('DOMContentLoaded', () => {
    // Animación de escritura en el título principal
    const tituloPrincipal = document.querySelector('.inicio h1');
    const textoOriginal = tituloPrincipal.textContent;
    escribirTexto(tituloPrincipal, textoOriginal, 80);
    
    // Elementos a animar
    const elementosAnimados = document.querySelectorAll('.habilidad, .proyecto, .contacto-item');
    
    elementosAnimados.forEach((elemento, index) => {
        elemento.style.opacity = '0';
        elemento.style.transform = 'translateY(30px)';
        elemento.style.transition = 'all 0.6s ease';
        elemento.style.transitionDelay = `${index * 0.1}s`;
        observador.observe(elemento);
    });
});

// Efecto de partículas en el fondo (opcional pero impactante)
function crearParticulas() {
    const inicio = document.querySelector('.inicio');
    const numParticulas = 50;
    
    for (let i = 0; i < numParticulas; i++) {
        const particula = document.createElement('div');
        particula.className = 'particula';
        particula.style.cssText = `
            position: absolute;
            width: ${Math.random() * 3 + 1}px;
            height: ${Math.random() * 3 + 1}px;
            background: rgba(139, 92, 246, ${Math.random() * 0.5 + 0.2});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: flotar ${Math.random() * 10 + 5}s infinite ease-in-out;
            animation-delay: ${Math.random() * 5}s;
        `;
        inicio.appendChild(particula);
    }
    
    // Agregar animación de flotación
    if (!document.querySelector('#particulas-style')) {
        const style = document.createElement('style');
        style.id = 'particulas-style';
        style.textContent = `
            @keyframes flotar {
                0%, 100% {
                    transform: translate(0, 0) scale(1);
                    opacity: 0.3;
                }
                25% {
                    transform: translate(20px, -30px) scale(1.2);
                    opacity: 0.6;
                }
                50% {
                    transform: translate(-20px, -60px) scale(0.8);
                    opacity: 0.4;
                }
                75% {
                    transform: translate(30px, -30px) scale(1.1);
                    opacity: 0.7;
                }
            }
        `;
        document.head.appendChild(style);
    }
}

// Efecto de hover suave solo en habilidades y contactos (NO en proyectos)
document.querySelectorAll('.habilidad, .contacto-item').forEach(tarjeta => {
    tarjeta.addEventListener('mousemove', (e) => {
        const rect = tarjeta.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 40; // Más suave (era /20)
        const rotateY = (centerX - x) / 40; // Más suave (era /20)
        
        tarjeta.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-10px)`;
    });
    
    tarjeta.addEventListener('mouseleave', () => {
        tarjeta.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
    });
});

// Contador de habilidades animado
function animarContador(elemento, inicio, fin, duracion) {
    let actual = inicio;
    const incremento = (fin - inicio) / (duracion / 16);
    
    const timer = setInterval(() => {
        actual += incremento;
        if (actual >= fin) {
            actual = fin;
            clearInterval(timer);
        }
        elemento.textContent = Math.floor(actual) + '%';
    }, 16);
}

// Efecto de cursor personalizado (opcional)
function cursorPersonalizado() {
    const cursor = document.createElement('div');
    cursor.className = 'cursor-personalizado';
    cursor.style.cssText = `
        width: 20px;
        height: 20px;
        border: 2px solid #8b5cf6;
        border-radius: 50%;
        position: fixed;
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.2s ease;
        mix-blend-mode: difference;
    `;
    document.body.appendChild(cursor);
    
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
    });
    
    document.querySelectorAll('a, button').forEach(elemento => {
        elemento.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        elemento.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
}

// Inicializar efectos
window.addEventListener('load', () => {
    crearParticulas();
    // cursorPersonalizado(); // Descomenta si quieres el cursor personalizado
});

// Efecto de escritura continua en el subtítulo
const subtitulo = document.querySelector('.inicio p');
if (subtitulo) {
    const textos = [
        "Estoy aprendiendo desarrollo web y construyendo mi camino en el mundo del software.",
        "Creando experiencias digitales únicas y funcionales.",
        "Transformando ideas en código limpio y eficiente.",
        "Estudiante apasionado por la tecnología y el desarrollo."
    ];
    
    let indiceTexto = 0;
    
    setInterval(() => {
        indiceTexto = (indiceTexto + 1) % textos.length;
        subtitulo.style.opacity = '0';
        
        setTimeout(() => {
            subtitulo.textContent = textos[indiceTexto];
            subtitulo.style.opacity = '1';
        }, 500);
    }, 5000);
    
    subtitulo.style.transition = 'opacity 0.5s ease';
}

// Añadir efecto de progreso de lectura
const barraProgreso = document.createElement('div');
barraProgreso.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #8b5cf6, #c084fc);
    z-index: 10000;
    transition: width 0.1s ease;
`;
document.body.appendChild(barraProgreso);

window.addEventListener('scroll', () => {
    const altura = document.documentElement.scrollHeight - window.innerHeight;
    const progreso = (window.scrollY / altura) * 100;
    barraProgreso.style.width = progreso + '%';
});