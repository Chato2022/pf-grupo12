import style from "./Card.module.css";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';


function calcularPromedio(arr) {
  if (arr.length === 0) return 0;
  const suma = arr.reduce((acumulador, valorActual) => acumulador + valorActual, 0);
  const promedio = suma / arr.length;
  return Number(promedio.toFixed(1));
}

function CardComponent({
  id,
  image,
  country,
  title,
  startDate,
  endDate,
  price,
}) {
  const properties = useSelector((state) => state.properties);
  const property = properties.find((property) => property.id === id);

  const enabledArray = property.Reviews?.map((review) => review.enabled);
  const scoresArray = property.Reviews?.map((review) => review.score) ?? [];

  // Filtrar los scores solo cuando el enabled sea true
  const enabledScoresArray = scoresArray.filter((score, index) => enabledArray[index]);

  // Calcular el promedio solo para los scores habilitados
  const promedio = calcularPromedio(enabledScoresArray);

 

  return (
    <Card className={style.card} style={{ width: "20vw", height: "25vw" }}>
      <div className={style.containerImg}>
      <Card.Img className={style.img} variant="top" src={image} />

      </div>
      
      <Card.Body className={style.cardBody}>
        <div className={style.contanerTittle}>
          <Link className={style.link} to={`/rooms/${id}`}>
            <h5>{country}</h5>
          </Link>
          <span>☆ {promedio}</span>
        </div>

        <p>{title}</p>
        <p>
          Available from {startDate} to {endDate}
        </p>
        <h6>${price} USD per night</h6>
      </Card.Body>
    </Card>
  );
}

export default CardComponent;
