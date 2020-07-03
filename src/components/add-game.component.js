import React, { Component, useState } from "react";
import GameDataService from "../services/game.service";
import AuthService from "../services/auth.service";


// export default class AddGame extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeTitle = this.onChangeTitle.bind(this);
//     this.onChangeDescription = this.onChangeDescription.bind(this);
//     this.saveGame = this.saveGame.bind(this);
//     this.newGame = this.newGame.bind(this);

//     this.state = {
//       id: null,
//       title: "",
//       description: "", 
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     };
//   }

//   onChangeTitle(e) {
//     this.setState({
//       title: e.target.value
//     });
//   }

//   onChangeDescription(e) {
//     this.setState({
//       description: e.target.value
//     });
//   }

//   saveGame() {
//     var data = {
//       title: this.state.title,
//       description: this.state.description,
//       userId : this.state.userId
//     };

//     GameDataService.create(data)
//       .then(response => {
//         this.setState({
//           id: response.data.id,
//           title: response.data.title,
//           description: response.data.description,
//           published: response.data.published,
//           userId: response.data.userId,
//           submitted: true
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   newGame() {
//     this.setState({
//       id: null,
//       title: "",
//       description: "",
//       published: false,
//       userId : AuthService.getCurrentUser().id,
//       submitted: false
//     });
//   }

//   render() {
//     return (
//       <div className="submit-form">
//         {this.state.submitted ? (
//           <div>
//             <h4>You submitted successfully!</h4>
//             <button className="btn btn-success" onClick={this.newGame}>
//               Add
//             </button>
//           </div>
//         ) : (
//           <div>
//             <div className="form-group">
//               <label htmlFor="title">Title</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="title"
//                 required
//                 value={this.state.title}
//                 onChange={this.onChangeTitle}
//                 name="title"
//               />
//             </div>

//             <div className="form-group">
//               <label htmlFor="description">Description</label>
//               <input
//                 type="text"
//                 className="form-control"
//                 id="description"
//                 required
//                 value={this.state.description}
//                 onChange={this.onChangeDescription}
//                 name="description"
//               />
//             </div>

//             <button onClick={this.saveGame} className="btn btn-success">
//               Submit
//             </button>
//           </div>
//         )}
//       </div>
//     );
//   }

// }


const AddGame = () => {

  const initialGameState = {
    id: null,
    title: "",
    description: "", 
    developer: "",
    published: false,
    userId : AuthService.getCurrentUser().id,

  };

  const [game , setGame]  = useState(initialGameState);
  const [submitted , setSubmitterd] = useState(false);

  const handleInputChange = event => {
      const {name , value} = event.target;
      setGame({...game, [name] :  value});
  };

  const saveGame = () => {
    var data = {
      title : game.title,
      description : game.description,
      developer : game.developer,
      userId : AuthService.getCurrentUser().id,
    };

    GameDataService.create(data).then(
      response => {
        setGame({
          id : response.data.id,
          title : response.data.title,
          description : response.data.description,
          developer : response.data.developer,
          published : response.data.published

        });

        setSubmitterd(true);
        console.log(response.data);
      }).catch( e => {
        console.log(e);
      });
  };

  const newGame = () => {
    setGame(initialGameState);
    setSubmitterd(false);

  };

  return(
    <div className="submit-form">
    {submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={newGame}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Judul</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={game.title}
            onChange={handleInputChange}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Harga</label>
          <input
            type="text"
            className="form-control"
            id="description"
            required
            value={game.description}
            onChange={handleInputChange}
            name="description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="developer">Developer</label>
          <input
            type="text"
            className="form-control"
            id="developer"
            required
            value={game.developer}
            onChange={handleInputChange}
            name="developer"
          />
        </div>

        <button onClick={saveGame} className="btn btn-success">
          Submit
        </button>
      </div>
    )}
  </div>
  );
};

export default AddGame;