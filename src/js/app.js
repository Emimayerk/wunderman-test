import '../css/mobile.css';
import '../css/desktop.css';
import Headericon from '../img/logo.png';
import folderImg from '../img/folder.png';
import fileImg from '../img/file.png';

// HEADER AND MENU
const toggleMenu = document.getElementById('btn-menu');
const menuContainer = document.querySelector('.menu-container');
const iconLink = document.getElementById('icon-link');
const navMenu = document.querySelector('.nav-menu');

navMenu.addEventListener('click', (e) => {
  e.target.id === 'item-information' ? menuContainer.classList.replace('menu-container-active', 'menu-container') & toggleMenu.classList.toggle('is-active') : 'null';
  e.target.id === 'item-directory' ? menuContainer.classList.replace('menu-container-active', 'menu-container') & toggleMenu.classList.toggle('is-active') : 'null';
  e.target.id === 'item-accessories' ? menuContainer.classList.replace('menu-container-active', 'menu-container') & toggleMenu.classList.toggle('is-active') : 'null';
});

iconLink.setAttribute('src', `${Headericon}`);

toggleMenu.addEventListener('click', () => {
  menuContainer.classList.toggle('menu-container-active');
  toggleMenu.classList.toggle('is-active');
});

// EVENT SCROLL HEADER

let initPosition = [];
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  const setInitPosition = window.pageYOffset;
  if (initPosition > setInitPosition) {
    header.style.top = '0px';
  } else {
    header.style.top = '-75px';
  }

  initPosition = setInitPosition;
});

// DIRECTORY
const fakeAPI = './json/sample.simple.json';

const fetchDirectory = async () => {
  try {
    const res = await fetch(fakeAPI);
    const data = await res.json();
    renderDirectory(data);
  } catch (error) {
    console.log(error);
  }
};

document.addEventListener('DOMContentLoaded', () => {
  fetchDirectory();
  navigationAutomatic();
});

