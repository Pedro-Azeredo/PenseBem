function Visor ({ penseIsOn, displayValue, smallDisplayValue, smallDisplayColor }) {
    return (
        <>
            <div className="visor-container">
                <p>
                    <input 
                        type="text" 
                        className="visor-grande" 
                        maxLength='5'
                        value={penseIsOn ? displayValue : ""} 
                        style={{opacity: penseIsOn ? 1 : 0.8 }} 
                        readOnly/>
                </p>
                <div className="decorations">
                    <p>PEDROTOY</p>
                    <div className="separador">
                        <span className="vermelho"></span>
                        <span className="amarelo"></span>
                        <span className="azul"></span>
                        <span className="verde"></span>
                    </div>
                </div>
 
                <div className="baixo-container">
                    <p className="none">Pense Bem ©</p>
                    <p>
                        <input 
                            type="text" 
                            className="visor-pequeno" 
                            value={penseIsOn ? smallDisplayValue : ""} 
                            style={{opacity: penseIsOn ? 1 : 0.8, color: smallDisplayColor}}
                            readOnly
                        />
                    </p>
                    <p className="bordado">Pense Bem ©</p>
                </div>
            </div>

        </>
    )
}

export default Visor;