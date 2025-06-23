let initState = {
    InputData:[],
  };


  export const Auth = (state = initState,{type,payload}) => {
    switch (type) {
        case 'Auth':
          return{
            ...state,
            InputData:payload
          }
  
      default:
        return state;
    }
  };
  