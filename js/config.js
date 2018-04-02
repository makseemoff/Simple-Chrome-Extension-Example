export default {
    browserActions: {
        name: 'Browser Actions',
        description: 'Add icons to the toolbar (extensions only)',
        methods: {
            setTitle: 'chrome.browserAction.setTitle(object details)',
            getTitle: 'chrome.browserAction.getTitle(object details, function callback)',
            setIcon: 'chrome.browserAction.setIcon(object details, function callback)',
            setPopup: 'chrome.browserAction.setPopup(object details)',
            getPopup: 'chrome.browserAction.getPopup(object details, function callback)',
            setBadgeText: 'chrome.browserAction.setBadgeText(object details)',
            getBadgeText: 'chrome.browserAction.getBadgeText(object details, function callback)',
            setBadgeBackgroundColor: 'chrome.browserAction.setBadgeBackgroundColor(object details)',
            getBadgeBackgroundColor: 'chrome.browserAction.getBadgeBackgroundColor(object details, function callback)',
            enable: 'chrome.browserAction.enable(integer tabId)',
            disable: 'chrome.browserAction.disable(integer tabId)'
        }
    },
    notifications: {
        name: 'Desktop Notifications',
        description: 'Notify users of important events',
        methods: {
            create: 'chrome.notifications.create(string notificationId, NotificationOptions options, function callback)',
            update: 'chrome.notifications.update(string notificationId, NotificationOptions options, function callback)',
            clear: 'chrome.notifications.clear(string notificationId, function callback)',
            getAll: 'chrome.notifications.getAll(function callback)',
            getPermissionLevel: 'chrome.notifications.getPermissionLevel(function callback)'
        },
        events: {
            onClosed: 'chrome.browserAction.onClosed.addListener(function callback)',
            onClicked: 'chrome.notifications.onClicked.addListener(function callback)',
            onButtonClicked: 'chrome.notifications.onButtonClicked.addListener(function callback)'
            // onPermissionLevelChanged: 'chrome.notifications.onPermissionLevelChanged.addListener(function callback)'
        }
    },
    omnibox: {
        name: 'Omnibox',
        description: 'Add a keyword to the address bar',
        methods: {
            setDefaultSuggestion: 'chrome.omnibox.setDefaultSuggestion(object suggestion)'
        },
        events: {
            onInputStarted: 'chrome.omnibox.onInputStarted.addListener(function callback)',
            onInputChanged: 'chrome.omnibox.onInputChanged.addListener(function callback)',
            onInputEntered: 'chrome.omnibox.onInputEntered.addListener(function callback)',
            onInputCancelled: 'chrome.omnibox.onInputCancelled.addListener(function callback)',
            onDeleteSuggestion: 'chrome.omnibox.onDeleteSuggestion.addListener(function callback)'
        }
    }
}