import Globais from "./Globais"

function Controle() {

  const jogar = (resposta) => {
    document.getElementById('visor1').value = `${Globais.programa}=>${Globais.pergunta}:${resposta}`

    if(resposta === Globais.gabarito[Globais.pergunta - 1]){ //acertar
      alert('acertou mizeravi')
      Globais.pontos = Globais.pontos + 3
      Globais.pergunta++
      Globais.tentativa = 1
    }
    else{ //errar
      alert('Errou')
      Globais.tentativa++
      if(Globais.tentativa > 3){
        document.getElementById('visor1').value = '***FIM***'
        document.getElementById('visor2').value = `Score: ${Globais.pontos}`
        return true
      }
    }
    document.getElementById('visor1').value = `${Globais.programa}=>${Globais.pergunta}:${resposta}`
    document.getElementById('visor2').value = `Tentativa ${Globais.tentativa} de 3`

    if(Globais.pergunta > 5) {
      document.getElementById('visor1').value = '***FIM***'
      document.getElementById('visor2').value = `Score: ${Globais.pontos}`
    }
  }


  return (
    <p>
      <input type="button" id="botaoA" value="A" onClick={() => jogar('A')}/>
      <input type="button" id="botaoB" value="B" onClick={() => jogar('B')}/>
      <input type="button" id="botaoC" value="C" onClick={() => jogar('C')}/>
      <input type="button" id="botaoD" value="D" onClick={() => jogar('D')} />
    </p>
  )
}

export default Controle