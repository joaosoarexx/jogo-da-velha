// criação do elemento square que irá compor o tabuleiro
import { useState } from 'react';
import './App.css'

function Square({valor, onSquareClick}){
  return(
    <button className='square' onClick={onSquareClick}>{valor}</button>
  );
}



function Tabuleiro({xIsNext, squares, onPlay}){

  function handleClick(i){ 

    if(squares[i] || haVencedor(squares))
    {
      // guarda na variável o valor do vencedor
      const ganahdor = haVencedor(squares)
      // mostra o resultado na tela
      document.getElementById('ganhador').innerHTML = "O vencedor é o " + ganahdor
      // trava a jogada
      return ;
    }
    // o handleClick continua a execução, pois o return não foi executado
    const nextSquares = squares.slice();
    if(xIsNext)
    {
      nextSquares[i] = "X"
    }
    else
    {
      nextSquares[i] = "O"
    }
    
    onPlay(nextSquares)
  }

  const vencedor = haVencedor(squares);
  let status;
  if(vencedor){
    status = "Vencedor: " + vencedor
  }
  else{
    status = "Próximo a jogar: " + (xIsNext ?"X" : "O")
  }
  return (
    <div>
      <div className='status'>
        {status}
      </div>
      <div className='teste'>
        <Square valor={squares[0]} onSquareClick={()=> {handleClick(0)}}/>
        <Square valor={squares[1]} onSquareClick={()=> {handleClick(1)}}/>
        <Square valor={squares[2]} onSquareClick={()=> {handleClick(2)}}/>
      </div>

      <div className='teste'>
        <Square valor={squares[3]} onSquareClick={()=> {handleClick(3)}}/>
        <Square valor={squares[4]} onSquareClick={()=> {handleClick(4)}}/>
        <Square valor={squares[5]} onSquareClick={()=> {handleClick(5)}}/>
      </div>

      <div className='teste'> 
        <Square valor={squares[6]} onSquareClick={()=> {handleClick(6)}}/>
        <Square valor={squares[7]} onSquareClick={()=> {handleClick(7)}}/>
        <Square valor={squares[8]} onSquareClick={()=> {handleClick(8)}}/>
      </div>

      <div>
        <p id='ganhador'></p>
      </div>
    </div>
  )
}


//componente Game
export default function Game(){
  
  const [history, setHistory] = useState([Array(9).fill(null)])
  const [currentMove, setCurrentMove] = useState(0)
  const xIsNext = currentMove %  2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares){
    const nextHistory = [...history.slice(0,currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove){
  setCurrentMove(nextMove);    
  }

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0){
      description = "Vai para o movimento número #" + move; 
    }
    else{
      description = "Vai para o início do jogo"
    }
    return(
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    )
  });

  return(
    <div className='game'>
      <div className='game-board'>
        <Tabuleiro xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
      </div>
      <div className='game-info'>
        <ol>{moves}</ol>
      </div>
    </div>
  )

  
}

function haVencedor(squares){
  // cria um dicionário de jogadas que dão vitória à alguem
 const jogadasVencedoras = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // horizontais
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // verticais
    [0, 4, 8], [2, 4, 6]             // diagonais
  ];
  // for que itera o i na quantidade de jogadas presentes no dicionário
  for (let i = 0; i < jogadasVencedoras.length; i++) {
    // define a, b, c como cada cada do dicionário
    // no exemplo do dicionário [0,1,2], ele define a = 0, b = 1, c = 2 
    const [a, b, c] = jogadasVencedoras[i];
    // verifica se a primeira casa não é nula, caso ela não for, verifica a igualdade entre as casas
    if (squares[a] && squares[a] === squares[b] && squares[b] === squares[c]) {
      // retorna o valor do vencedor
      return squares[a];  
    }
  }
  // caso empate, não retorna nada
  return null;  

}