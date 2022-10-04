import React, { Fragment, useState, useEffect, useRef } from "react";
import style from "./Calcul.module.scss";
import Tag from "../utils/tag/Tag";
import { operationGeneratorAV } from "../utils/functions/mathFunctions.jsx";
import { convertToKatex } from "../utils/functions/convertToKatex.jsx";
import { InlineMath, BlockMath } from "react-katex";

const signs = { 0: "\u002B", 1: "\u2212", 2: "\u00D7", 3: "\u00F7" };
const dummyArray = [
  [[[12], [3], [78]], [3], [[45], [2], [96]]],
  [3],
  [[[3], [0], [7]], [1], [[56], [0], [15]]],
];
const literalSigns = ["zero", "one", "two", "three"];
const dummyLayout = [
  <div className={style.normalContainer}>
    {[
      [<span>{dummyArray[0]}</span>],
      [<span>{"SIGNS"}</span>],
      [<span>{"NUMBER"}</span>],
    ]}
  </div>,
];

const Calcul = () => {
  const [score, setScore] = useState(0);
  const [question, setQuestion] = useState([]);
  const [result, setResult] = useState(0);
  const inputRef = useRef();
  const [operators, setOperators] = useState([0, 1, 2, 3]);
  const [difficulty, setDifficulty] = useState({
    difficulty: 2,
    baseLength: 2,
    nestedCount: 1,
  });

  const updatingQuestionHandler = () => {
    const operators = [0, 1, 2, 3];
    const difficulty = { baseLength: 2, nestedCount: 1 };
    const randomNumber = Math.round(Math.random() * 500) + 30;
    const calculQuestion = operationGeneratorAV(
      randomNumber,
      operators,
      difficulty.baseLength,
      difficulty.nestedCount,
      false
    );
    setQuestion(calculQuestion);
    setResult(randomNumber);
    console.log(calculQuestion);
  };

  const checkResultHandler = (e) => {
    if (e) e.preventDefault();
    console.log("inside check result");
    let input = inputRef.current.innerText;
    console.log("input", input);
    console.log("result", result);
    if (isNaN(input)) {
      alert("type a number");
      return;
    }
    if (Number(input) === result) {
      console.log("inside success");
      inputRef.current.style.border = "solid 1px  rgb(142, 142, 142)";
      setScore(score + 1);
      updatingQuestionHandler();
      inputRef.current.innerText = "";
    } else {
      inputRef.current.style.border = "solid 1px red";
      inputRef.current.style.borderRight = "none";
      return;
    }
  };
  useEffect(() => {
    document.addEventListener("keydown", (e) => {
      if ((e.key === "Enter") & (document.activeElement === inputRef.current)) {
        console.log("event", e);
        e.preventDefault();
        // checkResultHandler();
      }
    });

    updatingQuestionHandler();
  }, []);

  return (
    <Fragment>
      <div className={style.tags}>
        <Tag name="addition" />
        <Tag name="multiplication" />
        <Tag name="substraction" />
        <Tag name="division" />
      </div>
      <div className={style.frame}>
        <div className={style.flex}>
          <div className={style.difficulty}>
            <div>
              <span>difficulté</span>
              <button>
                <svg className={style.down} viewBox="0 0 55.751 55.751">
                  <g>
                    <path
                      d="M31.836,43.006c0.282-0.281,0.518-0.59,0.725-0.912L54.17,20.485c2.107-2.109,2.109-5.528,0-7.638
		c-2.109-2.107-5.527-2.109-7.638,0l-18.608,18.61L9.217,12.753c-2.109-2.108-5.527-2.109-7.637,0
		C0.527,13.809-0.002,15.19,0,16.571c-0.002,1.382,0.527,2.764,1.582,3.816l21.703,21.706c0.207,0.323,0.445,0.631,0.729,0.913
		c1.078,1.078,2.496,1.597,3.91,1.572C29.336,44.604,30.758,44.084,31.836,43.006z"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </div>
          <div className={style.score}>
            <span>SCORE</span>
            <span>{score}</span>
          </div>
        </div>
        <div className={style.flex2}>
          <div className={style.content}>
            <div className={style.question}>
              <div className={style.shuffle} onClick={updatingQuestionHandler}>
                <svg viewBox="-50 -50  600 600">
                  <g>
                    <g>
                      <path
                        d="M175.008,244.596c-10.181,15.488-20.962,30.534-33.825,44.067c-30.305,31.879-69.853,40.344-112.522,38.176
			c-38.309-1.95-38.121,57.473,0,59.412c80.166,4.072,136.831-30.564,181.944-89.529c-7.429-9.684-14.294-19.438-20.576-28.838
			C184.859,260.16,179.857,252.264,175.008,244.596z"
                      />
                      <path
                        d="M252.401,197.317c4.118,6.475,8.186,12.842,12.289,19.083c7.521-10.384,15.544-20.408,24.572-29.729
			c22.79-23.524,48.754-33.19,77.262-35.925c-1.809,2.179-3.565,4.398-5.388,6.566c-10.415,12.377-12.172,29.833,0,42.01
			c10.709,10.712,31.574,12.403,42.01,0c16.071-19.093,31.423-38.791,47.494-57.884c10.466-10.519,14.473-28.013,1.519-42.046
			l-53.466-57.927c-26.035-28.203-67.943,13.909-42.011,42.01l6.941,7.519c-29.162,2.087-57.243,9.506-83.172,26.359
			c-19.372,12.594-35.662,28.779-50.195,46.512c2.919,4.093,5.834,8.252,8.703,12.594
			C243.546,183.401,248.045,190.478,252.401,197.317z"
                      />
                      <path
                        d="M403.151,260.978c-5.032-5.972-12.477-8.678-20.048-8.678c-8.135,0-16.417,3.133-21.962,8.678
			c-12.172,12.182-10.415,29.635,0,42.01c1.823,2.169,3.58,4.393,5.388,6.571c-28.508-2.731-54.477-12.405-77.262-35.927
			c-12.964-13.381-23.901-28.178-34.17-43.478c-9.952-14.825-19.266-30.128-29.147-45.095c-1.889-2.859-3.829-5.604-5.758-8.371
			c-44.32-63.579-99.747-102.961-178.907-102.961c-4.138,0-8.348,0.109-12.619,0.322c-37.501,1.906-38.288,59.455-1.823,59.455
			c0.6,0,1.204-0.018,1.823-0.048c4.118-0.208,8.196-0.317,12.248-0.317c37.958,0,72.889,9.693,100.27,38.501
			c16.834,17.715,30.118,38.006,43.127,58.514c6.17,9.725,12.284,19.489,18.687,29.066c5.504,8.236,11.212,16.417,17.179,24.395
			c17.012,22.729,36.308,43.757,60.271,59.336c25.929,16.854,54.01,24.272,83.172,26.354l-6.941,7.521
			c-19.891,21.552,0.117,51.339,22.272,51.339c6.733,0,13.67-2.758,19.738-9.328l53.471-57.925
			c12.954-14.035,8.947-31.529-1.519-42.046C434.574,299.763,419.224,280.076,403.151,260.978z"
                      />
                    </g>
                  </g>
                </svg>
              </div>
              <BlockMath math={convertToKatex(question)} />
            </div>
            <span className={style.equal}>=</span>
            <div className={style.flexWrapper}>
              <span className={style.input} ref={inputRef} contentEditable />
              <button onClick={checkResultHandler}>valider</button>
            </div>
          </div>
          {/* <div>{result}</div> */}
        </div>
      </div>
    </Fragment>
  );
};

