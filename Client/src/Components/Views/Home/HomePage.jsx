import style from "./HomePage.module.css";
import Container from "react-bootstrap/Container";
import FilterPanel from "../../Inc/FilterPanel/FilterPanel";
import Card from "../../Inc/Card/Card";
import { useEffect, useState, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../../redux/actions"
import { Pagination } from "react-bootstrap";

function HomePage() {
  
  const dispatch = useDispatch();
  const id = localStorage.getItem("loggedIn");
  const properties = useSelector((state) => state.properties);
  const searchTerm = useSelector((state)=>state.searchTerm);
  
  useEffect(() => {
    dispatch(actions.getPropertiesAvaible()).catch((error) => {
      console.error(error);
    });
    dispatch(actions.getAllProperties()).catch((error) => {
      console.error(error);
    });
  }, []);

  //Paginado


  const currentPage = useSelector((state) => state.page);
  const [itemsPerPage] = useState(8);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = properties?.slice(indexOfFirstItem, indexOfLastItem);

  const isLastPage = indexOfLastItem === properties.length;
  const hasNextPage = currentItems.length >= itemsPerPage;

  const firstPage = () => {
    dispatch(actions.firstPage())
  };

  const prevPage = () => {
    dispatch(actions.prevPage(1))
  };

  const prev2Page = () => {
    dispatch(actions.prevPage(2))
  };

  const prev1Page = () => {
    dispatch(actions.prevPage(1))
  };

  const next1Page = () => {
    dispatch(actions.nextPage(1))
  };

  const next2Page = () => {
    dispatch(actions.nextPage(2))
  };

  const nextPage = () => {
    dispatch(actions.nextPage(1))
  };

  const lastPage = () => {
    dispatch(actions.lastPage())
  };

  useEffect(() => {
    //solo cargan las propiedades habilitadas
    dispatch(actions.getPropertiesAvaible());
    dispatch(actions.firstPage())
  }, []);

  return (
    <Container className={style.container}>
      <FilterPanel/>

      {searchTerm.length?
          <h4 className={style.searchTerm}>Searching properties by "{searchTerm}"</h4 >:
          <h4 className={style.searchTerm}>Showing all properties</h4 >
      }

      <div className={style.cards}>
        {currentItems.map((element) => {
          return (
            <Card className={style.card}
              key={element.id}
              id={element.id}
              image={element.image}
              country={element.country}
              title={element.title}
              startDate={element.startDate}
              endDate={element.endDate}
              price={element.price}
            />
          );
        })}
      </div>

      <Pagination className={style.paginado}>
        <Pagination.First onClick={firstPage} disabled={currentPage === 1} />
        <Pagination.Prev onClick={prevPage} disabled={currentPage === 1} />
        {currentPage>=3 && (<Pagination.Item onClick={prev2Page}>{currentPage-2}</Pagination.Item>)}
        {currentPage>=2 && (<Pagination.Item onClick={prev1Page}>{currentPage-1}</Pagination.Item>)}
        <Pagination.Item active={true}>{currentPage}</Pagination.Item>
        {!isLastPage && hasNextPage && (<Pagination.Item onClick={next1Page}>{currentPage+1}</Pagination.Item>)}
        <Pagination.Next
          onClick={nextPage}
          disabled={!hasNextPage || isLastPage}
        />
        {/*<Pagination.Last
        onClick={lastPage}
        disabled={!hasNextPage || isLastPage}
      />*/}
        
      </Pagination>
    </Container>
  );
}

export default HomePage;
