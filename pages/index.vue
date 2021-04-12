<template>
  <div class="container">
    <div v-if="$auth.loggedIn">Hi user!</div>
    <div v-else class="authContainer">
      <div class="leftAuth">
        <h1>Login</h1>
        <form @submit.prevent="loginSubmit" class="left-form">
          <input
            type="email"
            placeholder="Email"
            v-model="login.logEmail"
            class="logEmail"
            required
          /><br />
          <input
            type="password"
            placeholder="Senha"
            v-model="login.logPass"
            class="logPass"
            required
          /><br />
          <button id="login-btn">Login</button>
        </form>
        <p>
          Os dados que você registrar neste formulário ficarão expostos
          publicamente. Este é um website de teste, se preferir, utilize dados
          fictícios.
        </p>
      </div>
      <div class="rightAuth">
        <h1>Registrar</h1>
        <form @submit.prevent="registerSubmit">
          <input
            placeholder="Primeiro Nome"
            v-model="register.regFirstName"
            @change="companyEmail"
            required
          /><br />
          <input
            placeholder="Último Nome"
            v-model="register.regLastName"
            @change="companyEmail"
            required
          /><br />
          <select
            name="country"
            id="country"
            v-model="register.regCountry"
            required
          >
            <option value="Brazil" selected>Brazil</option>
            <option value="Canada">Canada</option>
            <option value="Mexico">Mexico</option> </select
          ><br />
          <input
            placeholder="Cidade do Escritório"
            v-model="register.regCity"
            required
          /><br />
          <input
            placeholder="Cargo"
            v-model="register.regTitle"
            required
          /><br />
          <input
            placeholder="Email"
            :value="register.regEmail"
            class="regEmail"
            readonly
          /><br />
          <input
            type="password"
            placeholder="Senha"
            v-model="register.regPass"
            required
          /><br />
          <span class="passMessage"
            >* A senha precisa ter mais de 6 caracteres</span
          ><br />
          <button>Registrar</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from "firebase/app";
import "firebase/auth";

export default {
  name: "Homepage",
  data() {
    return {
      login: {
        logEmail: "",
        logPass: ""
      },
      register: {
        regFirstName: "",
        regLastName: "",
        regCountry: "Brazil",
        regCity: "",
        regTitle: "",
        regEmail: "@valtech.com",
        regPass: ""
      },
      errors: ""
    };
  },
  methods: {
    loginSubmit() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.login.logEmail, this.login.logPass)
        .then(() => {
          this.$router.push("/consultants");
        })
        .catch(err => {
          this.errors = err;
        });
    },
    async registerSubmit() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(
          this.register.regEmail,
          this.register.regPass
        )
        .then(async () => {
          this.$router.push("/consultants");
          await fetch(`https://nuxt-profiles-server.herokuapp.com/register`, {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify({
              regFirstName: this.register.regFirstName,
              regLastName: this.register.regLastName,
              regCountry: this.register.regCountry,
              regCity: this.register.regCity,
              regTitle: this.register.regTitle,
              regEmail: this.register.regEmail
            })
          });
          this.refreshData();
        })
        .catch(err => {
          this.errors = err;
        });
    },
    companyEmail() {
      if (this.register) {
        let email =
          this.register.regFirstName.toLowerCase() +
          "." +
          this.register.regLastName.toLowerCase() +
          "@valtech.com";
        this.register.regEmail = email;
      }
    },
    refreshData() {
      setTimeout(() => {
        this.$nuxt.refresh();
      }, 4000);
    }
  }
};
</script>

<style>
.container {
  min-height: 90vh;
  max-width: 1360px;
  min-height: 90vh;
  margin: 100px auto 0;
  padding: 0 36px 200px;
}

.authContainer {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  min-height: 50vh;
}

.leftAuth,
.rightAuth {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: start;
}

.rightAuth {
  border-left: 1px solid rgb(212, 212, 212);
}

.authContainer h1 {
  margin-bottom: 20px;
}

.authContainer input,
.authContainer select {
  font-size: 17px;
  padding: 6px;
  margin-top: 10px;
}

.authContainer button {
  font-size: 17px;
  background-color: rgb(236, 236, 236);
  border: 1px solid rgb(182, 182, 182);
  margin-top: 0px;
  padding: 6px 20px;
  outline: none;
}

.authContainer select {
  min-width: 228px;
  border: 1px solid rgb(118, 118, 118);
}

#login-btn {
  margin-top: 10px;
}

.regEmail {
  color: rgb(199, 199, 199);
  border: 1px solid rgb(199, 199, 199);
  outline: none;
}

.passMessage {
  color: rgb(255, 80, 80);
  margin-top: 10px;
  display: block;
  font-size: 13px;
}

.left-form {
  padding-bottom: 150px;
}

.leftAuth p {
  color: rgb(151, 151, 151);
  border-top: 1px solid rgb(199, 199, 199);
  text-align: justify;
  padding-top: 20px;
  margin: 0 60px;
}
</style>
