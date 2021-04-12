<template>
  <div class="AppHeader">
    <div class="header-wrapper">
      <nuxt-link
        to="/consultants"
        :event="currentUser.email ? 'click' : 'disabled'"
      >
        <span>Company Logo</span>
      </nuxt-link>
      <nuxt-link
        to="/consultants"
        :event="currentUser.email ? 'click' : 'disabled'"
      >
        <span id="consultants-link">Consultants</span>
      </nuxt-link>
      <div class="profile-section">
        <div @click="" class="profile-div">
          <span @click.prevent="goToProfile2" v-if="currentUser.email">{{
            getFirstName
          }}</span>
          <span
            id="circle-profile"
            @click.prevent="currentUser.email ? goToProfile2 : null"
          >
            <span v-if="currentUser.email" @click.prevent="goToProfile2">{{
              nameAbreviation
            }}</span>
          </span>
          <button id="header-btn" @click="displayMenu" v-if="currentUser.email">
            v
          </button>
        </div>
        <div
          class="sign-out-menu"
          v-show="showMenu"
          tabindex="0"
          @focusout="showMenu = false"
        >
          <span class="profile-span" @click.prevent="goToProfile">Profile</span>
          <span @click.prevent="signOut">Sign Out</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "AppHeader",
  data() {
    return {
      showMenu: false,
      currentUser: {},
      user: {}
    };
  },
  methods: {
    signOut() {
      this.showMenu = !this.showMenu;
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.currentUser = {};
          this.$router.push("/");
        });
    },
    displayMenu() {
      this.showMenu = !this.showMenu;
    },
    goToProfile() {
      this.showMenu = !this.showMenu;
      this.$router.push("/profiles/" + this.user.id);
    },
    goToProfile2() {
      this.$router.push("/profiles/" + this.user.id);
    }
  },
  mounted() {
    firebase.auth().onAuthStateChanged(async user => {
      if (user) {
        this.currentUser = user;

        const res = await fetch(
          `https://nuxt-profiles-server.herokuapp.com/email`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              email: this.currentUser.email
            })
          }
        );
        const data = await res.json();
        this.user = data;
      }
    });
  },
  computed: {
    getFirstName() {
      const email = this.currentUser.email;
      const fullname = email.split("@");
      const nameArray = fullname[0].split(".");

      return nameArray[0][0].toUpperCase() + nameArray[0].slice(1);
    },
    nameAbreviation() {
      const email = this.currentUser.email;
      const fullname = email.split("@");
      const nameArray = fullname[0].split(".");

      return (
        nameArray[0].slice(0, 1).toUpperCase() +
        nameArray[1].slice(0, 1).toUpperCase()
      );
    }
  }
};
</script>

<style>
.AppHeader {
  box-shadow: rgb(240 240 240) 0px 3px 3px;
  font-size: 17px;
}

.header-wrapper {
  padding: 10px 36px;
  max-width: 1360px;
  min-height: 71px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.AppHeader a {
  text-decoration: none;
  color: black;
}

#consultants-link {
  display: block;
  margin-top: -24px;
  padding-top: 24px;
  border-top: 6px solid black;
  height: 47px;
}

#consultants-link:hover {
  text-decoration: underline;
}

.profile-div {
  display: flex;
  align-items: center;
  cursor: pointer;
}

#circle-profile {
  margin-left: 10px;
  font-size: 20px;
  border: 1px solid black;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;
  width: 47px;
}

#header-btn {
  background-color: white;
  border: none;
  outline: none;
  cursor: pointer;
}

.sign-out-menu {
  display: block;
  position: absolute;
  z-index: 30;
  background-color: white;
  box-shadow: rgb(0 0 0 / 15%) 0px 0px 12px;
  min-height: 99px;
  margin-top: -5px;
  margin-left: 15px;
  padding: 12px;
  text-align: right;
}

.sign-out-menu span {
  display: block;
  padding: 8px;
  font-size: 17px;
  cursor: pointer;
}

.sign-out-menu span:hover {
  text-decoration: underline;
}
</style>
