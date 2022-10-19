export const SettingsHelper = {
    // make localStorageReactive
    initListeners() {
        console.log('Settings listeners enabled')
        window.dispatchEvent(new CustomEvent('localstorage-changed', {
            detail: {
                storage: this.getFontSizeLeft()
            }
        }));
    },
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