<template>
  <div id="app">
    <form class="col-4 offset-4">
      <legend v-if="adding"><b>Cars adding</b></legend>
      <legend v-else><b>Car edit</b></legend>
      

      <div class="form-group" :class="{ error: v$.form.name.$errors.length }">
        <label for="name"><b>Car name <span class="red">*</span></b></label>
        <input
          type="text"
          id="name"
          class="form-control"
          placeholder="enter car name"
          v-model="v$.form.name.$model"
        >
        <div class="pre-icon os-icon os-icon-fingerprint"></div>
        <!-- error message -->
        <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
          <div class="error-msg" style="color: red">{{ error.$message }}</div>
        </div>
      </div>

      
      <div class="form-group" :class="{ error: v$.form.price.$errors.length }">
        <label for="price"><b>Car price <span class="red">*</span></b></label>
        <input
          type="number"
          id="price"
          class="form-control"
          placeholder="enter car price"
          v-model="v$.form.price.$model"
        >
        <div class="pre-icon os-icon os-icon-fingerprint"></div>
        <!-- error message -->
        <div class="input-errors" v-for="(error, index) of v$.form.price.$errors" :key="index">
          <div class="error-msg" style="color: red">{{ error.$message }}</div>
        </div>
      </div>
      

      <div class="form-group" :class="{ error: v$.form.model.$errors.length }">
        <label for="model"><b>Car model <span class="red">*</span></b></label>
        <input
          type="text"
          id="model"
          class="form-control"
          placeholder="enter car model"
          v-model="v$.form.model.$model"
        >
        <div class="pre-icon os-icon os-icon-fingerprint"></div>
        <!-- error message -->
        <div class="input-errors" v-for="(error, index) of v$.form.model.$errors" :key="index">
          <div class="error-msg" style="color: red">{{ error.$message }}</div>
        </div>
      </div>


      <div class="form-group">
        <label class="mr-3"><b>Transmission:</b></label>
        <input 
          type="radio" 
          name='tr' 
          value='Automatic'
          v-model="carTransmission"> Automatic
        <input 
          type="radio" 
          name='tr' 
          value='Manual' 
          class='ml-1'
          v-model="carTransmission"> Manual
      </div>
      

      <div class="form-group">
        <label class="mr-3"><b>Type of brakes:</b></label>
        <input 
          type="checkbox" 
          value='Disc'
          v-model='carBrakes'> Disc
        <input 
          type="checkbox" 
          value='Drum' 
          class='ml-1'
          v-model='carBrakes'> Drum
      </div>
      

      <div class="form-group" :class="{ error: v$.form.color.$errors.length }">
        <label class="mr-3"><b>Color <span class="red">*</span></b></label>
        <select class='form-control custom-select' v-model="v$.form.color.$model">
          <option value="">Open this select menu</option>
          <option 
            :value='color' v-for='color in colors' :key='color'
          >
          {{color}}</option>
        </select>
        <div class="pre-icon os-icon os-icon-fingerprint"></div>
        <!-- error message -->
        <div class="input-errors" v-for="(error, index) of v$.form.color.$errors" :key="index">
          <div class="error-msg" style="color: red">{{ error.$message }}</div>
        </div>
      </div>
      

      <div class="form-group" :class="{ error: v$.form.date.$errors.length }">
        <label for="date"><b>Date of purchase <span class="red">*</span></b></label>
        <input
          type="date"
          id="date"
          class="form-control"
          v-model="v$.form.date.$model"
        >
        <div class="pre-icon os-icon os-icon-fingerprint"></div>
        <!-- error message -->
        <div class="input-errors" v-for="(error, index) of v$.form.date.$errors" :key="index">
          <div class="error-msg" style="color: red">{{ error.$message }}</div>
        </div>
      </div>      
      

      <div class="form-group">
        <label for="description"><b>Description</b></label>
        <textarea
          id="description" 
          class='form-control' 
          placeholder="enter car description"
          v-model="carDescription">
        </textarea>
      </div>
      

      <button :disabled="v$.form.$invalid" v-if="adding" type="submit" class="btn btn-success mr-1" @click="addCar">Add new car</button>
      <button v-if="!adding" type="button" class="btn btn-primary mr-1" @click="editCar(carId)">Edit car</button>
      <button class="btn btn-secondary" @click="goBack">Return</button>
    </form>
  </div>
</template>


<script>
import axios from 'axios'
import useVuelidate from '@vuelidate/core'
import { required, minLength, maxLength } from '@vuelidate/validators'


