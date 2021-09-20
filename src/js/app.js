import '../css/mobile.css';
import '../css/desktop.css';
import Headericon from '../img/logo.png';
import folderImg from '../img/folder.png';

// HEADER AND MENU
const toggleMenu = document.getElementById('btn-menu');
const menuContainer = document.querySelector('.menu-container');
const iconLink = document.getElementById('icon-link');

iconLink.setAttribute('src', `${Headericon}`);

toggleMenu.addEventListener('click', () => {
  menuContainer.classList.toggle('menu-container-active');
  toggleMenu.classList.toggle('is-active');
});

// DIRECTORY
const folderIcon = Array.from(document.querySelectorAll('.folder-icon'));

folderIcon.forEach((el) => {
  el.setAttribute('src', `${folderImg}`);
});

const fakeAPI = './json/sample.simple.json';

const fetchDirectory = async () => {
  try {
    const res = await fetch(fakeAPI);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchDirectory();
});
