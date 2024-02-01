var userInput = "";

function handleKeyPress(event) {
  if (event.key === 'Enter') {
    sendMessage();
  }
}

function sendMessage() {
  userInput = document.getElementById('userInput').value;
  displayMessage('chat-container', userInput, 'user-message right-align-user');
  fetchData();
}

async function fetchData() {
  try {
    const loadingId = 'user-loading';
    displayLoading('chat-container', loadingId, 'user-message');

    const response = await fetch('http://20.9.143.253:9000/bisleri/' + userInput);

    removeElement(loadingId);

    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }

    const data = await response.json();

    const parsedContent = data.answer.replace(/\n/g, '<br>');

    displayMessage('chat-container', parsedContent, 'chatbot-message');
    document.getElementById('userInput').value = "";
    showSatisfactionContainer();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function displayLoading(containerId, loadingId, messageClass) {
  document.getElementById(containerId).innerHTML += `
    <div class="chat-card ${messageClass}" id="${loadingId}">
      <img src="loading.gif" alt="Loading..." class="loading-gif">
    </div>`;
}

function displayMessage(containerId, message, messageClass) {
  document.getElementById(containerId).innerHTML += `
    <div class="chat-card ${messageClass}">
      ${message}
    </div>`;
}

function removeElement(elementId) {
  const element = document.getElementById(elementId);
  if (element) {
    element.parentNode.removeChild(element);
  }
}

function showSatisfactionContainer() {
  document.getElementById('satisfactionContainer').style.display = 'flex';
}

function removeSatisfactionContainer() {
  document.getElementById('satisfactionContainer').style.display = 'none';
  document.getElementById('userInput').focus();
}

function handleSatisfaction(satisfaction) {
if (satisfaction === 'No') {
  document.getElementById('userInput').value = 'not satisfied'; // Set user input to "not satisfied" if not satisfied
  sendMessage(); // Send the "not satisfied" message immediately
}
removeSatisfactionContainer();
}

document.getElementById('userInput').addEventListener('keypress', handleKeyPress);
