const installButton = document.getElementById("Install");

function saveBeforeInstallPromptEvent(evt) {
  deferredInstallPrompt = evt;
  installButton.removeAttribute("hidden");
}

function logAppInstalled(evt) {
  console.log("Weather App was installed.", evt);
}

function handleEvent(evt) {
  switch (evt.type) {
    case "beforeinstallprompt":
      saveBeforeInstallPromptEvent(evt);
      break;
    case "appinstalled":
      logAppInstalled(evt);
      break;
  }
}

async function installPWA(evt) {
  deferredInstallPrompt.prompt();
  evt.srcElement.setAttribute("hidden", false);
  const choice = await deferredInstallPrompt.userChoice;
  if (choice.outcome === "accepted") {
    console.log("User accepted the A2HS prompt", choice);
  } else {
    console.log("User dismissed the A2HS prompt", choice);
  }
  deferredInstallPrompt = null;
}

installButton.addEventListener("click", installPWA);
window.addEventListener("beforeinstallprompt", handleEvent);
window.addEventListener("appinstalled", handleEvent);