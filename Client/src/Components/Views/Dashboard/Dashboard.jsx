import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {Button, Card  } from 'react-bootstrap';
import "bootstrap-icons/font/bootstrap-icons.css"
import style from "./Dashboard.module.css";
import { Link } from "react-router-dom";
import AdminTableUsers from '../AdminTableUsers/AdminTableUsers';
import AdminTableProperties from '../AdminTableProperties/AdminTableProperties';
import { getProperties, getUsers } from "../../../redux/actions";

const Dashboard = () => {
	const dispatch = useDispatch();
	const [activeButton, setActiveButton] = useState('');

	const handleClickProperties = () => {
			setActiveButton("properties");
	};
	
	const handleClickUsers = () => {
			setActiveButton("users");
	};

	const handleClickUAnalitycs = () => {
			setActiveButton("analytics");
	};

	useEffect(()=>{
		dispatch(getProperties()).catch((error) => {
				console.error(error);
		});
		dispatch(getUsers()).catch((error) => {
			console.error(error);
	})
	},[dispatch])

  return (
    <section className={style.dashboard}>
			<div className={style.column1}>
				<h1 className={style.title}>Alohar</h1>
				<Card className={style.box}>{/*Si se clickea uno, mantenerlo coloreado para saber cual está seleccionado*/}
						
					<Button variant={activeButton === 'properties' ? 'warning' : 'outline-warning'} className={style.columnComponent} onClick={handleClickProperties}><i className="bi bi-houses-fill"/>Properties</Button>
					<Button variant={activeButton === 'users' ? 'warning' : 'outline-warning'} className={style.columnComponent} onClick={handleClickUsers}><i className="bi bi-people-fill"/>Users</Button>
					<Button variant={activeButton === 'analytics' ? 'warning' : 'outline-warning'} className={style.columnComponent} onClick={handleClickUAnalitycs}><i className="bi-bar-chart-line-fill"/>Analitycs</Button>
						
				</Card>
				<Card className={style.box}>
					<h4>TeamMates</h4>
					<p>Renderizar admins</p>
				</Card>
				<Card className={style.box}>
					<Button variant="outline-danger" className={style.columnComponentExit} as={Link} to="/home"><i className="bi bi-box-arrow-left"/>Exit Dashboard</Button>
				</Card>
			</div>

			
			<div className={style.column2}>
				<Card className={style.panel}>
					Admin Dashboard
				</Card>

				<Card className={style.panel}>
					{activeButton === "properties"
						?<AdminTableProperties/>
						:<AdminTableUsers/>
					}
				</Card>
			</div>
    </section>
  );
};

export default Dashboard;
