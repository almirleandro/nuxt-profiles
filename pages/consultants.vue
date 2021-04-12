<template>
  <div class="main-section">
    <div class="title-field" v-if="currentUser.email">
      <span class="title">Consultants</span>
    </div>

    <search-field
      :users="users"
      :selectedCountry="selectedCountry"
      :selectedCity="selectedCity"
      :nameFilter="nameFilter"
      @country-change="changeCountry"
      @city-change="changeCity"
      @name-change="changeName"
      v-if="currentUser.email"
    />

    <results-field
      :users="users"
      :selectedCountry="selectedCountry"
      :selectedCity="selectedCity"
      v-if="currentUser.email"
    />
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";
import ResultsField from "../components/ResultsField.vue";
import SearchField from "../components/SearchField.vue";

export default {
  name: "Consultants",
  components: {
    SearchField,
    ResultsField
  },
  data() {
    return {
      users: [],
      selectedCountry: "all",
      selectedCity: "all",
      nameFilter: "",
      currentUser: {}
    };
  },
  async fetch() {
    const res = await fetch(`https://nuxt-profiles-server.herokuapp.com/users`);
    const data = await res.json();
    this.users = data;
  },
  methods: {
    changeCountry(evt) {
      this.selectedCountry = evt;
      this.selectedCity = "all";
    },
    changeCity(evt) {
      this.selectedCity = evt;
    },
    changeName(evt) {
      this.nameFilter = evt;
      this.searchNames(evt);
    },
    async searchNames(evt) {
      const upperFirstChar = evt.charAt(0).toUpperCase() + evt.slice(1);
      const res = await fetch(
        `https://nuxt-profiles-server.herokuapp.com/users/username`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          method: "POST",
          body: JSON.stringify({
            name: upperFirstChar
          })
        }
      );
      const data = await res.json();
      this.users = data;
    }
  },
  async mounted() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.currentUser = user;
      } else {
        this.$router.push("/");
      }
    });

    const res = await fetch(`https://nuxt-profiles-server.herokuapp.com/users`);
    const data = await res.json();
    this.users = data;
  }
};
</script>

<style>
.main-section {
  max-width: 1360px;
  min-height: 90vh;
  margin: 72px auto 0;
  padding: 0 36px 200px;
}

.title-field {
  font-size: 57px;
  font-weight: 400;
  padding-bottom: 60px;
}
</style>
