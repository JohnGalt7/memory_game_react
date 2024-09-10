import { useState } from "react";

const pictures = [
  { id: 1, route: "pictures/1_400.jpg", name: "hot_ballons" },
  { id: 2, route: "pictures/2_400.jpg", name: "lady_photo" },
  { id: 3, route: "pictures/3_400.jpg", name: "pumpkins" },
  { id: 4, route: "pictures/4_400.jpg", name: "river_and_hill" },
  { id: 5, route: "pictures/5_400.jpg", name: "dandelion" },
  { id: 6, route: "pictures/6_400.jpg", name: "big_ben" },
  { id: 7, route: "pictures/7_400.jpg", name: "window" },
  { id: 8, route: "pictures/8_400.jpg", name: "street" },
];
export default function App() {
  function shuffleArray(array) {
    for (let i = array.length - 1; i >= 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  function createRandomPictureArray() {
    let arr = pictures.map((pic) => <Card propsObj={pic} key={pic.id} />);
    arr = [...arr, pictures.map((pic) => <Card propsObj={pic} key={pic.id + 0.1} />)];
    // arr = [...arr, pictures.map((pic) => <Card propsObj={pic} key={pic.id + 0.2} />)];
    // arr = [...arr, pictures.map((pic) => <Card propsObj={pic} key={pic.id + 0.3} />)];
    shuffleArray(arr);
    return arr;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Memory Game</h1>
      </header>
      <div className="score">
        Your Current Score Is:<p className="pairs">X</p>
      </div>
      <div className="playfield">{createRandomPictureArray()}</div>
    </div>
  );
}

function Card({ propsObj }) {
  const [clicked, setClicked] = useState(0);
  const [hovered, setHovered] = useState(false);

  function handleMouseEnter() {
    setHovered(true);
  }
  function handleMouseLeave() {
    setHovered(false);
  }

  function handleClick(id) {
    setClicked(id);
  }

  return (
    <div onClick={() => handleClick(propsObj.id)}>
      {clicked === propsObj.id ? (
        <img src={propsObj.route} alt={propsObj.name}></img>
      ) : (
        <img class="hover-mod" src="pictures/card_back_400.png" alt="card-back"></img>
      )}
    </div>
  );
}

{
  // pic and background size have to be equal
  // have to change how the pics rendered, should use some flexbox or smthg
  // double the pictures, make it fix
  // make the card turn back if clicked again
  // clicked can be an array to hold both data?
  // score if correct and do not turn them back or remove them completely?
  // turn them back if not correct
}
