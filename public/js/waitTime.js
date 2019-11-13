const socket = io()
const waitTimeTemplate = document.querySelector('#waitTime-msg').innerHTML
const $message = document.querySelector('#waitTime')

let time;


//socket firing data when hit delete button
$(function(){
    $('#delete').on('submit', function(e){
        // e.preventDefault()
        const num = $('#index').find('ul').length
        if(num > 2){
            time = 10 * (num-3)
        }else{
            time = 0
        }
        socket.emit('waitData', time)
        // $('#waitTime').text('');
    //         
    //     })
    })
    socket.on('waitData', (time) => {
        const html = Mustache.render(waitTimeTemplate, {
            time: time
        })
        $message.insertAdjacentHTML('beforeend', html)
    })
})
