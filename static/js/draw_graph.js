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
        minEdgeSize: .05,
        maxEdgeSize: .4
    }).mouseProperties({
        maxRatio: 200
    });

    sigInst.parseGexf('static/data/communities.gexf');
    sigInst.draw();

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
