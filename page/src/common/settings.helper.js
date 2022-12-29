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
}

const defaultClientSettings = {
    fontSizeLeft: '0',
    fontSizeRight: '0',
    layoutMode: '0'
}