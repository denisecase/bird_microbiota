// code for sites.html

function initMap() {

    // FORMATTING ELEMENTS ===================================================

    // node layer formatting

    var nodeColor = 'black';
    var nodeOpacity = 1.0;
    var nodeFillOpacity = 1.0;
    var nodeRadius = 2;
    var nodeLineWeight = 1;
    
    var polyline_options = {
        color: nodeColor,
        opacity: nodeOpacity,
        weight: nodeLineWeight, // in pixels
        smoothFactor: 1.0
    };
  
    // marker 1 formatting

    var m1Color = 'red';
    var m1Opacity = 1.0;
    var m1FillOpacity = 0.7;
    var m1Radius = 9;
    var m1Marker = L.AwesomeMarkers.icon({
        icon: 'group',
        color: 'red',
        iconColor: 'white'
    });

    // marker 2 formatting

    var m2Color = 'green';
    var m2Opacity = 0.4;
    var m2FillOpacity = 0.4;
    var m2Radius = 8;
    var m2LineWeight = 2;
    var m2Marker = L.AwesomeMarkers.icon({
        icon: 'group',
        color: 'green',
        iconColor: 'white'
    })
    var m2Voffset = 0.0;// 0.0001;
    var m2Hoffset = 0.000001; //m2Voffset*.05;

     // GET DATA ===========================================================

     var nodes = getExistingNodes();
     var markers1 = getExistingMarkers1();
     var markers2 = getExistingMarkers2();

     nodeLayerGroup = new L.layerGroup();
     m1LayerGroup = new L.layerGroup();
     m2LayerGroup = new L.layerGroup();

    // CREATE GINA LAYERS  ==============================================
    // Examples can be found at http://gina-alaska.github.io/gina-map-layers
    // https://github.com/gina-alaska/gina-map-layers
    
    var bestLayerGroup = new L.LayerGroup();
    bestLayerGroup.name = "Best";
            
    var topLayerGroup = new L.LayerGroup();
    topLayerGroup.name = "Top";
        
    var orthoLayerGroup = new L.LayerGroup();
    orthoLayerGroup.name = "Ortho";

    var logNodeLayer  = new L.layerGroup();
    logNodeLayer.name = "Logical Base Layer";
   

     // CREATE GEOGRAPHIC LAYER  =============================================

	var gmap_layer = new L.Google('ROADMAP');
    gmap_layer.name = "Geographical Base Layer";
    var geoNodeLayer = new L.layerGroup();
    var getMarkerLayer1 = new L.layerGroup();
    var getMarkerLayer1   = new L.layerGroup();

    // add existing site nodes

    for (i=0; i< nodes.length; i++)
    {
        var nodeG = L.circle(([nodes[i].nodeGeoLat, nodes[i].nodeGeoLng]), nodeRadius, {color: nodeColor, opacity: nodeOpacity,fillColor: nodeColor, fillOpacity: nodeFillOpacity, tag:i});
       nodeG.bindPopup('Showing live data for site ' +  nodes[i].nodeID +':'+ nodes[i].desc+ '.').on('click', function() {show_chart( nodes[i].nodeID ); });
        nodeG.bindLabel(' ' +  nodes[i].nodeID  +':'+ nodes[i].desc + ' ', { noHide: true });
        nodeG.addTo(geoNodeLayer);
    }

    // add existing markers1

      for (i=0; i< markers1.length; i++)
      {
        var m = L.marker([  nodes[i].nodeGeoLat, nodes[i].nodeGeoLng], {icon: m1Marker, tag:i});
        m.bindPopup('Showing info for site ' +  markers1[i].abbrev +'.').on('dblclick', function() {show_chart(i+1); });
        m.bindLabel('' +markers1[i].abbrev + '', { noHide: true });
        m.addTo(getMarkerLayer1);
      }

        // add existing markers2

      for (i=0; i< markers2.length; i++)
      {
          var id = markers2[i].id;
          var n = L.marker([  nodes[i].nodeGeoLat +m2Hoffset, nodes[i].nodeGeoLng + m2Voffset], {icon: m2Marker, tag:id});
          n.bindPopup('Showing site info for '+ markers2[i].name +'.').on('dblclick', function() {show_chart(i+1); });
          n.bindLabel('' + markers2[i].abbrev + '', {noHide: true  });
          n.addTo(getMarkerLayer1);
      }

        // SET UP MAP =========================================================

		var cloudmadeUrl = 'http://{s}.tile.cloudmade.com/{key}{styleId}/{tileSize}/{zoom}/{x}/{y}.png';
		var	cloudmadeAttribution = 'Map data &copy; 2013 OpenStreetMap contributors, Imagery &copy; 2013 CloudMade';
		var cloudmadeAPIKEY = '61a3946c5d5f47569fb433826be6fff0';
		var cloudmadeStyleID = 22677;
		var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
		var osmAttrib='Map data � OpenStreetMap contributors';
		var demopt = new L.LatLng(60.00000  , -140.00000);
		var geoCenterPoint = new L.LatLng(60.00000  , -140.00000);

		var geoTileLayer  = L.tileLayer(cloudmadeUrl, {
			styleId: cloudmadeStyleID, 
			attribution: cloudmadeAttribution,
			key: cloudmadeAPIKEY,
			detectRetina: true,
			zoom: 4,
			minZoom: 2,
			maxZoom: 20,
			tileSize: 256,
			center: geoCenterPoint
		});
	
		m1LayerGroup.addLayer(getMarkerLayer1);
		m2LayerGroup.addLayer(getMarkerLayer1);

		var map = L.map('map',{
			center: geoCenterPoint,
			zoom: 4,
			minZoom: 2,
			maxZoom: 20,
			layers: [ geoNodeLayer, bestLayerGroup, orthoLayerGroup, topLayerGroup, m1LayerGroup, m2LayerGroup],
			dragging: true,
			doubleClickZoom: false
		});
		
		 
//==============================================================================


		var baseLayers = {
			"Geographic View": gmap_layer,
			//layers
			"GINA Best Data Layer (BDL)": bestLayerGroup,
			"SDMI Orthomosaic (RGB)": orthoLayerGroup,
			"USGS Topographic Charts": topLayerGroup
		};

		var overlays = {
			"First Markers": m1LayerGroup,
			"Second Markers": m2LayerGroup
		};

        // returns e, the layer object
		map.on('baselayerchange', function (e) {
			if (e.layer.name == gmap_layer.name) {
	            map.layers = [nodeLayerGroup, m1LayerGroup, m2LayerGroup];
			}
			else if (e.layer.name == bestLayerGroup.name) {
	            map.layers = [bestLayerGroup, m1LayerGroup, m2LayerGroup];
			}
			else if (e.layer.name == orthoLayerGroup.name) {
	            map.layers = [orthoLayerGroup, m1LayerGroup, m2LayerGroup];
			}
			else if (e.layer.name == topLayerGroup.name) {
	            map.layers = [topLayerGroup, m1LayerGroup, m2LayerGroup];
			}
			
		});

		
		// show static labels .........................STATIC LABELS NOT WORKING
		nodeLayerGroup.eachLayer(function (layer) {
				 layer.showLabel();
		});
		//m1LayerGroup.eachLayer(function (marker) {
		//	marker.showLabel();
		//});
		//m2LayerGroup.eachLayer(function (layer) {
		//		 layer.showLabel();
		//});

		// Edit control functionality........................................
		
		// Initialize the FeatureGroup to store editable layers
		var editableLayers = new L.FeatureGroup();
		map.addLayer(editableLayers);


	
      var layers = Gina.Layers.find('TILE.EPSG::3857.*');
      layers['GINA Best Data Layer (BDL)'].addTo(map);
      L.control.layers(layers, overlays, { collapsed: false }).addTo(map);
    //  	L.control.layers(baseLayers, overlays, {collapsed:false}).addTo(map);
		
		var popup = L.popup();
	
}

