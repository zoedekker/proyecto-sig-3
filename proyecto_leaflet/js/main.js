//función original
 async function insertar(geojsonFeature){
	//console.log(geojsonFeature);
	var respuesta=await axios.post('../backend/insertruta.php', {
		geo:geojsonFeature,
	});
	console.log(respuesta); 
}

//alternativa
/* async function insertar(geojsonFeature) {
    const response = await axios.post('backend/insertruta.php', geojsonFeature, {
        headers: {
            'Content-Type': 'application/json'
        }
    });
    console.log(response.data);
} */


// Inicializar el mapa con una vista y un nivel de zoom
var map = L.map('map').setView([3.4516, -76.5319], 8);


// Añadir la capa base de OpenStreetMap

var baselayer= L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

var Stadia_AlidadeSatellite = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_satellite/{z}/{x}/{y}{r}.{ext}', {
	minZoom: 0,
	maxZoom: 20,
	attribution: '&copy; CNES, Distribution Airbus DS, © Airbus DS, © PlanetObserver (Contains Copernicus Data) | &copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
	ext: 'jpg'
});

// capas rueda por Cali

var wmsLayer1 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:acci',
	transparent: true,
    opacity: 1,
	format: 'image/png',
});

var wmsLayer2 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:cais',
	transparent: true,
    opacity: 1,
	format: 'image/png',
});
var wmsLayer3 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:ciclorutas',
	transparent: true,
    opacity: 0.7,
	format: 'image/png',
});

var wmsLayer4 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:comunas',
	transparent: true,
    opacity: 0.5,
	format: 'image/png',
});

var wmsLayer5 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:corregimientos',
	transparent: true,
    opacity: 0.5,
	format: 'image/png',
});

var wmsLayer6 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:crimi',
	transparent: true,
    opacity: 1,
	format: 'image/png',
});

var wmsLayer7 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:mov_jer_vial',
	transparent: true,
    opacity: 0.7,
	format: 'image/png',
});

var wmsLayer8 = L.tileLayer.wms('http://localhost:8080/geoserver/wms', {
    layers: 'rueda_por_cali:red_vial_nal',
	transparent: true,
	opacity:0.7,
	format: 'image/png',
});

//wmsLayer1.addTo(map);
//wmsLayer2.addTo(map);
//wmsLayer3.addTo(map);
//wmsLayer4.addTo(map);
//wmsLayer5.addTo(map);
//wmsLayer6.addTo(map);
wmsLayer7.addTo(map);
//wmsLayer9.addTo(map);

var baseMaps = {
    "OpenStreetMap":baselayer,
	"Imagen satelital": Stadia_AlidadeSatellite,
};

//en el orden de capas, la que esta más abajo es la que primera se muestra, mientras más arriba este en la lista más abajo estará en la jerarquia de capas
var overlayMaps = {
	
	//"Corregimientos Cali": wmsLayer5,
	//"Comunas Cali": wmsLayer4,
	//"Ciclorutas Cali": wmsLayer3,
	//"Red vial Nacional": wmsLayer8,
	"Jerarquización vial Cali": wmsLayer7,
	//"Criminalidad": wmsLayer6,
    //"CAIs de policía": wmsLayer2,
	//"Accidentalidad": wmsLayer1,
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

// Crear la leyenda y agregarla al mapa
var legend = L.control({position: 'bottomright'});

legend.onAdd = function (map) {
    var div = L.DomUtil.create('div', 'legend');
    div.innerHTML += '<h4>Leyenda</h4>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:acci" alt="Accidentalidad">&nbsp;Accidentalidad</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:cais" alt="CAIs de policía">&nbsp;CAIs de policía</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:ciclorutas" alt="Ciclorutas Cali">&nbsp;Ciclorutas Cali</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:comunas" alt="Comunas Cali">&nbsp;Comunas Cali</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:corregimientos" alt="Corregimientos Cali">&nbsp;Corregimientos Cali</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:crimi" alt="Criminalidad">&nbsp;Criminalidad</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:mov_jer_vial" alt="Jerarquización vial Cali">&nbsp;Jerarquización vial Cali</div>';
    div.innerHTML += '<div><img src="http://localhost:8080/geoserver/wms?REQUEST=GetLegendGraphic&VERSION=1.0.0&FORMAT=image/png&WIDTH=20&HEIGHT=20&LAYER=rueda_por_cali:red_vial_nal" alt="Red vial Nacional">&nbsp;Red vial Nacional</div>';
    return div;
};

legend.addTo(map);

// Control de enrutamiento
let control = L.Routing.control({
    waypoints: [
        L.latLng(3.4516, -76.5319),
        L.latLng(3.4616, -76.5419)
    ],
    routeWhileDragging: true,
    geocoder: L.Control.Geocoder.google()
}).addTo(map);







 
if (!window.routeListenerAdded) {
    control.on('routeselected', function(e) {
        updateRouteGeoJSON(e.route);
    });
    window.routeListenerAdded = true;
}

function updateRouteGeoJSON(route) {
    let geojsonFeature = {
        type: 'Feature',
        properties: {},
        geometry: {
            type: 'LineString',
            coordinates: []
        }
    };


    // Populate coordinates
    route.coordinates.forEach(function(latlng) {
        geojsonFeature.geometry.coordinates.push([latlng.lng, latlng.lat]);
    });

    window.geojsonFeature = JSON.stringify(geojsonFeature);  // Update the global variable
    console.log("Route updated:", window.geojsonFeature);
	
};

	
	document.getElementById('downloadBtn').addEventListener('click', function() {
    console.log("Sending to server:", window.geojsonFeature);
    insertar(window.geojsonFeature);
});





// Función para descargar el GeoJSON


function createButton(label, container) {
    var btn = L.DomUtil.create('button', '', container);
    btn.setAttribute('type', 'button');
    btn.innerHTML = label;
    return btn;
}

map.on('click', function (e) {
    var container = L.DomUtil.create('div'),
        startBtn = createButton('Start from this location', container),
        destBtn = createButton('Go to this location', container);

    L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);

    L.DomEvent.on(startBtn, 'click', function () {
        control.spliceWaypoints(0, 1, e.latlng);
        map.closePopup();
    });

    L.DomEvent.on(destBtn, 'click', function () {
        control.spliceWaypoints(control.getWaypoints().length - 1, 1, e.latlng);
        map.closePopup();
    });

});
