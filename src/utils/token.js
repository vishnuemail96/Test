const KEY = "orbilearn_refresh";

export const saveRefresh = (t) => localStorage.setItem(KEY, t);
export const loadRefresh = () => localStorage.getItem(KEY);
export const clearRefresh = () => localStorage.removeItem(KEY);