export default Calcul;

// const createCalculLayout = (array) => {
//   const layout = [];

//   if (!array[0]) return layout;
//   if (array[0].length === 3) {
//     //check if the object only contains the operator
//     if (array[1][0] === 3) {
//       console.log("array[0]", array[0]);
//       const adjust =
//         divisionOperatorCount(array[0]) - divisionOperatorCount(array[2]);

//       //if -1 means that i adjust the first, if 0 i adjust nothing if 1 i adjust the latter
//       layout.push([
//         <div key={Math.random()} className={style.divisorContainer}>
//           {[
//             adjust === -1
//               ? [
//                   <div key={Math.random()} className={style.adjustContainer}>
//                     {[
//                       [<div className={style.adjust}>1</div>],
//                       createCalculLayout(array[0]),
//                     ]}
//                   </div>,
//                 ]
//               : createCalculLayout(array[0]),

//             [<div key={Math.random()} className={style.divisor}></div>],

//             adjust === 1
//               ? [
//                   <div key={Math.random()} className={style.adjustContainer}>
//                     {[
//                       createCalculLayout(array[2]),
//                       [<div className={style.adjust}>1</div>],
//                     ]}
//                   </div>,
//                 ]
//               : createCalculLayout(array[2]),
//           ]}
//         </div>,
//       ]);
//     } else {
//       layout.push([
//         <div
//           key={Math.random()}
//           className={`${style.normalContainer} ${
//             style[literalSigns[array[1][0]]]
//           }`}
//         >
//           {[
//             createCalculLayout(array[0]),
//             [
//               <span key={Math.random()} className={style.sign}>
//                 {signs[array[1][0]]}
//               </span>,
//             ],
//             createCalculLayout(array[2]),
//           ]}
//         </div>,
//       ]);
//     }
//   } else {
//     if (array[1][0] === 3) {
//       layout.push([
//         <div key={Math.random()} className={style.divisorContainer}>
//           {[
//             [
//               <div key={Math.random()} className={style.base}>
//                 {array[0]}
//               </div>,
//             ],
//             [<div key={Math.random()} className={style.divisor}></div>],
//             [
//               <div key={Math.random()} className={style.base}>
//                 {array[2]}
//               </div>,
//             ],
//           ]}
//         </div>,
//       ]);
//     } else {
//       layout.push([
//         <div
//           key={Math.random()}
//           className={`${style.normalContainer} ${
//             style[literalSigns[array[1][0]]]
//           }`}
//         >
//           {[
//             [
//               <div key={Math.random()} className={style.base}>
//                 {array[0]}
//               </div>,
//             ],
//             [
//               <span key={Math.random()} className={style.sign}>
//                 {signs[array[1][0]]}
//               </span>,
//             ],
//             [
//               <div key={Math.random()} className={style.base}>
//                 {array[2]}
//               </div>,
//             ],
//           ]}
//         </div>,
//       ]);
//     }
//   }

//   return layout;
// };

//i need to use a grid layout
