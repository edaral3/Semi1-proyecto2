export default function() {
    return [{
            title: "Todos",
            to: "/blog-overview",
            htmlBefore: '<i class="material-icons">edit</i>',
            htmlAfter: ""
        },
        {
            title: "Mapa",
            htmlBefore: '<i class="material-icons">vertical_split</i>',
            to: "/blog-posts",
        },
        {
            title: "Grafica",
            htmlBefore: '<i class="material-icons">note_add</i>',
            to: "/add-new-post",
        },
        {
            title: "Chat",
            htmlBefore: '<i class="material-icons">view_module</i>',
            to: "/chat",
        },
        {
            title: "Perfil",
            htmlBefore: '<i class="material-icons">view_module</i>',
            to: "/Perfil",
        }
    ];
}