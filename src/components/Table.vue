<template>
  <div id="app">
    
    <div class="col-6">

      <div class="form-group mb-2">
        <input type="text" id="search" v-model='search' class="form-group col-md-9" placeholder="Enter a search string">
        <button id="btnSearch" class="btn-sm btn-success ml-2" @click='getSearch(search)'>Search</button>
        <button id="btnSearch" class="btn-sm btn-secondary ml-1" @click='getCars(search)'>Reset</button>
      </div>

      <hr>

      <table class="table table-hover text-center table-bordered">
        
        <thead class="thead-light">
          <tr class="align-middle">
            <th class="align-middle">#</th>
            <th class="align-middle">Name</th>
            <th class="align-middle">Price</th>
            <th class="align-middle">Model</th>
            <th class="align-middle">Transm</th>
            <th class="align-middle">Brakes</th>
            <th class="align-middle">Color</th>
            <th class="align-middle">Date of_purchase</th>
            <th class="align-middle">Description</th>
            <th></th>
          </tr>
        </thead>

        
        <tr v-for="item in cars" :key="item.id">
          <td class="align-middle">{{item.id}}</td>
          <td class="align-middle">{{item.name}}</td>
          <td class="align-middle">{{item.price}}</td>
          <td class="align-middle">{{item.model}}</td>

          <td class="align-middle">
            <div v-for="value in item.transmissions" v-bind:key="value.id">
              <div v-if="value.checked">
                {{ value.transmissionType == 0 ? "Automatic" : "Manual"}}
              </div>
            </div>
          </td>

          <td class="align-middle">
            <div v-for="value in item.brakes" v-bind:key="value.id">
              <div v-if="value.checked">
                {{ value.brakeType == 0 ? "Disc" : "Drum"}}
              </div>
            </div>
          </td>

          <td class="align-middle">{{item.color.name}}</td>
          <td class="align-middle">{{item.date.substr(0, 10)}}</td>
          <td class="align-middle">{{item.description}}</td>
          
          <td>          
            <div class="btn-group" role="group" aria-label="group">
              <button class="btn-sm btn-warning mr-1" @click='editCar(item.id)'>Edit</button>
              <button class="btn-sm btn-danger" @click="deleteCar(item.id)">Delete</button>
            </div>
          </td>
        </tr>
      </table>

      <router-link class="btn btn-primary" :to='"/add"'>Add new car</router-link>
    </div>
    
    
  </div>
</template>


<script>
import axios from 'axios'
export default {
  name: "App",
  
  data() {
    return {
      url: "https://localhost:7145/Home",
      cars: [],
      search: ''
    };
  },


  methods: {

    getSearch(strSearch) {
      // string search query
      axios
        .get(this.url + "/Search/" + strSearch)
        .then(data => data.data)
        .then(val => (this.cars = val));
    },


    getCars() {
      // Creating a request to obtain elements
      this.search = "";

      axios
        .get(this.url)
        .then(data => data.data)
        .then(val => (this.cars = val));
    },


    // Removing the element from the table
    deleteCar(id) {
      let ask = confirm("Are you sure?");
      if (ask) {
        axios
          .delete(this.url + "/" + id)
          .then(data => data.data)
          .then(() => this.getCars());
      }
    },


    // Redirection to the editing route
    editCar(id) {
      this.$router.push('/edit/'+id);
    },
  },


  // Initializing the car list when installing components
  created() {
    this.getCars();
  }
};
</script>

<style>
</style>