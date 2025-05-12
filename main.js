const btn = document.getElementById('backToTop');
const whats_call =document.querySelectorAll('#whats_call')


window.addEventListener("scroll",()=> {
    if(window.scrollY > window.innerHeight ) {
        btn.style.display = "block"
    }else
        btn.style.display = "none"
});


btn.addEventListener('click',() => {
    window.scrollTo({
        top:0,
        behavior:"smooth"
    })
})

whats_call.forEach(el=> {
    el.addEventListener('click',()=> {
        window.open(href="https://wa.me/21656533818")
    })
})
