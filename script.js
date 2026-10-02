const boton = document.getElementById("btnBuscar");
const entrada = document.getElementById("busqueda");
const resultado = document.getElementById("resultado");

boton.addEventListener("click", buscarUsuario);

async function buscarUsuario() {

    const nombre = entrada.value.trim();

    if (nombre === "") {
        resultado.innerHTML = "<p>Por favor, escribe un nombre.</p>";
        return;
    }

    resultado.innerHTML = "<p>Buscando información...</p>";

    try {

        const respuesta = await fetch(
            `https://api.github.com/users/${nombre}`
        );

        if (!respuesta.ok) {
            throw new Error("Usuario no encontrado");
        }

        const usuario = await respuesta.json();

        resultado.innerHTML = `
            <img 
                src="${usuario.avatar_url}"
                alt="Foto de perfil"
                width="120"
            >

            <h2>${usuario.name || usuario.login}</h2>

            <p>@${usuario.login}</p>

            <p>
                ${usuario.bio || "Este usuario no tiene biografía."}
            </p>

            <hr>

            <p>
                <strong>Seguidores:</strong>
                ${usuario.followers}
            </p>

            <p>
                <strong>Siguiendo:</strong>
                ${usuario.following}
            </p>

            <p>
                <strong>Repositorios:</strong>
                ${usuario.public_repos}
            </p>

            <p>
                <strong>Ubicación:</strong>
                ${usuario.location || "No disponible"}
            </p>

            <p>
                <strong>Empresa:</strong>
                ${usuario.company || "No disponible"}
            </p>

            <a
                href="${usuario.html_url}"
                target="_blank"
            >
                Ver perfil en GitHub
            </a>
        `;

    } catch (error) {

        resultado.innerHTML = `
            <p>No se encontró el usuario.</p>
        `;
    }
}