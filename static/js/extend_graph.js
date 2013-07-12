function extend_graph(sigInst) {

    var panel = $('#sub-control-panel');
    panel.hide();
    $('#close-panel').click(function(e) {
        e.preventDefault();
        panel.hide();
    });

    var linkContainer = $('#sub-link');
    var selectedNode = '';

    var updateSelected = function(n) {
        selectedNode = n;
        linkContainer.html('<a target="_blank" href="http://reddit.com/r/' + selectedNode.label + '">r/' + selectedNode.label + '</a>');
        panel.show();
    };

    sigInst.bind('upnodes', function(e) {
        updateSelected(sigInst.getNodes(e.content[0]));
    });

    var activateConnectedNodesBox = $('#activate-connected-nodes');
    var hideEdgesBox = $('#hide-edges');
    var hideNodesBox = $('#hide-nodes');

    var showConnectedNodes = false;
    var hideEdges = false;
    var hideNodes = false;

    activateConnectedNodesBox.change(function() {
        if (this.checked) {
            var neighbors = {};
            sigInst.iterEdges(function(e) {

                if(selectedNode.id == e.source || selectedNode.id == e.target) {
                    neighbors[e.source] = 1;
                    neighbors[e.target] = 1;
                }

            }).iterNodes(function(n) {

                if(neighbors[n.id]) {
                    n.active = true;
                }

            }).draw(2,2,2);
        } else {
            sigInst.iterNodes(function(n) {
                if (n.label == currentSearchTerm) return;
                n.active = false
            }).draw(2,2,2);
        }
    });

    hideEdgesBox.change(function() {
        if (this.checked) {
            sigInst.iterEdges(function(e) {
                if (selectedNode.id != e.source && selectedNode.id != e.target) {
                    e.hidden = true;
                }
            }).draw(2,2,2);
        } else {
            sigInst.iterEdges(function(e) {
                e.hidden = false;
            }).draw(2,2,2);
        }
    });

    hideNodesBox.change(function() {
        if (this.checked) {
            var neighbors = {};
            sigInst.iterEdges(function(e) {
                if(selectedNode.id == e.source || selectedNode.id == e.target) {
                    neighbors[e.source] = 1;
                    neighbors[e.target] = 1;
                }

            }).iterNodes(function(n) {

                if(!neighbors[n.id]) {
                    n.hidden = true;
                }

            }).draw(2,2,2);
        } else { 
            sigInst.iterNodes(function(n) {
                n.hidden = false;
            }).draw(2,2,2);
        }
    });

    var currentSearchTerm = '';
    window.searchSubs = function(term) {
        currentSearchTerm = term = term.toLowerCase();

        var found = false;
        sigInst.iterNodes(function(node) {

            if (node.label.toLowerCase() == term) {
                node.active = true;
                updateSelected(node);
            }

        });

        sigInst.position(0,0,1).draw();
    };

    window.clearSearch = function() {
        currentSearchTerm = '';
        sigInst.iterNodes(function(node) {
            node.active = false;
        }).draw(2,2,2);
    };

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
}
