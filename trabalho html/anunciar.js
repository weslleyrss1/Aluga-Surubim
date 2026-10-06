// Campo onde o usuário escolhe as fotos
const campoFotos = document.getElementById("fotos");

// Área onde as fotos serão mostradas
const areaFotos = document.querySelector(".area-fotos");

// Lista das fotos escolhidas
let fotosSelecionadas = [];


// Quando o usuário escolher as fotos
campoFotos.addEventListener("change", function () {

    const novasFotos = Array.from(campoFotos.files);

    // Adiciona as novas fotos à lista
    novasFotos.forEach(function (foto) {

        // Evita adicionar a mesma foto duas vezes
        const jaExiste = fotosSelecionadas.some(function (fotoExistente) {
            return (
                fotoExistente.name === foto.name &&
                fotoExistente.size === foto.size &&
                fotoExistente.lastModified === foto.lastModified
            );
        });

        if (!jaExiste) {
            fotosSelecionadas.push(foto);
        }
    });

    atualizarFotos();
});


// Mostra as fotos na tela
function atualizarFotos() {

    areaFotos.innerHTML = "";

    if (fotosSelecionadas.length === 0) {
        areaFotos.classList.remove("com-fotos");

        areaFotos.innerHTML = `
            <span>Adicionar fotos</span>
            <small>Você pode adicionar várias imagens</small>
        `;

        return;
    }

    areaFotos.classList.add("com-fotos");


    fotosSelecionadas.forEach(function (foto, indice) {

        // Caixa da foto
        const container = document.createElement("div");
        container.classList.add("preview-container");


        // Imagem
        const imagem = document.createElement("img");

        imagem.src = URL.createObjectURL(foto);
        imagem.classList.add("preview-foto");


        // Botão X
        const botaoRemover = document.createElement("button");

        botaoRemover.type = "button";
        botaoRemover.innerHTML = "×";
        botaoRemover.classList.add("remover-foto");


        // Quando clicar no X
        botaoRemover.addEventListener("click", function (evento) {

            evento.preventDefault();
            evento.stopPropagation();

            // Remove a foto da lista
            fotosSelecionadas.splice(indice, 1);

            // Atualiza o campo de arquivos
            const dataTransfer = new DataTransfer();

            fotosSelecionadas.forEach(function (foto) {
                dataTransfer.items.add(foto);
            });

            campoFotos.files = dataTransfer.files;

            // Atualiza a tela
            atualizarFotos();
        });


        // Coloca tudo junto
        container.appendChild(imagem);
        container.appendChild(botaoRemover);

        areaFotos.appendChild(container);
    });
}