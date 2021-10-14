window.addEventListener("load", init);

function init(){
  // declare variables
  declareGlobals();

  // set theme switch button event
  themeSwitchBtn.addEventListener("click", switchTheme);

  // set theme button events
  for(i = 0; i < themeButtons.length; i++){
    themeButtons[i].addEventListener(
      "click",
      (ev) => {
        setTheme(ev.target.getAttribute("data-value"), getCurrentTheme());
      }
    )
  }
}

function declareGlobals(){
  window.themeSwitchBtn = document.querySelector(".themeSwitch");
  window.themeList = ["lightTheme", "darkTheme"];
  window.themeButtons = document.querySelectorAll(".themeAction");
  setThemeImageReferences();
  return;
}

function switchTheme(){
  setTheme( chooseNextTheme(getCurrentTheme()) , getCurrentTheme());
}

function getCurrentTheme(){
  let currentTheme = document.body.getAttribute("data-theme");
  return currentTheme;
}
function chooseNextTheme(theme){
  //get index of current theme
  let fn = (val) => val == theme;
  let nexttheme;
  let i = themeList.findIndex(fn)
  if (i != -1){
    let noOfthemes = themeList.length;
    nexttheme = ((i + 1) == noOfthemes) ? 0 : i+1;
  }else{
    nexttheme = 0;
  }
  return themeList[nexttheme];
}

function setTheme(theme, previousTheme = false){
  if(previousTheme !== false){
    removeActiveThemeImage(previousTheme);
  }
  document.body.setAttribute("data-theme", theme);
  setActiveThemeImage(theme);
  return
}

function setThemeImageReferences(){
  window.themeImagesReference = {};

  let _tempImages = document.querySelectorAll(".themeImage");
  for(i = 0; i < _tempImages.length; i++){
    let key = _tempImages[i].getAttribute("data-theme-image");
    themeImagesReference[key] = _tempImages[i];
  }
  return;
}

function removeActiveThemeImage(theme){
  themeImagesReference[theme].classList.remove("themeImage--active");
  return;
}

function setActiveThemeImage(theme){
  themeImagesReference[theme].classList.add("themeImage--active");
  return;
}