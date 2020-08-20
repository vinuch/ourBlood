import Vue from 'vue'
import Vuex from 'vuex'
import * as fb from '../../firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    users: JSON.parse(localStorage.getItem('USERS')) || {} ,
    categories: ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"]
  },
  mutations: {
    SET_USERS(state, val) {
      state.users = val;
    }
  },
  actions: {
     async fetchUsers({ commit , state}) {
         let result = await fb.usersCollection.orderBy('name').onSnapshot(snapshot => {
        let users = []
        snapshot.forEach(doc => {
          let user = doc.data()
          user.id = doc.id
      
          users.push(user)
          
        })
        if (users.length == 0){
          return
        }else {
          let male = users.filter(user => user.gender == 'M')
          let female = users.filter(user => user.gender == 'F')
  
          let getOccurrence = function(array, value) {
            var count = 0;
            array.forEach((v) => (v.blood_group == value && count++));
            return count;
          }
  
          let arr1 = []
          state.categories.forEach(e => {
            let value = getOccurrence(male, e)
            arr1.push(value)
          })
          let arr2 = []
          state.categories.forEach(e => {
            let value = getOccurrence(female, e)
            arr2.push(value)
          })
        
  
          let result = {
            maleUsers: male,
            femaleUsers: female,
            maleLength: male.length,
            femaleLength: female.length,
            maleData: arr1,
            femaleData: arr2
          }
          
          localStorage.setItem('USERS', JSON.stringify(result))
          commit('SET_USERS', result)

          
          
        }


      })
      return await result;
      
    },
    
  },
  getters: {
    users: state => {
      return state.users
    }
  },
  modules: {
  }
})
