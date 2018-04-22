/* eslint-disable */
export function removeCookie(name) {

    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:01 GMT;`;
}

export function setCookie(cname, cvalue, exdays) {
    const d = new Date();

    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = `expires=${d.toUTCString()}`;
    document.cookie = `${cname}=${cvalue};${expires};path=/`;
}

export function isEmpty(obj) {
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) { return false; }
    }
    return true;
}
export function getCookie(cname) {
    const name = `${cname}=`;
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i += 1) {
        let c = ca[i];
        while (c.charAt(0) === ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) === 0) {
            return c.substring(name.length, c.length);
        }
    }
    return '';
}

export function checkCookie(username) {
    let user = getCookie(username);
    if (user !== '') {
        console.log(`Welcome again ${user}`);
    } else {
        user = prompt('Please enter your name:', '');
        if (user !== '' && user !== null) {
            setCookie(username, user, 365);
        }
    }
}

