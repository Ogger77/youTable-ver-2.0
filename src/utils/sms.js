const accountSid = 'AC9210965119c3a220ef0e13315ba2560f'
const authToken = 'a7a4251106ded4825647d6b97481411c'
const client = require('twilio')(accountSid, authToken)

const sendsms = (phone, name, people) => {
    client.messages.create({
        body: `Hello ${name}, yourTable for ${people} is ready. Please see the host within 5 mins to get yourTable`,
        to: `+1${phone}`,
        from: '+12015844512'
    }).then(message => console.log(message.sid))
}

module.exports = sendsms