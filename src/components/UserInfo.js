class UserInfo {
  constructor({ userNameSelector, userJobSelector, userUrlSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
    this._userSrc = document.querySelector(userUrlSelector);
  }
  getUserInfo() {
    return {
      name: this._userName.textContent,
      about: this._userJob.textContent,
    }
  }
  setUserInfo({name, about}) {
    this._userName.textContent = name;
    this._userJob.textContent = about;
  }
  userPhoto({avatar}) {
    this._userSrc.src = avatar;
  }
}
export {UserInfo};