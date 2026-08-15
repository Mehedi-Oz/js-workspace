"use strict";

const form = document.querySelector("form");
const username = document.querySelector("#name");
const role = document.querySelector("#role");
const bio = document.querySelector("#bio");
const photo = document.querySelector("#photo");
const usersContainer = document.querySelector(".users-container");

const userManager = {
  users: [],

  init: function () {
    form.addEventListener("submit", this.submitForm.bind(this));
    usersContainer.addEventListener("click", this.removeUser.bind(this));
  },

  submitForm: function (e) {
    e.preventDefault();

    this.addUser();
    form.reset();
    this.renderUI();
  },

  addUser: function () {
    this.users.push({
      username: username.value,
      role: role.value,
      bio: bio.value,
      photo: photo.value
    });
  },

  renderUI: function () {
    let cards = "";

    this.users.forEach(function (user, index) {
      cards += `
        <div
          class="user-card bg-white/90 backdrop-blur rounded-2xl shadow-xl p-8 flex flex-col items-center border border-blue-100 hover:scale-105 transition"
          data-index="${index}"
        >
          <img
            class="w-28 h-28 rounded-full object-cover mb-5 border-4 border-blue-200 shadow"
            src="${user.photo}"
            alt="${user.username}"
          >

          <h2 class="text-2xl font-bold mb-1 text-blue-700">
            ${user.username}
          </h2>

          <p class="text-purple-500 mb-2 font-medium">
            ${user.role}
          </p>

          <p class="text-gray-700 text-center">
            ${user.bio}
          </p>
        </div>
      `;
    });

    usersContainer.innerHTML = cards;
  },

  removeUser: function (e) {
    const card = e.target.closest(".user-card");

    if (!card) return;

    const index = Number(card.dataset.index);

    this.users.splice(index, 1);
    this.renderUI();
  }
};

userManager.init();
