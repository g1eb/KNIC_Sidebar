import React, { useRef, useEffect } from "react";
import ForceGraph2D from "react-force-graph-2d";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';

var data = {
  nodes: [{ id: "Python" , "group": "concept"},
          { id: "RTG", "group": "task" },
          { id: "download parallel data", "group": "task" },
          { id: "download dataset", "group": "task" },
          { id: "tokenize parallel data", "group": "task" },
          ],
  links: [
    { source: "Python", target: "tokenize parallel data", label: "related"},
    { source: "download dataset", target: "download parallel data", label: "includes"},
    { source: "RTG", target: "download parallel data", label: "includes"},
    { source: "RTG", target: "tokenize parallel data", label: "includes"},
    { source: "download parallel data", target: "tokenize parallel data", label: "precedes"},
  ]
};

function getNodeColor(node) {
if (node["group"] === "concept") {
    return "indigo";
} else {
    return "#00bcd4";
}
}

function getLinkColor(link) {
if (link["label"] === "related") {
    return "#03a9f4";
} else if (link["label"] === "includes") {
    return "pink";
} else if (link["label"] === "precedes") {
    return "#009688";
} else {
    return "brown";}
}

export function NodeGraphKey() {
    return (
        <Stack alignItems="center" spacing={1}>
        <div style={{fontWeight: 'bold'}}>Key</div>
        <Stack direction='row' spacing={1}>
          <Stack alignItems="center" spacing={1}>
          <div style={{fontStyle: 'italic'}}>Relations</div>
          <Box textAlign='center' sx={{backgroundColor: '#03a9f4', color:'white', width: 100}}>related</Box>
          <Box textAlign='center' sx={{backgroundColor: 'pink', color:'white', width: 100}}>includes</Box>
          <Box textAlign='center' sx={{backgroundColor: '#009688', color:'white', width: 100}}>precedes</Box>
          </Stack>
          <Stack alignItems="center" spacing={1}>
          <div style={{fontStyle: 'italic'}}>Nodes</div>
          <Box textAlign='center' sx={{backgroundColor: 'indigo', color:'white', width: 100}}>concept</Box>
          <Box textAlign='center' sx={{backgroundColor: '#00bcd4', color:'white', width: 100}}>task or state</Box>
          </Stack>
        </Stack>
        </Stack>
    );
}

//cooldownTicks={100}
//onEngineStop={() => forceRef.current.zoomToFit(0,50)}

CanvasRenderingContext2D.prototype.roundRect = function (x, y, width, height, radius) {
  if (width < 2 * radius) radius = width / 2;
  if (height < 2 * radius) radius = height / 2;
  this.beginPath();
  this.moveTo(x + radius, y);
  this.arcTo(x + width, y, x + width, y + height, radius);
  this.arcTo(x + width, y + height, x, y + height, radius);
  this.arcTo(x, y + height, x, y, radius);
  this.arcTo(x, y, x + width, y, radius);
  this.closePath();
  return this;
}



export function NodeGraph() {
  const forceRef = useRef(null);
  useEffect(() => {
    forceRef.current.d3Force("charge").strength(-400);
  });
  return (
    <ForceGraph2D
      graphData={data}
      nodeLabel="id"
      showNavInfo={true}
      enablePointerInteraction={true}
      linkDirectionalArrowLength={5}
      linkDirectionalArrowRelPos={0.5}
      linkLabel="label"
      linkWidth={3}
      width={600}
      height={600}
      linkColor={(link) => getLinkColor(link)}
      ref={forceRef}
      nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.id;
            const fontSize = 18/globalScale;
            ctx.font = `${fontSize}px Sans-Serif`;
            const textWidth = ctx.measureText(label).width;
            const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * .5); // some padding

            ctx.fillStyle = getNodeColor(node);
            ctx.roundRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions, 5);
            ctx.fill()

            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillStyle = 'white';
            ctx.fillText(label, node.x, node.y);

            node.__bckgDimensions = bckgDimensions; // to re-use in nodePointerAreaPaint
      }}
      nodePointerAreaPaint={(node, color, ctx) => {
        ctx.fillStyle = color;
        const bckgDimensions = node.__bckgDimensions;
        bckgDimensions && ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
      }}


    />
  );
}

export default NodeGraph;