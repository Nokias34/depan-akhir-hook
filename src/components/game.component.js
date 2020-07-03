import React, { Component, useEffect, useState } from "react";
import GameDataService from "../services/game.service";

// export default class Game extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.getGame = this.getGame.bind(this);
//     this.updatePublished = this.updatePublished.bind(this);
//     this.updateGame = this.updateGame.bind(this);
//     this.deleteGame = this.deleteGame.bind(this);

//     this.state = {
//       currentGame: {
//         id: null,
//         title: "",
//         description: "",
//         published: false
//       },
//       message: ""
//     };
//   }

//   componentDidMount() {
//     this.getGame(this.props.match.params.id);
//   }

//   onChangeTitle(e) {
//     const title = e.target.value;

//     this.setState(function(prevState) {
//       return {
//         currentGame: {
//           ...prevState.currentGame,
//           title: title
//         }
//       };
//     });
//   }

//   onChangeDescription(e) {
//     const description = e.target.value;
    
//     this.setState(prevState => ({
//       currentGame: {
//         ...prevState.currentGame,
//         description: description
//       }
//     }));
//   }

//   getGame(id) {
//     console.log(id);
//     GameDataService.get(id)
//       .then(response => {
//         this.setState({
//           currentGame: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updatePublished(status) {
//     var data = {
//       id: this.state.currentGame.id,
//       title: this.state.currentGame.title,
//       description: this.state.currentGame.description,
//       published: status
//     };

//     GameDataService.update(this.state.currentGame.id, data)
//       .then(response => {
//         this.setState(prevState => ({
//           currentGame: {
//             ...prevState.currentGame,
//             published: status
//           }
//         }));
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   updateGame() {
//     GameDataService.update(
//       this.state.currentGame.id,
//       this.state.currentGame
//     )
//       .then(response => {
//         console.log(response.data);
//         this.setState({
//           message: "The game was updated successfully!"
//         });
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   deleteGame() {    
//     GameDataService.delete(this.state.currentGame.id).then(response => {
//         console.log(response);
//         this.props.history.push('/game')
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { currentGame } = this.state;

//     return (
//       <div>
//         {currentGame ? (
//           <div className="edit-form">
//             <h4>Game</h4>
//             <form>
//               <div className="form-group">
//                 <label htmlFor="title">Title</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="title"
//                   value={currentGame.title}
//                   onChange={this.onChangeTitle}
//                 />
//               </div>
//               <div className="form-group">
//                 <label htmlFor="description">Description</label>
//                 <input
//                   type="text"
//                   className="form-control"
//                   id="description"
//                   value={currentGame.description}
//                   onChange={this.onChangeDescription}
//                 />
//               </div>

//               <div className="form-group">
//                 <label>
//                   <strong>Status:</strong>
//                 </label>
//                 {currentGame.published ? "Published" : "Pending"}
//               </div>
//             </form>

//             {currentGame.published ? (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(false)}
//               >
//                 UnPublish
//               </button>
//             ) : (
//               <button
//                 className="badge badge-primary mr-2"
//                 onClick={() => this.updatePublished(true)}
//               >
//                 Publish
//               </button>
//             )}

//             <button
//               className="badge badge-danger mr-2"
//               onClick={this.deleteGame}
//             >
//               Delete
//             </button>

//             <button
//               type="submit"
//               className="badge badge-success"
//               onClick={this.updateGame}
//             >
//               Update
//             </button>
//             <p>{this.state.message}</p>
//           </div>
//         ) : (
//           <div>
//             <br />
//             <p>Please click on a Game...</p>
//           </div>
//         )}
//       </div>
//     );
//   }
// }


const Game = props => {
 const initialGameState = {
    id :  null,
    title : "",
    description : "",
    developer : "",
    published :  false
 } ;

 const [currentGame, setCurrentArtilce] = useState(initialGameState);
 const [message, setMessage] = useState("");

 const getGame = id => {
  GameDataService.get(id).then(
    response => {
      setCurrentArtilce(response.data);
      console.log(response.data);
    }).catch(
      e => {
        console.log(e);
      }
    ); 
; }


useEffect(()=>{
    getGame(props.match.params.id);
}, [props.match.params.id]);

const handleInputChange =  event => {
  const {name , value} =  event.target;
  setCurrentArtilce({...currentGame, [name] : value});
};

const updatePublished = status => {
  var data = {
     id: currentGame.id,
      title: currentGame.title,
      description: currentGame.description,
      developer: currentGame.developer,
      published: status
  };

  GameDataService.update(currentGame.id, data)
  .then(response => {
    setCurrentArtilce({...currentGame,published:status});
    console.log(response.data);
  })
  .catch( e => {
    console.log(e);
  });
}

const updateGame = () => {
  GameDataService.update(currentGame.id, currentGame)
  .then(response => {
    console.log(response.data);
    setMessage("The game was updated successfully!");
  })
  .catch(e => {
    console.log(e);
  });
};

const deleteGame= () => {
  GameDataService.delete(currentGame.id)
  .then( response => {
    console.log(response.data);
    props.history.push("/game");
  })
  .catch( e => {
    console.log(e);
  });
};

return(
  <div>
  {currentGame ? (
    <div className="edit-form">
      <h4>Game</h4>
      <form>
        <div className="form-group">
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={currentGame.title}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Harga</label>
          <input
            type="text"
            className="form-control"
            id="description"
            value={currentGame.description}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="developer">Developer</label>
          <input
            type="text"
            className="form-control"
            id="developer"
            value={currentGame.developer}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-group">
          <label>
            <strong>Status:</strong>
          </label>
          {currentGame.published ? "Published" : "Pending"}
        </div>
      </form>

      {currentGame.published ? (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(false)}
        >
          UnPublish
        </button>
      ) : (
        <button
          className="badge badge-primary mr-2"
          onClick={() => updatePublished(true)}
        >
          Publish
        </button>
      )}

      <button
        className="badge badge-danger mr-2"
        onClick={deleteGame}
      >
        Delete
      </button>

      <button
        type="submit"
        className="badge badge-success"
        onClick={updateGame}
      >
        Update
      </button>
      <p>{message}</p>
    </div>
  ) : (
    <div>
      <br />
      <p>Please click on a Game...</p>
    </div>
  )}
</div>
);
  }
export default Game;