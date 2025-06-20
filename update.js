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
        isSouth: false,
        content: ["--", "--"],
    },

    "11Z": {
        url: "",
        type: "gmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "11MZ": {
        url: "",
        type: "gmb",
        isSouth: false,
        content: ["--", "--"],
    },


    "11SY": {
        url: "",
        type: "gmb",
        isSouth: false,
        content: ["--", "--"],
    },

    "11SZ": {
        url: "",
        type: "gmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "104Y": {
        url: "",
        type: "gmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "91Z": {
        url: "",
        type: "kmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "91MY": {
        url: "",
        type: "kmb",
        isSouth: false,
        content: ["--", "--"],
    },

    "91MZ": {
        url: "",
        type: "kmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "91PZ": {
        url: "",
        type: "kmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "291PY": {
        url: "",
        type: "kmb",
        isSouth: true,
        content: ["--", "--"],
    },

    "792MZ": {
        url: "",
        type: "ctb",
        isSouth: false,
        content: ["--", "--"],
    },

    "--": {
        url: "",
        type: "--",
        content: ["--", "--"],
    }
};

// generates URL for each route at initialization, saved in content
async function precalStation(routeList) {
    for (const [stnKey, stnAtt] of Object.entries(routeList)) {
        switch (stnAtt.type) {
            case "gmb":
                content[stnKey].url = `http://localhost:3000/proxy?url=https://data.etagmb.gov.hk/eta/route-stop/${stnAtt["route-id"]}/${stnAtt["route-seq"]}/${stnAtt["stop-seq"]}`;
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
        endTime: [5, 30],
        layout: [
            ["11SZ"],
            ["--"],
            ["--"],
            ["11SY"],
            ["--"],
            ["--"]]
    },
    midnight1: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 5],
        endTime: [5, 30],
        layout: [
            ["11SZ"],
            ["11Z"],
            ["--"],
            ["11SY"],
            ["11MZ"],
            ["11Y"],
        ]
    },
    // return peak -> 91P + 291P (lol)
    peak: {
        dow: [1, 2, 3, 4, 5],
        startTime: [17, 0],
        endTime: [18, 0],
        layout: [
            ["91MZ", "91Z"],
            ["91PZ", "291PY"],
            ["11Z", "11Z", "104Y"],
            ["792MZ"],
            ["91MY"],
            ["11MZ", "11Y"],
        ]
    },
    // early return peak -> 91P
    earlyPeak: {
        dow: [1, 2, 3, 4, 5],
        startTime: [16, 0],
        endTime: [18, 20],
        layout: [
            ["91MZ", "91Z"],
            ["91PZ"],
            ["11Z", "11Z", "104Y"],
            ["792MZ"],
            ["91MY"],
            ["11MZ", "11Y"],
        ]
    },
    // no 104
    normal: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 0],
        endTime: [20, 55],
        layout: [
            ["91MZ"],
            ["91Z"],
            ["11Z", "11Z", "104Y"],
            ["792MZ"],
            ["91MY"],
            ["11MZ", "11Y"],
        ]
    },
    // default + fallback
    fullDay: {
        dow: [-1, 0, 1, 2, 3, 4, 5, 6],
        startTime: [0, 0],
        endTime: [23, 59],
        layout: [
            ["91MZ"],
            ["91Z"],
            ["11Z"],
            ["792MZ"],
            ["91MY"],
            ["11MZ", "11Y"],
        ]
    }
}

// pull layout out to reduce access depth
layout = [
    [],
    [],
    [],
    [],
    [],
    [],
];

// html elements
const htmlElements = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
    [null, null, null],
];

function precalElements(elements) {
    for (let i = 0; i < elements.length; ++i) {
        for (let j = 0; j < elements[i].length; ++j) {
            elements[i][j] = document.getElementById('D' + i.toString() + j.toString());
        }
    }
}

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

// Helper function to set display value and color
function setElem(id, value, color) {
    const elem = document.getElementById(id);
    if (elem) {
        elem.innerText = value;
        elem.style.color = color;
    }
}

