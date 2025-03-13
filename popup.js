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

    })
})