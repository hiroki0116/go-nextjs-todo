import cookie from "js-cookie";

export const setCookie = (key: string, value: string) => {
  if (typeof window) {
    cookie.set(key, value, {
      expires: 1,
    });
  }
};

export const removeCookie = (key: string) => {
  if (typeof window) {
    cookie.remove(key, {
      expires: 1,
    });
  }
};

export const getCookie = (key: string, req?: any) => {
  return cookie.get(key);
};

export const currAuthUser = () => {
  if (process.browser) {
    const cookieChecked = getCookie('token');
    if (cookieChecked) {
      const userString:any = localStorage.getItem('user');

      if (userString && userString !== 'undefined') {
        const userObj = JSON.parse(userString);
        return userObj;
      }
      return undefined;
    }
  }
  return undefined;
};


export const isAuth = () => currAuthUser() !== undefined;
