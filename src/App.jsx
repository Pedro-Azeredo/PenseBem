// Em App.jsx

import './App.css'
import Visor from './visor.jsx'
import Botoes from './Botoes.jsx'
import Pdf from './Pdf.jsx'
import { livros } from './Livros.jsx';
import { useState } from 'react'

function App() {

  // --- NOSSOS NOVOS ESTADOS ---
  const [bookIsOpen, setBookIsOpen] = useState(false)
  const [gameMode, setGameMode] = useState('off') 
  const [displayValue, setDisplayValue] = useState("")
  const [smallDisplayValue, setSmallDisplayValue] = useState("")
  const [livroAtual, setLivroAtual] = useState(null);
  const [perguntaAtualIndex, setPerguntaAtualIndex] = useState(0); 
  const [pontos, setPontos] = useState(0);
  const [tentativas, setTentativas] = useState(1);
  const [smallDisplayColor, setSmallDisplayColor] = useState('yellow');
  const [operacaoAtual, setOperacaoAtual] = useState(null);
  


  // --- FUNÇÕES---


  const gerarNovaOperacao = () => {
    const operadores = ['+', '-', '*', '/'];
    const op = operadores[Math.floor(Math.random() * operadores.length)];

    let num1 = Math.floor(Math.random() * 99) + 1;
    let num2 = Math.floor(Math.random() * 99) + 1;
    let resultado = 0;

    switch (op) {
      case '+':
        resultado = num1 + num2;
        break;
      case '-':
        if (num2 > num1) {
          [num1, num2] = [num2, num1];
        }
        resultado = num1 - num2;
        break;
      case '*':
        num1 = Math.floor(Math.random() * 10) + 1;
        num2 = Math.floor(Math.random() * 10) + 1;
        resultado = num1 * num2;
        break;
      
      // AQUI ESTÁ A CORREÇÃO
      case '/': { // <-- Abre o bloco de escopo com uma chave
        const divisor = Math.floor(Math.random() * 10) + 2;
        const quociente = Math.floor(Math.random() * 10) + 2;
        num1 = divisor * quociente;
        num2 = divisor;
        resultado = quociente;
        break;
      } // <-- Fecha o bloco de escopo com a outra chave

      default:
        break;
    }

  setOperacaoAtual({ num1, num2, operadorCorreto: op, resultado });
};

  const iniciarModoOperacao = () => {
    if (gameMode !== 'on') return;

    setGameMode('op_running');
    gerarNovaOperacao();
    const audio = new Audio(`${import.meta.env.BASE_URL}audio/modo.mp3`);
    audio.play();
  }

  const handleOperatorClick = (operadorEscolhido) => {
    if (gameMode !== 'op_running') return;


    if (operadorEscolhido === operacaoAtual.operadorCorreto) {
      setSmallDisplayValue("CORRETO!");
      setSmallDisplayColor("green");
      const audio = new Audio('/audio/acerto.mp3');
      audio.play();
    } else {
      setSmallDisplayValue("ERRADO!");
      setSmallDisplayColor("red");
      const audio = new Audio('/audio/erro_livro.mp3');
      audio.play();
    }

    setTimeout(() => {
      setSmallDisplayColor("yellow");
      gerarNovaOperacao();
    }, 1500);
  }


  const turnOnOrOff = () => {
    if (gameMode === 'off') {
      setGameMode('on');
      setSmallDisplayValue("SEJA BEM-VINDO!")
      setDisplayValue("Selecione um Modo");
      const audio = new Audio(`${import.meta.env.BASE_URL}audio/ligar.mp3`);
      audio.play();
    } else {
      setGameMode('off');
      setSmallDisplayValue("")
      setDisplayValue("")
      setLivroAtual(null);
      setBookIsOpen(false)

    }
  }

  const handleOffClick = () => {
      if (gameMode !== 'off') {
        setGameMode('off');
        setSmallDisplayValue("")
        setDisplayValue("")
        setLivroAtual(null);
        setBookIsOpen(false)
      }
    }

  const openOrCloseBook = () => {
    if (gameMode === 'off' || gameMode === 'op_running') return;
    const isOpening = !bookIsOpen;
    setBookIsOpen(isOpening);

    if (isOpening) {
      setGameMode('book_select');
      setSmallDisplayValue("QUAL O LIVRO?");
      setDisplayValue("");
      const audio = new Audio(`/audio/modo.mp3`);
      audio.play();
    } else {
      setGameMode('on');
      setSmallDisplayValue("SEJA BEM-VINDO!");
      setDisplayValue("Selecione um Modo");
      setLivroAtual(null);
      const audio = new Audio(`/audio/erro_livro.mp3`);
      audio.play();
    }
  };

  const handleNumberClick = (number) => {
    if (gameMode === 'on') {
      const audio = new Audio('/audio/erro.mp3');
      audio.play();
      return;
    }

    if (gameMode === 'book_select') {
      if (displayValue.length < 3) {
        setDisplayValue(prevValue => prevValue + number);
      } 
      else {
        setDisplayValue(prevValue => prevValue.slice(1) + number);
      }
      const audio = new Audio('/audio/acao.mp3');
      audio.play();
    }
  };
  
  const handleEnterClick = () => {
      
    if (gameMode === 'on') {
        const audio = new Audio('/audio/erro.mp3');
        audio.play();
        return;
      }

      if (gameMode === 'book_select') {
        const livroSelecionado = livros[displayValue];
        if (livroSelecionado) {
          setLivroAtual(livroSelecionado);
          setPerguntaAtualIndex(0);
          setPontos(0);
          setTentativas(1);
          setGameMode('book_running');
          
          const idDaPrimeiraPergunta = livroSelecionado.gabarito[0].id;
          setSmallDisplayValue(`PERGUNTA ${idDaPrimeiraPergunta}`);

          setDisplayValue("");
          const audio = new Audio('/audio/acerto.mp3');
          audio.play();
        } else {
          setSmallDisplayValue("LIVRO " + displayValue + " INVÁLIDO");
          setDisplayValue("");
        }
      }
  };

  const handleAnswerClick = (letraResposta) => {
    if (gameMode !== 'book_running' || !livroAtual) return;

    setDisplayValue(letraResposta);
    const respostaCorreta = livroAtual.gabarito[perguntaAtualIndex].respostaCorreta;

    // --- LÓGICA DE ACERTO ---
    if (letraResposta === respostaCorreta) {
      let pontosGanhos = 0;
      if (tentativas === 1) { pontosGanhos = 3; }
      else if (tentativas === 2) { pontosGanhos = 2; }
      else if (tentativas === 3) { pontosGanhos = 1; }
      
      const novaPontuacao = pontos + pontosGanhos;
      setPontos(novaPontuacao);
      setSmallDisplayValue(`CORRETO! +${pontosGanhos} PONTOS`);
      setSmallDisplayColor('green');
      const audio = new Audio('/audio/acerto.mp3');
      audio.play();
      
      setTimeout(() => {
        avancarParaProximaPergunta(novaPontuacao);
      }, 1500);

    // --- LÓGICA DE ERRO ---
    } else {
      setSmallDisplayColor('red');

      if (tentativas < 3) {
        setTentativas(prev => prev + 1);
        setSmallDisplayValue("ERRADO! TENTE NOVAMENTE");
        const audio = new Audio('/audio/erro_livro.mp3');
        audio.play();
        
        setTimeout(() => {
          const idDaPerguntaAtual = livroAtual.gabarito[perguntaAtualIndex].id;
          setSmallDisplayValue(`PERGUNTA ${idDaPerguntaAtual}`);
          setSmallDisplayColor('yellow');
          setDisplayValue("");
        }, 1500);

      } else {
        setSmallDisplayValue("ERRADO! FIM DAS TENTATIVAS");
        const audio = new Audio('/audio/erro_todas_tentativas.mp3');
        audio.play();       
        setTimeout(() => {
          avancarParaProximaPergunta(pontos);
        }, 1500);
      }
    }
  };

  const avancarParaProximaPergunta = (pontuacaoFinal) => {
    setSmallDisplayColor('yellow');

    if (perguntaAtualIndex >= livroAtual.gabarito.length -1 ) {
      setSmallDisplayValue(`FIM! PONTOS: ${pontuacaoFinal}`);
      setGameMode('on');
      setLivroAtual(null);
      setDisplayValue("");
    } else {
      const proximoIndex = perguntaAtualIndex + 1;
      setPerguntaAtualIndex(proximoIndex);

      const proximaPerguntaId = livroAtual.gabarito[proximoIndex].id;
      setSmallDisplayValue("PERGUNTA " + proximaPerguntaId);

      setDisplayValue("");
      setTentativas(1);
    }
  };

  return (
    <>
      <div className='container-master'>

        <div className="container">
          <Visor
            penseIsOn={gameMode !== 'off'}
            displayValue={gameMode === 'op_running' && operacaoAtual ? operacaoAtual.resultado : displayValue}
            smallDisplayValue={gameMode === 'op_running' && operacaoAtual ? `${operacaoAtual.num1} ? ${operacaoAtual.num2}` : smallDisplayValue} 
            smallDisplayColor={smallDisplayColor}
          />
          <Botoes
            openOrCloseBook={openOrCloseBook}
            turnOnOrOff={turnOnOrOff}
            handleNumberClick={handleNumberClick}
            handleEnterClick={handleEnterClick}
            handleAnswerClick={handleAnswerClick}
            handleOffClick={handleOffClick}
            gameMode={gameMode}
            iniciarModoOperacao={iniciarModoOperacao}
            handleOperatorClick={handleOperatorClick}
          />
        </div>

        <div className='container-main-pdf' style={{
          opacity: bookIsOpen ? 1 : 0,
          pointerEvents: bookIsOpen ? 'auto' : 'none',
        }}>
          <Pdf />
        </div>

      </div>
    </>
  )
}

export default App