const renderDirectory = (data) => {
  // console.log(data);
  const directoryContainer = document.getElementById('directory-container');
  directoryContainer.innerHTML = '';
  for (const el of data) {
    directoryContainer.innerHTML += `<div class="directory-content">
    <div class="box-directory"> 
    <figure class="folder">
        <img src="${folderImg}" alt="" class="folder-icon" id="${el.name}">
    </figure>
      <h3 class="title-folder">${el.name}</h3>
    </div>
    </div>
    `;
  }
  // FOLDER ONE
  const files = data.map((i) => i.files);
  const contentFolderOne = files[0].map((i) => i);
  const filteredFolder = contentFolderOne.filter((i) => i.type === 'directory');
  const firstFolder = directoryContainer.childNodes[0];
  const firstsFolders = document.createElement('div');
  firstsFolders.setAttribute('class', 'folders-and-files');
  firstsFolders.setAttribute('hidden', 'true');
  firstsFolders.innerHTML = '';
  for (const el of filteredFolder) {
    firstsFolders.innerHTML += `<div class="wrap-files">
    <div class="box-directory">
        <figure class="folder">
            <img src="${folderImg}" alt="" class="folder-icon" id="${el.name}">
        </figure>
        <div class="box-title-folder">
          <h3 class="title-folder">${el.name}</h3>
        </div>
        </div>
        </div> `;
  }
  const firstFile = document.createElement('div');
  firstFile.setAttribute('class', 'folders-and-files');
  firstFile.setAttribute('hidden', 'true');
  const filteredFile = contentFolderOne.filter((i) => i.type === 'file');
  firstFile.innerHTML = '';
  for (const el of filteredFile) {
    // console.log(el);
    firstFile.innerHTML += `<div class="wrap-files">
  <div class="box-directory">
      <figure class="folder">
          <img src="${fileImg}" alt="" class="file-icon">
      </figure>
      <div class="box-title-folder">
        <h3 class="title-folder">${el.name}</h3>
      </div>
      </div>
      </div> `;
  }
  firstFolder.appendChild(firstsFolders);
  firstFolder.appendChild(firstFile);

  // FOLDER TWO
  const contentFolderTwo = files[1].map((i) => i);
  const secondFolder = directoryContainer.childNodes[2];
  const secondsFiles = document.createElement('div');
  secondsFiles.setAttribute('class', 'folders-and-files');
  secondsFiles.setAttribute('hidden', 'true');
  secondsFiles.innerHTML = '';
  for (const el of contentFolderTwo) {
    secondsFiles.innerHTML += `<div class="box-directory">
        <figure class="folder">
            <img src="${fileImg}" alt="" class="file-icon">
        </figure>
        <div class="box-title-folder">
          <h3 class="title-folder">${el.name}</h3>
        </div>
        </div> `;
  }
  secondFolder.appendChild(secondsFiles);
  // SUBFOLDER ONE
  const contentSubFolderOne = files[0][0].files;
  const filteredSubFolderOne = contentSubFolderOne.filter((i) => i.type === 'directory');
  const wrappedSubFolderOne = directoryContainer.childNodes[0].childNodes[3].childNodes[0];
  const subFolderOne = document.createElement('div');
  subFolderOne.setAttribute('class', 'folders-and-files');
  subFolderOne.setAttribute('hidden', 'true');
  subFolderOne.innerHTML = '';
  for (const el of filteredSubFolderOne) {
    subFolderOne.innerHTML += `<div class="box-directory">
    <figure class="folder">
        <img src="${folderImg}" alt="" class="folder-icon">
    </figure>
    <div class="box-title-folder">
      <h3 class="title-folder">${el.name}</h3>
    </div>
    </div>
    `;
  }
  const filteredSubFilesOne = contentSubFolderOne.filter((i) => i.type === 'file');
  const subFilesOne = document.createElement('div');
  subFilesOne.setAttribute('class', 'folders-and-files');
  subFilesOne.setAttribute('hidden', 'true');
  subFilesOne.innerHTML = '';
  for (const el of filteredSubFilesOne) {
    subFolderOne.innerHTML += `<div class="box-directory">
    <figure class="folder">
        <img src="${fileImg}" alt="" class="file-icon">
    </figure>
    <div class="box-title-folder">
      <h3 class="title-folder">${el.name}</h3>
    </div>
    </div>
    `;
  }
  wrappedSubFolderOne.appendChild(subFolderOne);
  wrappedSubFolderOne.appendChild(subFilesOne);

  // SUB FOLDER TWO
  const contentSubFolderTwo = files[0][1].files;
  const filteredSubFoldersTwo = contentSubFolderTwo.filter((i) => i.type === 'directory');
  const wrappedSubFolderTwo = directoryContainer.childNodes[0].childNodes[3].childNodes[2];
  const subFoldersTwo = document.createElement('div');
  subFoldersTwo.setAttribute('class', 'folders-and-files');
  subFoldersTwo.setAttribute('hidden', 'true');
  subFoldersTwo.innerHTML = '';
  for (const el of filteredSubFoldersTwo) {
    subFoldersTwo.innerHTML += `<div class="box-directory">
    <figure class="folder">
        <img src="${folderImg}" alt="" class="folder-icon">
    </figure>
    <div class="box-title-folder">
      <h3 class="title-folder">${el.name}</h3>
    </div>
    </div>
    `;
  }

  const filteredSubFileTwo = contentSubFolderTwo.filter((i) => i.type === 'file');
  const subFileTwo = document.createElement('div');
  subFileTwo.setAttribute('class', 'folders-and-files');
  subFileTwo.setAttribute('hidden', 'true');
  subFileTwo.innerHTML = '';
  for (const el of filteredSubFileTwo) {
    subFileTwo.innerHTML += `<div class="box-directory">
    <figure class="folder">
        <img src="${fileImg}" alt="" class="file-icon">
    </figure>
    <div class="box-title-folder">
      <h3 class="title-folder">${el.name}</h3>
    </div>
    </div>
    `;
  }
  wrappedSubFolderTwo.appendChild(subFoldersTwo);
  wrappedSubFolderTwo.appendChild(subFileTwo);

  // EVENTS DIRECTORY

  directoryContainer.addEventListener('click', (e) => {
    e.preventDefault();
    e.target.id === 'JARqrzM' ? (firstsFolders.hidden = !firstsFolders.hidden) & (firstFile.hidden = !firstFile.hidden) : null;
    e.target.id === 'RM7yqbChd' ? (secondsFiles.hidden = !secondsFiles.hidden) : null;
    e.target.id === '3BmXB' ? (subFolderOne.hidden = !subFolderOne.hidden) & (subFilesOne.hidden = !subFilesOne.hidden) : null;
    e.target.id === 'W0ViZx5cJr' ? (subFoldersTwo.hidden = !subFoldersTwo.hidden) & (subFileTwo.hidden = !subFileTwo.hidden) : null;

    e.target.innerHTML === 'JARqrzM' ? (firstsFolders.hidden = !firstsFolders.hidden) & (firstFile.hidden = !firstFile.hidden) : null;
    e.target.innerHTML === 'RM7yqbChd' ? (secondsFiles.hidden = !secondsFiles.hidden) : null;
    e.target.innerHTML === '3BmXB' ? (subFolderOne.hidden = !subFolderOne.hidden) & (subFilesOne.hidden = !subFilesOne.hidden) : null;
    e.target.innerHTML === 'W0ViZx5cJr' ? (subFoldersTwo.hidden = !subFoldersTwo.hidden) & (subFileTwo.hidden = !subFileTwo.hidden) : null;
  });
};

//EVENT SLIDE

const navigationManual = document.querySelector('.navigation-manual');

navigationManual.addEventListener('click', (e) => {
  e.stopPropagation();
  const button = document.querySelector('.first');
  e.target.id === 'manual-btn1' ? (button.style.marginLeft = '0%') : null;
  e.target.id === 'manual-btn2' ? (button.style.marginLeft = '-20%') : null;
  e.target.id === 'manual-btn3' ? (button.style.marginLeft = '-40%') : null;
  e.target.id === 'manual-btn4' ? (button.style.marginLeft = '-60%') : null;
});
