

export interface ICookiesService {

  setCookie(key: string, value: string, days: number): void;
  getCookie(key: string): string;
  deleteCookie(key: string): void;

}
