/**
 * Notifications
 * 
 * Details: https://developer.chrome.com/extensions/notifications
 */

/**
 * TemplateType
 *
 * @typedef {string} TemplateType
 * @property {string} basic - Icon, title, message, expandedMessage, up to two buttons.
 * @property {string} image - Icon, title, message, expandedMessage, image, up to two buttons.
 * @property {string} list - Icon, title, message, items, up to two buttons. Users on Mac OS X only see the first item.
 * @property {string} progress - Icon, title, message, progress, up to two buttons.
 */

/**
 * PermissionLevel
 *
 * @typedef {string} PermissionLevel
 * @property {string} granted - User has elected to show notifications from the app or extension. This is the default at install time.
 * @property {string} denied - User has elected not to show notifications from the app or extension.
 */

/**
 * NotificationOptions
 *
 * @typedef {string} NotificationOptions
 * @property {TemplateType} [type] - Which type of notification to display. Required for notifications.create method.
 * @property {string} [iconUrl] - A URL to the sender's avatar, app icon, or a thumbnail for image notifications.
 * @property {string} [appIconMaskUrl] - Deprecated since Chrome 59: A URL to the app icon mask. URLs have the same restrictions as iconUrl.
 * @property {string} [title] - Title of the notification (e.g. sender name for email). Required for notifications.create method.
 * @property {string} [message] - Main notification content. Required for notifications.create method.
 * @property {string} [contextMessage] - Since Chrome 31. Alternate notification content with a lower-weight font.
 * @property {number} [priority] - Priority ranges from -2 to 2. -2 is lowest priority. 2 is highest. Zero is default. 
 * @property {number} [eventTime] - A timestamp associated with the notification, in milliseconds past the epoch (e.g. Date.now() + n).
 * @property {Object} [buttons] - Text and icons for up to two notification action buttons.
 * @property {string} buttons.title
 * @property {string} [buttons.iconUrl]
 * @property {string} [imageUrl] - Deprecated since Chrome 59. A URL to the image thumbnail for image-type notifications. URLs have the same restrictions as iconUrl.
 * @property {Object} [items] - Items for multi-item notifications. Users on Mac OS X only see the first item.
 * @property {string} items.title - Title of one item of a list notification.
 * @property {string} items.message - Additional details about this item.
 * @property {number} [progress] - Since Chrome 30. Current progress ranges from 0 to 100.
 * @property {boolean} [isClickable] - Since Chrome 32. Whether to show UI indicating that the app will visibly respond to clicks on the body of a notification.
 * @property {string} [requireInteraction] - Since Chrome 50. Indicates that the notification should remain visible on screen until the user activates or dismisses the notification. This defaults to false.
 */

let lastNotificationId;

export const methods = {

    create() {

        let options = {
                type: 'basic',
                iconUrl: '../../images/atom_icon.png',
                title: chrome.i18n.getMessage('this_is_title'),
                message: chrome.i18n.getMessage('we_dont_need_roads')
            };

        /**
         * Callback for creates and displays a notification.
         *
         * @callback returnsTheNotificationId
         * @param {string} notificationId
         */

        /**
         * Creates and displays a notification.
         *
         * @param {numper} [notificationId] - The notificationId parameter is required before Chrome 42.
         * @param {NotificationOptions} options - Contents of the notification.
         * @param {returnsTheNotificationId} [callback] - Returns the notification id (either supplied or generated) that represents the created notification.
         */
        chrome.notifications.create(lastNotificationId, options, (notificationId) => {
            lastNotificationId = notificationId;
            alert(`Notification ID: ${notificationId}`);
        });
    },

    update() {

        if (!lastNotificationId) {
            alert(chrome.i18n.getMessage('first_create_notification'));
            return;
        }

        let options = {
                type: 'basic',
                iconUrl: '../../images/light_bulb_icon.png',
                title: chrome.i18n.getMessage('this_is_still_title'),
                message: chrome.i18n.getMessage('why_do_you_keep_calling_me_calvin')
            };

        /**
         * Updates an existing notification.
         *
         * @param {numper} notificationId - The id of the notification to be updated. This is returned by notifications.create method.
         * @param {NotificationOptions} options - Contents of the notification to update to.
         * @param {wasUpdated} [callback] - Called to indicate whether a matching notification existed. The callback is required before Chrome 42.
         */
        chrome.notifications.update(lastNotificationId, options, (wasUpdated) => {
            alert(`Update status: ${wasUpdated}`);
        });
    },

    clear() {

        if (!lastNotificationId) {
            alert(chrome.i18n.getMessage('first_create_notification'));
            return;
        }

        /**
         * Clears the specified notification.
         *
         * @param {numper} notificationId - The id of the notification to be cleared. This is returned by notifications.create method.
         * @param {wasCleared} [callback] - Called to indicate whether a matching notification existed. The callback is required before Chrome 42.
         */
        chrome.notifications.clear(lastNotificationId, (wasCleared) => {
            alert(`Clear status: ${wasCleared}`);
        });
    },

    getAll() {
        /**
         * Retrieves all the notifications.
         * Since Chrome 29.
         *
         * @param {notifications} [callback] - Returns the set of notification_ids currently in the system.
         */
        chrome.notifications.getAll((notifications) => {
            alert(JSON.stringify(notifications));
        });
    },

    getPermissionLevel() {
        /**
         * Retrieves whether the user has enabled notifications from this app or extension.
         * Since Chrome 32.
         *
         * @param {PermissionLevel} [callback] - Returns the current permission level.
         */
        chrome.notifications.getPermissionLevel((level) => {
            if ('granted') {
                alert(chrome.i18n.getMessage('notifications_granted'));
            } else if ('denied') {
                alert(chrome.i18n.getMessage('notifications_denied'));
            }
        });
    }
};


/**
 * Events
 */

function onClosedCallback(notificationId, byUser) {
    console.log(`Notification ID: ${notificationId}\nBy user: ${byUser}`);
}

function onClickedCallback(notificationId) {
    console.log(`Notification ID: ${notificationId}`);
}

function onButtonClickedCallback(notificationId, buttonIndex) {
    console.log(`Notification ID: ${notificationId}\nButton index: ${buttonIndex}`);
}

function onPermissionLevelChangedCallback(level) {
    console.log(`Level: ${level}`);
}

export const events = {

    onClosed: {
        addListener() {
            chrome.notifications.onClosed.addListener(onClosedCallback);
        },

        removeListener() {
            chrome.notifications.onClosed.removeListener(onClosedCallback);
        }
    },

    onClicked: {
        addListener() {
            chrome.notifications.onClicked.addListener(onClickedCallback);
        },

        removeListener() {
            chrome.notifications.onClicked.removeListener(onClickedCallback);
        }
    },

    onButtonClicked: {
        addListener() {
            chrome.notifications.onButtonClicked.addListener(onButtonClickedCallback);
        },

        removeListener() {
            chrome.notifications.onButtonClicked.removeListener(onButtonClickedCallback);
        }
    },

    onPermissionLevelChanged: {
        addListener() {
            chrome.notifications.onPermissionLevelChanged.addListener(onPermissionLevelChangedCallback);
        },

        removeListener() {
            chrome.notifications.onPermissionLevelChanged.removeListener(onPermissionLevelChangedCallback);
        }
    }
};