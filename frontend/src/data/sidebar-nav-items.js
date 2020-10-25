export default function() {
    return [{
            title: "Inicio",
            htmlBefore: '<i class="material-icons">vertical_split</i>',
            to: "/inicio",
            htmlAfter: ""
        },
        {
            title: "Perfil",
            htmlBefore: '<i class="material-icons">edit</i>',
            to: "/Perfil",
        },
        {
            title: "Agregar amigos",
            htmlBefore: '<i class="material-icons">note_add</i>',
            to: "/AddFriend",
        },
        {
            title: "ChatBot",
            htmlBefore: '<i class="material-icons">view_module</i>',
            to: "/chatBot",
        },
        {
            title: "Chat",
            htmlBefore: '<i class="material-icons">view_module</i>',
            to: "/chat",
        }
    ];
}