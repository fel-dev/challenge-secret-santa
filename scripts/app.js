// Define o número mínimo de amigos diretamente no arquivo
const MINIMUM_FRIENDS = 3;

const friends = [];
const friendInput = document.getElementById('friendName');
const addFriendBtn = document.getElementById('addFriendBtn');
const drawButton = document.getElementById('drawFriendBtn');
const friendsList = document.getElementById('friendsList');
const resultMessage = document.getElementById('resultMessage');
const resetButton = document.getElementById('resetBtn');
const title = document.querySelector('h1');

let hasDrawn = false; // Variável de controle para verificar se o sorteio já foi realizado

// Função para realizar o sorteio
function drawSecretFriend() {
    // Verifica se há pelo menos o número mínimo de amigos na lista
    if (friends.length < MINIMUM_FRIENDS) {
        alert(`É necessário ter pelo menos ${MINIMUM_FRIENDS} amigos na lista para realizar o sorteio.`);
        return;
    }

    // Realiza o sorteio
    const randomIndex = Math.floor(Math.random() * friends.length);
    const selectedFriend = friends[randomIndex];
    resultMessage.textContent = `O amigo secreto sorteado é: ${selectedFriend}`;
    resultMessage.classList.remove('hidden'); // Exibe a mensagem
    resultMessage.style.color = 'blue'; // Define a cor verde lima
    resultMessage.style.textShadow = '1px 1px 2px orange'; // Adiciona uma sombra simples
    friendsList.style.display = 'none'; // Oculta a lista

    // Atualiza o título da página
    title.classList.add('hidden');
    title.classList.remove('hidden');
    title.textContent = 'Amigo Secreto Realizado!';
    title.style.color = 'orange';
    title.style.textShadow = '2px 2px 4px white';

    // Oculta os botões "Adicionar Amigo" e "Sortear Amigo"
    addFriendBtn.classList.add('hidden');
    drawButton.classList.add('hidden');
    document.querySelector('.input-group').classList.add('hidden');

    // Exibe o botão "Resetar"
    resetButton.classList.remove('hidden');

    // Define a variável de controle como true
    hasDrawn = true;
}

// Função para adicionar amigo
function addFriend() {
    const friendNames = friendInput.value.split(/[,;]/).map(name => name.trim()).filter(name => name);
    if (friendNames.length > 0) {
        friends.push(...friendNames);
        updateFriendsList();
        friendInput.value = ''; // Limpa o campo de texto
    } else {
        alert('Por favor, insira o nome de um amigo antes de adicionar.');
    }
}

// Função para capturar a tecla Enter
function handleEnterKey(event) {
    if (event.key === 'Enter') {
        // event.preventDefault(); 

        // Verifica se o campo de texto está focado
        if (document.activeElement === friendInput) {
            addFriend(); // Adiciona amigo se o campo de texto estiver focado
        } else if (!hasDrawn) {
            drawSecretFriend(); // Realiza o sorteio se o campo de texto não estiver focado e o sorteio ainda não foi realizado
        }
    }
}

// Evento para o botão "Adicionar Amigo"
addFriendBtn.addEventListener('click', addFriend);

// Evento para capturar a tecla Enter globalmente
document.addEventListener('keydown', handleEnterKey);

// Evento para o botão "Sortear Amigo"
drawButton.addEventListener('click', drawSecretFriend);

// Evento para o botão "Resetar"
resetButton.addEventListener('click', () => {
    location.reload(); // Recarrega a página
});

// Função para atualizar a lista de amigos no DOM
function updateFriendsList() {
    friendsList.innerHTML = '';
    friends.forEach(friend => {
        const listItem = document.createElement('li');
        listItem.textContent = friend;
        friendsList.appendChild(listItem);
    });
}