class OrderHistory {
    static  SAVE_HISTORY= "SAVE_HISTORY";
    static  ADD_HISTORY = "EDIT_HISTORY";
  
    static SAVE_HISTORY = ( history ) => {
        
     return({
         type:this.SAVE_HISTORY,
         history
     })
    }
    static ADD_HISTORY = ( data ) => {
      return({
          type:this.ADD_HISTORY,
          data
      })
     }
  }
  export default OrderHistory