// keep the lights on when the browser/ext isnt in use etc... 

chrome.alarms.onAlarm.addListener((alarm) => {
    chrome.storage.local.get(['alarms'], ({ alarms = [] }) => {
        const matchedAlarm = alarms.find(a => `alarm_${a.time}` === alarm.name);
        if (matchedAlarm) {
            chrome.notifications.create({
                type: 'basic',
                iconUrl: 'icon.png',
                title: 'ADHD Alarm',
                message: matchedAlarm.message
            });
        }
    });
});