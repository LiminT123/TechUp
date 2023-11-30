//database related

import pg from "pg";

const db = new pg.Client({
  user: 'postgres',
  host: 'localhost',
  database: 'TrustedSites',
  password: 'TechUp2023',
  port: 5432,
});    

db.connect();

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err.stack);
    } else {
        console.log('Connected to the database');
        // Perform database query here
        db.query("SELECT * FROM trustedsites", (queryErr, res) => {
            if (queryErr) {
                console.error('Error executing query:', queryErr.stack);
            } else {
                let checkResults = res.rows;
                console.log('Query results:', checkResults);
            }
            db.end();
        });
    }
});

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
     let whitelistedUrls = [
         "https://www.a-list.sg",
         "https://www.activehealth.sg",
        "https://www.aperforum.org",
         "https://www.artweek.sg",
      "https://www.aseanlibrary.org",
      "https://www.aseanip.org",
      "https://www.commonspaces.sg",
      "https://www.embracingparenthood.sg",
      "ttps://www.familiesforlife.sg",
      "https://www.forwardsingapore.gov.sg",
      "https://fulcrum.sg",
      "https://www.healthhub.sg",
      "https://www.elitigation.sg",
      "https://www.ibew.sg",
      "https://www.bilingualism.sg",
      "https://www.lumihealth.sg",
      "govlinkchecker.com",
       "https://www.mconline.sg",
      "https://www.myactivesg.com",
      "https://www.ns.sg", 
      "https://www.parforum.sg", 
      "https://www.parking.sg/",
      "https://safesport.sg/",
      "https://www.sentosa.com.sg", 
      "https://www.sg", 
      "https://www.siww.com.sg", 
      "https://www.smw.sg", 
      "https://www.singaporememory.sg", 
      "https://switchsg.org", 
      "https://www.singaporewritersfestival.com/", 
      "https://www.snalearn.org.sg",
      "https://www.sdn.sg", 
      "https://www.sportsync.sg", 
      "https://www.sysnmh.org.sg", 
      "https://www.sleb.sg", 
      "https://www.teamsingapore.sg",
      "https://tradetrust.io",
      "https://www.tal.sg/",
      "https://www.visitsingapore.com",
      "https://www.worldcitiessummit.com.sg",
      "https://www.youthactionplan.sg",
      "https://youthopia.sg",
      "https://www.admiraltymedicalcentre.com.sg",
      "https://www.aic.sg",
      "https://www.ah.com.sg",
      "https://www.ahtc.sg",
      "https://www.amktc.org.sg",
      "https://aseangeospatial.org",
      "https://asmc.asean.org",
      "https://www.asiatechxsg.com",
      "https://www.aas.com.sg",
      "https://www.betterinternet.sg",
      "https://www.btptc.org.sg",
      "https://info.bbdc.sg/",
      "https://www.caretogobeyond.sg",
      "https://ingeus.com.sg",
      "https://www.ccktc.org.sg",
      "https://www.chas.sg",
      "https://www.cosem.org.sg",
      "https://ectc.org.sg",
      "https://www.facsmab.org",
      "https://www.globalfinancialgovernance.org/",
      "https://www.healthcarescholarships.sg/",
      "https://www.hbptc.org.sg",
      "http://www.iali-aiit.org/",
      "https://www.imh.com.sg",
      "https://www.ihis.com.sg",
      "https://www.ipi-singapore.org",
      "https://www.jbtc.org.sg",
      "https://www.jrtc.org.sg",
      "https://www.jch.com.sg",
      "https://www.ktph.com.sg",
      "https://www.kkh.com.sg",
      "https://www.mptc.org.sg",
      "https://www.myttc.org.sg",
      "https://www.mconline.sg",
      "https://www.mohh.com.sg",
      "https://www.moht.com.sg",
      "https://www.moht.com.sg",
      "https://www.ncpg.org.sg",
      "https://www.ncpg.org.sg",
      "https://www.ndcs.com.sg",
      "https://www.nfec.org.sg",
      "https://corp.nhg.com.sg",
      "https://www.nhgp.com.sg",
      "https://www.nhcs.com.sg",
      "https://www.nni.com.sg",
      "https://www.npcc.org.sg",
      "https://www.nsc.com.sg",
      "https://www.ncis.com.sg",
      "https://www.nucohs.com.sg",
      "https://www.nuhs.edu.sg",
      "https://www.nuhcs.com.sg",
      "https://www.nuhs.edu.sg",
      "https://www.nup.com.sg",
      "https://www.ncada.org.sg",
      "https://www.nstc.org.sg",
      "https://www.ntfgh.com.sg/",
      "https://www.prpg-tc.org.sg",
      "https://www.publichygienecouncil.sg",
      "https://rpace.floralms.com",
      "https://www.safesport.sg",
      "https://www.scamalert.sg",
      "https://www.scamshield.org.sg",
      "https://www.sbtc.org.sg",
      "https://www.skh.com.sg",
      "https://www.sktc.sg",
      "https://www.sgenable.sg",
      "https://sce.org.sg",
      "https://www.sfemc.org/",
      "https://www.sgh.com.sg",
      "https://www.siird.com",
      "https://www.snec.com.sg",
      "https://srsc.org.sg",
      "https://ssdcl.com.sg",
      "https://www.sgwomenintech.sg",
      "https://www.singhealth.com.sg",
      "https://www.searado.com",
      "https://ssdcl.com.sg",
      "https://www.tampines.org.sg",
      "https://www.ttsh.com.sg",
      "https://www.tptc.org.sg",
      "https://taxacademy.sg",
      "https://wctc.org.sg",
      "https://www.yri.com.sg",
      "https://www.yishuncommunityhospital.com.sg",

    ]; 

    if (userInput.trim() === "") {
        // Display an error message for empty input
        alert("Please enter a URL before checking.");
        return;
    }

    if (retryButton) {
        retryButton.style.display = "none";
    }

    resultContainer.style.display = "none";
    

    if (
      userInput.includes(".gov.sg") ||
      userInput.includes(".for.sg") ||
      userInput.includes(".for.edu.sg") ||
      whitelistedUrls.some((entry) => userInput.includes(entry))
    ) {
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

