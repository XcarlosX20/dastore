import { useRef, useMemo, memo } from 'react'
import 'leaflet/dist/leaflet.css'
import { MapContainer, TileLayer, Marker, useMap, Popup } from 'react-leaflet'
import { useDispatch, useSelector } from 'react-redux'
import { setInfoCompanyAction } from '../Actions/ActionsCompany'
import { Button } from '@mui/material'
import { Box } from '@mui/system'
import Loading from '../Components/Utils/Loading'

export function ChangeView ({ coords }) {
  const map = useMap()
  map.setView(coords, 12)
  return null
}

const Map = () => {
  const dispatch = useDispatch()
  const { lat, lng } = useSelector((state) => state.company.location)
  const editLocation = async (newLocation) => {
    await dispatch(
      setInfoCompanyAction({
        property: ['location'],
        data: { location: newLocation }
      })
    )
  }
  const buttonRef = useRef(null)
  const center = [lat, lng]
  function DraggableMarker () {
    const markerRef = useRef(null)
    const eventHandlers = useMemo(
      () => ({
        async dragend () {
          const marker = markerRef.current
          if (marker != null) {
            const newCoords = {
              lat: marker.getLatLng().lat,
              lng: marker.getLatLng().lng
            }
            localStorage.setItem('handlingLocation', JSON.stringify(newCoords))
            buttonRef.current.style.visibility = 'visible'
            buttonRef.current.style.position = 'relative'
          }
        }
      }),
      []
    )

    return (
      <>
        <Marker
          draggable
          eventHandlers={eventHandlers}
          position={center}
          ref={markerRef}
        >
          <Popup minWidth={90}>
            <span>Marker is draggable</span>
          </Popup>
        </Marker>
      </>
    )
  }
  const saveLocation = async (e) => {
    const newLocation = JSON.parse(localStorage.getItem('handlingLocation'))
    // setGeoData(newLocation);
    await editLocation(newLocation)
    localStorage.removeItem('handlingLocation')
    e.target.style.visibility = 'hidden'
    buttonRef.current.style.position = 'absolute'
  }
  if (!lat && !lng) {
    return <Loading fixed />
  }
  return (
    <>
      <Button
        size='small'
        variant='contained'
        ref={buttonRef}
        onClick={saveLocation}
        sx={{
          visibility: 'hidden',
          position: 'absolute',
          marginBottom: '0.8rem'
        }}
      >
        Save Changes
      </Button>
      <MapContainer center={center} zoom={8} style={{ height: 'inherit' }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
        />
        {lat && lng && <DraggableMarker />}
        <ChangeView coords={center} />
      </MapContainer>
    </>
  )
}
export default memo(Map)
