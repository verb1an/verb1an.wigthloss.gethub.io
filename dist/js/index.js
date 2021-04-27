document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('#slider');
    const items = document.querySelectorAll('.slider .slide');
    const controlls = document.querySelectorAll('.controlls .cont');
    const maxWidth = items[0].getBoundingClientRect().width+30;
    const visibleSlides = document.querySelector('#reviews__slider .content').getBoundingClientRect().width/maxWidth;
    let hammertime = new Hammer(myElement, {});

    let swiped = 0;
    hammertime.on('pan', function(ev) {

        items.forEach((el) => {
            el.style = `transform: translateX(${ev.deltaX+swiped}px)`;
        })
        
        if(ev.isFinal) {
            let sw = Math.round((swiped + ev.deltaX)/maxWidth);
            swiped = sw * maxWidth;
            move();
        }
    });

    controlls.forEach((el) => {
        el.addEventListener('click', function() {
            if( !el.classList.contains('disabled') ) {
                if( el.classList.contains('forw') ) {
                    swiped -= maxWidth;
                }else{
                    swiped += maxWidth;
                }
                move();
                resetControlls();
            }
        })
    })

    function move() {
        let resetMawSwped = false;
        if( swiped >= 100 ) {
            swiped = 0;
        }else if( swiped <= (-maxWidth*items.length+maxWidth*visibleSlides+100) ){
            swiped = -maxWidth*items.length+document.querySelector('#reviews__slider .content').getBoundingClientRect().width+30;
            resetMawSwped = true;
        }
        items.forEach((el) => {
            el.style = `transform: translateX(${swiped}px)`;
        });

        if(resetMawSwped) {
            swiped = -maxWidth*items.length+maxWidth;
        }
        console.log(swiped)
        resetControlls();
    }

    function resetControlls() {
        if( swiped == 0 ) {
            controlls[0].classList.add('disabled');
        }else if( swiped <= -maxWidth*items.length+document.querySelector('#reviews__slider .content').getBoundingClientRect().width+30 ) {
            controlls[1].classList.add('disabled');
        }else{
            controlls.forEach((el) => {
                el.classList.remove('disabled');
            })
        }
    }
})