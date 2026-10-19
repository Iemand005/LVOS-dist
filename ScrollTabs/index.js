

const tabs = new TabScroller(document.body, true);

tabs.addTab(document.createTextNode("hqy!"), "First");
tabs.addTab(document.createTextNode("Yarr!"), "second");
// tabs.addTab();

document.body.appendChild(tabs.container);