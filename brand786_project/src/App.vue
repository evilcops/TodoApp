<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <router-link class="navbar-brand" to="/">Brand786</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/">Home</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li v-if="!isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" to="/list">Todo App</router-link>
            </li>
            <li v-if="isLoggedIn" class="nav-item">
              <router-link class="nav-link" @click="logout" to="/">Logout</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view/>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      isLoggedIn: false,
    };
  },
  methods: {
    async logout() {
      try {
        const jwtToken = localStorage.getItem('jwtToken');
        if (!jwtToken) {
          console.log('JWT Token not found in localStorage');
          return;
        }

        const response = await axios.post('http://3.232.244.22/api/logout', {
          token: jwtToken
        });

        if (response.status === 200) {
          localStorage.removeItem('jwtToken');
          localStorage.removeItem('user'); 
          console.log('Logout successful');
          this.isLoggedIn = false;
        } else {
          console.error('Failed to logout:', response.data);
        }
      } catch (error) {
        console.error('Error during logout:', error);
      }
    }
  },
  watch: {
    '$route'() {
      if(localStorage.getItem('jwtToken')){
        this.isLoggedIn = !!localStorage.getItem('jwtToken');
      }else{
        this.isLoggedIn = false;
      }
    }
  }
}
</script>


<style>

</style>