// end initmap..................................................................
		
function show_chart(i){ 
	 // jump to chart given name that appears on the layout (e.g. 44)
	// window.location="http://localhost/test/index.php?node=" + i;

}

function getExistingNodes(){
	 var r = new Object();
	 r = getNodeData();
	 return r;
}

function getExistingMarkers1(){
	 var r = new Object();
	  r = getMarkerData1();
	 return r;
}
function getExistingMarkers2(){
	 var r = new Object();
	 r = getMarkerData2();
	 return r;
}

function NodeRec() {
	this.nodeid = 0;
    this.abbrev= 'S1';
    this.desc= 'Site Name';
	this.externalID = 0;
	this.nodeGeoLat = 65.0000000;	
	this.nodeGeoLng = -140.000000;
}
function NodeRec(a1,a2,a3,a4,a5,a6) {
    this.id     =(a1 != undefined) ? a1 : 0;
    this.abbrev =(a2 != undefined) ? a2 : 'abbrev';
    this.desc   =(a3 != undefined) ? a3 : 'desc';
 	this.externalID =(a4 != undefined) ? a4 : 0;
	this.nodeGeoLat =(a5 != undefined) ? a5 : 39.18280500;
	this.nodeGeoLng =(a6 != undefined) ? a6 : -96.57141600;
}
function getNodeData(){
	var r = new Object();
	r = [
		new NodeRec(1,'S1' ,'Barrow, USA	AK'              , 1, 71.112086     , -159.068814  ),
		new NodeRec(2,'S2' ,'Nome,	USA	AK'                  , 2, 64.49345      , -165.185117  ),  
		new NodeRec(3,'S3' ,'Cape Krusenstern,	USA	AK'      , 3, 67.417247     , -163.874239  ),
		new NodeRec(4,'S4' ,'Ikpikpuk River,	USA	AK'      , 4, 71.008386     , -154.683497  ),
		new NodeRec(5,'S5' ,'Colville,	USA	AK'              , 5, 70.559453     , -148.081889  ), 
		new NodeRec(6,'S6' ,'Canning River,	USA	AK'          , 6, 69.945375	    , -145.098153  ),
		new NodeRec(7,'S7' ,'Mackenzie River Delta,	Canada'  , 7, 68.815928     , -137.090836  ),
		new NodeRec(8,'S8' ,'Bylot Island, Canada'           , 8, 73.575061  	 , -78.954106   ),
		new NodeRec(9,'S9' ,'Churchill, Canada'              , 9, 58.770869  	 , -94.160094   )
		];
	 return r;
}

