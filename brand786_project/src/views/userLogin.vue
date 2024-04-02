<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Login Form</h2>
        <div class="card my-5">
          <form class="card-body cardbody-color p-lg-5">
            <div class="text-center" v-if="loading">
              <div class="spinner-border text-primary" role="status">
                <span class="sr-only">Loading...</span>
              </div>
            </div>
            <div class="text-center">
              <img src="https://cdn.pixabay.com/photo/2016/03/31/19/56/avatar-1295397__340.png" class="img-fluid profile-image-pic img-thumbnail rounded-circle my-3" width="200px" alt="profile">
            </div>
            <div class="mb-3">
              <input type="email" class="form-control" v-model="email" id="Username" aria-describedby="emailHelp" placeholder="User Name">
            </div>
            <div class="mb-3">
              <input type="password" v-model="password" class="form-control" id="password" placeholder="Password">
            </div>
            <div class="text-center">
              <button type="submit" @click.prevent="login" class="btn btn-color px-5 mb-5 w-100" :disabled="loading">Login</button>
            </div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Not Registered? <a href="/#/register" class="text-dark fw-bold"> Create an Account</a></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import setAuthHeader from '../utils/setAuthHeader';
import axios from 'axios';
import "../css/auth.css"

export default {
  data() {
    return {
      email: '',
      password: '',
      error: '',
      loading: false // Add loading state
    };
  },
  methods: {
    async login() {
      try {
        this.loading = true; // Set loading to true when starting API call
        const response = await axios.post('http://3.232.244.22/api/login', {
          email: this.email,
          password: this.password
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          const data = response.data;
          localStorage.setItem('jwtToken', data.user.token);
          setAuthHeader(data.user.token);
          alert('Login successful!');
          localStorage.setItem('user', 'loggedIn');
          this.$router.push('/list');
        } else {
          this.error = response.data.error;
        }
      } catch (error) {
        this.error = 'An error occurred. Please try again later.';
        alert('Login Failed check credentials and try again');
      } finally {
        this.loading = false; // Set loading back to false after API call completes
      }
    },
  }
};
</script>

<style scoped>
</style>
