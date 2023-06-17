let cardLayout = document.querySelector(".layout-container");
let loadMoreButton = document.getElementById("loadButton");
let initialItems = 0;
let loadItems = 4;

function fetchDataAndDisplay(container) {
  fetch("./data.json")
    .then((response) => response.json())
    .then((data) => {
      const remainingItems = data.length - initialItems;

      if (remainingItems <= 0) {
        loadMoreButton.style.display = "none";
        return;
      }

      const itemsToLoad = Math.min(remainingItems, loadItems);
      const nextItems = data.slice(initialItems, initialItems + itemsToLoad);
      initialItems += itemsToLoad;

      // Loop through each object in the JSON data
      nextItems.forEach((obj) => {
        // Create the card container element
        const cardContainer = document.createElement("div");
        cardContainer.className = "card-container";

        // Create the name and likes container element
        const nameLikesContainer = document.createElement("div");
        nameLikesContainer.className = "name-likes";

        // Create the name and likes container element
        const profileNameContainer = document.createElement("div");
        profileNameContainer.className = "profile-name";

        // Create the name and likes container element
        const heartLikesContainer = document.createElement("div");
        heartLikesContainer.className = "heart-likes";

        // Create the image element
        const image = document.createElement("img");
        image.className = "image";
        image.src = obj.image;

        // Create the caption element
        const caption = document.createElement("div");
        caption.className = "caption";
        caption.textContent = obj.caption;

        // Create the source type element
        const sourceType = document.createElement("div");
        sourceType.className = "source_type";
        sourceType.textContent = obj.source_type;

        // Create the likes element
        const likes = document.createElement("div");
        likes.className = "likes";
        likes.textContent = obj.likes;

        // Create the name element
        const name = document.createElement("div");
        name.className = "name";
        name.textContent = obj.name;

        // Create the date element
        const date = document.createElement("div");
        date.className = "date";
        date.textContent = obj.date;

        // Create the profile image element
        const profileImage = document.createElement("div");
        profileImage.className = "profile_image";
        profileImage.style.backgroundImage = `url(${obj.profile_image})`;

        // Create the heart image element
        const heartImage = document.createElement("img");
        heartImage.className = "likes-icon";
        heartImage.src = "./icons/heart.svg";
        heartImage.alt = "Heart";

        // Append the name and likes elements to the nameLikesContainer
        nameLikesContainer.appendChild(profileNameContainer);
        nameLikesContainer.appendChild(heartLikesContainer);

        // Append the name and likes elements to the nameLikesContainer
        profileNameContainer.appendChild(profileImage);
        profileNameContainer.appendChild(name);

        // Append the name and likes elements to the nameLikesContainer
        heartLikesContainer.appendChild(heartImage);
        heartLikesContainer.appendChild(likes);

        // Create the social media icon element
        let socialMedia = "";
        if (obj.source_type === "facebook") {
          socialMedia =
            '<img class="icon" src="./icons/facebooklogo.png" alt="Facebook">';
        } else if (obj.source_type === "instagram") {
          socialMedia =
            '<img class="icon" src="./icons/instalogo.png" alt="Instagram">';
        }

        // Set the innerHTML of the source type element
        sourceType.innerHTML = socialMedia;

        // Append all the elements to the card container
        cardContainer.appendChild(image);
        // cardContainer.appendChild(caption);
        cardContainer.appendChild(sourceType);
        cardContainer.appendChild(nameLikesContainer);
        // cardContainer.appendChild(date);

        // Append the card container to the layout container
        container.appendChild(cardContainer);

        //click heart and increment or decrement number of likes

        const heartIcon = cardContainer.querySelector(".likes-icon");
        const likesCount = cardContainer.querySelector(".likes");

        heartIcon.addEventListener("click", () => {
          heartIcon.classList.toggle("clickedHeart");

          //incrementing likes
          if (heartIcon.classList.contains("clickedHeart")) {
            likesCount.innerText = parseInt(likesCount.innerText) + 1;
          } else {
            likesCount.innerText = parseInt(likesCount.innerText) - 1;
          }

          console.log("Heart clicked");
        });

        if (initialItems >= data.length) {
          loadMoreButton.style.display = "none";
        }

        // Create the lightbox element
        const lightbox = document.getElementById("lightbox");
        const lightboxImage = document.getElementById("lightbox-image");
        const lightboxClose = document.querySelector(".lightbox-close");
        const lightboxProfile= document.getElementById("lightbox-profile_image");
        const lightboxName= document.getElementById("lightbox-name");
        const lightboxCaption= document.getElementById("lightbox-caption");
        const lightboxHeart= document.getElementById("lightbox-heart");
        const lightboxLikes= document.getElementById("lightbox-likes");

        // Add event listeners to each image
        image.addEventListener("click", () => {
          // Show the lightbox with the clicked image
          lightbox.style.display = "block";
          lightboxImage.src = obj.image;
          lightboxCaption.textContent = obj.caption;
          lightboxProfile.src=obj.profile_image;
          lightboxName.textContent=obj.name;
          lightboxHeart.src="./icons/heart.svg";
          lightboxLikes.textContent=obj.likes;
        });

        // Close the lightbox when the close button is clicked
        lightboxClose.addEventListener("click", () => {
          lightbox.style.display = "none";

        });
      });
    })
    .catch((error) => console.log(error));
}

loadMoreButton.addEventListener("click", () => {
  fetchDataAndDisplay(cardLayout);
});

// Call the function and pass the container element as an argument
const container = document.querySelector(".layout-container");
fetchDataAndDisplay(container);

const myCheckbox = document.getElementById("darkModeCheckbox");
const body = document.body;
const cards = document.querySelectorAll(".card");

myCheckbox.addEventListener("change", function () {
  if (myCheckbox.checked) {
    console.log("Dark mode");
    body.style.backgroundColor = "black";
    cards.forEach((card) => {
      card.classList.add("dark-mode");
      card.style.backgroundColor = "";
      card.style.color = "white";

      // Change heart image source to dark mode icon
      const heartImage = card.querySelector(".likes-icon");
      heartImage.setAttribute("src", "./icons/heart-darkMode.png");
    });
  } else {
    console.log("Light mode");
    body.style.backgroundColor = "";
    cards.forEach((card) => {
      card.classList.remove("dark-mode");
      card.style.backgroundColor = "";
      card.style.color = "black";

      // Change heart image source back to default icon
      const heartImage = card.querySelector(".likes-icon");
      heartImage.setAttribute("src", "./icons/heart.svg");
    });
  }
});
