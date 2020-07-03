// import React, { Component } from "react";
import React, { Component ,useState, useEffect } from 'react';
// import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import {GlobalConsumer} from "../context/context";

// class Hooks extends Component {

     
//     constructor(props){
//         super(props);
       
//         this.state = {
//             count : 0 ,
                // test : null
//         }
    
        
//     }

//     componentDidMount(){
//         document.title = `Title Change: ${this.state.count}`
//     }
   
//     componentDidUpdate(){
//         document.title = `Title Change: ${this.state.count}`
//     }

//     componentWillUnmount(){
//         document.title = `React App `
//     }

//     onUpdate = () => {
//         this.setState({
//             count : this.state.count + 1
//         });
//     }


//     render(){
//         return(
//             <div className="container">
//                 <p>Nilai saya saat ini adalah : {this.state.count} </p>
//                 <button className="btn btn-primary" onClick={this.onUpdate}>Update Nilai</button>
//             </div>
//         );

//     }


// }

const Hooks = (props) => {
    const [count , setCount] =  useState(0);
    // const [test , setTest] =  useState(nulll);

    useEffect(() => {
        document.title = `Title Change: ${count}`
        return () => {
            document.title = `React App`
        }
    });
    
    return(
       
                        <div className="container">
                            {console.log(props)}
                                  <p>Nilai saya saat ini adalah : {props.state.globalcounter} </p>
                            <button className="btn btn-warning" onClick={()=> props.dispatch({type: "ADD_COUNTER"})}>Tambah</button>
                            <button className="btn btn-warning" onClick={()=> props.dispatch({type: "SUB_COUNTER"})}>Kurang</button>
                         </div>
                
    );
}

// function mapStateToProps(state) {
//     return {
//         countFromGlobal : state.counter.countGlobal
//     }
// }
// function mapDispatchToProps(dispatch) {
//     return {
//         setCountFromGlobal :  () => dispatch({type : "ADD_COUNT"}),
//       //  setCountFromGlobal :  () => dispatch({addCount}),
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(Hooks)
export default GlobalConsumer(Hooks)
//export default Hooks

