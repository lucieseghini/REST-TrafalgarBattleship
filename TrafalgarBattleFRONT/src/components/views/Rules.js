import React from 'react';

class Rules extends React.Component {
    render() {
        return (
            <div id="rules">
                <p>
                    Dans le cadre de la formation Master 2 Miage apprentissage, nous avons pour projet de réaliser une
                    application avec des requêtes en REST. Le sujet choisi est une application web. Il s’agit d’une application
                    permettant à deux personnes connectées de jouer au jeu de la bataille navale en temps réel.
                    Le jeu de bataille navale, ou touché-coulé, est au départ un jeu de société. Le but est de placer des
                    navires sur une grille qui n’est pas connue du joueur adverse, il doit réussir à lui couler les siens. Le
                    premier des joueurs qui parvient à toucher (“couler”) la totalité des navires adverses, remporte la partie.
                </p>
                <br/>
                <p>
                    La bataille navale oppose deux joueurs qui s'affrontent. Chacun a une flotte composée de 5 bateaux, qui sont, en général, les suivants :
                    1 porte-avion (5 cases), 1 croiseur (4 cases), 1 contre torpilleur (3 cases), 1 sous-marin (3 cases), 1 torpilleur (2 cases).
                    Au début du jeu, chaque joueur place ses bateaux sur sa grille. Celle-ci est toujours numérotée de A à J verticalement et de 1 à 10 horizontalement.
                    Un à un, les joueurs vont "tirer" sur une case de l'adversaire. Par exemple B.3 ou encore H.8. Le but est donc de couler les bateaux adverses.
                    En général, les jeux de société prévoient des pions blancs pour les tirs dans l'eau (donc qui ne touchent aucun bateau adverse) et des pions rouges pour les "touché".
                    Au fur et à mesure, il faut mettre les pions sur sa propre grille afin de se souvenir de nos tirs passés.
                </p>
            </div>
        )
    }
}

export default Rules;