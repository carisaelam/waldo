import { useState } from 'react';
import { compareSelectedAndTarget } from '../../utils/CoordinateUtils';
import PropTypes from 'prop-types';

export default function DropdownMenu({
  targetBoxCoords,
  onCharacterFound,
  levelCharacters,
}) {
  const [selectedCharacter, setSelectedCharacter] = useState('');

  function handleSelect(e) {
    console.log('handleSelect e.target', e.target.value);
    setSelectedCharacter(e.target.value);
    const charInfo = levelCharacters.find(
      (character) => character.name === e.target.value
    );

    console.log('charInfo', charInfo);
    console.log('Selected character: ', e.target.value);
    console.log('charInfo.normalizedCoords', charInfo.normalizedCoords);

    const result = compareSelectedAndTarget(
      targetBoxCoords,
      charInfo.normalized_coords
    );

    if (result) {
      console.log('found... id: ', charInfo.id);
      onCharacterFound(charInfo.id);
    }
    console.log('result: ', result);
    console.log('updated charInfo', charInfo);

    setSelectedCharacter('');
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
