import { popupOpen } from './popup.js';

// Document titles mapping
const documentTitles = {
  'pers_data_agreement': 'Согласие на обработку персональных данных',
  'confidence_policy': 'Политика конфиденциальности'
};

/**
 * Load document HTML content
 * @param {string} documentName - Name of the document (without extension)
 * @returns {Promise<string>} HTML content of the document
 */
async function loadDocumentContent(documentName) {
  try {
    const response = await fetch(`/docs/${documentName}.html`);
    if (!response.ok) {
      throw new Error(`Failed to load document: ${response.statusText}`);
    }
    const html = await response.text();
    return html;
  } catch (error) {
    console.error('Error loading document:', error);
    return '<p>Ошибка загрузки документа. Пожалуйста, попробуйте позже.</p>';
  }
}

/**
 * Open document modal window
 * @param {string} documentName - Name of the document
 */
function openDocumentModal(documentName) {
  const popup = document.getElementById('popup-document');
  if (!popup) return;

  const titleEl = popup.querySelector('.popup__title--document');
  const contentEl = popup.querySelector('.popup__document-content');
  const downloadBtn = popup.querySelector('.popup__download-btn');

  // Set title
  titleEl.textContent = documentTitles[documentName] || documentName;

  // Set download link for title
  titleEl.href = `/docs/${documentName}.docx`;
  titleEl.setAttribute('download', `${documentName}.docx`);

  // Set download link for button
  downloadBtn.href = `/docs/${documentName}.docx`;
  downloadBtn.setAttribute('download', `${documentName}.docx`);

  // Load and set content
  contentEl.innerHTML = '<p>Загрузка...</p>';
  loadDocumentContent(documentName).then(html => {
    contentEl.innerHTML = html;
  });

  // Open popup
  popupOpen(popup);
}

/**
 * Initialize document links
 */
export function initDocumentLinks() {
  const documentLinks = document.querySelectorAll('.footer_document_link');
  documentLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const documentName = this.getAttribute('data-document');
      if (documentName) {
        openDocumentModal(documentName);
      }
    });
  });
}

