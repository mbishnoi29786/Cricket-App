export const url = 'http://192.168.1.18:8000'

export const constant = {
    auth : {
       login: '/users/login',
       signup : '/users/signup'
   },
   Player:{
    create:'/players/create',
    fetch:'/players/fetch',
   
   },
   match:{
    add:'/matches/add',
    fetch:'/matches/fetch',
    fetchone:'/matches/fetchOne',
    analytics:'/matches/fetchAnalytics'

   }
}