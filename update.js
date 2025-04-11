// list of all routes to add, const and defined before runtime

const station_list = {

    "11Y": {
        "name": "11Y",
        "gate": "N",
        "route-id": "2004791",
        "route-seq": "2",
        "stop-seq": "10",
        "type": "gmb"
    },

    "11Z": {
        "name": "11Z",
        "gate": "S",
        "route-id": "2004791",
        "route-seq": "1",
        "stop-seq": "7",
        "type": "gmb"
    },

    "11MZ": {
        "name": "11MZ",
        "gate": "N",
        "route-id": "2004825",
        "route-seq": "1",
        "stop-seq": "3",
        "type": "gmb"
    },


    "11SY": {
        "name": "11SY",
        "gate": "N",
        "route-id": "2004826",
        "route-seq": "2",
        "stop-seq": "10",
        "type": "gmb"
    },

    "11SZ": {
        "name": "11SZ",
        "gate": "S",
        "route-id": "2004826",
        "route-seq": "1",
        "stop-seq": "8",
        "type": "gmb"
    },

    "104Y": {
        "name": "104Y",
        "gate": "S",
        "route-id": "2007200",
        "route-seq": "1",
        "stop-seq": "1",
        "type": "gmb"
    },

    "91Z": {
        "name": "91Z",
        "gate": "S",
        "route-id": "91",
        "route-seq": "1",
        "stop-id": "B002CEF0DBC568F5",
        "type": "kmb"

    },

    "91MY": {
        "name": "91MY",
        "gate": "N",
        "route-id": "91M",
        "route-seq": "2",
        "stop-id": "B3E60EE895DBBF06",
        "type": "kmb"

    },

    "91MZ": {
        "name": "91MZ",
        "gate": "S",
        "route-id": "91M",
        "route-seq": "1",
        "stop-id": "B002CEF0DBC568F5",
        "type": "kmb"

    },

    "91PZ": {
        "name": "91PZ",
        "gate": "S",
        "route-id": "91P",
        "route-seq": "1",
        "stop-id": "E9018F8A7E096544",
        "type": "kmb"

    },

    "291PY": {
        "name": "291PY",
        "gate": "S",
        "route-id": "291P",
        "route-seq": "1",
        "stop-id": "E9018F8A7E096544",
        "type": "kmb"

    },

    "792MZ": {
        "name": "792MZ",
        "gate": "N",
        "route-id": "792M",
        "route-seq": "17",
        "stop-id": "003130",
        "type": "ctb"

    }
};

// constantly updated list of routes, type and eta
// can put other things here like images

content = {
    "11Y": {
        url: "",
        type: "gmb",
        content: "--",
    },

    "11Z": {
        url: "",
        type: "gmb",
        content: "--",
    },

    "11MZ": {
        url: "",
        type: "gmb",
        content: "--",
    },


    "11SY": {
        url: "",
        type: "gmb",
        content: "--",
    },

    "11SZ": {
        url: "",
        type: "gmb",
        content: "--",
    },

    "104Y": {
        url: "",
        type: "gmb",
        content: "--",
    },

    "91Z": {
        url: "",
        type: "kmb",
        content: "--",
    },

    "91MY": {
        url: "",
        type: "kmb",
        content: "--",
    },

    "91MZ": {
        url: "",
        type: "kmb",
        content: "--",
    },

    "91PZ": {
        url: "",
        type: "kmb",
        content: "--",
    },

    "291PY": {
        url: "",
        type: "kmb",
        content: "--",
    },

    "792MZ": {
        url: "",
        type: "ctb",
        content: "--",
    },

    "--": {
        url: "",
        type: "--",
        content: "--",
    }
};

// generates URL for each route at initialization, saved in content
async function precalStation(routeList) {
    for (const [stnKey, stnAtt] of Object.entries(routeList)) {
        switch (stnAtt.type) {
            case "gmb":
                content[stnKey].url = `https://data.etagmb.gov.hk/eta/route-stop/${stnAtt["route-id"]}/${stnAtt["route-seq"]}/${stnAtt["stop-seq"]}`;
                break;
            case "kmb":
                content[stnKey].url = `https://data.etabus.gov.hk/v1/transport/kmb/eta/${stnAtt["stop-id"]}/${stnAtt["route-id"]}/${stnAtt["route-seq"]}`;
                break;
            case "ctb":
                content[stnKey].url = `https://rt.data.gov.hk/v2/transport/citybus/eta/ctb/${stnAtt["stop-id"]}/${stnAtt["route-id"]}`;
                break;
        }
    }
}

