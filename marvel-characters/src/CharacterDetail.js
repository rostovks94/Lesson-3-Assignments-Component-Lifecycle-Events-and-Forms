import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const CharacterDetail = ({ characterId, onClose }) => {
    const [character, setCharacter] = useState(null);
    const publicKey = '82837df1276cd185bdf016d985986c27';
    const privateKey = '8506a33eb6e932569bc5122e4c181debecf7a0f2';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    console.log('Timestamp:', ts);
    console.log('Hash:', hash);

    useEffect(() => {
        const fetchCharacterDetail = async () => {
            try {
                console.log('Fetching character details with ts:', ts);
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters/${characterId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                console.log('API response:', response.data);
                setCharacter(response.data.data.results[0]);
            } catch (error) {
                console.error("Error fetching character detail: ", error);
            }
        };

        fetchCharacterDetail();
    }, [characterId, hash, publicKey, ts]);

    if (!character) return null;

    return (
        <div>
            <button onClick={onClose}>Back</button>
            <h2>{character.name}</h2>
            <img src={`${character.thumbnail.path}.${character.thumbnail.extension}`} alt={character.name} />
            <p>{character.description}</p>
            <h3>Comics</h3>
            <ul>
                {character.comics.items.map(comic => (
                    <li key={comic.resourceURI}>{comic.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default CharacterDetail;