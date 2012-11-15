var request = require("request")
    , url = require("url")

module.exports = SendNotification

function SendNotification(options) {
    var send = options.production ?
        sendToFacebook : sendToConsole

    return sendNotification

    function sendNotification(notification, callback) {
        getAppAcessToken(options, sendRequest)

        function sendRequest(err, token) {
            if (err) {
                return callback(err)
            }

            send(createLink(notification, token), callback)
        }
    }
}

function createLink(notification, token) {
    var link = url.parse(notification.uri || "", true)
        , fbUser = notification.user

    if (notification.campaign) {
        link.query.utm_campaign = notification.campaign
    }

    link.query.utm_source = "facebook"
    link.query.utm_medium = "notifications"
    ;delete link.search

    return "https://graph.facebook.com/" + fbUser.id +
        "/notifications?" + token + "&template=" +
        notification.text + "&href=" +
        encodeURIComponent(url.format(link))
}

function getAppAcessToken(options, callback) {
    var uri = "https://graph.facebook.com/oauth/access_token" +
        "?client_id=" + options.clientId + "&client_secret=" +
        options.clientSecret + "&grant_type=client_credentials"

    request(uri, extractBody(callback))
}

function sendToFacebook(uri, callback) {
    request({
        uri: uri
        , method: "POST"
    }, extractBody(callback))
}

function sendToConsole(uri, callback) {
    console.log("sendToConsole", uri)
    callback(null, {
        success: true
    })
}

// request ~_~
function extractBody(callback) {
    return function extract(err, res, body) {
        if (err) {
            return callback(err)
        }

        callback(null, body)
    }
}
