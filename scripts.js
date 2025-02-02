// Array of websites
const websites = [
    {
      name: "Cyber Mania",
      url: "https://www.cybermania.ws",
      description: "It's useful for many cracked software (especially adobe).",
    },
    {
    name: "MAS",
    url: "https://github.com/massgravel/Microsoft-Activation-Scripts",
    description:"It's useful for cracking microsoft products.",
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
  
  // Function to generate the website list
  function generateWebsiteList() {
    const websiteList = document.getElementById("website-list");
  
    // Clear any existing content
    websiteList.innerHTML = "";
  
    // Create a heading
    const heading = document.createElement("h2");
    heading.textContent = "My Favorite Piracy Websites";
    websiteList.appendChild(heading);
  
    // Create a list element
    const list = document.createElement("ul");
  
    // Loop through the websites array and create list items
    websites.forEach((website) => {
      const listItem = document.createElement("li");
  
      // Create a link
      const link = document.createElement("a");
      link.href = website.url;
      link.textContent = website.name;
      link.target = "_blank"; // Open link in a new tab
      link.style.color = "#bb86fc"; 
      link.style.textDecoration = "none";
      link.style.transition = "color 0.3s ease";
  
      // Add hover effect
      link.addEventListener("mouseenter", () => {
        link.style.color = "#9a67ea"; 
      });
      link.addEventListener("mouseleave", () => {
        link.style.color = "#bb86fc";
      });
  
      // Add the link and description to the list item
      listItem.appendChild(link);
      listItem.appendChild(document.createTextNode(` - ${website.description}`));
  
      // Add the list item to the list
      list.appendChild(listItem);
    });
  
    // Add the list to the website list section
    websiteList.appendChild(list);
  }
  
  // Call the function to generate the website list
  generateWebsiteList();