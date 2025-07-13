const $ = document.querySelector.bind(document)
const $$ = document.querySelectorAll.bind(document);
const players = [
    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/474694898_1332718511193305_74746386889893367_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=zbJ8TaLuDv0Q7kNvwF8zTmZ&_nc_oc=AdnYCu-EfH_mI24D6OdsJxkXA_1XRkxmw3EXK25wrXNb92ynUuZ6iu2R4orHRtBj5LpMwfMPMiFFOuKFCgLwFy-U&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=Bi1HvXtx_12Zkql_JWp21g&oh=00_AfQgkI7xJhBN7EWKdlRI_vU9-ciiV9hI7YjCQgxukHObnQ&oe=6878671A'
    },

    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/474854159_1333411444457345_7519668013632304817_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=833d8c&_nc_ohc=yp-kD3QhavAQ7kNvwHADEt3&_nc_oc=Adlr8uRKYB4u7bcL1AM1kWnBgrJKecaE4BsOByfTrmq0LtUEUtLm91UdrYvHK8COK7BPZTaBwcZ9mNiscD3szISX&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=lt0s_277c4DgoYUqdgkZ0w&oh=00_AfSQhZjZ9i42cyTR1ESTAPhxaMlqLaoCCrWm_OmBzl7D0w&oe=68787903'
    },

    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/475089079_1333302177801605_5855028318334042876_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=127cfc&_nc_ohc=uu3dsMiYQ_0Q7kNvwHpykNT&_nc_oc=AdkJusXQQIOaJzyS7YnTjJxw7RgQL5D_cHZR2nwBCx32CQto8HjOW88B4rtQGZXojucv2pNjvXL61Kx-gPuQv4BT&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=1K7PiATDMXr5m6myGHraKw&oh=00_AfS_ZNtLu75bcBFxXm4-TVaeLUGgn8xTZD4o1Jqc6-PZMQ&oe=6878879B'
    }, 

    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/474116095_1329873554811134_4801265193676958430_n.jpg?_nc_cat=101&ccb=1-7&_nc_sid=833d8c&_nc_ohc=j8RDScBLUq0Q7kNvwGdeznV&_nc_oc=AdkqpO0LYJbHW5zeN5mfHb67xt_vXBJSDAjdcNk0m9U0Rpjf8qQAHW76BK3eRZnc5zZ39tR-hSxfxdrOdQXF_sFs&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=Vay03TvkYObKfBsK7YXwTg&oh=00_AfTQyxVpYJryUX818vMyPym6oOSk81skKpdgWqxcRsxwAA&oe=68787251'
    },

    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-2.fna.fbcdn.net/v/t39.30808-6/472620424_1318980615900428_4460813808847366805_n.jpg?_nc_cat=111&ccb=1-7&_nc_sid=833d8c&_nc_ohc=y6qQDYz46xIQ7kNvwFI-vya&_nc_oc=Adndr1c5zXW0-PIk6A-tytvVKUHnyoQP0uLDSS9eio1HQbC5zSFAmZtuAILpVaL_vAN1SCXtyYBeBKFrcbWIRa52&_nc_zt=23&_nc_ht=scontent.fhan15-2.fna&_nc_gid=uH8kKW9gpbvM-b6wUaOTIw&oh=00_AfS4gESrGI8QnQjK5gkg2sTfj-Wd81_1KTUIbcOUuO2shw&oe=68787BA7'
    },

    {
        name: 'Anna',
        photo: 'https://scontent.fhan15-1.fna.fbcdn.net/v/t39.30808-6/470222323_1305318787266611_2229509145115669827_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=833d8c&_nc_ohc=x5X0vc4PB1wQ7kNvwFQQZxK&_nc_oc=Admgt1KtDzyo02hixrI48UuU60qg6sjtyTB9npq-0r7WOPka1FReIHgCRQHtfXHI3OgPoF4FC2NzZPUfXaJW-6sM&_nc_zt=23&_nc_ht=scontent.fhan15-1.fna&_nc_gid=UPFq9r1IfdQbTFZvIO9nCg&oh=00_AfTe7UcVrzdgYSyKnkA9esx89C9F-e0DqJE_L-U2MK0mbQ&oe=68787746'
    }
]
const container= $('.card-container');
const ignoreBtn= $('.ignore')
const likeBtn= $('.like');
let isTouching= false;
let startX=0;
let deltaX=0;
let currentCard=null;
const COLOR_LIKE = 'rgba(14, 96, 14, 0.8)';
const COLOR_IGNORE = 'rgba(186, 14, 14, 0.8)';
const COLOR_RESET = 'white';
renderPlayers(players)
//
container.addEventListener('touchstart', (e) => {
    currentCard=container.querySelector('.card:last-child');
    if(!currentCard) return;
    startX=e.touches[0].clientX;
    isTouching=true;
})
container.addEventListener('touchmove', (e) => {
    if(!isTouching || !currentCard) return;
    deltaX= e.touches[0].clientX-startX;
    console.log(deltaX);
    
    currentCard.style.transform = `translateX(${deltaX}px) rotate(${deltaX * 0.05}deg)`


    resetButtons()
    if(deltaX >0){
        currentCard.style.borderColor = COLOR_LIKE;
        likeBtn.style.backgroundColor= COLOR_LIKE;
    }
    else {
        currentCard.style.borderColor = COLOR_IGNORE;
        ignoreBtn.style.backgroundColor= COLOR_IGNORE
    }
})
//
function handleTransitionEnd(e){
    const card=e.target;
    if(card){
        card.remove();
    }
    currentCard=null;
}
//
container.addEventListener('touchend', (e)=> {
    if(!currentCard) return;
    deltaX=e.changedTouches[0].clientX -startX;
    if(isSwipeEnough(deltaX)){
        handleSuccessfillSwipe(deltaX)
    }
    else{
        resetCardPosition();
    }
    isTouching=false;
})
function handleSuccessfillSwipe(deltaX){
    currentCard.style.transition = `transform 0.5s ease, opacity 0.5s ease`;
    currentCard.style.transform = `translateX(${deltaX*5}px) rotate(${deltaX*0.2}deg)`;
    currentCard.style.opacity = 0;
    resetButtons();
    currentCard.addEventListener('transitionend', handleTransitionEnd);
}
function isSwipeEnough(deltaX, threshold=50){
    return Math.abs(deltaX)>=threshold;
}
function resetCardPosition(e){
    currentCard.style.transition='transform 0.3s ease';
    currentCard.style.transform ='translateX(0) rotate(0deg)';
    currentCard.style.borderColor= 'transparent';
    resetButtons();
    currentCard=null;
}
function resetButtons() {
    likeBtn.style.backgroundColor = COLOR_RESET;
    ignoreBtn.style.backgroundColor = COLOR_RESET;
}
function renderPlayers(players){
    players.forEach((player, index) => {
        const card = document.createElement('div');
        card.className='card';
        card.innerHTML = `
            <div class="card-content">
                <img class="card-img" src="${player.photo}" alt="${player.name}">
                <div class="card-info">${player.name}</div>
            </div>
        `
        container.appendChild(card);
    })
}