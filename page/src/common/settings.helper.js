export const SettingsHelper = {
    getFontSizeLeft() {
        return localStorage.fontSizeLeft ? localStorage.fontSizeLeft : defaultClientSettings.fontSizeLeft;
    },
    getFontSizeRight() {
        return localStorage.fontSizeRight ? localStorage.fontSizeRight : defaultClientSettings.fontSizeRight;
    },
}

const defaultClientSettings = {
    fontSizeLeft: '0',
    fontSizeRight: '0',
}