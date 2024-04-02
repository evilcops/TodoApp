<template>
    <section class="vh-100" style="background-color: rgb(18 202 202);">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card rounded-3">
                <div class="card-body p-4">
                    <h4 class="text-center my-3 pb-3"> Add todo task</h4>
                    <div class="row mt-4">
                        <div class="form-outline col-9">
                            <label class="form-label" for="form1">Title</label>
                            <input type="text" v-model="title" id="form1" class="form-control" />
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="form-outline col-9">
                            <label class="form-label" for="form1">Description</label>
                            <input type="text" v-model="description" id="form1" class="form-control" />
                        </div>
                    </div>
                    <div class="col-12 mt-4 d-flex">
                        <button type="submit" @click="addTodo" class="btn btn-primary">Add</button>
                        <button type="submit" @click="$router.go(-1)" class="btn btn-danger ms-4">Cancel</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
</template>
<script>
import axios from 'axios';
import Swal from 'sweetalert2'

export default {
    methods: {
        async addTodo() {
            try {
                const response = await axios.post('http://3.232.244.22/api/item', {
                    title: this.title,
                    description: this.description
                });

                if (response.status === 200 && response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Todo item added successfully!',
                        showConfirmButton: true, // Display the confirm button
                        allowOutsideClick: false, // Prevent closing the alert by clicking outside
                        allowEscapeKey: false, // Prevent closing the alert by pressing escape key
                    }).then(() => {
                        // After user presses OK, redirect to list route
                        this.$router.push('/list');
                    });
                } else {
                    throw new Error('Failed to create todo item');
                }
                this.title = '';
                this.description = '';
            } catch (error) {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to create todo item'
                });
            }
        }
    },
    data: function () {
        return {
            description:'',
            title:'',
        };
    },
}

</script>
