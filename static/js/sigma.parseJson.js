// Scott Hale (Oxford Internet Institute)
// Requires sigma.js and jquery to be loaded
// based on parseGexf from Mathieu Jacomy @ Sciences Po Médialab & WebAtlas
sigma.publicPrototype.parseJson = function(jsonPath,callback) {
	var sigmaInstance = this;
	var edgeId = 0;
	jQuery.getJSON(jsonPath, function(data) {
        console.log(data);
        console.log(data.nodes[0]);
        console.log(data.links[0]);
		for (i=0; i<data.nodes.length; i++){
			var id=data.nodes[i].id;
			//window.NODE = data.nodes[i];//In the original, but not sure purpose
			sigmaInstance.addNode(i,data.nodes[i]);
		}
		for(j=0; j<data.links.length; j++){
			var edgeNode = data.links[j];

			var source = edgeNode.source;
			var target = edgeNode.target;

			sigmaInstance.addEdge(edgeId++,source,target,edgeNode);
		}
		if (callback) callback.call(this);//Trigger the data ready function
	});//end jquery getJSON function
};//end sigma.parseJson function
