<template>
  <div>
    <div class="main-section">
      <div class="variant-btn">
        <button>+ Create Variant</button>
      </div>
      <div class="main-content">
        <div class="profile">
          {{ nameAbreviation }}
        </div>
        <div class="info-div">
          <span class="city">{{ user.city }}</span>
          <span class="name">{{ user.displayName }}</span>
          <span class="title">{{ user.title }}</span>
          <span class="email">{{ user.email }}</span>
          <span class="manager">Manager: {{ user.managerDisplayName }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProfileHeader from "./ProfileHeader.vue";

export default {
  name: "ProfileContent",
  components: {
    ProfileHeader
  },
  props: ["user"],
  computed: {
    nameAbreviation() {
      const first = this.user.firstName;
      const last = this.user.lastName;

      if (first === undefined) return;
      if (last === undefined) return;

      return first.slice(0, 1) + last.slice(0, 1);
    }
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

.variant-btn {
  display: flex;
  justify-content: flex-end;
  min-height: 59px;
  min-width: 144px;
}

.variant-btn button {
  font-size: 17px;
  padding: 8px 40px;
  background-color: white;
  border: solid 1px black;
  cursor: pointer;
}

.main-content {
  margin-top: 60px;
  margin-left: 100px;
  display: flex;
}

.profile {
  min-width: 270px;
  min-height: 280px;
  border: 2px solid black;
  margin-right: 40px;
  font-size: 82px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.info-div {
  display: flex;
  flex-direction: column;
}

.city {
  font-size: 24px;
}

.name {
  font-size: 58px;
  margin-top: 36px;
}

.title {
  font-size: 42px;
  margin-bottom: 36px;
}

.email {
  font-size: 17px;
  margin-bottom: 12px;
}

.manager {
  font-size: 17px;
}
</style>
