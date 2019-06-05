// import firebase from 'firebase/app'
// import 'firebase/auth'

export default {
  state: {
    loadedCustomers: [
      {
        id: 1,
        hoTen: 'Phạm Thị Ngọc Điệp',
        diaChi: 'Bạc Liêu',
        phai: false,
        soCmnd: '385377111',
        ngayCapCmnd: new Date(),
        noiCap: 'Bạc Liêu',
        duongDanHinh: '/img/sampleCus.jpg'
      }
    ]
  },
  mutations: {
    setLoadedCustomers (state, payload) {
      state.loadedCustomers = payload
    },
    createCustomer (state, payload) {
      state.loadedCustomers.push(payload)
    },
    updateCustomer (state, payload) {
      const customer = state.loadedCustomers.find(customer => {
        return customer.id === payload.id
      })
      if (payload.hoTen) {
        customer.hoTen = payload.hoTen
      }
      if (payload.diaChi) {
        meetup.diaChi = payload.diaChi
      }
      if (payload.date) {
        meetup.date = payload.date
      }
    }
  },
  actions: {
    loadMeetups ({commit}) {
      commit('setLoading', true)
      firebase.database().ref('meetups').once('value')
      .then(
        data => {
          const meetups = []
          const obj = data.val()
          for (const key in obj) {
            meetups.push({
              id: key,
              title: obj[key].title,
              location: obj[key].location,
              description: obj[key].description,
              imageUrl: obj[key].imageUrl,
              date: obj[key].date,
              creatorId: obj[key].creatorId
            })
          }
          commit('setLoadedMeetups', meetups)
          commit('setLoading', false)
        }
      )
      .catch(
        err => {
          console.log(err)
          commit('setLoading', true)
        }
      )
    },
    createMeetup ({commit, getters}, payload) {
      const meetup = {
        title: payload.title,
        location: payload.location,
        description: payload.description,
        date: payload.date.toISOString(),
        creatorId: getters.user.id
      }
      let imageUrl
      let key
      firebase.database().ref('meetups').push(meetup)
      .then(
        data => {
          key = data.key
          return key
        })
      .then(key => { // Save image into Firebase Storage
        const filename = payload.image.name
        const ext = filename.slice(filename.lastIndexOf('.')) // include . character
        return firebase.storage().ref('meetups/' + key + ext).put(payload.image)
      })
      .then(fileData => { // Update downloadURL image as attribute of a meetup
        fileData.ref.getDownloadURL().then(imageUrl => {
          return firebase.database().ref('meetups').child(key).update({imageUrl: imageUrl})
        })
      })
      .then(() => {
        commit('createMeetup', {
          ...meetup,
          imageUrl: imageUrl,
          id: key
        })
      })
      .catch(
        error => {
          console.log(error)
        }
      )
    },
    updateMeetupData ({commit}, payload) {
      commit('setLoading', true)
      const updateObj = {}
      if (payload.title) {
        updateObj.title = payload.title
      }
      if (payload.description) {
        updateObj.description = payload.description
      }
      if (payload.date) {
        updateObj.date = payload.date
      }
      firebase.database().ref('meetups').child(payload.id).update(updateObj)
      .then(
        () => {
          commit('setLoading', false)
          commit('updateMeetup', payload)
        })
        .catch(
          error => {
            console.log(error)
            commit('setLoading', false)
          })
    }
  },
  getters: {
    loadedMeetups (state) {
      return state.loadedMeetups.sort((meetupA, meetupB) => {
        return meetupA.date > meetupB.date
      })
    },
    featuredMeetups (state, getters) {
      return getters.loadedMeetups.slice(0, 5)
    },
    loadedMeetup (state) {
      return (meetupId) => {
        return state.loadedMeetups.find((meetup) => {
          return meetup.id === meetupId
        })
      }
    }
  }
}