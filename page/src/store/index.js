import {
    createStore
} from 'vuex'

import {
    SET_FONT_SIZE_LEFT,
    SET_FONT_SIZE_RIGHT,
    SET_LAYOUT_MODE,
    SET_SHOW_TEXT_LEFT,
    SET_SHOW_TEXT_RIGHT,
    SET_COLOR_PROMPT,
} from "./mutations.type"

import {
    SettingsHelper
} from "@/common/settings.helper";

const initialState = {
    fontSizeLeft: SettingsHelper.getFontSizeLeft(),
    fontSizeRight: SettingsHelper.getFontSizeRight(),
    layoutMode: SettingsHelper.getLayoutMode(),
    colorPrompt: SettingsHelper.getColorPrompt(),
    showTextLeft: SettingsHelper.getShowTextLeft(),
    showTextRight: SettingsHelper.getShowTextRight(),
}

export default createStore({
    state: {
        ...initialState
    },
    mutations: {
        [SET_FONT_SIZE_LEFT](state, params) {
            state.fontSizeLeft = params.fontSizeLeft;
        },
        [SET_FONT_SIZE_RIGHT](state, params) {
            state.fontSizeRight = params.fontSizeRight;
        },
        [SET_LAYOUT_MODE](state, params) {
            state.layoutMode = params.layoutMode;
        },
        [SET_COLOR_PROMPT](state, params) {
            state.colorPrompt = params.colorPrompt;
        },
        [SET_SHOW_TEXT_LEFT](state, params) {
            state.showTextLeft = params.showTextLeft;
        },
        [SET_SHOW_TEXT_RIGHT](state, params) {
            state.showTextRight = params.showTextRight;
        },
    },
    getters: {
        fontSizeLeft(state) {
            return state.fontSizeLeft;
        },
        fontSizeRight(state) {
            return state.fontSizeRight;
        },
        layoutMode(state) {
            return state.layoutMode;
        },
        colorPrompt(state) {
            return state.colorPrompt;
        },
        showTextLeft(state) {
            return state.showTextLeft;
        },
        showTextRight(state) {
            return state.showTextRight;
        },
    }
})