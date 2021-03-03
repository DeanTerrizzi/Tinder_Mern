import React, { useEffect, useState } from 'react';
// TinderCard Module installed through npm
import TinderCard from "react-tinder-card";
import "./TinderCards.css";
import axios from './axios';

function TinderCards() {
    // const[people, setPeople] = useState([
    //     {
    //         name: 'Darth Vader',
    //         url: "https://bgr.com/wp-content/uploads/2015/08/darth-vader.jpg?quality=70&strip=all"
    //     },
    //     {
    //         name: 'Master Chief',
    //         url: "https://www.nme.com/wp-content/uploads/2020/12/Master-Chief-2.jpg"
    //     },
    // ]);

    const[people, setPeople] = useState([]);

    //React Hook useEffect
    useEffect(() => {
        async function fetchData() {
            //pulls base url from axios
            const req = await axios.get("/tinder/cards");

            setPeople(req.data);
        }

        fetchData();
    }, [])

    console.log(people);

    const swiped = (direction, nameToDelete) => {
        console.log("removing: " + nameToDelete);
        //setLastDirection(direction);
    };

    const outOfFrame = (name) => {
        console.log(name + " left the screen!");
    };

    return (
        <div className="tinderCards">
            <div className="tinderCards_cardContainer">
                {people.map((person) => (
                    // TinderCard Module installed through npm
                    <TinderCard
                        className="swipe"
                        key={person.name}
                        preventSwipe={["up", "down"]}

                        // onSwipe
                        // * optional
                        // * type: SwipeHandler
                        // * Callback that will be executed when a swipe has been completed. It will be called with a single string denoting which direction the swipe was in: 'left', 'right', 'up' or 'down'.
                        onSwipe={(dir) => swiped(dir, person.name)}

                        // onCardLeftScreen
                        // * optional
                        // * type: CardLeftScreenHandler
                        // * Callback that will be executed when a TinderCard has left the screen. It will be called with a single string denoting which direction the swipe was in: 'left', 'right', 'up' or 'down'.
                        onCardLeftScreen={() => outOfFrame(person.name)}
                    >
                        <div
                            style={{ backgroundImage: `url(${person.imgURL})` }}
                            className="card"
                        >
                            <h3>{person.name}</h3>
                        </div>
                    </TinderCard>
                ))} 
            </div>
        </div>
    )
}

export default TinderCards
