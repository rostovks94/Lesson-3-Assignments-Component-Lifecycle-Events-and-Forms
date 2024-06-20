import React, { useState } from 'react';
import CharacterList from './CharacterList';
import CharacterDetail from './CharacterDetail';

const App = () => {
    const [selectedCharacterId, setSelectedCharacterId] = useState(null);

    const handleCharacterClick = (characterId) => {
        setSelectedCharacterId(characterId);
    };

    const handleBackClick = () => {
        setSelectedCharacterId(null);
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Marvel Characters</h1>
            </header>
            {selectedCharacterId ? (
                <CharacterDetail characterId={selectedCharacterId} onClose={handleBackClick} />
            ) : (
                <CharacterList onCharacterClick={handleCharacterClick} />
            )}
        </div>
    );
};

export default App;