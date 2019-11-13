const socket = io()
const waitTimeTemplate = document.querySelector('#waitTime-msg').innerHTML
const $message = document.querySelector('#waitTime')

    socket.on('waitData', (time) => {
        const html = Mustache.render(waitTimeTemplate, {
            time: time
        })
        $message.insertAdjacentHTML('beforeend', html)
    })
