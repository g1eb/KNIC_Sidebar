import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import ErrorIcon from '@mui/icons-material/Error';
import {createFakeQR} from './FakeQR.js';

class EasyAskQuestion  {

    constructor(qtext, status) {
        this.qtext = qtext;
        // This somewhat conflates status and color; currently using success/error which are also color themes in MUI
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

// Define these as actual objects at program start so that when they are modified, the modifications stick around
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

export default function EasyAskBox({errorState, stateChanger, displayQuestion}) {
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
