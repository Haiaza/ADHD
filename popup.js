document.addEventListener('DOMContentLoaded', () => {
    const notePad = document.getElementById('notepad');
    const alarmTime = document.getElementById('alarmTime');
    const alarmMsg = document.getElementById('alarmMsg');
    const setAlarm = document.getElementById('setAlarm');

    // load the notes
    chrome.storage.local.get(['note'], ({ note }) => {
        notePad.value = note ||'';
    });

    // Auto save the notePad
    notePad.addEventListener('input', debounce(() => {
        chrome.storage.local.set({ note: notePad.value });
    }, 300));

    // Set alarm
    setAlarm.addEventListener('click', () => {
        const alarmTimestamp = new Date(alarmTime.value).getTime(); //grab epoch time // value for comparison
        const now = Date.now(); //epoch time  // value for comparison 

        if (alarmTimestamp > now) {
            chrome.alarms.create(`alarm_${alarmTimestamp}`, {
                when: alarmTimestamp,
                periodInMinutes: 0 // one time alarm
            });

            //save alarm details
            chrome.storage.local.get(['alarms'], ({ alarms = [] }) => {
                alarms.push({
                    time: alarmTimestamp,
                    message: alarmMsg.value
                });
                chrome.storage.local.set({ alarms });
            });
        }
    });
});

function debounce(func, timeout = 300) {
    let timer;
    return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
    };
} // logic to throttle user input