RstComments.postLoad = function() {
	if (!this.getGrant().hasResponsibility("RST_PUBLIC")) {
		// These fields are only writeable by public profile
		this.getField("rstCmtEmail").setUpdatable(false);
		this.getField("rstCmtRstId").setUpdatable(false);
		this.getField("rstCmtComments").setUpdatable(false);
		this.getField("rstCmtEval").setUpdatable(false);
		var f = this.getField("rstCmtSentiment", false);
		if (f) f.setUpdatable(false);
	} else {	
		// Hide moderated comments
		this.setDefaultSearchSpec(this.getField("rstCmtVisible").getColumn() + " = '" + Tool.TRUE + "'")
	}
};

RstComments.preValidate = function() {
	var evl = this.getField("rstCmtEval");
	if (evl.isEmpty()) {
		var s, e = -1;
		// Calculate evaluation based on the sentiment if provided
		var f = this.getField("rstCmtSentiment", false);
	    if (f && !f.isEmpty()) {
	    	console.log("Sentiment:" + f.getValue());
	    	s = f.getInt(0);
	    	e = Math.round((Math.min(Math.max(s, -5), 5) + 5) * 4 / 10) * 25;
	    	console.log("Calculated evaluation from sentiment " + s + " = " + e);
	    } else {
			// Or calculate evaluation based on Watson tone categories if provided
		    f = this.getField("rstCmtTones", false);
			if (f && !f.isEmpty()) {
			   	var tcs = new JSONArray(f.getValue());
			   	for (var i = 0; i < tcs.length(); i++) {
			   		var tc = tcs.get(i);
			   		if (tc.getString("category_id") == "emotion_tone") {
				   		var ts = tc.getJSONArray("tones");
		   			   	for (var j = 0; j < ts.length(); j++) {
		   			   		var t = ts.get(j);
					   		if (t.getString("tone_id") == "joy") {
					   			s = t.getDouble("score");
					   			e = Math.round(s*100/25 + 1) * 25;
						    	console.log("Calculated evaluation from Watson tone categories " + s + " = " + e);
					   		}
						}
			   		}
			   	}
		    }
	    }
		if (e >= 0) evl.setValue(e + "");
	}
};

RstComments.postSave = function() {
	// Update restaurant stats using SQL for efficiency
	this.getGrant().update("update rst_restaurant a set a.rst_nbcomments = (select count(*) from rst_comments b where a.row_id = b.cmt_rst_id) where a.row_id = " + this.getFieldValue("rstCmtRstId"));
	this.getGrant().update("update rst_restaurant a set a.rst_rating = (select avg(cast(cmt_eval as decimal(11, 0))) from rst_comments b where a.row_id = b.cmt_rst_id) where a.row_id = " + this.getFieldValue("rstCmtRstId"));
};