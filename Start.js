import Globais from "./Globais"

function Start() {
  const iniciar = () => {
    Globais.programa = prompt('Digite o número do programa(021 a 026):', '')

    if(Globais.programa === "021")
      Globais.gabarito = Globais.gabarito021
    else if(Globais.programa === '022')
      Globais.gabarito = Globais.gabarito022
    else {
      alert('Numero de programa inválido\nDigite um número entre 021 e 022!')
      iniciar()
    }

    Globais.pontos = 0
    Globais.pergunta = 1
    Globais.tentativa = 1

    document.getElementById('visor1').value = `${Globais.programa}->${Globais.pergunta}`

    document.getElementById('visor2').value = `Tentativa ${Globais.tentativa} de 3`
  }
  
  return (
    <p><input type="button" id="start" value="Start/Reset Game" onClick={iniciar}/></p>
  )
}

export default Start