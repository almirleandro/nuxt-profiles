<template>
  <div class="results-field">
    <span class="counter-line">{{ matchingNum }} matching consultants</span>

    <div class="consultants-table">
      <div
        class="consultant-row"
        v-for="user in filterCountry"
        :key="user.id"
        v-if="user.city === selectedCity || selectedCity === 'all'"
        @click="showDetails"
      >
        <div class="user-img">
          {{ nameAbreviation(user.firstName, user.lastName) }}
        </div>
        <div class="user-title-name">
          <nuxt-link :to="'/profiles/' + user.id">
            <span class="user-name">{{ user.displayName }}</span>
          </nuxt-link>
          <br />
          <span class="user-title">{{ user.title }}</span>
        </div>
        <div class="user-country">{{ user.country }}</div>
        <div class="user-manager">Manager: {{ user.managerDisplayName }}</div>
        <div class="button-div">
          <button>v</button>
        </div>
        <div class="details-div" style="display: none;" id="detailsDiv">
          {{ user.primaryLanguage }}
        </div>
        <div v-show="false">{{ user }}</div>
      </div>

      <div class="showing-num">
        <span>Showing {{ matchingNum }} (of {{ matchingNum }})</span>
      </div>

      <div class="show-btn">
        <button id="show-more-btn">Show more</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ResultsField",
  methods: {
    nameAbreviation(first, last) {
      return first.slice(0, 1) + last.slice(0, 1);
    },
    showDetails(event) {
      const found = event.path.find(
        item => item.className === "consultant-row"
      );

      const foundDisplay = found.children.detailsDiv.style.display;
      if (foundDisplay === "none") {
        found.children.detailsDiv.style.display = "block";
      } else {
        found.children.detailsDiv.style.display = "none";
      }
    }
  },
  props: ["users", "selectedCountry", "selectedCity"],
  computed: {
    filterCountry() {
      switch (this.selectedCountry) {
        case "all":
          return this.users;

        case "Brazil":
          const brazilArray = [];
          this.users.map(user => {
            if (user.country === "Brazil") {
              brazilArray.push(user);
            }
          });
          return brazilArray;

        case "Mexico":
          const mexicoArray = [];
          this.users.map(user => {
            if (user.country === "Mexico") {
              mexicoArray.push(user);
            }
          });
          return mexicoArray;

        case "Canada":
          const canadaArray = [];
          this.users.map(user => {
            if (user.country === "Canada") {
              canadaArray.push(user);
            }
          });
          return canadaArray;
      }
    },
    matchingNum() {
      let counter = 0;
      this.filterCountry.map(user => {
        if (user.city === this.selectedCity || this.selectedCity === "all")
          counter++;
      });
      return counter;
    }
  },
  data() {
    return {
      detailsExp: false
    };
  }
};
</script>

<style>
.counter-line {
  display: block;
  padding: 18px 0;
  font-size: 17px;
}

.consultant-row {
  border-top: 1px solid rgb(204, 204, 204);
  padding: 18px 0;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.user-img {
  font-size: 20px;
  border: 1px solid black;
  border-radius: 50%;
  margin-right: 18px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 47px;
  width: 47px;
}

.user-title-name {
  flex: 0.5 1 0%;
}

.user-title-name a {
  text-decoration: none;
  color: black;
}

.user-name {
  font-size: 24px;
}

.user-name:hover {
  text-decoration: underline;
  cursor: pointer;
}

.user-title {
  font-size: 17px;
  font-weight: 600;
}

.user-country,
.user-manager {
  flex: 0.4 1 0%;
  font-size: 17px;
}

.consultant-row button {
  background-color: white;
  border: none;
}

.details-div {
  width: 100%;
  min-height: 79px;
  padding-top: 18px;
  padding-left: 65px;
  font-size: 17px;
}

.showing-num {
  border-top: 1px solid rgb(204, 204, 204);
  padding: 18px 0;
}

.show-btn {
  display: flex;
  justify-content: center;
}

#show-more-btn {
  background-color: black;
  color: white;
  outline: none;
  font-size: 24px;
  padding: 13px 36px;
}
</style>