function Marker1Rec() {
    this.id = 1;   
    this.abbrev= 'S1';
    this.name= 'Site 1 Name';
	this.externalID = 0;
	this.nodeid = 0;
}
function Marker1Rec(a1,a2,a3,a4,a5) {
    this.id     =(a1 != undefined) ? a1 : 0;
    this.abbrev =(a2 != undefined) ? a2 : 'abbrev';
    this.name   =(a3 != undefined) ? a3 : 'desc';
	this.externalID =(a4 != undefined) ? a4 : 0;
	this.nodeid   =(a5 != undefined) ? a5 : 0;
}
function getMarkerData1(){
	var r = new Object();
	r = [
		new Marker1Rec( 1,'S1' ,'Barrow, USA	AK'              ,   1,  1),
		new Marker1Rec( 2,'S2' ,'Nome,	USA	AK'                  ,   2,  2),
		new Marker1Rec( 3,'S3' ,'Cape Krusenstern,	USA	AK'      ,   3,  3),
		new Marker1Rec( 4,'S4' ,'Ikpikpuk River,	USA	AK'      ,   4,  4),
		new Marker1Rec( 5,'S5' ,'Colville,	USA	AK'              ,   5,  5), 
		new Marker1Rec( 6,'S6' ,'Canning River,	USA	AK'          ,   6,  6),
		new Marker1Rec( 7,'S7' ,'Mackenzie River Delta,	Canada'  ,   7,  7),
		new Marker1Rec( 8,'S8' ,'Bylot Island, Canada'           ,   8,  8),
		new Marker1Rec( 9,'S9' ,'Churchill, Canada'              ,   9,  9)
		];
	 return r;
}
	
function Marker2Rec() {
    this.id = 1;   
    this.abbrev= 'S1';
    this.name= 'Site 1 Name';
	this.externalID = 0;
	this.nodeid = 0;
}
function Marker2Rec(a1,a2,a3,a4, a5) {
    this.id     =(a1 != undefined) ? a1 : 0;
    this.abbrev =(a2 != undefined) ? a2 : '';
    this.name   =(a3 != undefined) ? a3 : '';
    this.externalID =(a4 != undefined) ? a4 : 0;
	this.nodeid   =(a5 != undefined) ? a5 : 0;
  
}
function getMarkerData2(){
	var r = new Object();
	r = [
		new Marker2Rec( 1,'S1' ,'Barrow, USA	AK'              ,   1,  1),
		new Marker2Rec( 2,'S2' ,'Nome,	USA	AK'                  ,   2,  2),
		new Marker2Rec( 3,'S3' ,'Cape Krusenstern,	USA	AK'      ,   3,  3),
		new Marker2Rec( 4,'S4' ,'Ikpikpuk River,	USA	AK'      ,   4,  4),
		new Marker2Rec( 5,'S5' ,'Colville,	USA	AK'              ,   5,  5),
		new Marker2Rec( 6,'S6' ,'Canning River,	USA	AK'          ,   6,  6),
		new Marker2Rec( 7,'S7' ,'Mackenzie River Delta,	Canada'  ,   7,  7),
		new Marker2Rec( 8,'S8' ,'Bylot Island, Canada'           ,   8,  8),
		new Marker2Rec( 9,'S9' ,'Churchill, Canada'              ,   9,  9)
	];
	return r;

}
function onMapClick(e) {
	// don't delete - the following may be used to get map coordinates. 
	// popup.setLatLng(e.latlng).setContent("You clicked the map at " + e.latlng.toString()).openOn(map);
}
