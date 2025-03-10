
// // MOUVEMENT DE LA BALLE (credit: https://controlistes.fr/)

// const elementRadius = 100; // moitié de la taille de l'element
// const threshold = 300; // distance avant repoussement
// const stopThreshold = 100; // distance avant arrêt
// const maxSpeed = 100; // vmax
// const friction = 0.98; // frottement
// let velocityX = 0;
// let velocityY = 0;
// let isFrozen = false;

// let elementX = window.innerWidth;
// let elementY = window.innerHeight;
// element.setAttribute("draggable", "true");
// element.style.left = `${elementX - elementRadius - 20}px`;
// element.style.top = `${elementY - elementRadius - 20}px`;

// document.addEventListener('mousemove', (event) => {
//     const mouseX = event.clientX;
//     const mouseY = event.clientY;

//     const deltaX = mouseX - elementX;
//     const deltaY = mouseY - elementY;
//     const distance = Math.sqrt(deltaX ** 2 + deltaY ** 2);

//     if (distance < stopThreshold) {
//         isFrozen = true;
//     } else {
//         isFrozen = false;
//     }

//     if (!isFrozen && distance < threshold) {
//         const angle = Math.atan2(deltaY, deltaX);
//         const forceX = Math.cos(angle) * (threshold - distance) * 0.005;
//         const forceY = Math.sin(angle) * (threshold - distance) * 0.005;

//         velocityX -= forceX;
//         velocityY -= forceY;

//         velocityX = Math.min(Math.max(velocityX, -maxSpeed), maxSpeed);
//         velocityY = Math.min(Math.max(velocityY, -maxSpeed), maxSpeed);
//     }
// });

// function updatePosition() {
//     if (!isFrozen) {
//         velocityX *= friction;
//         velocityY *= friction;

//         elementX += velocityX;
//         elementY += velocityY;

//         if (elementX - elementRadius <= 0) {
//             elementX = elementRadius;
//             velocityX *= -1;
//         } else if (elementX + elementRadius >= window.innerWidth) {
//             elementX = window.innerWidth - elementRadius;
//             velocityX *= -1;
//         }

//         if (elementY - elementRadius <= 0) {
//             elementY = elementRadius;
//             velocityY *= -1;
//         } else if (elementY + elementRadius >= window.innerHeight) {
//             elementY = window.innerHeight - elementRadius;
//             velocityY *= -1;
//         }

//         element.style.left = `${elementX - elementRadius}px`;
//         element.style.top = `${elementY - elementRadius}px`;
//     }

//     requestAnimationFrame(updatePosition);
// }

// requestAnimationFrame(updatePosition);

