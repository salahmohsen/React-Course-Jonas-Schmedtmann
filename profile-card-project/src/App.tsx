import { useEffect, useState } from "react";
import "./index.css";

// export default function App() {
//   const [advice, setAdvice] = useState("")
//   const [count, setCount] = useState(0)
//   async function getAdvice() {
//     const res = await fetch("https://api.adviceslip.com/advice");
//     const data = await res.json();
//     setAdvice(data.slip.advice);
//     setCount(c=>c+1)
//   }

//   useEffect(function(){
//     getAdvice()
//   }, [])

//   return (
//     <div>
//       <h1>{advice}</h1>
//       <button onClick={getAdvice}>Get advice</button>
//       <Message count={count}/>
//     </div>
//   );
// }

// function Message(props){
//   return (
//   <p>You have read <strong>{props.count}</strong> pieces of advice</p>
//   );
// }

export default function App() {
  const skills = ["HTML", "CSS", "Javascript", "React", "Figma", "Photoshop"];
  return (
    <div className="container">
      <div className="card-container">
        <div className="card-header">
          <Profile />
          <Intro />
        </div>
        <Disc />
        <div className="tags-container">
          {skills.map((skill) => (
            <Tags name={skill} />
          ))}
        </div>
        <div></div>
      </div>
    </div>
  );
}

function Profile() {
  return <img className="avatar" src="https://i.ibb.co/P4yRWdr/Photo.png" />;
}

function Intro() {
  return (
    <div className="intro">
      <div className="intro-one">
        <p className="header-text">Hello I am</p>
      </div>
      <div className="intro-two">
        <p className="header-text-two">Salah Mohsen</p>
      </div>
    </div>
  );
}

function Disc() {
  return (
    <p className="desc">
      I'm a detail-oriented Photographer & Photo Editor with over 7 years of
      experience, I am capable of producing high-quality images with proper
      retouching and consistent quality in a timely manner.
    </p>
  );
}

function Tags(props) {
  return (
    <div className="tag-element">
      <p className="tag-text">{props.name}</p>
    </div>
  );
}
