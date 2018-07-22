export default {
  isAuthed: function() {
    return sessionStorage.isAuthed ? true : false;
  },

  authedUser: function() {
    return sessionStorage.userName ? sessionStorage.userName : false;
  },

  activeCart: function() {
    return sessionStorage.activeCart ? sessionStorage.activeCart : false;
  },

  userId: function() {
    return sessionStorage.userId ? sessionStorage.userId : false;
  }
};
