import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export const ChessList = () => {
    const [chesses,setChess] = useState([]);
    const [isPending, setPending] = useState(false);

    useEffect(() => {
        const fetchData = async() => {
            setPending(true);
            try {
                const valasz = await axios.get("https://chess.sulla.hu/chess");
                setChess(valasz.data);
            }
            catch(error) {
                console.log("Hiba a lekérésben:", error);
            }
            finally {
                setPending(false);
            };
        };
        fetchData();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Sakkozók</h2>
            {isPending ? (
                <div className="spinner-border text-danger"></div>
            ) : (

            <div className="row row-cols-1 row-cols-md-3 g-2">
                {chesses.map((chess, index) => (
                    <div className="col" key={index}>
                    <div className="card h-100">
                        <div className="text-dark text-center"><b>Sakkozó neve:
                            <br /> {chess.name}</b></div>
                        <div className="text-danger text-center">Születési év: {chess.birth_date}</div>
                        <div className="text-danger text-center">Megnyert világbajnokságai: {chess.world_ch_won}</div>
                        <div className="card-body d-flex flex-column align-items-center">
                            <Link to={chess.profile_url} className="fs-6 btn btn-success" target="_blank">Profil link</Link><br />
                            <Link to={"/chess/" + chess.id}>
                            <img src={chess.image_url ? chess.image_url : "https://via.placeholder.com/400x800"} 
                             style={{ width: "200px" }} className="img-fluid" alt={chess.name} /></Link>
                        </div>
                        <div className="text-center">
                        <Link to={"/chess/" + chess.id}><i className="bi bi-text-paragraph btn btn-primary"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to="/"><i className="bi bi-pencil-square btn btn-warning"></i></Link>&nbsp;&nbsp;&nbsp;
                        <Link to={"/chess-del/" + chess.id}><i className="bi bi-trash3 btn btn-danger"></i></Link>
                        </div>
                    </div>
                    </div>
                ))}
                </div>
            )}
        </div>);
}