import './App.css';
import React from "react";
import { useCallback } from "react";
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '@fontsource/roboto/300.css';
import TorchScreenshot from './images/rtg-pytorch.png';
import EasyAskBox from './EasyAskBox.js';
import QueryAndResponse from './QueryAndResponse.js';
import CurrentState from './Context.js';
import {getFakeAnswers, createFakeQR} from './FakeQR.js';

// Contents to the right of the TA-D sidebar, just a static screenshot for now
const PageContents = () => (
  <div style={{padding: "10px"}}>
    <img src={TorchScreenshot} alt="RTG screenshot"/>
  </div>
);

// Tab #0: Main Display Pane

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
        <ContextSpecificQA displayQuestion={displayQuestion}/>
        <CustomSearchField  displayQuestion={displayQuestion}/>
     </Stack>
    );
}

// Sub-portion of Main Display Pane
var q1 = "How do I install PyTorch?";
var q2 = "How do I know if PyTorch is installed?";
var qr1 = new QueryAndResponse(q1, getFakeAnswers(q1));
var qr2 = new QueryAndResponse(q2, getFakeAnswers(q2));
function ContextSpecificQA({displayQuestion}) {
    // considered maxHeight: 400, overflow:'auto' but decided against it, too weird for demo
    return(
      <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
        <div style={{marginBottom: "10px", textAlign: "center"}}>Context-specific Q&A</div>
        {qr1.generateAnswerThumbnail(displayQuestion)}
        {qr2.generateAnswerThumbnail(displayQuestion)}
      </Stack>
    );
}

// Sub-portion of Main Display Pane
function CustomSearchField({displayQuestion}) {

  // Copied from online somewhere in large part
  return(
    <TextField
        type="search"
        variant="outlined"
        margin="normal"
        style={{backgroundColor: 'white'}}
        onKeyPress={(ev) => {
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

// Tab #1: Q&A
function QATab({question_info, stateChangeHandler}) {

    function handleAnswerRemoval() {
        stateChangeHandler();
    }

    return (
        <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400, minHeight: 800}}>
          {question_info.generateAnswerList(handleAnswerRemoval)}
        </Stack>
      );
}

// Tab #2: Query History
function QueryHistoryTab({questionHistory, displayQuestion}) {
return (
  <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400, minHeight: 800}}>
    <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
      {questionHistory.map(qr => qr.generateAnswerThumbnail(displayQuestion))}
    </Stack>
  </Stack>
  );
}

// TAB MASTER: Main Sidebar class
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
        <Tabs value={tabValue} onChange={handleTabChange} centered>
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


export default function App() {

  return (
    <Stack direction="row" spacing={2}>
      <TabMaster />
      <PageContents />
    </Stack>
  );
};
