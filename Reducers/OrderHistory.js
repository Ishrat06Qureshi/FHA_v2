import OrderHistory from "../Actions/OrderHistory";

const initialState = {
    Orders:[]
}
const OrderHistory = ( state = initialState , action ) => {
  switch( action.type) {
      case OrderHistory.SAVE_HISTORY:{
          return({
              ...state,
              Orders:action.history
          })
      }
      case OrderHistory.ADD_HISTORY :{
          return({
               ...state,
               Orders:state.Orders.push(action.data)
          })
      }
      default:{
           return({...state})
      }
  }
}

export default OrderHistory 
