<template>
  <div class="search-field">
    <form>
      <input
        type="text"
        placeholder="Type to search by name"
        :value="nameFilter"
        @change.lazy="nameChange"
      />

      <select
        name="country"
        id="country"
        :value="selectedCountry"
        @change="countryChange"
      >
        <option value="all" selected>Select All</option>
        <option v-for="country of countryArray" :value="country">{{
          country
        }}</option>
      </select>

      <select
        name="cities"
        id="cities"
        :value="selectedCity"
        @change="cityChange"
      >
        <option value="all" selected>Select All</option>
        <option :value="city" v-for="city of cityArray">{{ city }}</option>
      </select>

      <div id="filter-btn-div" @click.prevent="">
        <button>v</button>
        <span>Filters</span>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "SearchField",
  computed: {
    countryArray() {
      let countries = {};
      for (let i = 0; i < this.users.length; i++) {
        if (!countries[this.users[i].country]) {
          countries[this.users[i].country] = this.users[i].country;
        }
      }
      return countries;
    },
    cityArray() {
      let cities = {};
      for (let i = 0; i < this.users.length; i++) {
        if (
          this.users[i].country === this.selectedCountry ||
          this.selectedCountry === "all"
        ) {
          if (!cities[this.users[i].city]) {
            cities[this.users[i].city] = this.users[i].city;
          }
        }
      }
      return cities;
    }
  },
  props: ["users", "selectedCountry", "selectedCity", "nameFilter"],
  emits: ["country-change", "city-change", "name-change"],
  methods: {
    countryChange(evt) {
      this.$emit("country-change", evt.target.value);
    },
    cityChange(evt) {
      this.$emit("city-change", evt.target.value);
    },
    nameChange(evt) {
      this.$emit("name-change", evt.target.value);
    }
  }
};
</script>

<style>
.search-field form {
  display: grid;
  grid-template-columns: 3fr 2fr 2fr 1fr;
  gap: 40px;
  padding: 12px 0;
  margin-bottom: 72px;
}

.search-field input,
select,
#filter-btn-div {
  font-size: 17px;
  padding: 12px;
  min-height: 50px;
  border: 1px solid rgb(202, 202, 202);
}

.search-field #filter-btn-div {
  display: flex;
  align-items: center;
  border: 1px solid rgb(187, 187, 187);
  background-color: rgb(228, 228, 228);
  padding: 0px 30px;
  color: rgb(165, 165, 165);
}

#filter-btn-div button {
  background-color: rgb(228, 228, 228);
  color: rgb(165, 165, 165);
  border: none;
  margin-right: 10px;
}
</style>
