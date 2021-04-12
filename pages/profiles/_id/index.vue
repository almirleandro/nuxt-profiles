<template>
  <div class="profiles-index">
    <profile-header :user="user" v-if="currentUser.email" />
    <profile-content :user="user" v-if="currentUser.email" />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import AppHeader from "../../../components/AppHeader.vue";
import ProfileContent from "../../../components/ProfileContent.vue";

export default {
  name: "Profile",
  components: {
    AppHeader,
    ProfileContent
  },
  data() {
    return {
      user: {},
      currentUser: {}
    };
  },
  async fetch() {
    const res = await fetch(
      `https://nuxt-profiles-server.herokuapp.com/users/id`,
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json"
        },
        method: "POST",
        body: JSON.stringify({
          id: this.$route.params.id
        })
      }
    );
    const data = await res.json();
    this.user = data;
  },
  methods: {
    nameAbreviation(first, last) {
      return first.slice(0, 1) + last.slice(0, 1);
    }
  },
  head() {
    return {
      title: "Nuxt Profiles - " + this.user.displayName
    };
  },
  mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.$router.push("/");
      }
    });
  }
};
</script>

<style>
.profiles-index {
  min-height: 90vh;
}
</style>
