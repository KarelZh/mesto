class UserInfo {
  constructor({ userNameSelector, userJobSelector }) {
    this._userName = document.querySelector(userNameSelector);
    this._userJob = document.querySelector(userJobSelector);
  }
  getUserInfo() {
    return {
      prof: this._userName.textContent,
      job: this._userJob.textContent,
    }
  }
  setUserInfo({prof, job}) {
    this._userName.textContent = prof;
    this._userJob.textContent = job;
  }
}
export {UserInfo};