// list of what layout to use
// each layout consist of 6 slots, each being an array of strings (route number)
// to add cycling, simply have multiple item in a single array (slot)
// to make a certain route show longer, simply repeat its listing.
layoutList = {
    // works on overriding, first element overrides second and so on elements
    // date of week dow : 0 Sun, 1 Mon

    // midnight 2 for 11S -> HAH 0030 dept
    // midnight 1 for 11S -> CHH 0000 dept
    midnight2: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 35],
        endTime: [5, 50],
        layout: {
            S1: ["11SZ"],
            S2: ["--"],
            S3: ["--"],
            N1: ["11SY"],
            N2: ["--"],
            N3: ["--"],
        }
    },
    midnight1: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 5],
        endTime: [5, 50],
        layout: {
            S1: ["11SZ"],
            S2: ["11Z"],
            S3: ["--"],
            N1: ["11SY"],
            N2: ["11MZ"],
            N3: ["11Y"],
        }
    },
    // return peak -> 91P + 291P (lol)
    peak: {
        dow: [1, 2, 3, 4, 5],
        startTime: [17, 0],
        endTime: [18, 0],
        layout: {
            S1: ["91MZ", "91Z"],
            S2: ["91PZ", "291PY"],
            S3: ["11Z", "11Z", "104Y"],
            N1: ["792MZ"],
            N2: ["91MY"],
            N3: ["11MZ", "11Y"],
        }
    },
    // early return peak -> 91P
    earlyPeak: {
        dow: [1, 2, 3, 4, 5],
        startTime: [16, 0],
        endTime: [18, 40],
        layout: {
            S1: ["91MZ", "91Z"],
            S2: ["91PZ"],
            S3: ["11Z", "11Z", "104Y"],
            N1: ["792MZ"],
            N2: ["91MY"],
            N3: ["11MZ", "11Y"],
        }
    },
    // no 104
    normal: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 0],
        endTime: [20, 55],
        layout: {
            S1: ["91MZ"],
            S2: ["91Z"],
            S3: ["11Z", "11Z", "104Y"],
            N1: ["792MZ"],
            N2: ["91MY"],
            N3: ["11MZ", "11Y"],
        }
    },
    // default + fallback
    fullDay: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 0],
        endTime: [23, 59],
        layout: {
            S1: ["91MZ"],
            S2: ["91Z"],
            S3: ["11Z"],
            N1: ["792MZ"],
            N2: ["91MY"],
            N3: ["11MZ", "11Y"],
        }
    }
}

// pull layout out to reduce access depth
layout = {
    S1: [],
    S2: [],
    S3: [],
    N1: [],
    N2: [],
    N3: [],
};

// checks the layout to be used and set layout to it
async function updateLayout() {
    for (const [layoutKey, layoutAtt] of Object.entries(layoutList)) {
        if (layoutAtt.dow.includes(dateDoW)
            && (layoutAtt.startTime[0] < dateHour
                || layoutAtt.startTime[0] == dateHour
                && layoutAtt.startTime[1] <= dateMinute)
            && (layoutAtt.endTime[0] > dateHour
                || layoutAtt.endTime[0] == dateHour
                && layoutAtt.endTime[1] >= dateMinute)
        ) {
            layout = layoutAtt.layout;
            return;
        }
    }
}

// updates display every second using existing data
async function updateDisplay() {
    for (const [layoutKey, rtList] of Object.entries(layout)) {
        const displayTime = 3 // 3 seconds each for flipping displays
        cycleLength = displayTime * rtList.length;
        rtNum = rtList[Math.floor((dateSecond % cycleLength) / displayTime)];

        // short-circuit evaluation, if first condition false everything skipped
        if (rtNum != "" && (content[rtNum].type == "gmb" || content[rtNum].type == "kmb" || content[rtNum].type == "ctb") && (content[rtNum].content != "--") && content[rtNum].content) {
            delta = Date.parse(content[rtNum].content) - currentTime;
            document.getElementById(layoutKey).innerText = (Math.floor(delta / 60000)).toString() + ":" + (Math.floor(delta / 1000) % 60).toString().padStart(2, '0');
            document.getElementById(layoutKey + "Num").innerText = rtNum.slice(0, -1);

        }
        // for "--" rtNum or invalid ETA (content "--")
        else if (rtNum != "") {
            document.getElementById(layoutKey).innerText = content[rtNum].content;
            document.getElementById(layoutKey + "Num").innerText = rtNum;
        }
    }
}
// calls api for layout items every (10 (adjustable)) seconds
async function updateData() {
    for (const [layoutKey, rtList] of Object.entries(layout)) {
        for (var rtNum of rtList) {
            if (rtNum != "") {
                updateStation(rtNum);
            }
        }
    }
}

