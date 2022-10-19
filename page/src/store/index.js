import {
    createStore
} from 'vuex'

import {
    SET_FONT_SIZE_LEFT,
    SET_FONT_SIZE_RIGHT
} from "./mutations.type"

import {
    SettingsHelper
} from "@/common/settings.helper";

const initialState = {
    fontSizeLeft: SettingsHelper.getFontSizeLeft(),
    fontSizeRight: SettingsHelper.getFontSizeRight(),
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
    },
    getters: {
        fontSizeLeft(state) {
            return state.fontSizeLeft;
        },
        fontSizeRight(state) {
            return state.fontSizeRight;
        }
    }
})