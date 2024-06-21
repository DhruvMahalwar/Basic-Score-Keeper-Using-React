import {useState} from "react"
export default function ScoreKeeper({numPlayers,target})
{
    const arr=[];
    for(let i=0;i<numPlayers;i++) arr.push({id:i,score:0});
    const [curr, setCurr] = useState(arr);
    const [isWinner, setIsWinner] = useState(false);
    const [idWinner,setId] = useState(-1);
    const handle = (ids) => {
        if (!isWinner) {
        setCurr((prev) =>
            prev.map((item) => {
            if (item.id === ids) {
                if (item.score + 1 === target) {
                    setIsWinner(true);
                    setId(ids);
                }
                return { ...item, score: item.score + 1 };
            }
            return item;
            })
        );
        }
    };
    const handleRest=()=>{
        setCurr((prev)=>{
                return prev.map((item)=>{
                        const val={...item};
                        val.score=0;
                        return val;
                    });
            });
        setIsWinner(()=>{return false;});
        setId(()=>{return -1;})
    }
    return (
    <div>
        <h1>Score Keeper</h1>
        <ul>
        {curr.map((e) => (
            <li style={{fontSize:"1.4rem", padding:"1em"}} key={e.id}>Player-{e.id+1} : {e.score} <button onClick={()=>{
                handle(e.id)
            }}>+1</button>{e.id===idWinner && isWinner &&  <span>Winner!</span>}</li>
        ))}
        </ul>
        {<button onClick={handleRest}>Reset</button>}

      </div>
    );  
}