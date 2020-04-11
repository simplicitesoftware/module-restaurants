var RstODSTools = (function() {
	function loadRestaurants(loc) {
		var g = loc.getGrant();
		
		var distance = loc.getFieldValue("rstLocCoordinates").replace(";", ",") + "," + (loc.getField("rstLocExtent").getInt(0)*1609);
	
		var url = "https://public.opendatasoft.com/api/records/1.0/search/?dataset=openstreetmap-pois-usa&geofilter.distance=" + distance + "&rows=1000&facet=amenity&facet=user&facet=timestamp&refine.amenity=restaurant";
		console.log("Calling " +url);
		var data = Tool.readUrl(url);
	
		var rst = g.getTmpObject("RstRestaurant");
		rst.resetFilters();
	
		g.addAccessCreate(rst.getName());
	
		var res = new JSONObject(data);
		var nhits = res.getInt("nhits");
		console.log("Nb hits = " + nhits);
		var records = res.getJSONArray("records");
		for (var i = 0; i < nhits; i++) {
			var fields = records.get(i).getJSONObject("fields");
			console.log(fields.toString());
	
			var name = fields.optString("name", "");
			var tags;
			try { tags = new JSONObject(fields.optString("other_tags", "{}")); } catch (e) { tags = new JSONObject(); }
			var adr = "";
			if (tags.has("addr:street")) adr += (adr != "" ? ", " : "") + tags.getString("addr:street");
			if (tags.has("addr:postcode")) adr += (adr != "" ? ", " : "") + tags.getString("addr:postcode");
			if (tags.has("addr:city")) adr += (adr != "" ? ", " : "") + tags.getString("addr:city");
			if (tags.has("addr:state")) adr += (adr != "" ? ", " : "") + tags.getString("addr:state");
			if (name != "" && adr != "") {
				if (tags.has("addr:housenumber")) adr = tags.getString("addr:housenumber") + ", " + adr;
				var rowId = g.simpleQuery("select row_id from rst_restaurant where rst_name = '" + Tool.toSQL(name) + "'");
				if (Tool.isEmpty(rowId)) {
					rst.setRowId(ObjectField.DEFAULT_ROW_ID);
					rst.resetValues(true);
				} else {
					if (rst.select(rowId))
						console.log("Restaurant row ID = " + rowId);
					else
						console.error("Unable to select row ID = " + rowId)
				}
				rst.setFieldValue("rstRstAddress", adr);
				rst.setFieldValue("rstRstLocId", loc.getRowId());
				rst.setFieldValue("rstRstName", name);
				rst.setFieldValue("rstRstState", tags.optString("addr:state", loc.getFieldValue("rstLocState")));
				rst.setFieldValue("rstRstCuisine", tags.optString("cuisine", "unknown").replaceFirst("[-;, ].*$", "").toLowerCase());
				rst.setFieldValue("rstRstWebSite", tags.optString("website", ""));
				rst.setFieldValue("rstRstTimestamp", fields.get("timestamp").replace("T", " ").replaceFirst("\\+.*$", ""));
				var p = fields.getJSONArray("geo_point_2d");
				rst.setFieldValue("rstRstCoordinates", p.get(0) + ";" + p.get(1));
				var errs = rst.validate();
				if (!errs || errs.size() == 0) {
					var err = rst.save();
					if (err) console.error(err);
				} else {
					for (var k = 0; k < errs.size(); k++)
						console.error(errs.get(k));
				}
			} else {
				console.warning("Ignored record " + name);
			}
		}
	
		loc.getGrant().delAccessCreate(rst.getName());
	};

	return { loadRestaurants: loadRestaurants };
})();
