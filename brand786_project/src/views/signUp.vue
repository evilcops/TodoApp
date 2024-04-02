<template>
  <div class="container">
    <div class="row">
      <div class="col-md-6 offset-md-3">
        <h2 class="text-center text-dark mt-5">Registration Form</h2>
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
            <div class="mb-3">
              <input type="password" v-model="confirmPassword" class="form-control" id="confirmPassword" placeholder="Confirm Password">
            </div>
            <div class="text-center">
              <button type="submit" @click.prevent="registerUser" class="btn btn-color px-5 mb-5 w-100" :disabled="loading">Register</button>
            </div>
            <div id="emailHelp" class="form-text text-center mb-5 text-dark">Already Registered? <a href="/#/login" class="text-dark fw-bold"> Log-In your Account</a></div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import "../css/auth.css"

export default {
  data() {
    return {
      email: '',
      password: '',
      confirmPassword: '',
      errorMessage: '',
      loading: false // Add loading state
    };
  },
  methods: {
    async registerUser() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match';
        return;
      }

      try {
        this.loading = true; // Set loading to true when starting API call
        const response = await axios.post('http://3.232.244.22/api/register', {
          email: this.email,
          password: this.password,
          password_confirmation: this.confirmPassword
        }, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        if (response.status === 200) {
          alert('Registration successful! Check your email inbox');
          this.$router.push('/login'); // Redirect to login screen
        } else {
          this.errorMessage = response.data.message || 'Registration failed';
        }
      } catch (error) {
        console.error('Error:', error);
        alert('Registration failed! Check all fields and try again');
        this.errorMessage = 'Registration failed. Please try again later.';
      } finally {
        this.loading = false; // Set loading back to false after API call completes
      }
    }
  }
};
</script>

<style scoped>
</style>
