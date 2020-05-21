const socket = io()
const waitTimeTemplate = document.querySelector('#waitTime-msg').innerHTML

let time;

//socket firing data when hit delete button
//select all id that matching
$(function(){
    $('[id=delete]').on('submit', function(e){
        const num = $('#index').find('ul').length
        if(num > 2){
            time = 10 * (num-3)
        }else{
            time = 0
        }
        socket.emit('waitData', time)
    })

    socket.on('waitData', (time) => {
        const html = Mustache.render(waitTimeTemplate, {
            time: time
        })
        $('#waitTime').html(html)
    })
})

