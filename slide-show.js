const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const containerElement = $(".container");
const slideWrapper = $('.slide-wrapper');
let slideItems = Array.from($$('.slide-item'));
const controlBtn = $('.slide-control');
const prevBtn = $('.prev-btn');
const nextBtn = $('.next-btn');
const opt = {
    loop: true,
    slideBy: null,
    items: 1,
    speed: 500,
}
let currentIndex = opt.items;
let isAnimation = null;
let intervalId=null;
cloneNodes()
createWrapper();
prevBtn.onclick = (e) => {
    moveSlide(-1);
}
nextBtn.onclick = (e) => {
    moveSlide(1);
}
function moveSlide(step) {
    if (isAnimation) return;
    isAnimation = true;
    const maxIndex = slideItems.length - opt.items;
    currentIndex = Math.min(Math.max(currentIndex + step, 0), maxIndex);
    setTimeout(() => {
        if (opt.loop) {
            if (currentIndex <= 0) {
                currentIndex = maxIndex - opt.items;
            }
            else if (currentIndex >= maxIndex) {
                currentIndex = opt.items;
            }
            updatePositon(true)
        }
        isAnimation = false;
    }, opt.speed);
    updatePositon();
}
function updatePositon(instant = false) {
    slideWrapper.style.transition = instant ? "none" : `transform ease ${opt.speed}ms`;
    const offSet = -100 * currentIndex / opt.items;
    slideWrapper.style.transform = `translateX(${offSet}%)`
    if (!instant) {
        updateNav()
    }
}
function cloneNodes() {
    const cloneHead = slideItems.slice(-opt.items).map((node) => node.cloneNode(true));
    const cloneTail = slideItems.slice(0, opt.items).map((node) => node.cloneNode(true));
    slideItems = cloneHead.concat(slideItems.concat(cloneTail));
    slideItems.forEach(item => slideWrapper.appendChild(item));
    currentIndex = opt.items;
    slideItems.forEach(item => {
        item.style.flexBasis = `calc(${100 / opt.items}%)`;
    })
    updatePositon();

}
function createWrapper() {
    const slideCount = ((slideItems.length - (opt.loop ? 2 * opt.items : 0)));
    const pageCount = Math.floor(slideCount / opt.items);
    for (let i = 0; i < pageCount; i++) {
        const dot = document.createElement('button');
        dot.className = "btn btn-dot";
        if (i == 0) {
            dot.classList.add("active");
        }
        dot.onclick = () => {
            currentIndex = opt.loop ? i * opt.items + opt.items :
                i * opt.items;
            updatePositon();
        }
        $('.slide-dot').appendChild(dot);

    }
}
function updateNav() {
    let realIndex = currentIndex;
    if (opt.loop) {
        const slideCount = slideItems.length - opt.items * 2;
        realIndex = (currentIndex - opt.items + slideCount) % slideCount;
    }
    const pageIndex = Math.floor(realIndex / opt.items);
    const dots = Array.from($$('.btn-dot'));
    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === pageIndex)
    })

}
function startInterval() {
    if (intervalId) return;
    intervalId = setInterval(() => {
        moveSlide(1);
    }, opt.speed + 1000); 
}
containerElement.onmouseenter = () => {
    clearInterval(intervalId);
    intervalId=null;
}
containerElement.onmouseleave = () => {
    startInterval();
}