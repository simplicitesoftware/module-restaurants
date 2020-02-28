RstLocation.preValidate = function() {
	// Geolocate location if needed
	var c = this.getField("rstLocCoordinates");
	if (c.isEmpty()) try {
		c.setValue(GMapTool.geocodeOne(this.getFieldValue("rstLocName") + ", " + this.getFieldValue("rstLocState") + ", United States"));
	} catch (e) {
		return e;
	}
};

// Loads restaurants from ODS
RstLocation.loadRestaurants = function(params) {
	try {
		RstODSTools.loadRestaurants(this);
		return Message.formatSimpleInfo("RST_LOADED");
	} catch(e) {
		return e;
	}
};
