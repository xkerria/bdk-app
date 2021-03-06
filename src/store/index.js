import axios from '@/utils/axios'
import Vue from 'vue'
import Vuex from 'vuex'
import createPersistedState from "vuex-persistedstate";

import auth from './auth'
import current from './current'

import VuexORM from '@vuex-orm/core'
import VuexORMAxios from '@vuex-orm/plugin-axios'
import Wechat from '@/models/Wechat'
import Banner from '@/models/Banner'
import Brand from '@/models/Brand'
import Series from '@/models/Series'
import User from '@/models/User'
import Firm from '@/models/Firm'
import Vehicle from '@/models/Vehicle'
import Black from '@/models/Black'

Vue.use(Vuex)
const database = new VuexORM.Database()

database.register(User, 'user')
database.register(Wechat)
database.register(Brand)
database.register(Series)
database.register(Banner)
database.register(Firm)
database.register(Vehicle)
database.register(Black)

VuexORM.use(VuexORMAxios, {axios})

const vuexPersisted = new createPersistedState({
  storage: {
    getItem: key => uni.getStorageSync(key),
    setItem: (key, value) => uni.setStorageSync(key, value),
    removeItem: key => uni.removeStorageSync(key)
  },
  paths: ['auth']
})

export default new Vuex.Store({
  modules: {
    auth,
    current
  },
  plugins: [
    VuexORM.install(database),
    vuexPersisted
  ]
})
