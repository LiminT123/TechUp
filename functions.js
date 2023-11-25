document.getElementById("urlInput").addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        checkURL();
    }
});

function checkURL() {
    let userInput = document.getElementById("urlInput").value;
    let resultContainer = document.querySelector('.result');
    let headerResult = document.getElementById("headerResult");
    let isTrusted = document.getElementById("trustedResult");
    let notTrusted = document.getElementById("notTrustedResult");
    let retryButton = document.getElementById("retryButton");

    if (userInput.trim() === "") {
        // Display an error message for empty input
        alert("Please enter a URL before checking.");
        return;
    }

    if (retryButton) {
        retryButton.style.display = "none";
    }

    resultContainer.style.display = "none";
    

    if (userInput.includes(".gov.sg") || userInput.includes(".for.sg") || userInput.includes(".for.edu.sg")) {
        // Display trusted result
        resultContainer.style.display = "flex";
        headerResult.style.display = "block";
        isTrusted.style.display = "block";
        notTrusted.style.display = "none";
        headerResult.innerHTML = "Result";
        if (retryButton) {
            retryButton.style.display = "block";
        }
        
    } else {
        // Display not trusted result
        resultContainer.style.display = "flex";
        headerResult.style.display = "block";
        isTrusted.style.display = "none";
        notTrusted.style.display = "block";
        headerResult.innerHTML = "Result";

        if (retryButton) {
            retryButton.style.display = "block";
        }
}
}

function clearResults() {
    let resultContainer = document.querySelector('.result');
    let headerResult = document.getElementById("headerResult");
    let isTrusted = document.getElementById("trustedResult");
    let notTrusted = document.getElementById("notTrustedResult");
    let retryButton = document.getElementById("retryButton");

    resultContainer.style.display = "none";
    headerResult.style.display = "none";
    isTrusted.style.display = "none";
    notTrusted.style.display = "none";

    if (retryButton) {
        retryButton.style.display = "none";
    }
}

function retryButtonClick() {
    clearResults();
    document.getElementById("urlInput").value = ""; // Clear the input field
}
    
    function getLastModifiedDate (){
        let lastModified = new Date(document.lastModified);
        let options = {year:'numeric', day:'numeric', month: 'short'};
        return lastModified.toLocaleDateString('en-SG',options);
    }
    document.getElementById('lastUpdated').innerHTML=getLastModifiedDate();
