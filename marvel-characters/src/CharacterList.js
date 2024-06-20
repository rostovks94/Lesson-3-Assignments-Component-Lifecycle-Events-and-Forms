import React, { useState, useEffect } from 'react';
import axios from 'axios';
import md5 from 'md5';

const CharacterList = ({ onCharacterClick }) => {
    const [characters, setCharacters] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const publicKey = '82837df1276cd185bdf016d985986c27';
    const privateKey = '8506a33eb6e932569bc5122e4c181debecf7a0f2';
    const ts = new Date().getTime();
    const hash = md5(ts + privateKey + publicKey);

    useEffect(() => {
        const fetchCharacters = async () => {
            try {
                const response = await axios.get(`https://gateway.marvel.com/v1/public/characters?ts=${ts}&apikey=${publicKey}&hash=${hash}`);
                setCharacters(response.data.data.results);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching data: ", error);
                setError(error);
                setLoading(false);
            }
        };

        fetchCharacters();
    }, [hash, publicKey, ts]);

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error loading characters: {error.message}</p>;

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
            {characters.map(character => {
                const thumbnail = character.thumbnail.path.includes('image_not_available') || character.thumbnail.path.includes('4c002e0305708') 
                    ? 'https://via.placeholder.com/150?text=Image+Not+Found' 
                    : `${character.thumbnail.path}.${character.thumbnail.extension}`;
                return (
                    <div key={character.id} style={{ border: '1px solid #ddd', padding: '16px', textAlign: 'center' }} onClick={() => onCharacterClick(character.id)}>
                        <img src={thumbnail} alt={character.name} style={{ width: '100%' }} />
                        <h3>{character.name}</h3>
                    </div>
                );
            })}
        </div>
    );
};

export default CharacterList;