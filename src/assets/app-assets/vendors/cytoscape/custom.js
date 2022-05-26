var cy = cytoscape({
  container: document.getElementById("cy"), // container to render in

  zoomingEnabled: false,

  elements: [
    {
      // node a
      data: { id: "a" },
    },
    {
      // node b
      data: { id: "b" },
    },
    {
      // edge ab
      data: { id: "ab", source: "a", target: "b" },
    },
    {
      // node a
      data: { id: "a" },
    },
    {
      // node b
      data: { id: "c" },
    },
    {
      // edge ab
      data: { id: "ac", source: "a", target: "c" },
    },
    {
      // node a
      data: { id: "b" },
    },
    {
      // node b
      data: { id: "d" },
    },
    {
      // edge ab
      data: { id: "bb", source: "b", target: "d" },
    },
    {
      // node a
      data: { id: "b" },
    },
    {
      // node b
      data: { id: "e" },
    },
    {
      // edge ab
      data: { id: "be", source: "b", target: "e" },
    },
    {
      // node a
      data: { id: "c" },
    },
    {
      // node b
      data: { id: "f" },
    },
    {
      // edge ab
      data: { id: "cf", source: "c", target: "f" },
    },
    {
      // node a
      data: { id: "c" },
    },
    {
      // node b
      data: { id: "g" },
    },
    {
      // edge ab
      data: { id: "cg", source: "c", target: "g" },
    },
  ],

  style: [
    // the stylesheet for the graph
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(id)",
      },
    },

    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },
  ],

  layout: {
    name: "grid",
    rows: 1,
  },
});
