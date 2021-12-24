// Update the relevant fields with the new data.
const setDOMInfo = (info) => {
  var tbody = document.getElementById("tbody");
  for (var i in info) {
    var tr = "<tr>";
    tr += "<td>" + i + "</td>" + "<td>" + info[i] + "</td></tr>";
    tbody.innerHTML += tr;
  }
};

window.onload = function () {
  document.getElementById("button").onclick = function () {
    var word = document.getElementById("word").value;
    chrome.storage.sync.set({[word] : word});
    alert("Word: " + word + " added successfully");
  };
  document.getElementById("delete-button").onclick = function () {
    var word = document.getElementById("delete-word").value;
    chrome.storage.sync.remove(word);
    alert("Word: " + word + " deleted successfully");
  };
};


window.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query(
    {
      active: true,
      currentWindow: true,
    },
    (tabs) => {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { from: "popup", subject: "DOMInfo" },
        setDOMInfo
      );
    }
  );
});
