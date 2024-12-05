import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const ChessMod = () => {
    const params = useParams();
    const id = params.chessId;
    const Navigate = useNavigate();
    //const {chessId} = useParams(); új felírás
    const [chess, setChess] = useState({
        name: '',
        birth_date: '',
        world_ch_won: '',
        profile_url: '',
        image_url: ''
    });
    useEffect(() => {
        const fetchData = async () =>{
            try{
                const valasz = await axios.get(`https://chess.sulla.hu/chess/`+ id);
                setChess(valasz.data);
            }
            catch(error) {
                alert("Hiba a lekérdezésben:", error);
            }
        }
        fetchData();
    }, [id]);
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setChess(prevState => ({
            ...prevState,
            [name]: value
        }));
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(`https://chess.sulla.hu/chess/`+ id, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(chess)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Hiba a modosításban!');
            }
        return response.json();
        })
        .then(() =>  Navigate("/"))
    }
    return (
    <div className="p-5 m-auto text-center content bg-lavender">
        <div>
            <h2>Egy sakkozó módosítása</h2>
            <div className="card col-sm3 m-1 p-2">
                <form onSubmit={handleSubmit}>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Sakkozó neve:</label>
                        <div className="col-sm-9">
                            <input type="text" name="name" className="form-control" defaultValue={chess.name} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Születési dátum:</label>
                        <div className="col-sm-9">
                            <input type="text" name="birth_date" className="form-control" defaultValue={chess.birth_date} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Nyert világbajnokságok:</label>
                        <div className="col-sm-9">
                            <input type="number" name="world_ch_won" className="form-control" value={chess.world_ch_won} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Profil URL:</label>
                        <div className="col-sm-9">
                            <input type="text" name="profile_url" className="form-control" defaultValue={chess.profile_url} onChange={handleInputChange} />
                        </div>
                    </div>
                    <div className="form-group row pb-3">
                        <label className="col-sm-3 col-form-label">Kép URL:</label>
                        <div className="col-sm-9">
                            <input type="text" name="image_url" className="form-control" defaultValue={chess.image_url} onChange={handleInputChange} />
                            <img src={chess.image_url} style={{height:"200px"}} alt={chess.name} className="img-fluid" />
                        </div>
                    </div>
                    <Link to="/" className="bi bi-backspace-fill fs-5 btn btn-warning">Vissza</Link>
                    &nbsp;&nbsp;&nbsp;
                    <button type="submit" className="bi bi-send btn btn-success fs-5">Küldés</button>
    
                </form>
            </div>
        </div>
    </div>
    );
}