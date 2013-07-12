function init() {
    var sigInst = sigma.init(document.getElementById('sigma-example')).drawingProperties({
        defaultLabelColor: '#fff',
        defaultLabelSize: 14,
        defaultLabelBGColor: '#fff',
        defaultLabelHoverColor: '#000',
        labelThreshold: 6,
        defaultEdgeType: 'curve'
      }).graphProperties({
        minNodeSize: 0.05,
        maxNodeSize: .8,
        minEdgeSize: .09,
        maxEdgeSize: .4
    }).mouseProperties({
        maxRatio: 200
    });

    sigInst.parseGexf('static/data/communities.gexf');
    sigInst.draw();

    sigInst.bind('upnodes', function(e) {
        window.open('http://reddit.com/r/' + sigInst.getNodes(e.content[0]).label, '_blank');
    });

    var currentSearchTerm = '';
    window.searchSubs = function(term) {
        currentSearchTerm = term = term.toLowerCase();

        var found = false;
        sigInst.iterNodes(function(node) {

            if (node.label.toLowerCase() == term) {
                node.active = true;
            }

        });

        sigInst.position(0,0,1).draw();
    };

    window.clearSearch = function() {
        sigInst.iterNodes(function(node) {
            node.active = false;
        });

        sigInst.position(0,0,1).draw();
    };

    sigInst.bind('overnodes', function(e) {
        var nodes = e.content;
        var neighbors = {};
        sigInst.iterEdges(function(edge) {
            if(nodes.indexOf(edge.source) >= 0 || nodes.indexOf(edge.target) >= 0) {
                neighbors[edge.source] = 1;
                neighbors[edge.target] = 1;
            }
        }).iterNodes(function(n) {
            if(neighbors[n.id]) {
                n.active = true;
            }
        }).draw(2,2,2);
    });

    sigInst.bind('outnodes', function(e) {
        sigInst.iterNodes(function(node) {
            if (node.label == currentSearchTerm) return;
            node.active = false
        }).draw(2,2,2);
    });
}

$('#search-graph').bind('keydown', function(e) {
    if (e.which !== 13) return;

    var term = $(e.target).val().toLowerCase();
    if (term.length == 0) return;
    clearSearch();
    searchSubs(term);
});

$('#clear-search').click(function(e) {
    $('#search-graph').val('');
    clearSearch();
});

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
} else {
    window.onload = init;
}
