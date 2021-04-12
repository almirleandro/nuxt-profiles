<template>
  <div class="ProfileHeader">
    <div class="header-wrapper">
      <div class="left-side">
        <div>
          <span id="user-span">{{ user.displayName }}</span>
        </div>
        <div class="language-div">ENG</div>
        <div class="add-lang">Add Language +</div>
      </div>
      <div class="right-side">
        <div class="export-div">Export</div>
        <div class="edit-div">Edit</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "ProfileHeader",
  props: ["user"]
};
</script>

<style>
.ProfileHeader {
  box-shadow: rgb(240 240 240) 0px 3px 3px;
  font-size: 17px;
  min-height: 72px;
}

.header-wrapper {
  padding: 10px 36px;
  max-width: 1360px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left-side,
.right-side {
  display: flex;
  align-items: center;
}

.left-side *,
.right-side * {
  cursor: pointer;
}

#user-span {
  cursor: default;
}

.language-div {
  margin-left: 48px;
  text-decoration: underline;
}

.add-lang {
  margin-left: 34px;
}

.export-div {
  margin-right: 20px;
}

.edit-div {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 17px;
  min-width: 109px;
  min-height: 47px;
  border: 1px solid black;
}
</style>
