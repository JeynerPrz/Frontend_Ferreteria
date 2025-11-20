

const contador = ({contador, incrementar}) => {

    return(
      <>
      <h1>contador: {contador}</h1>
      <button onClick={incrementar}>
        Incrementar
      </button>
      </>  
    );
}

export default contador;