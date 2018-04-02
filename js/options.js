'use strict';

import * as browserActions from './components/browserActions.js';
import * as notifications from './components/notifications.js';
import * as omnibox from './components/omnibox.js';
import types from './config.js';

const components = {
    browserActions,
    notifications,
    omnibox
}

const currentEvents = {
    notifications: {},
    omnibox: {}
}

function removeAllEventListener(components, currentEvents) {
    for (let component in currentEvents) {
        for (let event in currentEvents[component]) {
            if (components[component].events) {
                components[component].events[event].removeListener();
            }
        }
    }
}

function optionRender(selectElm, options) {

    let optionElm;
    let fragment = document.createDocumentFragment();

    for (let option in options) {
        optionElm = document.createElement('option');
        optionElm.textContent = option;
        fragment.appendChild(optionElm);
    }

    selectElm.appendChild(fragment);
}

function deleteContents(elm) {
    let range = document.createRange();
    range.selectNodeContents(elm);
    range.deleteContents();
}

function deleteContentsById(id) {
    deleteContents(document.getElementById(id))
}

function deleteContentsByIds(ids) {
    ids.forEach((id) => {
        deleteContentsById(id);
    });
}

function fragmentFromString(strHTML) {
    return document.createRange().createContextualFragment(strHTML);
}

function renderAdditionalSections(eventsData) {
    for (let event in eventsData) {
        renderAdditionalSection(event);
    }
}

function renderAdditionalSection(eventName) {

    const additionalSectionHTML =
        `<section>
            <label for="${eventName}">${eventName}</label>
            <section class="switch">
                <label>
                    Off
                    <input type="checkbox" id="${eventName}" class="__event">
                    <span class="lever"></span>
                    On
                </label>
            </section>
        </section>`;

    const documentFragment = fragmentFromString(additionalSectionHTML);

    document.getElementById('additional_options').appendChild(documentFragment);
}

function eventClickForInput(events) {
    let elms = document.getElementsByClassName('__event');
    Array.prototype.forEach.call(elms, (elm) => {
        elm.addEventListener('change', (e) => {
            let browserComponents = document.getElementById('browser_components').value;
            if (!components[browserComponents].events) { return };

            if (e.target.checked) {
                components[browserComponents].events[elm.id].addListener();
                currentEvents[browserComponents][elm.id] = true;
            } else {
                components[browserComponents].events[elm.id].removeListener();
                currentEvents[browserComponents][elm.id] = false;
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {

    /**
     * Render of components
     */
    let browserComponentsElm  = document.getElementById('browser_methods'),
        range = document.createRange(),
        selected = 'selected';

    for (let type in types) {
        if (selected) {
            optionRender(browserComponentsElm, types[type].methods);
            renderAdditionalSections(types[type].events);
            eventClickForInput(types[type].events);
        }
        let tagString = `<option ${selected} value="${type}">${types[type].name}</option>`;
        selected = '';
        let documentFragment = range.createContextualFragment(tagString);
        document.getElementById('browser_components').appendChild(documentFragment);
    }
    /**
     * /Render of components
     */

    browser_components.onchange = (e) => {
        deleteContentsByIds(['browser_methods', 'additional_options']);
        removeAllEventListener(components, currentEvents)
        optionRender(browserComponentsElm, types[e.target.value].methods);
        renderAdditionalSections(types[e.target.value].events);
        eventClickForInput(types[e.target.value].events);
    };

    button_browser_components.onclick = (e) => {
        let browserComponents = document.getElementById('browser_components').value;
        let browserMethods = document.getElementById('browser_methods').value;
        components[browserComponents].methods[browserMethods]();
    };

});