// takes url and puts eta timestamp into content
async function updateStation(routeNum) {
    if (routeNum == "--") { return; }
    try {
        const response = await fetch(content[routeNum].url);
        if (!response.ok) {
            throw new Error(`Response status: ${response.status}`);
        }
        let data = await response.json();

        routeType = content[routeNum]["type"];
        let etaFieldPath;

        if (routeType === "gmb") {
            etaFieldPath = data["data"]["eta"].map(item => item["timestamp"]);
        } else if (["kmb", "ctb"].includes(routeType)) {
            etaFieldPath = data["data"].map(item => item["eta"]);
        }

        if (etaFieldPath && etaFieldPath.length > 0) {
            for (i = 0; i < 3; ++i) {
                let time_diff = Date.parse(etaFieldPath[i]) - currentTime;
                if (time_diff > 480000 || etaFieldPath.length < (i + 2)) {
                    content[routeNum].content = etaFieldPath[i];
                    return;
                }
            }
            content[routeNum].content = "--"
            return;
        }
    }
    catch (error) {
        console.error(error.message);
        console.log(routeNum);
    }
}

// clock function to get internet time
async function fetchTime(retries = 100, delay = 200) {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            // apis unstable
            let response = await fetch('https://www.timeapi.io/api/timezone/zone?timeZone=Asia%2FHong_Kong', { cache: "no-store" });
            //let response = await fetch('https://worldtimeapi.org/api/timezone/Asia/Hong_Kong', { cache: "no-store" });

            if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
            let data = await response.json();
            return new Date(data.currentLocalTime);
            //return new Date(data.utc_datetime); // Successfully fetched time
        } catch (error) {
            console.error(`Attempt ${attempt} failed:`, error);
            if (attempt < retries) {
                await new Promise(resolve => setTimeout(resolve, delay * attempt)); // Exponential backoff
            } else {
                console.error("All retry attempts failed.");
                return new Date(); // Return local time as fallback
            }
        }
    }
}

// used to determine layout used
dateDoW = -1;
dateHour = -1;
dateMinute = -1;
dateSecond = -1;

// initializes clock
var currentTime;
async function startClock() {
    currentTime = await fetchTime();
    document.getElementById('timeSynced').innerText = "Last synced: " + currentTime.toTimeString().split(' ')[0];
    console.log("Time synced successfully at: " + currentTime.toTimeString().split(' ')[0]);

    function updateClock() {
        currentTime = new Date(currentTime.getTime() + 1000);
        document.getElementById('time').innerText = currentTime.toTimeString().split(' ')[0];

        // update global Day of Week, Hour, and Minute
        dateDoW = currentTime.getDay();
        dateHour = currentTime.getHours();
        if (dateMinute != currentTime.getMinutes()) {
            dateMinute = currentTime.getMinutes();
            updateLayout();
        }
        dateSecond = currentTime.getSeconds();
    }

    // Align first update with the next full second
    let msToNextSecond = 1000 - (currentTime.getMilliseconds());
    setTimeout(() => {
        updateClock(); // First update precisely at the next full second
        setInterval(updateClock, 1000);
        setInterval(updateDisplay, 1000);
        setInterval(updateData, 10000);
    }, msToNextSecond);

    // Resync every hour
    setInterval(async () => {
        console.log("Resyncing clock...");
        currentTime = await fetchTime();
        document.getElementById('timeSynced').innerText = "Last synced: " + currentTime.toTimeString().split(' ')[0];
        console.log("Synced successfully at: " + currentTime.toTimeString().split(' ')[0]);
    }, 60 * 60 * 1000); // 60 minutes * 60 seconds * 1000 ms
}

// initialization
$(document).ready(() => {
    startClock();
    // display started by clock
    precalStation(station_list);
})