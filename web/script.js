
		var BreakException = {};

    var arbor = {"nodes":[], "edges":[]};

		function existsNode(id) {
			var val = false;
			try{
				arbor['nodes'].forEach((v)=>{
					if (parseInt(v.data.id) == id){
						val =  true;
						throw BreakException;
					}
				});
			} catch(e){}
			return val;
		}

		function existsEdge(id) {
			var val = false;
			try{
				arbor['edges'].forEach((v)=>{
					if(v.data.id === id)
						val =  true;
						throw BreakException;
				});
			} catch (e) {}
			return val;
		}

    function collatz(n){
			if(existsNode(n)){
				return [n];
			}
      if( n == 1){
        return [n];
      } else {
        return [n].concat(collatz(n%2==0? n/2 : 3*n+1));
      }
    }
    function addToArbor(collatz){
      collatz.forEach((v, i)=>{
        if(!existsNode(v)){
          // console.log("Add node ", v, " with weight ", collatz.length - i);
          arbor.nodes = arbor.nodes.concat({data: {id: v, weight:( collatz.length - i)}});
          if(collatz[i+1]){
            var id = v+'"'+collatz[i+1];
            if(!existsEdge(id)){
              arbor['edges'] = arbor['edges'].concat({data : {'id': id, weight: 0, source: v, target: collatz[i+1]}});
            }
          }
        }
      });
    }

    function showTree(){

      		$(function(){

      			var cy = window.cy = cytoscape({
      				container: document.getElementById('cy'),

              boxSelectionEnabled: false,
              autounselectify: true,

      				layout: {
      					name: 'dagre'
      				},

      				style: [
      					{
      						selector: 'node',
      						style: {
      							'content': 'data(id)',
      							'text-opacity': 0.5,
      							'text-valign': 'center',
      							'text-halign': 'right',
      							'background-color': '#11479e'
      						}
      					},
      					{
      						selector: 'edge',
      						style: {
      							'width': 4,
      							'target-arrow-shape': 'triangle',
      							'line-color': '#9dbaea',
      							'target-arrow-color': '#9dbaea',
      							'curve-style': 'bezier'
      						}
      					}
      				],

      				elements: arbor.valueOf(),
      			});

      		});
    }

    function genTreeFor(n){
      arbor = {"nodes":[], "edges":[]};
       for(var i = n; i >= 1; i--){
    		 var coll = collatz(i);
    		 addToArbor(coll);
    	 }
       showTree();
    }

    genTreeFor(10);
