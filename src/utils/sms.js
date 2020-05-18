const accountSid = process.env.TWILIO_SID
const authToken = process.env.TWILIO_AUTHTOKEN
const client = require('twilio')(accountSid, authToken)

const sendsms = (phone, name, people) => {
    client.messages.create({
        body: `Hello ${name}, yourTable for ${people} is ready. Please see the host within 5 mins to get yourTable`,
        to: `+1${phone}`,
        from: '+12058902248'
    }).then(message => console.log(message.sid))
}

module.exports = sendsms