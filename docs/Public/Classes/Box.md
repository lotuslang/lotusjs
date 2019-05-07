# Box class

Unité de base d'une page web. Peut contenir à peu près n'importe quel élément visuel.

### Définition interne

```ruby
class System.Box
```

### Hérite de

Aucune classe.

### Héritée par

- CommentBox

- TextBox

- MediaBox

## Méthodes & Constructeurs

### Constructeurs

| Nom   | Description                          | Accessibilité |
| ----- | ------------------------------------ | ------------- |
| Box() | Créer une nouvelle instance de `Box` | public        |

### Méthodes

| Nom     | Description                                                    | Type du résultat | Accessibilité |
| ------- | -------------------------------------------------------------- | ---------------- | ------------- |
| clear() | Réinitialise la valeur de l'instance, la rendant de fait vide  | void             | public        |

## Membres

| Nom    | Description                        | Type    | Accessibilité |
| ------ | ---------------------------------- | ------- | ------------- |
| fields | Liste de Field contenu dans la box | Field[] | public        |
| height | Hauteur de l'instance              | int     | public        |
| width  | Largeur de l'instance              | int     | public        |

## Exemple(s)

```ruby
# Un ou plusieurs exemples d'utilisation de cette classe
```

## Remarques

*Rubrique optionelle*

## Historique & disponibilité

Disponible depuis la version 0.1

Aucun changement majeur depuis
