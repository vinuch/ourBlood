<template>
  <div class="home pt-8">
    <h1 class="text-white text-4xl font-medium">Our Blood</h1>
    <p class="font-thin text-white text-sm">
      Visualisation of the bloodgroup data of a bunch of random people
    </p>
    <div class="flex justify-center my-10">
      <div class="mx-4">
        <img
          class="inline gender-icon w-16 rounded-full"
          src="../assets/male.jpg"
          alt="male"
        />
        <span class="text-white font-medium pl-4 text-lg count">
          {{ users.maleLength }}</span
        >
      </div>
      <div class="mx-4">
        <img
          class="inline gender-icon w-16 rounded-full"
          src="../assets/female.jpg"
          alt="male"
        />
        <span class="text-white font-medium pl-4 text-lg count">{{
          users.femaleLength
        }}</span>
      </div>
    </div>

    <div id="container"></div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import { mapActions, mapGetters } from "vuex";
import $ from "jquery";

var Highcharts = require("highcharts/highstock");
// Load Highcharts Maps as a module
require("highcharts/modules/map")(Highcharts);

export default {
  name: "Home",
  components: {
    // HelloWorld
  },
  data() {
    return {
      categories: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
    };
  },
  methods: {
    ...mapActions({
      fetchUsers: "fetchUsers",
    }),
    countdown() {
      $(".count").each(function() {
        $(this)
          .prop("Counter", 0)
          .animate(
            {
              Counter: $(this).text(),
            },
            {
              duration: 600,
              easing: "swing",
              step: function(now) {
                $(this).text(Math.ceil(now));
              },
            }
          );
      });
    },
    getOccurrence(array, value) {
      var count = 0;
      array.forEach((v) => v === value && count++);
      return count;
    },
  },
  computed: {
    ...mapGetters(["users"]),
    maleOccurrence() {
      let arr = [];
      this.categories.forEach((e) => {
        let value = this.getOccurrence(this.users.maleUsers, e);
        arr.push(value);
      });
      return arr;
    },
  },
  mounted() {
    this.fetchUsers();
    // this.countdown()
  },
  created() {
    let timerId = setInterval(
      () =>
        Highcharts.chart("container", {
          chart: {
            // backgroundColor: '#eacfd4',
            type: "column",
          },
          title: {
            text: "Blood Group Data",
          },
          xAxis: {
            categories: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"],
          },
          yAxis: {
            title: {
              text: "Fruit eaten",
            },
          },
          series: [
            {
              color: "#f78e56",
              name: "Male",
              data: this.users.maleData,
            },
            {
              name: "Female",
              data: this.users.femaleData,
            },
          ],
        }),
      1000
    );

    // after 5 seconds stop
    setTimeout(() => {
      clearInterval(timerId);
    }, 1500);

  },
};
</script>

<style scoped>
h1 {
  font-family: "Lobster", cursive;
}
#container {
  min-width: 310px;
  max-width: 800px;
  height: 400px;
  margin: 0 auto;
}

.buttons {
  min-width: 310px;
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 0;
}

.buttons button {
  cursor: pointer;
  border: 1px solid silver;
  border-right-width: 0;
  background-color: #f8f8f8;
  font-size: 1rem;
  padding: 0.5rem;
  outline: none;
  transition-duration: 0.3s;
}

.buttons button:first-child {
  border-top-left-radius: 0.3em;
  border-bottom-left-radius: 0.3em;
}

.buttons button:last-child {
  border-top-right-radius: 0.3em;
  border-bottom-right-radius: 0.3em;
  border-right-width: 1px;
}

.buttons button:hover {
  color: white;
  background-color: rgb(158, 159, 163);
  outline: none;
}

.buttons button.active {
  background-color: #0051b4;
  color: white;
}
</style>
