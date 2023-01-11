    // const [coordinates, setCoordinates] = useState({ lat: 32.0853, lng: 34.7818 })
    const coordinates ={lat:32.2,lng: 34.74}
    const zoom = 11

    const handleClick = ({ lat, lng }) => {
        // setCoordinates({ lat, lng })
    }

    return <div>
        <h1 style={{ textAlign: 'center', margin: '40px' }}>Shop branches</h1>
        <div style={{ height: '70vh', width: '90%', margin: 'auto' }}>
            <GoogleMapReact
                onClick={handleClick}
                bootstrapURLKeys={{ key: "AIzaSyA5YAKbctMWmj2etXv-KY7MSXDMGaWr0qs" }}
                defaultCenter={coordinates}
                center={coordinates}
                defaultZoom={zoom}
            >
                <AnyReactComponent
                    lat={coordinates.lat}
                    lng={coordinates.lng}
                    {...coordinates}
                    text="📍"
                />
            </GoogleMapReact>
        </div>
    </div>