import { useState } from 'react';

export default function DropdownMenu() {
  const CHARACTERS = [
    {
      id: 1,
      name: 'Waldo',
      coordinates: [540, 380],
    },
    {
      id: 2,
      name: 'Wizard',
      coordinates: [400, 320],
    },
    {
      id: 3,
      name: 'Dog',
      coordinates: [100, 220],
    },
  ];
  console.log('dropdown initiated');

  const [selectedCharacter, setSelectedCharacter] = useState('');

  function handleSelect(e) {
    setSelectedCharacter(e.target.value);
    console.log('Selected character: ', e.target.value);
  }

  return (
    <div>
      <select
        name="character-select"
        value={selectedCharacter}
        onChange={handleSelect}
      >
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
