/** 
 *  Autogenerated, do not modify this file directly
 * 
 *  Copyright (c) 2011 University of Alaska. All rights reserved.
 * 
 *  Developed by: Will Fisher and Scott Macfarlane
 *                Geographic Information Network of Alaska
 *                University of Alaska Fairbanks
 *                http://www.gina.alaska.edu
 * 
 *  Permission is hereby granted, free of charge, to any person obtaining
 *  a copy of this software and associated documentation files (the
 *  'Software'), to deal in the Software without restriction, including
 *  without limitation the rights to use, copy, modify, merge, publish,
 *  distribute, sublicense, and/or sell copies of the Software, and to
 *  permit persons to whom the Software is furnished to do so, subject to
 *  the following conditions:
 * 
 *  The above copyright notice and this permission notice shall be
 *  included in all copies or substantial portions of the Software.
 * 
 *  THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND,
 *  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 *  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
 *  IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY
 *  CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT,
 *  TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE
 *  SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 **/

// Generated by CoffeeScript 1.7.1
(function() {
  this.Gina = (function() {
    function Gina() {}

    return Gina;

  })();

  this.Gina.Layers = (function() {
    function Layers() {}

    Layers.return_by_name = true;

    Layers.tile_layer = function(tilejson) {
      return console.log('This should be reimplemented by the appropriate adapter!');
    };

    Layers.define = function(name, tilejson) {
      return Gina.Definitions.define(name, tilejson);
    };

    Layers.find = function(partial_name, return_by_name) {
      if (return_by_name == null) {
        return_by_name = Layers.return_by_name;
      }
      if (return_by_name) {
        return Layers.find_with_name(partial_name);
      } else {
        return Layers.find_without_name(partial_name);
      }
    };

    Layers.find_without_name = function(partial_name) {
      var layer, layers, _i, _len, _ref;
      layers = [];
      _ref = Gina.Definitions.find(partial_name);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        layers.push(Layers.tile_layer(layer));
      }
      return layers;
    };

    Layers.find_with_name = function(partial_name) {
      var layer, layers, _i, _len, _ref;
      layers = {};
      _ref = Gina.Definitions.find(partial_name);
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        layer = _ref[_i];
        layers[layer.name] = Layers.tile_layer(layer);
      }
      return layers;
    };

    Layers.get = function(layer_name) {
      return Layers.tile_layer(Gina.Definitions.get(layer_name));
    };

    return Layers;

  })();

  this.Gina.Definitions = (function() {
    function Definitions() {}

    Definitions.defs = {};

    Definitions.get = function(layer_name) {
      if (layer_name.match(/\*/)) {
        return Definitions.find(layer_name);
      } else {
        return Definitions.defs[layer_name];
      }
    };

    Definitions.find = function(partial_name) {
      var layers, name, regexp, tilejson, _ref;
      layers = [];
      regexp = new RegExp(partial_name.replace(/\./g, '\\.').replace('*', '[^\\s]*'));
      _ref = Definitions.defs;
      for (name in _ref) {
        tilejson = _ref[name];
        if (name.match(regexp)) {
          layers.push(tilejson);
        }
      }
      return layers;
    };

    Definitions.define = function(name, tilejson) {
      return Definitions.defs[name] = tilejson;
    };

    return Definitions;

  })();

}).call(this);
// Generated by CoffeeScript 1.7.1
(function() {
  Gina.Layers.tile_layer = function(tilejson) {
    return L.tileLayer(tilejson['tiles'][0], {
      tilejson: tilejson
    });
  };

}).call(this);
/** 
 *  Autogenerated, do not modify this file directly
 **/

Gina.Layers.define('TILE.EPSG::3857.BDL', {
  "tilejson": "2.1.0",
  "name": "GINA Best Data Layer (BDL)",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/bdl/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
  "center": [64.86, -147.849],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.LANDSAT', {
  "tilejson": "2.1.0",
  "name": "Panchromatic Landsat",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/landsat_pan/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
  "center": [64.86, -147.849],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.NOAA_CHARTS', {
  "tilejson": "2.1.0",
  "name": "NOAA Nautical Charts",
  "description": "Not for navigation!",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/charts/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
//  "center": [],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.ORTHO_RGB', {
  "tilejson": "2.1.0",
  "name": "SDMI Orthomosaic (RGB)",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tiles/SPOT5.SDMI.ORTHO_RGB/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
//  "center": [],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.OSM', {
  "tilejson": "2.1.0",
  "name": "Open Street Maps",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://openstreetmap.org'>OSM contributors</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/bdl/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
//  "center": [],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.SHADED_RELIEF', {
  "tilejson": "2.1.0",
  "name": "Shaded Relief",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/shaded_relief_ned/tile/{x}/{y}/{z}.png"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
//  "center": [],
  "bounds": [-180, -90, 180, 90]
});
Gina.Layers.define('TILE.EPSG::3857.TOPO', {
  "tilejson": "2.1.0",
  "name": "USGS Topographic Charts",
  "description": "",
  "version": "1.0.0",
  "attribution": "<a href='http://www.gina.alaska.edu'>Geographic Information Network of Alaska</a>",
//  "template": "",
//  "legend": "",
  "scheme": "xyz",
  "tiles": [
    "http://tiles.gina.alaska.edu/tilesrv/drg/tile/{x}/{y}/{z}"
  ],
//  "grids": [
//    
//  ],
// "data": [
//  ],
  "minzoom": 0,
  "maxzoom": 18,
  "center": [64.86, -147.849],
  "bounds": [-180, -90, 180, 90]
});