function setMaxTime(time) {
    maxTime = time;
}

function setTimeoutCallback(fn) {
    timeoutCallback = fn;
}

function setText(text) {
    message = text;
}

function show(msg) {
    if (shown) {
        if (isAndroid) {
            actInd.message = msg;
            actInd.show();
        } else activity_message.text = msg;
        return;
    }
    msg && (isAndroid ? actInd.message = msg : activity_message.text = msg);
    if (isAndroid) actInd.show(); else {
        ai.show();
        window.open();
    }
    shown = true;
    false !== maxTime && (timeout = setTimeout(function() {
        if (shown) {
            hide();
            timeoutCallback && timeoutCallback();
            timeoutCallback = null;
        }
    }, maxTime));
}

function hide() {
    timeout && clearTimeout(timeout);
    if (!shown) return;
    if (isAndroid) actInd.hide(); else {
        window.close();
        shown = false;
    }
    shown = false;
}

function toggle() {
    actInd.visible ? actInd.hide() : actInd.show();
}

var timeout;

var maxTime = 2e4;

var timeoutCallback;

var shown = false;

var isAndroid = !OS_IOS;

var message = "Loading...";

var actInd;

if (isAndroid) actInd = Ti.UI.Android.createProgressIndicator({
    message: message,
    location: Ti.UI.Android.PROGRESS_INDICATOR_DIALOG,
    type: Ti.UI.Android.PROGRESS_INDICATOR_INDETERMINANT
}); else {
    actInd = Titanium.UI.createActivityIndicator({
        bottom: 50,
        height: 55,
        width: "180",
        height: "auto",
        width: "auto",
        color: "black"
    });
    actInd.style = Ti.UI.iPhone.ActivityIndicatorStyle.PLAIN;
    var window = Ti.UI.createWindow({
        modal: false,
        opacity: 1,
        width: "100%",
        height: "100%",
        naviBarHidden: true
    });
    var toolActIndView = Ti.UI.createView({
        height: Ti.UI.FILL,
        width: Ti.UI.FILL,
        backgroundColor: "transparent",
        opacity: .3
    });
    window.add(toolActIndView);
    var indView = Ti.UI.createView({
        height: "150dp",
        width: "150dp",
        backgroundColor: "#3F444B",
        borderRadius: 10,
        opacity: .8
    });
    var ai = Ti.UI.createActivityIndicator({
        top: "50dp",
        left: "55dp",
        message: "",
        style: Ti.UI.iPhone.ActivityIndicatorStyle.BIG,
        height: "auto",
        width: "auto",
        color: "black"
    });
    indView.add(ai);
    indView.add(actInd);
    window.add(indView);
    var activity_message = Ti.UI.createLabel({
        text: message || "Loading...",
        color: "white",
        width: "auto",
        height: "auto",
        font: {
            fontSize: "16dp",
            fontWeight: "bold"
        },
        bottom: parseInt(Ti.Platform.displayCaps.platformHeight) / 2 - 70 + "dp"
    });
    window.add(activity_message);
}

module.exports.showIndicator = show;

module.exports.hideIndicator = hide;

module.exports.toggle = toggle;

module.exports.setText = setText;

module.exports.setTimeoutCallback = setTimeoutCallback;

module.exports.setMaxTime = setMaxTime;

module.exports.shown = shown;

module.exports.TIME_DEFAULT = 2e4;

module.exports.TIME_SHORT = 5e3;

module.exports.TIME_LONG = 3e4;

module.exports.TIME_INFINITE = false;