// updates display every second using existing data
function updateDisplay() {
    const displayTime = 3 // 3 seconds each for flipping displays, choose factors of 60
    const updates = []; // array to hold updates for all elements

    // --updateTime logic--
    currentTime = new Date();
    updates.push([document.getElementById('time'), currentTime.toTimeString().split(' ')[0], undefined]); // undefined means don't change color

    // update global Day of Week, Hour, and Minute

    // disable 91P for now
    // dateDoW = currentTime.getDay();

    dateHour = currentTime.getHours();
    if (dateMinute != currentTime.getMinutes()) {
        dateMinute = currentTime.getMinutes();
        updateLayout();
    }
    dateSecond = currentTime.getSeconds();

    for (i = 0; i < layout.length; ++i) {
        const cycleLength = displayTime * layout[i].length;
        const rtNum = layout[i][Math.floor((dateSecond % cycleLength) / displayTime)];

        // first exit condition: null ETA
        if (rtNum == "--") {
            updates.push([document.getElementById('N' + i), "--", "rgb(150,150,150)"]);
            updates.push([document.getElementById('D' + i + '0'), "--", "rgb(150,150,150)"]);
            updates.push([document.getElementById('D' + i + '1'), "--", "rgb(150,150,150)"]);
            continue;
        }

        if (rtNum == "")
            continue; // skip broken data

        if (!["gmb", "kmb", "ctb"].includes(content[rtNum].type)) {
            continue; // skip non-ETA data, can add new types here
        }

        if (!content[rtNum].content)
            continue; // skip broken data

        for (let j = 0; j < 2; ++j) {
            if (content[rtNum].content[j] && content[rtNum].content[j] != "--") {
                const delta = Date.parse(content[rtNum].content[j]) - currentTime;
                if (delta > 0) {
                    colorDelta = delta - (content[rtNum].isSouth ? 780000 : 600000);
                    const r = Math.min(Math.max(375 - colorDelta / 2400, 0), 255);
                    const g = Math.max(Math.min(colorDelta / 2400, 255), 0);
                    updates.push([
                        document.getElementById('D' + i + j),
                        Math.floor(delta / 60000).toString(),
                        `rgb(${r},${g},0)`
                    ]);
                }
                else {
                    updates.push([document.getElementById('D' + i + j), "--", "rgb(150,150,150)"]);
                }
            }
            else {
                updates.push([document.getElementById('D' + i + j), "--", "rgb(150,150,150)"]);
            }
        }
        // ensure route number goes back to black after being set to grey at midnight
        updates.push([document.getElementById('N' + i), rtNum.slice(0, -1), "black"]);
        continue;
    }
    // not handling non-ETA in this function
    //if (rtNum != "") {
    //    document.getElementById(layoutKey + "_0").innerText = content[rtNum].content[0];
    //    document.getElementById(layoutKey + "_1").innerText = content[rtNum].content[1];
    //    document.getElementById(layoutKey + "Num").innerText = rtNum;
    //}

    // Apply all updates at once
    for (const [elem, value, color] of updates) {
        if (elem) {
            elem.innerText = value;
            elem.style.color = color;
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
    setTimeout(updateData, 10000);
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

        const routeType = content[routeNum]["type"];
        let etaRetList;

        if (routeType === "gmb") {
            etaRetList = data["data"]["eta"].map(item => item["timestamp"]);
        } else if (routeType === "kmb") {
            etaRetList = data["data"].map(item => item["eta"]);
        } else { // if (routeType === "ctb") {
            etaRetList = data["data"]
                .filter(item => item["dir"] === "I") // fuck CTB using North gate for both directions
                .map(item => item["eta"]);
        }

        if (!etaRetList || etaRetList.length < 0)
            return;
        content[routeNum].content[0] = "--";
        content[routeNum].content[1] = "--";
        for (let i = 0; i < etaRetList.length; ++i) {
            let time_diff = Date.parse(etaRetList[i]) - currentTime;
            if (time_diff > (content[routeNum].isSouth ? 780_000 : 600_000)) {
                content[routeNum].content[0] = etaRetList[i];
                // if there is another ETA
                if (etaRetList.length - i > 1)
                    content[routeNum].content[1] = etaRetList[i + 1];
                return;
            }
        }

    }
    catch (error) {
        console.error(error.message);
        console.log(routeNum);
    }
}

// used to determine layout used
dateDoW = -1;
dateHour = -1;
dateMinute = -1;
dateSecond = -1;

let elemTimeSynced = null;
let elemTime = null;

async function syncTime() {
    try {
        const response = await fetch('http://localhost:3000/sync-time');
        const data = await response.json();
        console.log(data.message, data.output);
        currentTime = new Date();
        elemTimeSynced.innerText = "Last synced: " + currentTime.toTimeString().split(' ')[0];
    } catch (error) {
        console.error('Failed to sync time:', error);
    }
    setTimeout(syncTime, 3600000);
}

// initialization
$(document).ready(() => {
    // display started by clock
    elemTimeSynced = document.getElementById('timeSynced');
    elemTime = document.getElementById('time');
    precalStation(station_list);
    precalElements(htmlElements);
    syncTime();
    setInterval(updateDisplay, 1000);
    updateData();
})
