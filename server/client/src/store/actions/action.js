export const getCities = (cities) => {
  return{
      type:"GET_CITIES",
      cities
  }
  }
  
  export const cityIsLoaded = (cityIsLoaded) => {
      return{
          type:"CITY_IS_LOADED",
          cityIsLoaded
      }
      }
  
  
  export function fetchCities() {
      return dispatch => {
          fetch('/api/cities',{
              method: "GET", 
              mode: "no-cors",
              headers: {
                "Accept": "application/json",
                "Content-Type": "application/x-www-form-urlencoded"
              },
            })
            .then(a => {
      
              // if (a.status == 200)
                return a.json()
                
            })
            .then(res => {
              dispatch(getCities(res.data))
              dispatch(cityIsLoaded(true))
            })
      }
      }
  
      export const getitineraries = (itineraries) => {
        return{
            type:"ITINERARIES",
            itineraries
        }
        }
      export function fetchitineraries(city) {
        console.log("hello")
        return dispatch => {
            fetch('/api/itineraries/' + city,{
                method: "GET", 
                mode: "no-cors",
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/x-www-form-urlencoded"
                },
              })
              .then(res => res.json())
              .then(res => {
               dispatch(getitineraries(res))
              })
        }
        }
  
        export const userSuccess = (userAdded) => {
          return{
              type:"USER_CREATED",
              userAdded
          }
          }
  
         export function signUpUsers(userInfo) {
        console.log("hello")
        return dispatch => {
            fetch('/api/user',{
                method: "Post", 
                headers: {
                  "Accept": "application/json",
                  "Content-Type": "application/x-www-form-urlencoded" 
                  },
                  body: "username=" + userInfo.username + "&password=" + userInfo.password + "&email=" + userInfo.email + "&firstname=" + userInfo.firstname + "&lastname=" + userInfo.lastname + "&country=" + userInfo.country                 
                })
                .then(res => res.json())

                .then(json => {
                  dispatch(logInSuccess(json))
                 console.log('json', json);
                })
        }
        }
  
        export const logInSuccess = (userLoggedIn) => {
          return{
              type:"USER_lOGGEDIN",
              userLoggedIn
          }
          }
    
        export function logInUser(userInfo) {
        console.log("hello")
        return dispatch => {
            fetch('/api/signin/',{
                method: "Post", 
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },    
                body:"email=" + userInfo.email + "&password=" +
                                    userInfo.password 
                                    
              }) .then(res => res.json())
              .then(json => {
                dispatch(logInSuccess(true))
               console.log('json', json);
               localStorage.setItem('token', json.token)
              })
        }
        }           
  
        export const logOutSuccess = (userLoggedOut) => {
          return{
              type:"USER_lOGGEDOUT",
              userLoggedOut
          }
          }
    
        export function logOutUser() {
        console.log("logout")
        localStorage.removeItem('token')
        return dispatch => {
            fetch('/api/logout/',{
                method: "Get", 
                headers: {
                  "Content-Type": "application/x-www-form-urlencoded"
                },
                                
              }) .then(res => res.json())
              .then(json => {
               
                dispatch(logInSuccess(false))
                console.log('logInSuccess')
               console.log('json', json);
              })
        }
        }


          //   export function UserLoggedOut(){
      //     console.log("logout")
      //     localStorage.removeItem('token')
      //     return dispatch => {
      //         dispatch(logInSuccess(false))
      //         console.log('logInSuccess')
      //     }
      // }




        //  }) .then(res => res.json()            
                  
        //       )
        //       .then(json => {
               
        //         dispatch(getitineraries(res))
        //       })
        // }
        // }
  
  
  
          // }, body:"username=" + userInfo.username + "&password=" + userInfo.password + "&email=" + userInfo.email = "&firstName=" + userInfo.firstName ="&lastName" + userInfo.lastName ="&country" + userInfo.country