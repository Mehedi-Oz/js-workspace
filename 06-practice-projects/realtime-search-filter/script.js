const users = [
  {
    name: "Liam Carter",
    image: "https://images.unsplash.com/photo-1500534623283-312aade485b7",
    bio: "Frontend developer who loves clean UI and coffee."
  },
  {
    name: "Sophia Bennett",
    image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
    bio: "Photographer who enjoys capturing city life."
  },
  {
    name: "Noah Mitchell",
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    bio: "Fitness enthusiast and weekend hiker."
  },
  {
    name: "Emma Brooks",
    image: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e",
    bio: "Book lover with a passion for writing stories."
  },
  {
    name: "James Walker",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    bio: "Software engineer exploring AI and automation."
  },
  {
    name: "Liam Parker",
    image: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    bio: "Graphic designer inspired by minimalism."
  }
];

const cards = document.querySelector(".cards");
const inputBox = document.querySelector("input");


function createCard(user) {
  const card = document.createElement("div");
  card.classList.add("card");

  const image = document.createElement("img");
  image.classList.add("bg-img");
  image.src = user.image;

  const blurredLayer = document.createElement("div");
  blurredLayer.classList.add("blurred-layer");
  blurredLayer.style.backgroundImage = `url("${user.image}")`;

  const content = document.createElement("div");
  content.classList.add("content");

  const heading = document.createElement("h3");
  heading.textContent = user.name;

  const bio = document.createElement("p");
  bio.textContent = user.bio;

  content.append(heading, bio);
  card.append(image, blurredLayer, content);

  return card;
}

function displayUsers(users) {
  const fragment = document.createDocumentFragment();

  if (users.length === 0) {
    const message = document.createElement("p");
    message.textContent = "No users found.";
    fragment.append(message);
  } else {
    users.forEach((user) => {
      fragment.append(createCard(user));
    });
  }

  cards.replaceChildren(fragment);
}

displayUsers(users);

inputBox.addEventListener("input", () => {
  const searchValue = inputBox.value.trim().toLowerCase();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().startsWith(searchValue)
  );

  displayUsers(filteredUsers);
});
