import { API_BASE_URL, AIRTABLE_CONFIG } from '../../data/config.js';

// Store apparatus and techs data
let apparatus = null;
let techs = null;

export async function getApparatus() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${AIRTABLE_CONFIG.TABLES.APPARATUS}?api_key=${AIRTABLE_CONFIG.API_KEY}`
    );
    
    if (!response.ok) {
      console.warn('Failed to fetch apparatus data:', response.status);
      return { records: [] };
    }
    
    const json = await response.json();
    apparatus = json;
    return json;
  } catch (error) {
    console.warn('Error fetching apparatus data:', error);
    return { records: [] };
  }
}

export async function getTechs() {
  try {
    const response = await fetch(
      `${API_BASE_URL}/${AIRTABLE_CONFIG.TABLES.TECHS}?api_key=${AIRTABLE_CONFIG.API_KEY}`
    );
    
    if (!response.ok) {
      console.warn('Failed to fetch techs data:', response.status);
      return { records: [] };
    }
    
    const json = await response.json();
    techs = json;
    return json;
  } catch (error) {
    console.warn('Error fetching techs data:', error);
    return { records: [] };
  }
}

export function fillModalWindow(idGear) {
  const techsData = getTechsData();
  const apparatusData = getApparatusData();
  
  if (!techsData || !apparatusData) {
    console.error('Airtable data not loaded yet');
    return;
  }

  document.querySelectorAll('.popup__tech_item').forEach((e) => e.remove());

  let iEl = 0;

  for (let i = 0; i < techsData.records.length; i++) {
    const appId = techsData.records[i].fields.apparatus[0];
    const techsRecF = techsData.records[i].fields;

    if (idGear === appId) {
      let nameT = techsRecF.Name;
      let valueT = techsRecF.value;

      createElemModalWindow('popup__tech_wrap', 'popup__tech_item', iEl, nameT, valueT);
      fillNameImgNote(idGear, apparatusData);
      iEl++;
    }
  }
}

function fillNameImgNote(idGear, apparatusData) {
  const appRec = apparatusData.records;

  for (let i = 0; i < appRec.length; i++) {
    let nameApp = appRec[i].fields.Name;
    let notesApp = appRec[i].fields.Notes;

    if (idGear === appRec[i].id) {
      let gearPhoto = document.querySelector('.popup__img > img');
      document.querySelector('.popup__title').textContent = nameApp;
      document.querySelector('.popup__text').textContent = notesApp;

      if (
        Array.isArray(appRec[i].fields.Photo) &&
        typeof appRec[i].fields.Photo[0].url === 'string'
      ) {
        gearPhoto.src = appRec[i].fields.Photo[0].url;
      } else {
        gearPhoto.src = '/img/coffgear.png';
        console.log('Error no Photo');
      }
    }
  }
}

function createElemModalWindow(_classNameWrap, _classNameParent, iEl, nameT, valueT) {
  const popupTechX = document.querySelector(`.${_classNameWrap}`);
  let div = document.createElement('div');
  div.className = _classNameParent;
  popupTechX.append(div);
  addTwoChild(iEl, 'popup__tech_name', nameT);
  addTwoChild(iEl, 'popup__tech_num', valueT);
}

function addTwoChild(iEl, _classNameLastChild, nameORvalue) {
  let arrTechItem = document.querySelectorAll('.popup__tech_item');
  let div = document.createElement('div');
  div.className = _classNameLastChild;
  div.textContent = nameORvalue;
  arrTechItem[iEl].append(div);
}

export function getApparatusData() {
  return apparatus;
}

export function getTechsData() {
  return techs;
}