export default {
  name: "app",
  data() {
    return {
      carId: 0,
      carTransmission: [],
      carBrakes: [],
      carDescription: "",
      url: "https://localhost:7145/Home",
      adding: true,
      colors: ["Red", "Magenta", "Orange", "Yellow", "Green"],
      
      idTransm1: 0,
      idTransm2: 0,
      idBrake1: 0,
      idBrake2: 0,
      idColor: 0,

      form: {
        name: '',
        price: '',
        model: '',
        color: '',
        data: '',
      },
    };
  },


  methods: {

    addCar() {
      let isAutomatic = false, isManual = false;
      if (this.carTransmission == "Manual") {isAutomatic = false; isManual = true;}
      else if (this.carTransmission == "Automatic") {isAutomatic = true; isManual = false;}

      let isDisc = false, isDrum = false;
      this.carBrakes.forEach(element => {
        if (element == "Disc") isDisc = true;
        else if (element == "Drum") isDrum = true;
      });

      axios({
        method: 'post',
        url: this.url,
        headers: {}, 
        data: {
          "id": 0,
          "name": this.form.name,
          "price": this.form.price,
          "model": this.form.model,
          "transmissions": [
            {
              "id": 0,
              "transmissionType": 0,
              "name": "Automatic",
              "checked": isAutomatic,
              "carId": 0
            },
            {
              "id": 0,
              "transmissionType": 1,
              "name": "Manual",
              "checked": isManual,
              "carId": 0
            }
          ],
          "brakes": [
            {
              "id": 0,
              "brakeType": 0,
              "name": "Disc",
              "checked": isDisc,
              "carId": 0
            },
            {
              "id": 0,
              "brakeType": 1,
              "name": "Drum",
              "checked": isDrum,
              "carId": 0
            }
          ],
          "color": {
            "id": 0,
            "name": this.form.color,
            "carId": 0
          },
          "date": this.form.date,
          "description": this.carDescription
        }
      }).then(() => {
        this.goBack();
      });
    },


    getCar(id) {
      axios
        .get(this.url + "/" + id)
        .then(data => data.data)
        .then(val => {
          this.form.name = val.name;
          this.form.price = val.price;
          this.form.model = val.model;

          if (val.transmissions[0].transmissionType == 0 && val.transmissions[0].checked == true) this.carTransmission = "Automatic";
          else if (val.transmissions[1].transmissionType == 1 && val.transmissions[1].checked == true) this.carTransmission = "Manual";

          this.carBrakes = [val.brakes[0].brakeType == 0 && 
                            val.brakes[0].checked == true ? "Disc" : "", 
                            val.brakes[1].brakeType == 1 && 
                            val.brakes[1].checked == true ? "Drum" : ""];

          this.form.color = val.color.name;
          this.form.date = val.date.substr(0, 10);
          this.carDescription = val.description;
          this.carId = val.id;

          this.idTransm1 = val.transmissions[0].id;
          this.idTransm2 = val.transmissions[1].id;
          this.idBrake1 = val.brakes[0].id;
          this.idBrake2 = val.brakes[1].id;
          this.idColor = val.color.id;
        });
    },


    goBack() {
      this.$router
        .push("/home");
    },


    editCar(id) {
      let isAutomatic = false, isManual = false;
      if (this.carTransmission == "Manual") {isAutomatic = false; isManual = true;}
      else if (this.carTransmission == "Automatic") {isAutomatic = true; isManual = false;}
      
      let isDisc = false, isDrum = false;
      this.carBrakes.forEach(element => {
        if (element == "Disc") isDisc = true;
        else if (element == "Drum") isDrum = true;
      });

      axios({
        method: 'put',
        url: this.url + "/",
        headers: {}, 
        data: {
          "id": id,
          "name": this.form.name,
          "price": this.form.price,
          "model": this.form.model,
          "transmissions": [
            {
              "id": this.idTransm1,
              "transmissionType": 0,
              "name": "Automatic",
              "checked": isAutomatic,
              "carId": id
            },
            {
              "id": this.idTransm2,
              "transmissionType": 1,
              "name": "Manual",
              "checked": isManual,
              "carId": id
            }
          ],
          "brakes": [
            {
              "id": this.idBrake1,
              "brakeType": 0,
              "name": "Disc",
              "checked": isDisc,
              "carId": id
            },
            {
              "id": this.idBrake2,
              "brakeType": 1,
              "name": "Drum",
              "checked": isDrum,
              "carId": id
            }
          ],
          "color": {
            "id": this.idColor,
            "name": this.form.color,
            "carId": id
          },
          "date": this.form.date,
          "description": this.carDescription
        }
      }).then(val => val.data)
        .then(() => this.goBack());
    }
  },


  created() {
    let params = this.$route.params;
    if (params.id) {
      this.adding = false;
      this.getCar(params.id);
    }
  },

  
  setup () {
    return { v$: useVuelidate() }
  },

  validations() {
    return {
      form: {
        
        name: {
            required, 
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
        
        price: {
            required, 
        },
        
        model: {
            required, 
            minLength: minLength(3),
            maxLength: maxLength(30)
        },
        
        color: {
            required, 
        },
        
        date: {
            required, 
        },
      },
    }
  },
};
</script>

<style>
  .red{
  color: #ff0000;
  }
</style>