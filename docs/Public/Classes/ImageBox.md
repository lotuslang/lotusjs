# ImageBox class

Courte description de la classe.

### Définition interne

```ruby
public class System.ImageBox extends MediaBox
```

### Hérite de

MediaBox

### Héritée par

Aucune class.

## Méthodes & Constructeurs

### Constructeurs

| Nom                        | Description                                                                                                                                                                                       | Accessibilité |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------- |
| ImageBox()                 | Créer une nouvelle instance de `ImageBox`                                                                                                                                                         | public        |
| ImageBox(string)           | Créer une nouvelle instance de `ImageBox` à partir du média désigné par l'argument.                                                                                                               | public        |
| ImageBox(string, string)   | Créer une nouvellBoxe instance de `ImageBox` à partir de l'image désignée par le premier argument, et assigne le text alternatif à la valeur du deuxième argument.                                | public        |
| ImageBox(string, int, int) | Créer une nouvelle instance de `ImageBox` à partir de l'image désignée par le premier argument, avec une longueur et une largeur définies, respectivement, par le deuxième et troisième argument. | public        |

### Méthodes

| Nom    | Description       | Type du résultat | Accessibilité |
| ------ | ----------------- | ---------------- | ------------- |
| show() | Affiche l'élément | void             | public        |
| hide() | Cache l'élément   | void             | public        |

## Membres

| Nom     | Description                                                                                      | Type   | Accessibilité |
| ------- | ------------------------------------------------------------------------------------------------ | ------ | ------------- |
| alt     | Texte alternatif affiché si le fichier ne se charge pas ou si l'utilisateur à un handicap visuel | string | public        |
| uri     | URI du média. Peut désigner un fichier local, à distance, ou une portion de document HTML        | URI    | public        |
| visible | Indique si l'instance est visible                                                                | bool   | public        |

## Exemple(s)

```ruby
# Un ou plusieurs exemples d'utilisation de cette classe
```

## Remarques

Cette classe peut-être utilisée pour montrer des images. Les formats supportés sont ceux supportés par le tag `<img>` en HTML, c'est à dire : 

-  JPEG (JPG)

- PNG

- TIFF

- BMP

- SVG

- GIF



Si vous avez besoin de manipuler les pixels de l'image, il est recommandé d'utiliser un objet `Canvas`.

## Historique & disponibilité

Disponible depuis la version a.b

Aucun changement majeur depuis

***OU***

Changement à la version a.g :

*Description du changement*
