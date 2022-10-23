import React from "react";
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import AddIcon from '@mui/icons-material/Add';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import NodeGraph from './NodeGraph.js';
import {NodeGraphKey} from './NodeGraph.js';

class IndexNode {
    constructor(node_name, score) {
        this.node_name = node_name;
        this.score = score;
    }

    // Considered a slider that could be adjustable, but I don't think the user will want to do this
    // <Slider defaultValue={this.score} step={1} marks min={0} max={5}/>
    displayIndexNode(removeHandler, index) {

        // This uses a div around the second button solely to make it line up with the button in the NodeGraphDialog
        return (
            <Stack direction='row' spacing={1} justifyContent='space-between'>
                <Stack sx={{width: 200}} spacing={1}>
                  <div>{this.node_name}</div>
                  <LinearProgress variant="determinate" color='success' value={this.score} sx={{height: '8px'}}/>
                </Stack>
                <Stack direction='row' alignItems='center'>
                  <ButtonGroup>
                    <NodeGraphDialog icon={returnManageSearchIcon}/>
                    <div>
                      <Button variant="outlined" color="error" onClick={removeHandler}><HighlightOffIcon/></Button>
                    </div>
                  </ButtonGroup>
                </Stack>
              </Stack>
        );
    }
}

// Hard-coded list of nodes in our context
var nodeList = [
    new IndexNode("RTG", 100),
    new IndexNode("Python", 80),
    new IndexNode("environment validation", 80),
    new IndexNode("validate torch install", 60),
];

function fullNodeGraphDisplay() {
    return (
      <Stack alignItems="center" >
            <NodeGraph />
            <NodeGraphKey />
      </Stack>
    );
}

function NodeGraphDialog({icon}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>{icon()}</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        fullScreen
        style={{padding: "50px", width: 600}}
      >
      {fullNodeGraphDisplay()}
      </Dialog>
    </div>
  );
}

function returnAddIcon() {
return (<AddIcon />);
}

function returnManageSearchIcon() {
return (<ManageSearchIcon />);
}

export default function CurrentState() {
    const [helper, setHelperValue] = React.useState(0);

    function handleNodeRemoval(index) {
        nodeList.splice(index, 1);
        setHelperValue(helper + 1);
    }

    return (
      <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
             Context
          </AccordionSummary>
          <AccordionDetails>
            <Stack spacing={3}>
                <Stack spacing={1}>
                  {nodeList.map((indexNode, index) => indexNode.displayIndexNode(handleNodeRemoval, index))}
                </Stack>
                <Stack alignItems="center"><NodeGraphDialog icon={returnAddIcon}/></Stack>
            </Stack>
          </AccordionDetails>
      </Accordion>
  );
}
