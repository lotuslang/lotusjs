# ClassName class

Courte description de la classe.

### Définition interne

```ruby
public class System.MediaBox < Box
```

### Hérite de

Box

### Héritée par

- ImageBox

- VideoBox

- AudioBox

- CodeBox



## Méthodes & Constructeurs

### Constructeurs

| Nom              | Description                                                                        | Accessibilité |
| ---------------- | ---------------------------------------------------------------------------------- | ------------- |
| Mediabox()       | Créer une nouvelle instance de `MediaBox`                                          | public        |
| MediaBox(string) | Créer une nouvelle instance de `MediaBox` à partir du média désigné par l'argument | public        |

### Méthodes

| Nom    | Description       | Type du résultat | Accessibilité |
| ------ | ----------------- | ---------------- | ------------- |
| show() | Affiche l'élément | void             | public        |
| hide() | Cache l'élément   | void             | public        |

## Membres

| Nom     | Description                                                                                       | Type   | Accessibilité |
| ------- | ------------------------------------------------------------------------------------------------- | ------ | ------------- |
| alt     | Texte alternatif affiché si le fichier ne se charge pas ou si l'utilisateur à un handicap visuel  | string | public        |
| uri     | URI du média. Peut désigner un fichier local, à distance, ou une portion de document HTML         | URI    | public        |
| visible | Indique si l'instance est visible                                                                 | bool   | public        |

## Exemple(s)

```ruby
# Un ou plusieurs exemples d'utilisation de cette classe
```

## Remarques

Cette classe devrait être utilisée principalement si le média n'est pas connu lorsque l'objet est créé, ou ne convient à aucun des types héritants (`ImageBox`, `VideoBox`, `AudioBox`, et `CodeBox`).

## Historique & disponibilité

Disponible depuis la version a.b

Aucun changement majeur depuis

***OU***

Changement à la version a.g :

*Description du changement*
