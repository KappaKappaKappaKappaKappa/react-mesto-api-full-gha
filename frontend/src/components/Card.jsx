import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext.js';

function Card({ card, onCardClick, onCardLike, onClickCardDeleteBtn }) {

    const currentUserContext = React.useContext(CurrentUserContext);
    const isOwner = card.owner._id === currentUserContext._id;
    const isLiked = card.likes.some(i => i._id === currentUserContext._id);
    const cardLikeButtonClassName = (
        `card__like ${isLiked && 'card__like_active'}`
    );;


    const handleClick = () => {
        onCardClick(card);
    };

    const handleLikeClick = () => {
        onCardLike(card);
    }

    const handleClickCardDeleteBtn = () => {
        onClickCardDeleteBtn(card);
    }

    return (
        <li className="cards__list-card">
            <article className="card">
                {isOwner && <button className="card__trash" type="button" onClick={handleClickCardDeleteBtn}></button>}
                <div className="card__image" style={{ backgroundImage: `url(${card.link})` }} onClick={handleClick}></div>
                <div className="card__info">
                    <h2 className="card__place">{card.name}</h2>
                    <div className="card__like-container">
                        <button className={cardLikeButtonClassName} type="button" onClick={handleLikeClick}></button>
                        <span className="card__like-numbers">{card.likes.length}</span>
                    </div>
                </div>
            </article>
        </li>
    )
}

export default Card;