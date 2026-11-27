export const SEARCH_EVENT = 'drait:open-search';

/** Open the global search dialog from anywhere. */
export const openSearch = () => window.dispatchEvent(new Event(SEARCH_EVENT));
