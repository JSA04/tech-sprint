const messages = document.querySelectorAll('.flash-message');

messages.forEach((msg) => {
    // Fechar manualmente
    msg.querySelector('.close-btn').addEventListener('click', () => {
        msg.classList.add('fade-out');
        setTimeout(() => msg.remove(), 400);
    });

    // Fechar automaticamente após 4 segundos
    setTimeout(() => {
        msg.classList.add('fade-out');
        setTimeout(() => msg.remove(), 400);
    }, 4000);
});