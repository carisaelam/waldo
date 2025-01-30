import { useState } from 'react';
import { compareSelectedAndTarget } from '../../utils/CoordinateUtils';
import PropTypes from 'prop-types';

export default function DropdownMenu({ targetBoxCoords }) {
  // eventually will pull character info from backend
  const CHARACTERS = [
    {
      id: 1,
      name: 'Waldo',
      normalizedCoords: [0.53, 0.48],
      isFound: false,
    },
    {
      id: 2,
      name: 'Odlaw',
      normalizedCoords: [0.24, 0.48],
      isFound: false,
    },
    {
      id: 3,
      name: 'Wizard',
      normalizedCoords: [0.63, 0.48],
      isFound: false,
    },
  ];

  const [selectedCharacter, setSelectedCharacter] = useState('');

  function handleSelect(e) {
    setSelectedCharacter(e.target.value);
    const charInfo = CHARACTERS.find(
      (character) => character.name === e.target.value
    );
    console.log('charInfo', charInfo);
    console.log('Selected character: ', e.target.value);
    const result = compareSelectedAndTarget(
      targetBoxCoords[0],
      charInfo.normalizedCoords[0]
    );

    charInfo.isFound = true;
    console.log('result: ', result);
    console.log('updated charInfo', charInfo);
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

        {CHARACTERS.map((character) => {
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
};
