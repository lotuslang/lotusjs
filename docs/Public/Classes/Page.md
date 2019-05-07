# Page class

Page internet de base. Contient une liste de `Box`.

### Définition interne

```ruby
public class System.Page
```

### Hérite de

Aucune classe.

### Héritée par

Aucune classe.

## Méthodes & Constructeurs

### Constructeurs

| Nom          | Description                                 | Accessibilité |
| ------------ | ------------------------------------------- | ------------- |
| Page()       | Créer une nouvelle page.                    | public        |
| Page(string) | Créer une nouvelle page avec le titre donné | public        |

### Méthodes

| Nom                | Description                                                          | Type du résultat | Accessibilité |
| ------------------ | -------------------------------------------------------------------- | ---------------- | ------------- |
| clear()            | Réinitialise la liste de `Box`, effaçant de fait toute la page       | void             | public        |
| close()            | Ferme la page qui correspond à cette instance.                       | void             | public        |
| addText(string)    | Permet d'afficher du text formatté sur la page à l'aide d'un TextBox | void             | public        |
| addText(TextField) | Permet d'afficher un `TextField` sous forme de `TextBox` sur la page | void             | public        |
| addText(Tag[])     | Permet d'afficher une liste de `Tag` sous forme d'HTML               | void             | public        |

## Membres

| Nom   | Description                               | Type  | Accessibilité |
| ----- |  ---------------------------------------  | ----- | ------------- |
| boxes | La liste de `Box` qui constituent la page | Box[] | public        |

## Exemple(s)

```ruby
# Un ou plusieurs exemples d'utilisation de cette classe
```

## Remarques

Il est recommandé d'intéragir directement avec cette classe plutôt qu'avec la liste de Box pour ajouter des éléments.

## Historique & disponibilité

Disponible depuis la version 0.1

Aucun changement majeur depuis.
