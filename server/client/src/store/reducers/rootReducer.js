const initState = {
    cities:[],
    cityIsLoaded : false,
    itineraries: {},
    userAdded:false,
    userLoggedIn:false
    
}

function rootReducer ( state =initState, action ){

if (action.type == "GET_CITIES"){
    state = {
        ...state,
        cities: action.cities
    }
        
}

    if (action.type == "CITY_IS_LOADED"){
        state = {
            ...state,
            cityIsLoaded: action.cityIsLoaded
        }
            
    }

    if (action.type == "ITINERARIES"){
        state = {
            ...state,
            itineraries: action.itineraries
        }
            
    }
    if (action.type == "USER_CREATED"){
        state = {
            ...state,
            userAdded: action.userAdded
        }
            
    }
    if (action.type == "USER_lOGGEDIN"){
        state = {
            ...state,
            userLoggedIn: action.userLoggedIn
        }
            
    }
        return state;

}
export default rootReducer