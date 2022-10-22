import './App.css';
import React from "react";
import { useCallback } from "react";
import Stack from '@mui/material/Stack';
//import Grid from '@mui/material/Grid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Dialog from '@mui/material/Dialog';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import ErrorIcon from '@mui/icons-material/Error';
//import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import AddIcon from '@mui/icons-material/Add';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Slider from '@mui/material/Slider';
import '@fontsource/roboto/300.css';
import TokenizeScreenshot from './images/rtg-tokenize.png'
import NodeGraph from './NodeGraph.js';
import {NodeGraphKey} from './NodeGraph.js';

const PageContents = () => (
  <div style={{padding: "10px"}}>
    <img src={TokenizeScreenshot} alt="RTG screenshot"/>
  </div>
);


class QueryAndResponse {
    constructor(qtext, answers) {
        this.qtext = qtext;
        this.answers = answers;
    }

    removeAnswer(index, handleAnswerRemoval) {
        console.log("I want to remove index #" + index)
        this.answers.splice(index, 1);
        console.log(this.answers.length);
        handleAnswerRemoval();
    }

    getFirstAnswer() {
        if (this.answers) {
            return this.answers[0];
        } else {
            return "";
        }
    }

    generateAnswerThumbnail(displayQuestion) {

        var shortText = this.getFirstAnswer()
        if (shortText && shortText.length >= 100) {
            shortText = shortText.substring(0, 100) + "..."
        }

        // ButtonGroup makes the single button not get mega tall
        return (
          <Stack direction='row' spacing={1} justifyContent='space-between'>
          <Stack spacing={1}>
            <Question text={this.qtext}/>
            <Answer text={shortText}/>
          </Stack>
          <ButtonGroup orientation='vertical'>
          <Button variant="outlined" onClick={() => displayQuestion(this)}><ZoomInIcon /></Button>
          </ButtonGroup>
          </Stack>
        );
    }

    generateAnswerList(handleAnswerRemoval) {
        console.log("generating the answer list, with answer length " + this.answers.length);
        return (
          <Stack spacing={1}>
            <Question text={this.qtext}/>
            {this.answers.map((answer, index) => {
                return <FullAnswer text={answer} removeHandler={() => this.removeAnswer(index, handleAnswerRemoval)}/>;
              })}
          </Stack>
        );
    }

    matches(other) {
        // for now just compare question equality
        return (this.qtext === other.qtext);
    }
}


class EasyAskQuestion  {

    constructor(qtext, status) {
        this.qtext = qtext;
        this.status = status;
        this.qr = createFakeQR(qtext);
    }

    createButton(displayQuestion) {
        return(
            <Button variant="outlined" color={this.status} key={this.qtext}
            style={{color: this.status}}
            onClick={() => displayQuestion(this.qr)}>{this.qtext}</Button>
        );

    }
}

const easyAskQuestions = [
    new EasyAskQuestion("What's next?", "success"),
    new EasyAskQuestion("Does this look right?", "success"),
    new EasyAskQuestion("What's wrong?", "error"),
    new EasyAskQuestion("How do I fix this?", "error"),
    new EasyAskQuestion("What should this look like?", "error")
]

function ChangeStateButton ({color, key, text, onClick}) {
return(
    <Button variant="contained" color={color} key="changestate" style={{color: color}} onClick={onClick}>{text}</Button>
    );
}

function EasyAskBox({errorState, stateChanger, displayQuestion}) {
    if (errorState) {
        const buttons = easyAskQuestions.filter(eaq => eaq.status === 'error');
        return(
          <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
            <Stack alignItems="center"><ErrorIcon /></Stack>
            {buttons.map(eaq => eaq.createButton(displayQuestion))}
            <ChangeStateButton color='success' text={"I'm not having any problems."} onClick={() => stateChanger(0)} />
          </Stack>
          );
    } else {
        const buttons = easyAskQuestions.filter(eaq => eaq.status === 'success');
        return (
          <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
            {buttons.map(eaq => eaq.createButton(displayQuestion))}
            <ChangeStateButton color='error' text={"I'm having a problem."} onClick={() => stateChanger(1)}/>
          </Stack>
          );
     }
}

