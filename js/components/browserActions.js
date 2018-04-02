/*
 * Browser Action
 * 
 * Details: https://developer.chrome.com/extensions/browserAction
 *
 * Types:
 *     ColorArray - array of integer
 *     ImageDataType - Pixel data for an image. Must be an ImageData object (for example, from a canvas element).
 */

let tabId;

chrome.tabs.query({
    active: true,
    currentWindow: true
  },
  function (tabs) {
    tabId = tabs[0].id
  }
);

export const methods = {

    setTitle () {
        chrome.browserAction.setTitle({
            tabId,
            title: chrome.i18n.getMessage('this_is_title')
        });
    },

    getTitle () {
        chrome.browserAction.getTitle({ tabId }, (title) => {
            alert(`getTitle: ${title}`);
        });
    },

    setIcon () {

        const details = {
            tabId,
            path: '../../images/icons8-empty-jam-jar-96.png'
        };

        /*
         * Sets the icon for the browser action.
         * The icon can be specified either as the path to an image file
         * or as the pixel data from a canvas element, or as dictionary of either one of those.
         * Either the path or the imageData property must be specified.
         *
         * @param {Object} details - (optional)
         * @param {ImageDataType or object} details.ImageData - (optional)
         * @param {number} details.tabId - (optional)
         * @param callback (optional)
         */
        chrome.browserAction.setIcon(details);
    },

    setPopup () {

        const details = {
            tabId,
            popup: '../../templates/popup_two.html'
        };

        /*
         * Sets the html document to be opened as a popup when the user clickson the browser action's icon.
         *
         * @param {Object} details - (optional)
         * @param {string} details.popup - The html file to show in a popup. If set to the empty string (''), no popup is shown.
         * @param {number} details.tabId - (optional)
         */
        chrome.browserAction.setPopup(details);
    },

    getPopup () {

        const details = { tabId };

        /*
         * Gets the html document set as the popup for this browser action.
         *
         * @param {Object} details - (optional)
         * @param {number} details.tabId - (optional)
         * @param callback {string} - chrome-extension://[EXTENSION_ID]/[NAME].html
         */
        chrome.browserAction.getPopup(details, (result) => {
            alert(result)
        });
    },

    setBadgeText () {

        // count++
        let count = chrome.i18n.getMessage('text');

        /*
         * Sets the badge text for the browser action. The badge is displayed on top of the icon.
         *
         * @param {Object} details - (optional)
         * @param {number} details.text - Any number of characters can be passed, but only about four can fit in the space.
         * @param {number} details.tabId - (optional)
         */
        chrome.browserAction.setBadgeText({
            tabId,
            text: count + ''
        });
    },

    getBadgeText () {

        const details = { tabId };

        /*
         * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
         *
         * @param {Object} details
         * @param {number} details.tabId - (optional) Specify the tab to get the badge text from.
         * If no tab is specified, the non-tab-specific badge text is returned.
         * @param callback {string}
         */
        chrome.browserAction.getBadgeText(details, (result) => {
            alert(`getBadgeText: ${result}`);
        });
    },

    setBadgeBackgroundColor () {

        const details = {
            tabId,
            color: '#FF0000'
        };

        /*
         * Sets the background color for the badge.
         *
         * @param {Object} details
         * @param {string or ColorArray} details.color - An array of four integers in the range [0,255] that make up the RGBA color of the badge. For example, opaque red is [255, 0, 0, 255]. Can also be a string with a CSS value, with opaque red being #FF0000 or #F00.
         * @param {number} details.tabId - (optional) Limits the change to when a particular tab is selected.
         * Automatically resets when the tab is closed.
         */
        chrome.browserAction.setBadgeBackgroundColor(details);
    },

    getBadgeBackgroundColor () {

        const details = { tabId };

        /*
         * Gets the badge text of the browser action. If no tab is specified, the non-tab-specific badge text is returned.
         *
         * @param {Object} details
         * @param {number} details.tabId - (optional) Specify the tab to get the badge text from.
         * If no tab is specified, the non-tab-specific badge text is returned.
         * @param callback {string}
         */
        chrome.browserAction.getBadgeBackgroundColor(details, (result) => {
            alert(`getBadgeBackgroundColor: ${result}`);
        });
    },

    enable () {
        /*
         * Enables the browser action for a tab. By default, browser actions are enabled.
         *
         * @param {number} tabId - (optional) The id of the tab for which you want to modify the browser action.
         */
        chrome.browserAction.enable(tabId);
    },

    disable () {
        /*
         * Disables the browser action for a tab.
         *
         * @param {number} tabId - (optional) The id of the tab for which you want to modify the browser action.
         */
        chrome.browserAction.disable(tabId);
    }
};