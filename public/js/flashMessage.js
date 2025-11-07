const messages = document.querySelectorAll('.flash-message');

messages.forEach((msg) => {
    // Fechar manualmente
    msg.querySelector('.btn-close').addEventListener('click', () => {
        msg.remove();
    });

    // Fechar automaticamente após 4 segundos
    setTimeout(() => {
        msg.remove();
    }, 4000);
});