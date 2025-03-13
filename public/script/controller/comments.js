const script = document.createElement('script');
script.src = "https://cdn.jsdelivr.net/npm/gsap@3.12.7/dist/Flip.min.js";
script.onload = () => {
    console.log('GSAP Flip loaded');
};
document.head.appendChild(script);

document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener("click", async (event) => {
        if (event.target.classList.contains("comment")) {
            console.log(event);
            let pilz_id = parseInt(event.target.value);
            console.log(pilz_id);
            const pilz = event.target.parentNode.parentElement.parentNode;
            console.log(pilz);
            const t = event.target.parentElement;
            console.log(t);
            const nextNode = pilz.nextElementSibling;
            console.log(nextNode);
            const newElement = pilz.cloneNode(true);
            // newElement.classList.remove("pillz-container");
            newElement.classList.add("comment-container");
            pilz.parentNode.insertBefore(newElement, nextNode);
        }
        if (event.target.classList.contains("pillz-container")) {
            console.log(event);
            
        }
        
    });
});