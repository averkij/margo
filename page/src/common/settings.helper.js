export const SettingsHelper = {
    getFontSizeLeft() {
        return localStorage.fontSizeLeft ? localStorage.fontSizeLeft : defaultClientSettings.fontSizeLeft;
    },
    getFontSizeRight() {
        return localStorage.fontSizeRight ? localStorage.fontSizeRight : defaultClientSettings.fontSizeRight;
    },
    getLayoutMode() {
        return localStorage.layoutMode ? localStorage.layoutMode : defaultClientSettings.layoutMode;
    },
    getColorPrompt() {
        return localStorage.colorPrompt ? localStorage.colorPrompt : defaultClientSettings.colorPrompt;
    },
    getShowTextLeft() {
        return localStorage.showTextLeft ? localStorage.showTextLeft : defaultClientSettings.showTextLeft;
    },
    getShowTextRight() {
        return localStorage.showTextRight ? localStorage.showTextRight : defaultClientSettings.showTextRight;
    },
}

const defaultClientSettings = {
    fontSizeLeft: '0',
    fontSizeRight: '0',
    layoutMode: '0',
    colorPrompt: '2',
    showTextLeft: '0',
    showTextRight: '1'
}