const Question = (props) => (
    <div style={{fontWeight: 'bold'}}>Q: {props.text}</div>
);

const Answer = (props) => (
    <div style={{fontStyle: 'italic'}}>A: {props.text}</div>
);

// X button is not implemented :)
const FullAnswer = (props) => (
<Stack direction='row' spacing={1} justifyContent='space-between'>
    <Answer text={props.text} />
    <ButtonGroup orientation='vertical'>
    <Button variant="outlined" color="error" onClick={props.removeHandler}><HighlightOffIcon/></Button>
    <Button variant="outlined"><QuestionMarkIcon/></Button>
    <Button variant="outlined"><ManageSearchIcon/></Button>
    </ButtonGroup>
  </Stack>
);

function QueryHistoryTab({questionHistory, displayQuestion}) {
return (
  <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400, minHeight: 800}}>
    <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
    {questionHistory.map(qr => qr.generateAnswerThumbnail(displayQuestion))}
  </Stack>
  </Stack>
  );
}

// for now, question_info is just the question text!

function getFakeAnswers(qtext) {
    var answers=['answer #1', 'answer #2']
    if (qtext === "How do I install PyTorch?") {
        answers=['Open Anaconda manager and run the command as it specified in the installation instructions. Copy `conda install pytorch torchvision torchaudio cpuonly -c pytorch`.',
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        'Venenatis tellus in metus vulputate eu scelerisque. Penatibus et magnis dis parturient montes. Scelerisque in dictum non consectetur a. Morbi leo urna molestie at elementum eu facilisis. Lectus sit amet est placerat in egestas. Purus sit amet luctus venenatis lectus magna fringilla urna porttitor. Nisl rhoncus mattis rhoncus urna neque viverra justo nec. Dignissim cras tincidunt lobortis feugiat vivamus. Elit duis tristique sollicitudin nibh sit. Id diam maecenas ultricies mi eget mauris pharetra et. At augue eget arcu dictum varius duis at consectetur. Est ante in nibh mauris cursus mattis molestie a. Nisl nunc mi ipsum faucibus. Aliquet enim tortor at auctor urna nunc. Vitae proin sagittis nisl rhoncus mattis rhoncus urna neque. Lacus vel facilisis volutpat est.']
    } else if (qtext === "n/a") {
        return ["n/a"]
    }
    return answers;
}

function createFakeQR(qtext) {
    return new QueryAndResponse(qtext, getFakeAnswers(qtext));
}



var q1 = "How do I install PyTorch?";
var q2 = "How do I know if PyTorch is installed?";
var qr1 = new QueryAndResponse(q1, getFakeAnswers(q1));
var qr2 = new QueryAndResponse(q2, getFakeAnswers(q2));
function SituationSpecificQA({displayQuestion}) {


    // considered maxHeight: 400, overflow:'auto'
    return(
      <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
        <div style={{marginBottom: "10px", textAlign: "center"}}>Situation-specific Q&A</div>
        {qr1.generateAnswerThumbnail(displayQuestion)}
        {qr2.generateAnswerThumbnail(displayQuestion)}
      </Stack>
    );
}

function QATab({question_info, stateChangeHandler}) {

    function handleAnswerRemoval() {
        stateChangeHandler();
    }

    return (
        <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400, minHeight: 800}}>
        <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
        {question_info.generateAnswerList(handleAnswerRemoval)}

      </Stack>
      </Stack>
      );
}

function CustomSearchField({displayQuestion}) {

return(
    <TextField
        type="search"
        variant="outlined"
        margin="normal"
        style={{backgroundColor: 'white'}}
        onKeyPress={(ev) => {
        console.log(`Pressed keyCode ${ev.key}`);
          if (ev.key === 'Enter') {
            displayQuestion(createFakeQR(ev.target.value));
            ev.target.value="";
          }
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: 'black'}}/>
            </InputAdornment>
          )
        }}
    />
    );
}

