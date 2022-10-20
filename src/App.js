import './App.css';
import React from "react";
import { useCallback } from "react";
import Stack from '@mui/material/Stack';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Box from '@mui/material/Box';
//import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
// import ErrorIcon from '@mui/icons-material/Error';
//import CancelIcon from '@mui/icons-material/Cancel';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '@fontsource/roboto/300.css';
import TokenizeScreenshot from './images/rtg-tokenize.png'

const PageContents = () => (
  <div style={{padding: "10px"}}>
    <img src={TokenizeScreenshot} alt="RTG screenshot"/>
  </div>
);

function EasyAskButton ({color, key, text, displayQuestion}) {
return(
    <Button variant="outlined" color={color} key={key} style={{color: color}} onClick={() => displayQuestion(text)}>{text}</Button>
    );
}

function ChangeStateButton ({color, key, text, onClick}) {
return(
    <Button variant="outlined" color={color} key="changestate" style={{color: color}} onClick={onClick}>{text}</Button>
    );
}

function EasyAskBox({errorState, stateChanger, displayQuestion}) {
if (errorState) {
return(
  <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
    <EasyAskButton color='error' key="whatswrong" text={"What's wrong?"} displayQuestion={displayQuestion}/>
    <EasyAskButton color='error' key="fix" text={"How do I fix this?"} displayQuestion={displayQuestion}/>
    <EasyAskButton color='error' key="looklike" text={"What should this look like?"} displayQuestion={displayQuestion}/>
    <ChangeStateButton color='success' text={"I'm not having any problems."} onClick={() => stateChanger(0)} />
  </Stack>
  );
} else {
return (
  <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
    <EasyAskButton color='success' key="whatsnext" text={"What's next?"} displayQuestion={displayQuestion}/>
    <EasyAskButton color='success' key="lookright" text={"Does this look right?"} displayQuestion={displayQuestion}/>
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

function QAPair({qtext, atext, displayQuestion}) {

    var shortText = atext
    if (atext.length >= 100) {
        shortText = atext.substring(0, 100) + "..."
    }

    return (
      <Stack direction='row' spacing={1} justifyContent='space-between'>
      <Stack spacing={1}>
        <Question text={qtext}/>
        <Answer text={shortText}/>
      </Stack>
      <Button variant="outlined" onClick={() => displayQuestion(qtext)}><ZoomInIcon /></Button>
      </Stack>
    );
}

function SituationSpecificQA({displayQuestion}) {

return(
  <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
    <div style={{marginBottom: "10px", textAlign: "center"}}>Situation-specific Q&A</div>
    <QAPair qtext="How do I install PyTorch?" atext="Sample answer that is much longer than the other one so that we can test the cut off at 100 characters."
    displayQuestion={displayQuestion}/>
    <QAPair qtext="How do I check if PyTorch is installed?" atext="Sample answer" displayQuestion={displayQuestion}/>
  </Stack>
);
}

function QueryHistoryTab({questionHistory, displayQuestion}) {

return (
  <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400}}>
    <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
    {questionHistory.map(qr => <QAPair qtext={qr.qtext} atext={qr.getFirstAnswer()} displayQuestion={displayQuestion}/>)}
  </Stack>
  </Stack>
  );
}

const QAList = (props) => (
  <Stack spacing={1}>
    <Question text={props.qtext}/>
    {props.answers.map(answer => {
        return <Answer text={answer} />;
      })}
  </Stack>
);

// for now, question_info is just the question text!

function getFakeAnswers(qtext) {
    var answers=['answer #1', 'answer #2']
    if (qtext === "How do I install PyTorch?") {
        answers=['hardcoded answer #1', 'hardcoded answer #2', 'hardcoded answer #3']
    } else if (qtext === "n/a") {
        return ["n/a"]
    }
    return answers;
}


class QueryAndResponse {
    constructor(qtext) {
        this.qtext = qtext;
        this.answers = getFakeAnswers(qtext);
    }

    getFirstAnswer() {
        return this.answers[0];
    }

    matches(other) {
        // for now just compare question equality
        return (this.qtext === other.qtext);
    }
}

function QATab({question_info}) {

    return (
        <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400}}>
        <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
            <QAList qtext={question_info.qtext} answers={question_info.answers}/>
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
            displayQuestion(ev.target.value);
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

// TODO Replace CurrentStateItem with something better!

const CurrentStateItem = (props) => (
    <Button variant="outlined" color={props.color} key={props.key} style={{color: props.color}} >{props.text}</Button>
);

const CurrentState = () => (
  <Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
     Current State
  </AccordionSummary>
  <AccordionDetails>
    <Stack bgcolor="white" spacing={1} style={{padding: "10px", borderRadius: '16px'}}>
        <CurrentStateItem color='primary' key='dunno1' text='node'/>
        <CurrentStateItem color='primary' key='dunno2' text='node'/>
        <CurrentStateItem color='primary' key='dunno3' text='node'/>
    </Stack>
  </AccordionDetails>
  </Accordion>
);

function TabMaster() {
  const [tabValue, setTabValue] = React.useState(0);
  const [questionInfo, setQIValue] = React.useState(new QueryAndResponse('n/a'));
  const [questionHistory, setQHValue] = React.useState([]);

  function handleTabChange(event, newValue) {
    setTabValue(newValue);
  }

  function displayQuestion(qtext) {
    setTabValue(1); // 1 is just the hard-coded value of the Q & A pane
    var qr = new QueryAndResponse(qtext);
    setQIValue(qr);
    var seenAlready = false;
    questionHistory.forEach(function (item, index) {
        if (qr.matches(item)) {
            seenAlready = true;
        }
    });
    if (!seenAlready) {
        questionHistory.unshift(qr);
    }
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
        <QATab question_info={questionInfo}/>
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
     <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400}}>
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
