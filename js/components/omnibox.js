/**
 * Omnibox
 * 
 * Details: https://developer.chrome.com/extensions/omnibox
 */

export const methods = {

    setDefaultSuggestion() {

        let suggestion = {
                description: 'I finally invent something that works!',
            };

        chrome.omnibox.setDefaultSuggestion(suggestion);
    }
};


/**
 * Events
 */

function onInputStartedCallback() {
    console.log('onInputStarted');
}

function onInputChangedCallback(suggestResults) {
    console.log(`Suggest results: ${suggestResults}`);
}

function onInputEnteredCallback(text, disposition) {
    console.log(`Text: ${text}\nDisposition: ${disposition}`);
}

function onInputCancelledCallback() {
    console.log('onInputCancelled');
}

function onDeleteSuggestionCallback(text) {
    console.log(`Text of the deleted suggestion: ${text}`);
}

export const events = {

    onInputStarted: {
        addListener() {
            chrome.omnibox.onInputStarted.addListener(onInputStartedCallback);
        },

        removeListener() {
            chrome.omnibox.onInputStarted.removeListener(onInputStartedCallback);
        }
    },

    onInputChanged: {
        addListener() {
            chrome.omnibox.onInputChanged.addListener(onInputChangedCallback);
        },

        removeListener() {
            chrome.omnibox.onInputChanged.removeListener(onInputChangedCallback);
        }
    },

    onInputEntered: {
        addListener() {
            chrome.omnibox.onInputEntered.addListener(onInputEnteredCallback);
        },

        removeListener() {
            chrome.omnibox.onInputEntered.removeListener(onInputEnteredCallback);
        }
    },

    onInputCancelled: {
        addListener() {
            chrome.omnibox.onInputCancelled.addListener(onInputCancelledCallback);
        },

        removeListener() {
            chrome.omnibox.onInputCancelled.removeListener(onInputCancelledCallback);
        }
    },

    onDeleteSuggestion: {
        addListener() {
            chrome.omnibox.onDeleteSuggestion.addListener(onDeleteSuggestionCallback);
        },

        removeListener() {
            chrome.omnibox.onDeleteSuggestion.removeListener(onDeleteSuggestionCallback);
        }
    }
};