var sendNotification = require("../index")({
    clientId: "557894760891414"
    , clientSecret: "bdb298a2c13c1129b63a16e24edb7f54"
    , production: false
})

sendNotification({
    user: {
        id: "facebook id"
    }
    , uri: "/my uri"
    , campaign: "optional utm_campaign for google analytics"
    , text: "text of notification"
}, function (err, result) {
    console.log("send notification!")
})
