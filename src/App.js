import React, {useState, useEffect} from 'react';
import ReactMapGL, { Marker, Popup } from 'react-map-gl';

import { listLogEntries } from './API';


const App = () => {
  const [logEntries, setLogEntries] = useState([])
  const [showPopup, setShowPopUp] = useState({})

  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 48.2115374,
    longitude: 16.3749227,
    zoom: 3
  });

  // you cant make your effects async, you have to do a  Immediately-Invoked Function Expression (IIFE).
  useEffect(() => {
  (async ()=>{
    const logEntries = await listLogEntries();
    setLogEntries(logEntries)
    console.log(logEntries);    
  })();
  }, [])

  const showAddMarkerPopup = (event) => {
    console.log(event)
  }

  return (
    <ReactMapGL
      {...viewport}
      mapStyle="mapbox://styles/tychus880/ck9ncy33m0c3y1ilenjt49pbl"
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      onViewportChange={setViewport}
      onDblClick={showAddMarkerPopup}
    >
      {
        logEntries.map(entry => (
          <>
          <Marker 
            key={entry._id} 
            latitude={entry.latitude} 
            longitude={entry.longitude} 
            >
              <div onClick={()=> setShowPopUp({
                // ...showPopup,
                [entry._id]:true,      
              })}
              >
              <svg
                  className="marker yellow"
                  style={{
                    height: `${6 * viewport.zoom}px`,
                    width: `${6 * viewport.zoom}px`,
                  }}
                  version="1.1" id="Layer_1" x="0px" y="0px" viewBox="0 0 512 512">
                  <g>
                    <g>
                      <path d="M256,0C153.755,0,70.573,83.182,70.573,185.426c0,126.888,165.939,313.167,173.004,321.035
                        c6.636,7.391,18.222,7.378,24.846,0c7.065-7.868,173.004-194.147,173.004-321.035C441.425,83.182,358.244,0,256,0z M256,278.719
                        c-51.442,0-93.292-41.851-93.292-93.293S204.559,92.134,256,92.134s93.291,41.851,93.291,93.293S307.441,278.719,256,278.719z"/>
                    </g>
                  </g>
                </svg>
              </div>
          </Marker>
            {showPopup[entry._id] && <Popup
              latitude={entry.latitude}
              longitude={entry.longitude}
              closeButton
              closeOnClick={false}
              dynamicPosition
              onClose={() => setShowPopUp({})}
              anchor="top" >
              <div className="popup">
                <h3>{entry.title}</h3>
                <p>{entry.comments}</p>
                <small>{`Visited on: ${new Date(entry.visitDate).toLocaleDateString()}`}</small>
              </div>
            </Popup>
            }
          </>
          ))
      }
      
    </ReactMapGL>
  );
}

export default App;
