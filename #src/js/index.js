document.addEventListener('DOMContentLoaded', function() {
    const myElement = document.querySelector('#slider');
    const items = document.querySelectorAll('.slider .slide');
    const controlls = document.querySelectorAll('.controlls .cont');
    const maxWidth = items[0].getBoundingClientRect().width+30;
    let hammertime = new Hammer(myElement, {});

    let swiped = 0;
    hammertime.on('pan', function(ev) {

        items.forEach((el) => {
            el.style = `transform: translateX(${ev.deltaX+swiped}px)`;
        })
        
        if(ev.isFinal) {
            swiped = Math.round((swiped + ev.deltaX)/maxWidth) * maxWidth;
            move();
        }
    });

    controlls.forEach((el) => {
        el.addEventListener('click', function() {
            if( el.classList.contains('forw') ) {
                swiped -= maxWidth;
            }else{
                swiped += maxWidth;
            }
            move();
            resetControlls();
        })
    })

    function move() {
        if( swiped >= 100 ) {
            swiped = 0;
        }else if( swiped <= (-maxWidth*items.length+maxWidth*2-100) ){
            swiped = -maxWidth*items.length+maxWidth*2;
        }
        items.forEach((el) => {
            el.style = `transform: translateX(${swiped}px)`;
        })
        resetControlls()
    }

    function resetControlls() {
        if( swiped == 0 ) {
            controlls[0].classList.add('disabled');
        }else if( swiped == -maxWidth*items.length+maxWidth*2 ) {
            controlls[1].classList.add('disabled');
        }else{
            controlls.forEach((el) => {
                el.classList.remove('disabled');
            })
        }
    }
})