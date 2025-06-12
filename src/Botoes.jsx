const Botoes = ({ openOrCloseBook, turnOnOrOff, handleNumberClick, handleEnterClick, handleOffClick, handleAnswerClick, gameMode, handleOperatorClick, iniciarModoOperacao }) => {
    
    const playMusic = (nota) => {
        if (gameMode === 'off') {
            return; 
        }

        // Se o aparelho estiver ligado, o código abaixo executa normalmente.
        const audio = new Audio(`/audio/notas_musicais/${nota}.mp3`);
        audio.play();
    };

    const numbers = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    
    return (

        <div className="container-teclado">
            <div className="container-botoes">
                
            <div className="fundo-numero">
            {numbers.map((num) => (
                <span
                key={num}
                className="numero"
                onClick={() => handleNumberClick(num)}
                >
                {num}
                </span>
            ))}
            </div>

            <div className="fundo-escolhas">
                <span className="escolha" onClick={() => handleAnswerClick('A')}>A</span>
                <span className="escolha" onClick={() => handleAnswerClick('B')}>B</span>
                <span className="escolha" onClick={() => handleAnswerClick('C')}>C</span>
                <span className="escolha" onClick={() => handleAnswerClick('D')}>D</span>
            </div>

            <div className="fundo-operacao">
                <div className="flexa">
                    <span className='+' onClick={() => handleOperatorClick('+')}>+</span>
                    <span className="-" onClick={() => handleOperatorClick('-')}>-</span>
                    <span className="x" onClick={() => handleOperatorClick('*')}>x</span>
                    <span className="/" onClick={() => handleOperatorClick('/')}>/</span>
                </div>
            </div>

            <div className="fundo-controles">
                <p className="on" onClick={turnOnOrOff}>ON</p>
                <p className="off" onClick={handleOffClick}>OFF</p>
                <p className="book" onClick={openOrCloseBook}>BOOK</p>
                <p className="operation" onClick={iniciarModoOperacao}>OP</p>
            </div>

            <div className="fundo-enter">
                <span className="enter" onClick={handleEnterClick}>ENTER</span>
            </div>
            </div>
            <div className="fundo-musica">
                <p className='do' onClick={() => playMusic("1-do")}>Dó</p>
                <p className='re' onClick={() => playMusic("2-re")}>Re</p>
                <p className='mi' onClick={() => playMusic("3-mi")}>Mi</p>
                <p className='fa' onClick={() => playMusic("4-fa")}>Fa</p>
                <p className='sol' onClick={()=> playMusic("5-sol")}>Sol</p>
                <p className='la' onClick={() => playMusic("6-la")}>La</p>
                <p className='si' onClick={() => playMusic("7-si")}>Si</p>
                <p className='do' onClick={() => playMusic("8-do")}>DÓ</p>
            </div>
        </div>
    )
}

export default Botoes;