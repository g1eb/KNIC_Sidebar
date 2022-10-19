import './App.css';
import React from "react";
import Sidebar from './Components/Sidebar';
import '@fontsource/roboto/300.css';
// import GitHubIcon from '@mui/icons-material/GitHub';




export default function App() {
  return (<div className="App" id="outer-container">
    <Sidebar pageWrapId={'page-wrap'} outerContainerId={'outer-container'} />
    <div id="page-wrap">
    
    <h1>Reader Translator Generator (RTG)</h1>
    <h4> Reader Translator Generator (RTG)
    RTG is a neural machine translation toolkit.
    
    This notebook walks you through: Setup of RTG, Preparing a parallel dataset for DE-EN, tokenization, tests etc
    Training Transformer NMT using RTG.
    </h4>

    <body>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
    quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

    Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, 
    vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?
    </body>

    
</div>
</div>

  );
}