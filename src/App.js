import { useState } from "react";

const pictures = [
  { id: 1, route: "pictures/1_400.jpg", name: "hot_ballons", found: false },
  { id: 2, route: "pictures/2_400.jpg", name: "lady_photo", found: false },
  { id: 3, route: "pictures/3_400.jpg", name: "pumpkins", found: false },
  { id: 4, route: "pictures/4_400.jpg", name: "river_and_hill", found: false },
  { id: 5, route: "pictures/5_400.jpg", name: "dandelion", found: false },
  { id: 6, route: "pictures/6_400.jpg", name: "big_ben", found: false },
  { id: 7, route: "pictures/7_400.jpg", name: "window", found: false },
  { id: 8, route: "pictures/8_400.jpg", name: "street", found: false },
];

// creating a double of all the pictures and shuffling them in a new array

function shuffleArray(array) {
  for (let i = array.length - 1; i >= 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}
let doublePictures = pictures.flatMap((el, i) => [{ ...el }, { ...el, id: i + 9 }]);
doublePictures = shuffleArray(doublePictures);

// base Component in App

export default function App() {
  const [pictures, setPictures] = useState([...doublePictures]);
  const [score, setScore] = useState(0);
  const [picName, setPicName] = useState(["p1", "p2"]);
  const [clicked, setClicked] = useState([0, 0]);

  // Creating the Card Components to render

  function createRandomPictureArray() {
    const cardComponents = pictures.map((pic) => (
      <Card
        propsObj={pic}
        setScore={setScore}
        picName={picName}
        setPicName={setPicName}
        clicked={clicked}
        setClicked={setClicked}
        pictures={pictures}
        setPictures={setPictures}
        key={pic.id}
      />
    ));
    return cardComponents;
  }

  // UI

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

// Card Component

function Card({ propsObj, setScore, picName, setPicName, clicked, setClicked, pictures, setPictures }) {
  // scoring

  function increaseScore() {
    setScore((s) => (s = s + 1));
  }

  // checking if pair is revealed

  function checkPair() {
    if (picName[0] === picName[1]) {
      increaseScore();
      setPictures(() =>
        pictures.map((el) => (el.id === clicked[0] || el.id === clicked[1] ? { ...el, found: true } : { ...el }))
      );
    } else return;
  }

  // handling a click on a Card

  function handleClick(propsObj) {
    if (propsObj.found) return;
    checkPair();
    setClicked(([p1, p2]) => {
      if (!p1) {
        setPicName(([n1, n2]) => [propsObj.name, n2]);
        return [propsObj.id, 0];
      }
      if (p1 && !p2) {
        setPicName(([n1, n2]) => [n1, propsObj.name]);
        return [p1, propsObj.id];
      } else {
        setPicName(["p1", "p2"]);
        return [0, 0];
      }
    });
  }

  // conditional rendering of a Card or a Card-back

  return (
    <div onClick={() => handleClick(propsObj)}>
      {clicked[0] === propsObj.id || clicked[1] === propsObj.id || propsObj.found === true ? (
        <img src={propsObj.route} alt={propsObj.name}></img>
      ) : (
        <img className={"hover-mod"} src="pictures/card_back_400.png" alt="card-back"></img>
      )}
    </div>
  );
}

{
  // TODO
  // Ending text and restart button
  // Try counter
  // Improved scoring based on clicks and elapsed time (?)
  // Now the third click turns the cards back if not a pair, maybe it should be automatic with delay and animation (?)
}
