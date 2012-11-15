var mapAsync = require("map-async")

module.exports = notify

function notify(options) {
    var validUsers = options.validUsers
        , Notification = options.Notification
        , sendNotification = options.sendNotification
        , saveNotification = options.saveNotification

    return notifier

    function notifier(options, callback) {
        validUsers(options, generateNotifications)

        function generateNotifications(err, users) {
            if (err) {
                return callback(err)
            }

            var notifications = users.map(callNotification)

            mapAsync(notifications, getResult, storeResults)
        }

        function callNotification(user) {
            return Notification(options, user)
        }

        function getResult(notification, callback) {
            sendNotification(notification, function (err, result) {
                if (err) {
                    return callback(err)
                }

                notification.result = result

                callback(null, notification)
            })
        }

        function storeResults(err, notifications) {
            if (err) {
                return callback(err)
            }

            mapAsync(notifications, saveNotification
                , function (err, docs) {
                    if (err) {
                        return callback(err)
                    }

                    callback(null, notifications)
                })
        }
    }
}
