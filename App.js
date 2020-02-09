import React from 'react';
import { StyleSheet,Text, View,TouchableOpacity,Alert,Linking, Button } from 'react-native';
import { MaterialCommunityIcons as Icon} from 'react-native-vector-icons';





export default class App extends React.Component {

  constructor(props) {
    super(props)
  
  
  this.state = {
    gameState:  [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
      ],
  
    currentPlayer : 1,
  }
 // this.StartGame = this.StartGame.bind(this)
}
componentDidMount(){
  this.StartGame();
}


StartGame = () => {
  this.setState ({gameState:
    [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ],
    currentPlayer : 1,

    });
}

getWinner = () =>{
  const NUM_TILES =3;
  var arr = this.state.gameState;
  var sum;

  //checking row
  for(var i=0; i< NUM_TILES; i++){
    sum = arr[i][0] + arr[i][1] + arr[i][2]
    if (sum == 3){ return 1;}
    else if(sum == -3 ){return -1;}
  }
  //checking cols
  for(var i=0; i< NUM_TILES; i++){
    sum = arr[0][i] + arr[1][i] + arr[2][i]
    if (sum == 3){ return 1;}
    else if(sum == -3 ){return -1;}
  }
  //checking Diagonals
  for(var i=0; i< NUM_TILES; i++){
    sum = arr[0][0] + arr[1][1] + arr[2][2]
    if (sum == 3){ return 1;}
    else if(sum == -3 ){return -1;}
  }

  //no winner 
  return 0; 



}

onTilePress =(row,col)=>{
//don't change tile 
var value = this.state.gameState[row][col];
if (value !==0){return}

var currentPlayer =this.state.currentPlayer;
// set correct tile
var arr = this.state.gameState.slice();
arr[row][col] = currentPlayer
this.setState({gameState: arr});
//next player 
var nextPlayer = (currentPlayer == 1) ? -1: 1;
this.setState({currentPlayer: nextPlayer});

//winner
var winner = this.getWinner()
if(winner == 1){
  Alert.alert("Player 1 is the Winner");
  this.StartGame();
}else if(winner == -1){
  Alert.alert("Player 2 is the Winner")
  this.StartGame();
}
}




onNewGamePress = () =>{
  this.StartGame();
}


renderIcon = (row,col)=> {

  var value = this.state.gameState[row][col]
  switch(value)
  {
    case 1: return <Icon name="close" style={styles.tileX}/>;
    case -1: return <Icon name="circle-outline" style={styles.tileO}/>;
    default: <View/>;
  }

  
  }
  



 render(){
  return (

    <View style={styles.container}>
      
    <View style= {{flexDirection: "row", }}>

     <Text style = {{textDecorationLine : 'underline',textDecorationStyle: 'solid',textDecorationColor: '#000',width: 200,}}>Player 1 : X </Text>
     <Text style = {{textDecorationLine : 'underline',textDecorationStyle: 'solid',textDecorationColor: '#000',}}>Player 2 : 0 </Text>
     
     </View>

    <View style={{paddingBottom:80}} />

    <View style= {{flexDirection: "row"}}>
                <TouchableOpacity onPress={()=> this.onTilePress(0,0)} style = {[styles.tile,{borderLeftWidth: 0,borderTopWidth:0}]}>
                {this.renderIcon(0,0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(0,1)} style = {[styles.tile,{borderTopWidth:0}]}>
                {this.renderIcon(0,1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(0,2)} style = {[styles.tile,{borderTopWidth:0, borderRightWidth:0}]}>
                {this.renderIcon(0,2)}
                </TouchableOpacity>
      
      </View>

    <View style= {{flexDirection: "row"}}>
                <TouchableOpacity onPress={()=> this.onTilePress(1,0)} style = {[styles.tile,{borderLeftWidth:0}]}>
                {this.renderIcon(1,0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(1,1)} style = {[styles.tile]}>
                {this.renderIcon(1,1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(1,2)} style = {[styles.tile,{borderRightWidth:0}]}>
                {this.renderIcon(1,2)}
                </TouchableOpacity>
    </View>

    <View style= {{flexDirection: "row"}}>
      
                <TouchableOpacity onPress={()=> this.onTilePress(2,0)} style = {[styles.tile,{borderLeftWidth:0, borderBottomWidth:0}]}>
                {this.renderIcon(2,0)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(2,1)} style = {[styles.tile,{borderBottomWidth:0}]}>
                {this.renderIcon(2,1)}
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> this.onTilePress(2,2)} style = {[styles.tile,{borderRightWidth:0, borderBottomWidth:0}]}>
                {this.renderIcon(2,2)}
                </TouchableOpacity>    
    </View>

    
    <View style={{paddingTop:50}} />
    <Button title= "New Game" onPress={this.onNewGamePress}/>
    <View style={{paddingTop:100}} />
    
    <Text style={{color: 'blue',textDecorationStyle: 'solid',textDecorationColor: '#000',}}
    onPress={() => Linking.openURL('https://facebook.com/kumarAkkiy98')}>Created by : Akshay Kumar</Text> 
    
        


    




    </View>
  );
}
}




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  tile:{
    borderWidth:8,
    width:100,
    height:100,
    alignItems:"center",
    justifyContent:"center",
  },

  tileX:{
    color:"red",
    fontSize: 60,
  },

  tileO:{
    color:"green",
    fontSize: 60,
  }
});
