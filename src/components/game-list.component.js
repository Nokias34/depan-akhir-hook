import React, { Component, useState, useEffect } from "react";
import GameDataService from "../services/game.service";
import { Link } from "react-router-dom";
import AuthService from "../services/auth.service";

// export default class GameList extends Component {
//   constructor(props) {
//     super(props);
//     this.onChangeSearchTitle = this.onChangeSearchTitle.bind(this);
//     this.retrieveGame = this.retrieveGame.bind(this);
//     this.refreshList = this.refreshList.bind(this);
//     this.setActiveGame = this.setActiveGame.bind(this);
//     this.removeAllGame = this.removeAllGame.bind(this);
//     this.searchTitle = this.searchTitle.bind(this);

//     this.state = {
//       game: [],
//       currentGame: null,
//       currentIndex: -1,
//       searchTitle: ""
//     };
//   }

//   componentDidMount() {
//     this.retrieveGame();
//   }

//   onChangeSearchTitle(e) {
//     const searchTitle = e.target.value;

//     this.setState({
//       searchTitle: searchTitle
//     });
//   }

//   retrieveGame() {
//     GameDataService.getUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         this.setState({
//           game: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   refreshList() {
//     this.retrieveGame();
//     this.setState({
//       currentGame: null,
//       currentIndex: -1
//     });
//   }

//   setActiveGame(game, index) {
//     this.setState({
//       currentGame: game,
//       currentIndex: index
//     });
//   }

//   removeAllGame() {
//     console.log("tets");
//     GameDataService.deleteUser(AuthService.getCurrentUser().id)
//       .then(response => {
//         console.log(response.data);
//         this.refreshList();
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   searchTitle() {
//     GameDataService.findByTitle(this.state.searchTitle)
//       .then(response => {
//         this.setState({
//           game: response.data
//         });
//         console.log(response.data);
//       })
//       .catch(e => {
//         console.log(e);
//       });
//   }

//   render() {
//     const { searchTitle, game, currentGame, currentIndex } = this.state;

//     return (
//       <div className="list row">
//         <div className="col-md-8">
//           <div className="input-group mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Search by title"
//               value={searchTitle}
//               onChange={this.onChangeSearchTitle}
//             />
//             <div className="input-group-append">
//               <button
//                 className="btn btn-outline-secondary"
//                 type="button"
//                 onClick={this.searchTitle}
//               >
//                 Search
//               </button>
//             </div>
//           </div>
//         </div>
//         <div className="col-md-6">
//           <h4>Games List</h4>

//           <ul className="list-group">
//             {game &&
//               game.map((arc, index) => (
//                 <li
//                   className={
//                     "list-group-item " +
//                     (index === currentIndex ? "active" : "")
//                   }
//                   onClick={() => this.setActiveGame(arc, index)}
//                   key={index}
//                 >
//                   {arc.title}
//                 </li>
//               ))}
//           </ul>

//           <button className="m-3 btn btn-sm btn-danger" onClick={this.removeAllGame}>
//             Remove All
//           </button>
//         </div>
//         <div className="col-md-6">
//           {currentGame ? (
//             <div>
//               <h4>Game</h4>
//               <div>
//                 <label>
//                   <strong>Title:</strong>
//                 </label>{" "}
//                 {currentGame.title}
//               </div>
//               <div>
//                 <label>
//                   <strong>Description:</strong>
//                 </label>{" "}
//                 {currentGame.description}
//               </div>
//               <div>
//                 <label>
//                   <strong>Status:</strong>
//                 </label>{" "}
//                 {currentGame.published ? "Published" : "Pending"}
//               </div>

//               <Link
//                 to={"/game/" + currentGame.id}
//                 className="badge badge-warning"
//               >
//                 Edit
//               </Link>
//             </div>
//           ) : (
//             <div>
//               <br />
//               <p>Please click on a Game...</p>
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   }
// }


const GameList = () => {
  const [games , setGames] = useState([]);
  const [currentGame, setCurrentGame] = useState(null);
  const [currentIndex, setCurrentIndex] =  useState(-1);
  const [searchTitle, setSearchTitle] = useState("");

  useEffect(() => {
    retrieveGames();
  }, []);

  const onChangeSearchTitle = e =>{
      const searchTitle = e.target.value;
      setSearchTitle(searchTitle);
  };

  const retrieveGames = () => {
    GameDataService.getUser(AuthService.getCurrentUser().id)
    .then( response => {
      setGames(response.data);
      console.log(response.data);
    }).catch( e=> {
      console.log(e);
    });
 
  };

  const refreshList = () => {
    retrieveGames();
    setCurrentGame(null);
    setCurrentIndex(-1);
  };


  const setActiveGame = (game, index) => {
    setCurrentIndex(index);
    setCurrentGame(game);
  };

  const removeAllGame = () => {
    GameDataService.deleteUser(AuthService.getCurrentUser().id)
    .then(response => {
      console.log(response.data);
      refreshList();
    })
    .catch(e => {
      console.log(e);
    });
  };

  const findByTitle = () => {
    GameDataService.findByTitle(searchTitle)
    .then( response => {
      setGames(response.data);
      console.log(response.data);
    })
    .catch( e => {
      console.log(e);
    });
 
  };



  return ( 
<div className="list row">
    <div className="col-md-8">
      <div className="input-group mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title"
          value={searchTitle}
          onChange={onChangeSearchTitle}
        />
        <div className="input-group-append">
          <button
            className="btn btn-outline-secondary"
            type="button"
            onClick={findByTitle}
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div className="col-md-6">
      <h4>Games List</h4>

      <ul className="list-group">
        {games &&
          games.map((arc, index) => (
            <li
              className={
                "list-group-item " +
                (index === currentIndex ? "active" : "")
              }
              onClick={() => setActiveGame(arc, index)}
              key={index}
            >
              {arc.title}
            </li>
          ))}
      </ul>

      <button className="m-3 btn btn-sm btn-danger" onClick={removeAllGame}>
        Remove All
      </button>
    </div>
    <div className="col-md-6">
      {currentGame ? (
        <div>
          <h4>Game</h4>
          <div>
            <label>
              <strong>Judul:</strong>
            </label>{" "}
            {currentGame.title}
          </div>
          <div>
            <label>
              <strong>Harga:</strong>
            </label>{" "}
            {currentGame.description}
          </div>
          <div>
            <label>
              <strong>Developer:</strong>
            </label>{" "}
            {currentGame.developer}
          </div>
          <div>
            <label>
              <strong>Status:</strong>
            </label>{" "}
            {currentGame.published ? "Published" : "Pending"}
          </div>

          <Link
            to={"/game/" + currentGame.id}
            className="badge badge-warning"
          >
            Edit
          </Link>
        </div>
      ) : (
        <div>
          <br />
          <p>Please click on a Game...</p>
        </div>
      )}
    </div>
</div>
);

};


export default GameList;