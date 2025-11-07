const messages = document.querySelectorAll('.flash-message');

messages.forEach((msg) => {
    // Ao clicar no botão de fechar, a mensagem deve ser removida da interface
    msg.querySelector('.btn-close').addEventListener('click', () => {
        msg.remove();
    });

    // Após 4 segundos, a mensagem deve ser removida da interface
    setTimeout(() => {
        msg.remove();
    }, 4000);
});