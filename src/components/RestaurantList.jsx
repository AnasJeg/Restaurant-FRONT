import axios from 'axios';
import React, { useEffect, useState } from 'react'

export default function RestaurantList() {

    const [restaurant, setRestaurant] = useState();
    const [ville, setVille] = useState();
    const [zone, setZone] = useState();
    const [specialite, setSpecialite] = useState();
    const [vl, setVl] = useState();
    const [zn, setZn] = useState();
    const [spl, setSpl] = useState();
    //
    //
    useEffect(() => {
        axios.get('http://localhost:8080/ville/all').then((res) => {
            console.log(res.data);
            setVille(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/zone/all').then((res) => {
            console.log(res.data);
            setZone(res.data)
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/restaurant/all').then((res) => {
            console.log(res.data);
            setRestaurant(res.data);
        })
    }, [])

    useEffect(() => {
        axios.get('http://localhost:8080/sp/all').then((res) => {
            setSpecialite(res.data);
        })
    }, [])
    //change
    const changeVille = (event) => {
        setVl(event.target.value);
        findByVille(event.target.value)
    }
    function findByVille(nom) {
        axios.get(`http://localhost:8080/byville?nom=${nom}`).then((res) => {
            setZone(res.data);
        })
    }
    const changeSP = (event) => {
        setSpl(event.target.value);
    }
    const changeZone = (event) => {
        setZn(event.target.value);
    }
    //

    useEffect(() => {
        if (vl && zn && !spl) {
            console.log(vl,zn);
            axios.get(`http://localhost:8080/rest?ville=${vl}&zone=${zn}`).then((res) => {
                setRestaurant(res.data);
            })
        } else if (vl && zn && spl) {
            axios.get(`http://localhost:8080/restaurants/specialites?specialite=${spl}`).then((res) => {
                setRestaurant(res.data);
            })
        }
    }, [vl,zn, spl])


    return (
        <div>
            <select onChange={changeVille}>
                {
                    ville?.map((item) => (
                        <option key={item.id}>{item.nom}</option>
                    ))
                }
            </select>
            <select onChange={changeZone}>
                {zone?.map((item) => (
                    <option key={item.id}>{item.nom}</option>
                ))}
            </select>
            <select onChange={changeSP}>
                {specialite?.map((item) => (
                    <option key={item.id}>{item.nom}</option>
                ))}
            </select>
            {
                restaurant?.map((item) => (
                    <div className="card" key={item.id}>
                        <div className="card-body">
                            <h5 className="card-title">{item.nom}</h5>
                            <p className="card-text"></p>
                            <p className="card-text">{item.zone.nom}</p>
                            <ul>
                                {item.specialites?.map((sp) => (
                                    <li key={sp.id} >{sp.nom}</li>
                                ))}
                            </ul>

                            <a href="websit" className="btn btn-primary">Visit Website</a>
                        </div>
                    </div>
                ))
            }


        </div>
    )
}