const themes = {
  light: {
    body: ["bg-white", "text-black"],
    toast: ["bg-gray-100", "text-black"]
  },

  dark: {
    body: ["bg-gray-900", "text-white"],
    toast: ["bg-gray-800", "text-white"]
  }
};

function createToaster({
  positionX = "left",
  positionY = "top",
  theme = "light",
  duration = 3
} = {}) {

  const parent = document.querySelector(".parent");

  if (!parent) {
    throw new Error('Element ".parent" not found.');
  }

  // Position
  parent.classList.remove(
    "left-5",
    "right-5",
    "top-5",
    "bottom-5"
  );

  parent.classList.add(
    positionX === "right" ? "right-5" : "left-5",
    positionY === "bottom" ? "bottom-5" : "top-5"
  );

  // Get theme
  const currentTheme = themes[theme] ?? themes.light;

  // Body theme
  document.body.classList.remove(
    ...themes.light.body,
    ...themes.dark.body
  );

  document.body.classList.add(
    ...currentTheme.body
  );

  return function toaster(message) {

    const toast = document.createElement("div");

    toast.textContent = message;

    toast.classList.add(
      "px-6",
      "py-3",
      "rounded",
      "shadow-lg",
      "pointer-events-none",
      ...currentTheme.toast
    );

    parent.append(toast);

    setTimeout(() => {
      toast.remove();
    }, duration * 1000);
  };
}

const toaster = createToaster({
  positionX: "right",
  positionY: "bottom",
  theme: "dark",
  duration: 5
});

toaster("Hello World!");

setTimeout(() => {
  toaster("Check Github Repo.");
}, 2000);

setTimeout(() => {
  toaster("Testing JavaScript.");
}, 3000);
