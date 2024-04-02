<template>
  <section class="vh-100" style="background-color: rgb(18 202 202);">
    <div class="container py-5 h-100">
      <div class="row d-flex justify-content-center align-items-center h-100">
        <div class="col col-lg-9 col-xl-7">
          <div class="card rounded-3">
            <div class="card-body p-4">
              <h4 class="text-center my-3 pb-3">To Do App</h4>
              <form @submit.prevent="searchByTitle" class="row row-cols-lg-auto g-3 justify-content-center align-items-center mb-4 pb-2">
                <div class="col-12 d-flex">
                  <div class="form-outline col-8">
                    <input v-model="searchTitle" type="text" placeholder="Search by Title" class="form-control" />
                  </div>
                  <div class="col-4 ms-4">
                    <button type="submit" class="btn btn-warning">Search</button>
                  </div>
                  <div class="col-4">
                    <router-link to="/add" class="btn btn-primary">Add Task</router-link>
                  </div>
                </div>
              </form>
              <div class="table-container">
                <table class="table mb-4">
                  <thead>
                    <tr>
                      <th scope="col">Id.</th>
                      <th scope="col">Title</th>
                      <th scope="col">Description</th>
                      <th scope="col">Updated At</th>
                      <th scope="col">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(todo, index) in visibleTodos" :key="index">
                      <td class="clickable" @click="updateTodo(todo)">{{ todo.id}}</td>
                      <td class="clickable" @click="updateTodo(todo)">{{ todo.title}}</td>
                      <td class="clickable" @click="updateTodo(todo)">{{ todo.description }}</td>
                      <td class="clickable" @click="updateTodo(todo)">{{ todo.updated_at}}</td>
                      <td class="text-center lines">
                        <div class="dropdown table-dropdown text-center">
                          <button class="btn dropdown-toggle p-0 shadow-none" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
                            <i class="bi bi-three-dots"></i>
                          </button>
                          <ul class="dropdown-menu  dropdown-menu-start" aria-labelledby="dropdownMenuButton">
                            <li>
                              <a @click="deleteTodo(todo.id)" class="dropdown-item clickable">
                                <i class="bi bi-pencil"></i>Delete
                              </a>
                            </li>
                            <li>
                              <a @click="updateTodo(todo)" class="dropdown-item clickable">
                                <i class="bi bi-pencil"></i>Update
                              </a>
                            </li>
                          </ul>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div v-if="isLoading" class="text-center">
                <i class="fa fa-spinner fa-spin"></i> Loading...
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
import "../../css/auth.css"

export default {
  data() {
    return {
      todos: [],
      searchTitle: '',
      currentPage: 1,
      perPage: 10,
      isLoading: false,
      hasMore: true 
    };
  },
  mounted() {
    this.fetchTodoList();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    fetchTodoList() {
      if (this.isLoading || !this.hasMore) return;
      this.isLoading = true;
      axios.get(`http://3.232.244.22/api/items?page=${this.currentPage}&perPage=${this.perPage}`)
        .then(response => {
          const newData = response.data.items.data;
          if (newData.length === 0) {
            // No more data available
            this.hasMore = false;
          } else {
            this.todos.push(...newData);
            this.currentPage++;
          }
          this.isLoading = false;
        })
        .catch(error => {
          console.error('Error fetching todo list:', error);
          this.isLoading = false;
        });
    },
    searchByTitle() {
      let filtered = this.todos;
      if (this.searchTitle.trim() !== '') {
        filtered = this.todos.filter(todo =>
          todo.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        );
      }
      return filtered;
    },
    updateTodo(todo) {
      this.$router.push({ name: 'update', query: { todo: JSON.stringify(todo) }});
    },
    deleteTodo(id) {
      axios.delete(`http://3.232.244.22/api/item/${id}`)
        .then(response => {
          if (response.status === 200) {
            this.fetchTodoList();
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Todo item deleted successfully!'
            });
          } else {
            throw new Error('Failed to delete todo item');
          }
        })
        .catch(error => {
          console.error('Error deleting todo item:', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Failed to delete todo item'
          });
        });
    },
    handleScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !this.isLoading && this.hasMore) {
        this.fetchTodoList();
      }
    },
  },
  computed: {
    filteredTodos() {
      let filtered = this.todos;
      if (this.searchTitle.trim() !== '') {
        filtered = this.todos.filter(todo =>
          todo.title.toLowerCase().includes(this.searchTitle.toLowerCase())
        );
      }
      return filtered;
    },
    visibleTodos() {
      return this.todos.slice(0, this.currentPage * this.perPage);
    }
  }
};
</script>


