
import { defineStore } from "pinia";
import { ref, watch } from "vue";
import { auth, provider } from "@/firebase/Firebase";
import {
  onAuthStateChanged,
  updatePassword,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  EmailAuthProvider,
  reauthenticateWithCredential,
  fetchSignInMethodsForEmail,
  sendPasswordResetEmail,
  signInWithPopup
} from "firebase/auth";



export const useAuthStore = defineStore("authStore", () => {

  const user = ref(JSON.parse(localStorage.getItem("user")) ?? null)
  const errorMessage = ref('')

  const registerUser = async (email, password) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user
    setUser(user)
    console.log(user);
    return user;
  };

  const authUser = async (email, password) => {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    setUser(user);
    console.log('Loged in as: ' + user.email)
    return user
  };

  const loginWithGoogle = async() => {
    await signInWithPopup(auth, provider)
      .then((result) => {
        // User info is available in result.user
        const user = result.user;
        console.log("Logged in user:", user);
        alert(`Logged in as ${user.displayName}`);
      })
      .catch((error) => {
        // Handle errors here
        console.error("Google login error:", error);
        alert("Failed to log in with Google.");
      })
    }

  const sendResetLink = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      console.log('Email for reset password was sent');
    } catch (error) {
      console.error('The error has ocured:', error);
    }
  };

  const checkUserExists = async (email) => {
    try {
      // Fetch methods for the given email
      const signInMethods = await fetchSignInMethodsForEmail(auth, email);

      // Check if the list is empty
      if (signInMethods.length > 0) {
        console.log('User exists with this email.');
        return true;
      } else {
        console.log('No user found with this email.');
        return false;
      }
    } catch (error) {
      console.error('Error fetching sign-in methods:', error.message);
      return false;
    }
  };


  const reauthenticateUser = async (currentPassword) => {
    console.log(auth.currentUser.email)
    const user = auth.currentUser;
    if (user) {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
      console.log(credential._password);
      try {
        await reauthenticateWithCredential(user, credential);
        console.log('User reauthenticated successfully');
        return true
      } catch (error) {
        console.error('Error reauthenticating user:', error.message);
      }
    } else {
      console.error('No user is currently signed in');
    }
  };


  const changePassword = async (newPassword) => {
    const user = auth.currentUser;
    //    console.log(user)
    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log('Password changed successfully!');
        return true
      } catch (error) {
        console.error('Error changing password:', error.message);
      }
    } else {
      console.error('No user is currently signed in');
    }
  };

  function setUser(newUser) {
    user.value = newUser;
    if (newUser) {
      localStorage.setItem("user", JSON.stringify(newUser));
    } else {
      localStorage.removeItem("user");
    }
  }

  function isAuthenticated() {
    return user.value ?? false;
  }

  watch(user, (newValue) => {
    if (newValue) {
      localStorage.setItem("user", JSON.stringify(newValue));
    } else {
      localStorage.removeItem("user");
    }
  });


  onAuthStateChanged(auth, (firebaseUser) => {
    if (firebaseUser) {
      user.value = firebaseUser;
    } else {
      user.value = null;
    }
  });

  return { user, 
    sendResetLink, 
    registerUser, 
    checkUserExists, 
    errorMessage, 
    authUser, 
    reauthenticateUser, 
    changePassword, 
    setUser, 
    onAuthStateChanged, 
    isAuthenticated,
    loginWithGoogle };
});
