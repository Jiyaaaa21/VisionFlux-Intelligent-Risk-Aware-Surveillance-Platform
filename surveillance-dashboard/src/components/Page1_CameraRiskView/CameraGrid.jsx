import React from 'react';
import { useGlobalState } from '../../context/GlobalStateContext';
import CameraTile from './CameraTile';

const CameraGrid = () => {
  const { state } = useGlobalState();

  return (
    <div className="h-full flex flex-col">
      {/* Grid Container - Tighter spacing */}
      <div className="grid grid-cols-3 gap-3 auto-rows-fr">
        {state.cameras.map(camera => (
          <CameraTile key={camera.id} camera={camera} />
        ))}
      </div>
    </div>
  );
};

export default CameraGrid;