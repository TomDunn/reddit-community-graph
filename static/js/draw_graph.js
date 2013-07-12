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
    extend_graph(sigInst);
}

if (document.addEventListener) {
    document.addEventListener("DOMContentLoaded", init, false);
} else {
    window.onload = init;
}
