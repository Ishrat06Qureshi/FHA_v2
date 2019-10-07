import React , { Component } from "react";
import { View , Text  , FlatList } from "react-native";
import { Spinner } from "native-base"
import axios from "axios";
import Products from "./Products";
import Heading_style from  "../Styles/index"

export default class AllProducts extends Component {
    state = {
        data : [],
        isLoading:true,
        search:"",    
        serverError :"",
        skippedProducts:0,
        loadingMore:false, 
        dataLength:0,
        activeTab : true,
        details:false,
        moreloader:true
        
      }



      _renderItem = ({item}) => {
  
        return( 
         
            
        <Products
          productCode  = { item.productCode }
          description = { item.description} 
          uri = {item.imageLink}
          uom = {item.uom}
        />
        
        )
    }

    fetchData = () => {
        const { skippedProducts } = this.state
        const { productName }=  this.props.navigation.state.params
        console.log("skipped products before add", skippedProducts)
        axios.get(`http://13.59.64.244:3000/api/products?noOfRecords=5&skip=${skippedProducts}&search=${productName}`).
        then(( response)  =>  this.setState( ( preState ) => {
           const length = response.data.length
          return({
            data:skippedProducts === 0 ? Array.from(response.data) :
             response.data.length? [...preState.data , ...response.data ]  :[...preState.data],
            isLoading : false,
            moreloader:!length? false:true
          })
        })).catch ( err=> this.setState(({ serverError:err , isLoading:false })))
      }
    

      _handleLoadMore = () => {
        this.setState(
          (prevState, nextProps) => ({
            skippedProducts: prevState.skippedProducts + 5,
            loadingMore: true
          }),
          () => {
            console.log("skipped products after adding 10" , this.state.skippedProducts)
            this.fetchData();
          }
        );
      };

_loader = () => {
  
    return( 

    <View style={{ flex: 1, flexDirection: 'column',
     alignItems: 'center', justifyContent: 'center', paddingVertical: 10 }}>
      {
        this.state.moreloader ? <Spinner color = "red"/> : null 
      }
      
      
    </View>
    )
}

    render() {
        const { data , isLoading , skippedProducts } = this.state
        const { productName }=  this.props.navigation.state.params
        // console.log("Skipped Products" , skippedProducts)
        return( <View>
                  <View style = {{ justifyContent:"center" , alignSelf:"center" , marginTop:50 , marginBottom:25}}>
            <Text style = { Heading_style }> { productName } Products </Text>
            </View>
             
            {
                data.length? <FlatList
                data={ data}
              //   ItemSeparatorComponent={() => <View style={{ marginBottom:-350 }} />}
                renderItem={ this._renderItem}
                onEndReached = { this._handleLoadMore }
                // initialNumToRender={8}  
                onEndReachedThreshold={0.5}
                ListFooterComponent= { this._loader}
                keyExtractor={(item, index) => item+index}

               
                
         />  : <Spinner color="red"/>
            }
                   
                   
        </View>)
    }
    componentDidMount () {
        this.fetchData()
    } 
} 