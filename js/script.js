// LOADER
window.addEventListener("load",()=>{
  document.querySelector(".loader").style.display="none";
});

// NAVBAR SCROLL
window.addEventListener("scroll",()=>{
  document.querySelector("header")
    .classList.toggle("scrolled",window.scrollY>60);
});

// CARD REVEAL
const reveal=()=>{
  document.querySelectorAll(".card").forEach(card=>{
    if(card.getBoundingClientRect().top<window.innerHeight-100){
      card.style.opacity=1;
      card.style.transform="translateY(0)";
    }
  });
};
window.addEventListener("scroll",reveal);
reveal();

// DARK MODE
const toggle=document.getElementById("darkToggle");
if(toggle){
  toggle.onclick=()=>{
    document.body.classList.toggle("dark");
    localStorage.setItem("theme",
      document.body.classList.contains("dark")?"dark":"light");
  };
}
if(localStorage.getItem("theme")==="dark"){
  document.body.classList.add("dark");
}

// COUNTERS
document.querySelectorAll(".counter").forEach(counter=>{
  let done=false;
  window.addEventListener("scroll",()=>{
    if(!done && counter.getBoundingClientRect().top<window.innerHeight){
      done=true;
      let target=+counter.dataset.target;
      let i=0;
      let timer=setInterval(()=>{
        i+=Math.ceil(target/100);
        if(i>=target){counter.innerText=target;clearInterval(timer);}
        else counter.innerText=i;
      },20);
    }
  });
});



document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const darkToggle = document.getElementById('darkToggle');
    const counters = document.querySelectorAll('.counter');

    // 1. Hide Loader
    window.addEventListener('load', () => {
        if(loader) loader.style.display = 'none';
    });

    // 2. Dark Mode Toggle
    if(darkToggle) {
        darkToggle.addEventListener('click', () => {
            document.body.classList.toggle('dark');
            darkToggle.textContent = document.body.classList.contains('dark') ? '☀️' : '🌙';
        });
    }

    // 3. Counter Animation Logic
    const animateCounters = () => {
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const speed = target / 100;

            if (count < target) {
                counter.innerText = Math.ceil(count + speed);
                setTimeout(animateCounters, 20);
            } else {
                counter.innerText = target;
            }
        });
    };

    // Trigger counters when they come into view
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting) {
            animateCounters();
        }
    }, { threshold: 0.5 });

    if(counters.length > 0) {
        observer.observe(counters[0].parentElement);
    }
});
