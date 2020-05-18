const socket = io()
const waitTimeTemplate = document.querySelector('#waitTime-msg').innerHTML

socket.on('waitData', (time) => {
    const html = Mustache.render(waitTimeTemplate, {
        time: time
    })
    $('#waitTime').html(html)
})


