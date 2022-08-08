
import { useEffect, useState } from "react";
import Pelicula from "./pelicula";
import PageWrapper from "./PageWrapper";
import Paginacion from "./Paginacion";

function ListadoPeliculas() {

  const [paginaActual, setPaginaActual] = useState(1);
  const [peliculas, setPeliculas] = useState([]);
  const TOTAL_POR_PAGINA = 7;




  const buscarPeliculas = async () => {
    let url= 'https://lucasmoy.dev/data/react/peliculas.json'

    let respuesta = await fetch(url,);
    let json = await respuesta.json();
    setPeliculas(json);

  }

  useEffect(()=>{
    buscarPeliculas();
  }, [])

  
  const getTotalPaginas = () => {
    let cantidadTotPeliculas = peliculas.length;
    return Math.ceil(cantidadTotPeliculas / TOTAL_POR_PAGINA);
  };

  let peliculasPorPagina = peliculas.slice(
    (paginaActual - 1) * TOTAL_POR_PAGINA,
    paginaActual * TOTAL_POR_PAGINA
  );

  return (
    <PageWrapper>
       
      {peliculasPorPagina.map((pelicula) => (
        <Pelicula
          titulo={pelicula.titulo}
          rate={pelicula.rate}
          director={pelicula.director}
          actores={pelicula.actores}
          fecha={pelicula.fecha}
          duracion={pelicula.duracion}
          img={pelicula.img}
        >
          {pelicula.descrip}
        </Pelicula>
      ))}

      <Paginacion
        pagina={paginaActual}
        total={getTotalPaginas()}
        onChange={(pagina) => {
          setPaginaActual(pagina);
        }}
      />
    </PageWrapper>
  );
}

export default ListadoPeliculas;