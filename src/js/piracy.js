const websites = [
  {
    name: "Cyber Mania",
    url: "https://www.cybermania.ws",
    description: "It's useful for many cracked software (especially adobe).",
  },
  {
    name: "MAS",
    url: "https://github.com/massgravel/Microsoft-Activation-Scripts",
    description: "It's useful for cracking microsoft products.",
  },
  {
    name: "MassGrave",
    url: "https://massgrave.dev",
    description: "All things microsoft.",
  },
  {
    name: "msdl",
    url: "https://msdl.gravesoft.dev/",
    description: "Useful for downloading windows.",
  },
  {
    name: "whd",
    url: "https://github.com/abbodi1406/WHD/tree/master/scripts",
    description: "useful for mainly office scrubber, yoctru(office downloader), yoctri(office installer).",
  },
  {
    name: "Office tools plus",
    url: "https://otp.landian.vip/en-us/",
    description: "Godsend for office related software",
  },
];

function generateWebsiteList() {
  const websiteList = document.getElementById("website-list");
  
  // Clear existing content and set header efficiently
  websiteList.innerHTML = "<h2>My Favorite Piracy Websites</h2>";

  const list = document.createElement("ul");
  const fragment = document.createDocumentFragment();

  websites.forEach((website) => {
    const listItem = document.createElement("li");
    const link = document.createElement("a");
    
    Object.assign(link, {
      href: website.url,
      textContent: website.name,
      target: "_blank"
    });

    Object.assign(link.style, {
      color: "#cba6f7", // updated to match mauve variable
      textDecoration: "none",
      transition: "color 0.3s ease"
    });

    link.addEventListener("mouseenter", () => link.style.color = "#b48ead");
    link.addEventListener("mouseleave", () => link.style.color = "#cba6f7");

    listItem.appendChild(link);
    listItem.appendChild(document.createTextNode(` - ${website.description}`));
    fragment.appendChild(listItem);
  });

  list.appendChild(fragment);
  websiteList.appendChild(list);
}

generateWebsiteList();
