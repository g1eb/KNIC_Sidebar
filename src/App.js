import './App.css';
import React from "react";
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
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import '@fontsource/roboto/300.css';

const PageContents = () => (
  <div style={{color: "blueGrey", padding: "10px"}}>
    <p>
      RTG boilerplate goes here
    </p>

  </div>
);

const EasyAskButton = (props) => (
    <Button variant="outlined" color={props.color} key={props.key} style={{color: props.color}} >{props.text}</Button>
);

const EasyAskBoxGreen = () => (
  <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
    <EasyAskButton color='success' key="whatsnext" text={"What's next?"} />
    <EasyAskButton color='success' key="lookright" text={"Does this look right?"} />
    <EasyAskButton color='error' key="problem" text={"I'm having a problem."} />
  </Stack>
);

const EasyAskBoxRed = () => (
  <Stack bgcolor="white" spacing={1} sx={{padding: "10px", borderRadius: '16px'}}>
    <EasyAskButton color='error' key="whatswrong" text={"What's wrong?"} />
    <EasyAskButton color='error' key="fix" text={"How do I fix this?"} />
    <EasyAskButton color='error' key="looklike" text={"What should this look like?"} />
    <EasyAskButton color='success' key="problem" text={"I'm not having any problems."} />
  </Stack>
);

const Question = (props) => (
    <div style={{fontWeight: 'bold'}}>Q: {props.text}</div>
);

const Answer = (props) => (
    <div style={{fontStyle: 'italic'}}>A: {props.text}</div>
);

const QAPair = (props) => (
  <Stack spacing={1}>
    <Question text={props.qtext}/>
    <Answer text={props.atext}/>
  </Stack>
);

const SituationSpecificQA = () => (
<Accordion>
  <AccordionSummary expandIcon={<ExpandMoreIcon />} expanded='true'>
     {"Situation-specific Q&A"}
  </AccordionSummary>
  <AccordionDetails>
  <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
    <QAPair qtext="How do I install PyTorch?" atext="Sample answer"/>
    <QAPair qtext="How do I check if PyTorch is installed?" atext="Sample answer"/>
  </Stack>
  </AccordionDetails>
</Accordion>
);

const QueryHistoryTab = () => (
<Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400}}>
    <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
    <QAPair qtext="I asked this query before" atext="Sample answer"/>
    <QAPair qtext="I also asked this one" atext="Sample answer"/>
  </Stack>
  </Stack>
);

const QAList = (props) => (
  <Stack spacing={1}>
    <Question text={props.qtext}/>
    {props.answers.map(answer => {
        return <Answer text={answer} />;
      })}
  </Stack>
);

const QATab = () => (
    <Stack bgcolor="lightgray" spacing={2} style={{padding: "10px", margin: "10px", width: 400}}>
    <Stack bgcolor="white" spacing={2} style={{padding: "10px", borderRadius: '16px'}}>
        <QAList qtext="Sample query text" answers={['answer #1', 'answer #2']}/>
  </Stack>
  </Stack>
);

const CustomSearchField = () => (
    <TextField
        type="search"
        variant="outlined"
        margin="normal"
        style={{backgroundColor: 'white'}}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon style={{ color: 'black'}}/>
            </InputAdornment>
          )
        }}
    />
);

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
        <CurrentStateItem color='primary' key='dunno' text='node'/>
        <CurrentStateItem color='primary' key='dunno' text='node'/>
        <CurrentStateItem color='primary' key='dunno' text='node'/>
    </Stack>
  </AccordionDetails>
  </Accordion>
);

function TabMaster() {
  const [value, setValue] = React.useState(0);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  return (
  <div>
      <Box centered sx={{alignItems: 'center', width: 400}}>
        <Tabs
          value={value}
          onChange={handleChange}
          centered
        >
          <Tab label="Main" id="simple-tabpanel-0" />
          <Tab label="Q & A" id="simple-tabpanel-1" />
          <Tab label="Query History" id="simple-tabpanel-2" />
        </Tabs>
      </Box>
      <div role="tabpanel" hidden={value !== 0} id={`simple-tabpanel-0`}>
        <Sidebar />
      </div>
      <div role="tabpanel" disabled hidden={value !== 1} id={`simple-tabpanel-1`}>
        <QATab />
      </div>
      <div role="tabpanel" hidden={value !== 2} id={`simple-tabpanel-2`}>
        <QueryHistoryTab />
      </div>
      </div>
  );
}

const Sidebar = () => (

  <Stack bgcolor="lightgray" spacing={2} className="Sidebar" style={{padding: "10px", margin: "10px", width: 400}}>
        <CurrentState />
        <EasyAskBoxGreen />
        <EasyAskBoxRed />
        <SituationSpecificQA />
        <CustomSearchField />
  </Stack>
);

export default function App() {

  return (
    <Stack direction="row" spacing={2}>
      <TabMaster />
      <PageContents />
    </Stack>
  );
};
