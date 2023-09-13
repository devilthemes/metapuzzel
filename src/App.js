import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState([0,0,0,0,0]);
  const cards = [1,2,3,4,5];
  const [suffelCards,setSuffelCards] = useState([])
  const intialMsg = 'Please drag image into appropriate box to arrage';
  const [msg,setMsg]=useState(intialMsg);
  const allowDrop = (e) => {
    e.preventDefault();
  };
  const drag = (e) => {
    e.dataTransfer.setData("text", e.target.id);
  };
  function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex > 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
  const drop = (e) => {
    e.preventDefault();
    var data = e.dataTransfer.getData("text");
    var id = e.target.dataset.id;
    var index = parseInt(e.target.dataset.index)
    console.log(e.target.dataset.id);
    console.log(data);
    let cloneData= JSON.parse(JSON.stringify(boxes));
    console.log(cloneData)
    if (e.target.dataset.id === data) {
      cloneData[index] = 1;
      let cloneSuffelCards = [...suffelCards];
      cloneSuffelCards = cloneSuffelCards.filter(item=>item!==parseInt(data));
      console.log(cloneSuffelCards)
      setSuffelCards(cloneSuffelCards);
      setMsg("!!! Yeap !!!");
      
    } else {
      cloneData[index] = 0;
      setMsg("!!! Oops, does not match !!!");
    }
    console.log(cloneData);
    setBoxes(cloneData);
   
  };
  useState(()=>{
 console.log(cards);
 setSuffelCards(shuffle(cards))
  })
  useEffect(()=>{
    let total = boxes.filter(item=>item === 1);
    if(total.length === boxes.length){
      setTimeout(()=>{
        setMsg("!!! Great, You won !!!");
      },100)
      
    }
  },[boxes])
  return (
    <div className="App">
      <h1>Fix Puzzel</h1>
      <ul className="stage">
        {
          cards.map((item,index)=>(<li data-id={item} data-index={index} onDrop={drop} onDragOver={allowDrop}>
          {boxes[index] === 1 && <img  src={`img${item}.png`} />}
        </li>))
        }
       
      </ul>
      <div>
      {
        suffelCards && suffelCards.length>0 && suffelCards.map(item=><img class="img" id={item} draggable="true" onDragStart={drag} src={`img${item}.png`} />)
      }
      <div class="msg">{msg}</div>
     </div>
    
    </div>
  );
}

export default App;
