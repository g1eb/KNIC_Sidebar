import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Stack from '@mui/material/Stack';
import ZoomInIcon from '@mui/icons-material/ZoomIn';
import ManageSearchIcon from '@mui/icons-material/ManageSearch';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Very simple question display
const Question = (props) => (
    <div style={{fontWeight: 'bold'}}>Q: {props.text}</div>
);

// Very simple answer display, allow newlines via pre-wrap
const Answer = (props) => (
    <div style={{fontStyle: 'italic', whiteSpace:'pre-wrap'}}>A: {props.text}</div>
);

// Full answer display (for Q&A tab)
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

// Class to hold a query and its responses. Maintains state! Answers can be deleted.
export default class QueryAndResponse {
    constructor(qtext, answers) {
        this.qtext = qtext;
        this.answers = answers;
    }

    removeAnswer(index, handleAnswerRemoval) {
        this.answers.splice(index, 1);
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
        return (
          <Stack bgcolor="white" spacing={3} style={{padding: "10px", borderRadius: '16px'}}>
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
