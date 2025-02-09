import { useState } from 'react';
import PropTypes from 'prop-types';

export default function DropdownMenu({
  targetBoxCoords,
  onCharacterFound,
  levelCharacters,
}) {
  const [selectedCharacter, setSelectedCharacter] = useState('');

  async function handleSelect(e) {
    console.log('handleSelect e.target', e.target.value);
    setSelectedCharacter(e.target.value);
    console.log('targetBoxCoords:', targetBoxCoords);
    const charInfo = levelCharacters.find(
      (character) => character.name === e.target.value
    );

    // console.log('charInfo', charInfo);
    // console.log('Selected character: ', e.target.value);
    // console.log('charInfo.normalizedCoords', charInfo.normalizedCoords);

    try {
      const response = await fetch('http://localhost:3000/verify', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          character_name: e.target.value,
          x: targetBoxCoords[0],
          y: targetBoxCoords[1],
          level: charInfo.level,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response not ok');
      }

      const data = await response.json();

      console.log('data', data);

      if (data.success) {
        onCharacterFound(charInfo.id);
        console.log('character foudn CORRECTLY');
      } else {
        console.log('WRONG. Not the character.');
      }
    } catch (error) {
      console.error('Error verifying selection: ', error);
    } finally {
      setSelectedCharacter('');
    }
  }

  return (
    <div>
      <select
        name="character-select"
        value={selectedCharacter}
        onChange={handleSelect}
        placeholder={'select'}
      >
        <option value="" disabled>
          Select
        </option>

        {levelCharacters.map((character) => {
          if (character.isFound) return '';
          return (
            <option key={character.id} value={character.name}>
              {character.name}
            </option>
          );
        })}
      </select>
    </div>
  );
}

DropdownMenu.propTypes = {
  targetBoxCoords: PropTypes.array,
  levelCharacters: PropTypes.array,
  onCharacterFound: PropTypes.func,
};
