import QueryAndResponse from './QueryAndResponse.js';

// Hard-coded answers to queries
export function getFakeAnswers(qtext) {
    var answers=['This is a placeholder answer for illustration purposes.'];
    if (qtext === "How do I install PyTorch?") {
        answers=['To install PyTorch via Anaconda, use the following conda command: Copy `conda install pytorch torchvision torchaudio -c pytorch`.',
        'To install PyTorch, you have to run the installation command of PyTorch on your command prompt. This command is available on https://pytorch.org/. Select language and cuda version as per your requirement. Now, run python -version, and Conda -version command to check Conda and python packages are installed or not.',
        'rTorch functions to install PyTorch. install_pytorch. This function can be invoked with rTorch::install_pytorch(). This function will allow you to indicate (i) the Python version; (ii) the PyTorch version; (iii) the name of the conda environment; (iv) which channel (stable or nightly); (v) if you require CUDA (GPU) computation; (vi) additional packages such as matplotlib, pandas; (vii) more.',
        ];
    } else if (qtext === "How do I know if PyTorch is installed?") {
        answers=[
        'To make sure PyTorch is installed in your system, just type python3 in your terminal and run it. After that type import torch for use PyTorch library at last type and run print(torch.__version__) it shows which version of PyTorch was installed on your system if PyTorch was installed on your system.',
        'If you are in the Python interpreter or want to use programmingly check PyTorch version, use torch.__version__. Note that if you haven’t import PyTorch, you need to use import torch in the beginning of your Python script or before the print statement below.',
        'import torch\nprint(torch.__version__)'
        ];
    } else if (qtext === "What's next?") {
        answers=['Data preparation / Download datasets'];
    } else if (qtext === "How do I fix this?") {
        answers=["I tried multiple solutions and it wasn't working  I tried this:\npip install torch==1.5.0+cpu -f https://dpt.org/whl/torch_stable.html",
                 "PyTorch 1.10 does not support CUDA 11.5. Lower your CUDA to 11.3.1",
                 "I had the same issue, and what I noticed is that I was using Python 3.8.1 and the latest PyTorch was for Python 3.7. I uninstalled Python 3.8.1 and installed 3.7.6 and voila, it worked!"
                 ];
    } else if (qtext === 'What version of torch do I want?' || qtext === 'What version of pytorch do I want?') {
        answers=["torch 1.12.1+cu113"];
    } else if (qtext === "n/a") {
        return ["n/a"];
    }
    return answers;
}

// Create a QueryAndResponse object with faked answers for a given query text
export function createFakeQR(qtext) {
    return new QueryAndResponse(qtext, getFakeAnswers(qtext));
}


