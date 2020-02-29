import Cookies from 'js-cookie';

export function getQueryString(search, name) {
    var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
    var r = search.substr(1).match(reg);
    if (r != null) {
        return unescape(r[2]);
    }
    return null;
}

const domain = { domain: 'wevid.co' };

export const setStorage = (key, value) => {
	Cookies.set(key, value, domain);
	// localStorage.setItem(key, value);
}

export const getStorage = (key) => {
	return Cookies.get(key, domain);
	// return localStorage.getItem(key);
};

export const removeStorage = (key) => {
	// localStorage.removeItem(key);
	Cookies.remove(key, domain);
};