// TODO make these smaller


class IndexNode {
    constructor(node_name, score) {
        this.node_name = node_name;
        this.score = score;
    }

    displayIndexNode(removeHandler, index) {

        return (
            <Stack direction='row' spacing={1} justifyContent='space-between'>
                <Stack sx={{width: 200}}>
                <div>{this.node_name}</div>
                <Slider defaultValue={this.score} step={1} marks min={0} max={5}/>
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

var nodeList = [
    new IndexNode("RTG", 5),
    new IndexNode("Python", 4),
    new IndexNode("tokenize parallel data", 3),
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


// TODO: Add "add" functionality
function CurrentState() {
    const [helper, setHelperValue] = React.useState(0);

    function handleNodeRemoval(index) {
        nodeList.splice(index, 1);
        setHelperValue(helper + 1);
    }

    return (
      <Accordion>
      <AccordionSummary expandIcon={<ExpandMoreIcon />}>
         Current State
      </AccordionSummary>
      <AccordionDetails>
        <Stack>
          {nodeList.map((indexNode, index) => indexNode.displayIndexNode(handleNodeRemoval, index))}
          <Stack alignItems="center" mt={1}><NodeGraphDialog icon={returnAddIcon}/></Stack>
        </Stack>
      </AccordionDetails>
      </Accordion>
  );
}

function TabMaster() {
  const [tabValue, setTabValue] = React.useState(0);
  const [questionInfo, setQIValue] = React.useState(new QueryAndResponse('n/a', getFakeAnswers('n/a')));
  const [questionState, setQuestionState] = React.useState(0);
  const [questionHistory, setQHValue] = React.useState([]);


  function handleTabChange(event, newValue) {
    setTabValue(newValue);
  }

  function handleQuestionStateChange() {
    setQuestionState(questionState + 1);
  }

  function displayQuestion(qr) {
    setTabValue(1); // 1 is just the hard-coded value of the Q & A pane
    setQIValue(qr);
    var seenAlready = -1;
    questionHistory.forEach(function (item, index) {
        if (qr.matches(item)) {
            seenAlready = index;
        }
    });
    if (seenAlready >= 0) {
        // Remove it so we can put it at the top of the list
        questionHistory.splice(seenAlready, 1);
    }
    questionHistory.unshift(qr);
    setQHValue(questionHistory);
  }

  return (
  <div>
      <Box centered sx={{alignItems: 'center', width: 400}}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          centered
        >
          <Tab label="Main" id="simple-tabpanel-0" />
          <Tab label="Q & A" id="simple-tabpanel-1" />
          <Tab label="Query History" id="simple-tabpanel-2" />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={tabValue !== 0} id={`simple-tabpanel-0`}>
        <MainDisplayPane displayQuestion={displayQuestion}/>
      </div>
      <div role="tabpanel" hidden={tabValue !== 1} id={`simple-tabpanel-1`}>
        <QATab question_info={questionInfo} stateChangeHandler={handleQuestionStateChange}/>
      </div>
      <div role="tabpanel" hidden={tabValue !== 2} id={`simple-tabpanel-2`}>
        <QueryHistoryTab questionHistory={questionHistory} displayQuestion={displayQuestion}/>
      </div>
      </div>
  );
}

function MainDisplayPane({displayQuestion}) {
    const [errorState, setErrorState] = React.useState(0);

    // make wrapper function to give child
    const wrapperSetErrorState = useCallback(val => {
        setErrorState(val);
    }, [setErrorState]);

    return (
     <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400, minHeight: 800}}>
        <CurrentState />
        <EasyAskBox errorState={errorState} stateChanger={wrapperSetErrorState} displayQuestion={displayQuestion}/>
        <SituationSpecificQA displayQuestion={displayQuestion}/>
        <CustomSearchField  displayQuestion={displayQuestion}/>
     </Stack>
    );
}

export default function App() {

  return (
    <Stack direction="row" spacing={2}>
      <TabMaster />
      <PageContents />
    </Stack>
  );
};
