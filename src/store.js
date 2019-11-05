import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'

// Firebase
import firebase from 'firebase/app'
import firestore from 'firebase/firestore'
import db from './firebase.js'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    items: [],
    numbers: [],
    stars: []
  },
  mutations: {
    addData(state, payload) {
      db.collection('cupones')
        .add({
          numbers: payload.numbers,
          stars: payload.stars,
          fecha: firebase.firestore.FieldValue.serverTimestamp(),
          ganancias: 0
        })
        .then(docRef => {
          this.msgSuccess = 'Datos añadidos correctamente'
          console.log('Document añadido correctamente con ID: ', docRef.id)
          router.push({ path: '/' })
        })
        .catch(err => console.log('Error al cargar el archivo', err))
      // this.numbers = []
      // this.stars = []
      // $router.push({ path: '/' })
    }
  },
  actions: {
    fetchDataFromFirebase(context, payload) {
      db.collection('cupones')
        .orderBy('fecha', 'desc')
        .get()
        .then(querySnapshot => {
          querySnapshot.forEach(doc => {
            context.state.items.push({
              id: doc.id,
              fecha: doc.data().fecha,
              numbers: doc.data().numbers,
              stars: doc.data().stars,
              ganancias: doc.data().ganancias
            })
          })
        })
    }
  }
})
