function Pdf () {
    return(
        <iframe 
            src= {`${import.meta.env.BASE_URL}pense_bem_formula_1.pdf#toolbar=0`} 
            width="450px" 
            height="550px"
            title="Visualizador de PDF"
            className="pdf-frame"
        >
        </iframe>
    )
}

export default Pdf;