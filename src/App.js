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

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let doublePictures = pictures.flatMap((el, i) => [{ ...el }, { ...el, id: i + 9 }]);
doublePictures = shuffleArray(doublePictures);
console.log(doublePictures);

export default function App() {
  const [score, setScore] = useState(0);
  const [picName, setPicName] = useState([]);

  function createRandomPictureArray() {
    const cardComponents = doublePictures.map((pic) => (
      <Card propsObj={pic} setScore={setScore} picName={picName} setPicName={setPicName} key={pic.id} />
    ));
    return cardComponents;
  }

  return (
    <div className="app">
      <header className="header">
        <h1>Memory Game</h1>
      </header>
      <div className="score">
        Your Current Score Is:<p className="pairs">{score}</p>
      </div>
      <div className="playfield">{createRandomPictureArray()}</div>
    </div>
  );
}

function Card({ propsObj, setScore, picName, setPicName }) {
  const [clicked, setClicked] = useState([0]);

  function handleClick(propsObj) {
    setClicked(propsObj.id);

    if (propsObj.name === picName[picName.length - 1]) {
      setScore((s) => s + 1);
    } else {
      setPicName((el) => [...el, propsObj.name]);
    }
  }

  return (
    <div onClick={() => handleClick(propsObj)}>
      {clicked === propsObj.id ? (
        <img src={propsObj.route} alt={propsObj.name}></img>
      ) : (
        <img className={"hover-mod"} src="pictures/card_back_400.png" alt="card-back"></img>
      )}
    </div>
  );
}

{
  // make the card turn back if not a pair
  // clicked can be an array to hold both data?
  // score if correct and do not turn them back or remove them completely?
  // turn them back if not correct
}
