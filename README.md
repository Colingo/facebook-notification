# facebook-notification

Send notifications to facebook

## Example

```js
var sendNotification = require("facebook-notificatoon")({
    clientId: "FACEBOOK CLIENT ID"
    , clientSecret: "FACEBOOK CLIENT SECRET"
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
```

## Installation

`npm install facebook-notification`

## Contributors

 - Raynos

## MIT Licenced
