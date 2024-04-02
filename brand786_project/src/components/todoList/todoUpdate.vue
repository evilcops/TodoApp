<template>
    <section class="vh-100" style="background-color: rgb(18 202 202);">
        <div class="container py-5 h-100">
          <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col col-lg-9 col-xl-7">
              <div class="card rounded-3">
                <div class="card-body p-4">
                    <h4 class="text-center my-3 pb-3"> Update todo task</h4>
                    <div class="row mt-4">
                        <div class="form-outline col-9">
                            <label class="form-label" for="form1">Title</label>
                            <input type="text" v-model="title" id="form1" class="form-control" readonly />
                        </div>
                    </div>
                    <div class="row mt-4">
                        <div class="form-outline col-9">
                            <label class="form-label" for="form1">Description</label>
                            <input type="text" v-model="description" id="form1" class="form-control" />
                        </div>
                    </div>
                    <div class="col-12 mt-4">
                        <button type="submit" @click="updateTodo" class="btn btn-primary">Update</button>
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
    mounted() {
        const todoString = this.$route.query.todo;
        if (todoString) {
            this.todo = JSON.parse(todoString);
            this.title = this.todo.title;
            this.description = this.todo.description;
        }
    },
    methods: {
        async updateTodo() {
            try {
                const response = await axios.put(`http://3.232.244.22/api/item/${this.todo.id}`, {
                    description: this.description
                });

                if (response.status === 200 && response.data.success) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Todo item updated successfully!',
                        showConfirmButton: true, 
                        allowOutsideClick: false,
                        allowEscapeKey: false,
                    }).then(() => {
                        this.$router.push('/list');
                    });
                } else {
                    throw new Error('Failed to update todo item');
                }
                this.description = '';
            } catch (error) {
                console.error('Error updating todo item:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Failed to update todo item'
                });
            }
        }

    },
    data: function () {
        return {
            description:'',
            title:'',
            todo: null,
        };
    },
}

</script>
