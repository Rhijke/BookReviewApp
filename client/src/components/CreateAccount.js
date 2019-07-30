import firebase from './api/firebase';
const createAccount = () => {
  const { email, password } = this.state;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(cred => {
      return firebase
        .firestore()
        .collection('users')
        .doc(cred.user.uid)
        .set({
          savedMovies: []
        });
    })
    .then(() => this.onLoginSuccess.bind(this))
    .catch(error => {
      let errorCode = error.code;
      let errorMessage = error.message;
      if (errorCode == 'auth/weak-password') {
        this.onLoginFailure.bind(this)('Weak password!');
      } else {
        this.onLoginFailure.bind(this)(errorMessage);
      }
    });
};
