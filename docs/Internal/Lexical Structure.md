# Lexical Structure

This document describes the meaning of different characters and keywords in  the Lotus language. It is designed to be a sort of standard for the syntax of Lotus. 

For more user- and beginner-friendly informations, as well as more in-depth explanation of each keyword, please refer to the [documentation].

If you're a developers wanting to implement a tokenizer/lexer for Lotus, you might want to see [Lexer Algorithms] for more machine-friendly definitions.

## Comments

Comments are one or multiple lines of text ignored by the interpreter. See [Comments] for more information.

### Single line comments

The symbol `#` is used to declare a single line comment. It can be used on a new line, or after a line of code. If it is included in a tring or character literal, it is ignored. The rest of the line after this symbol is interpreted as a comment.

*Example usage :*

```ruby
# This is a single line comment
h1("Hello world!") # This is also a single line comment
p("This # is not declaring a comment because it is in a string") # but this one is declaring a comment

# This code is interpreted as a comment because it begins with a '#' symbol
# h2("And welcome on my amazing website!")
```

### Limited or multi line comments

The symbol `#` repeated three times (`###`) is used to delimit the beginning and end of a limited or multi line comment. It can be only be used on a new line. If it is included in a tring or character literal, it is ignored. A limited or multi line comment is delimited by a pair of `###`. 

*Example usage :*

```ruby
###
This is 
a multi line
comment
###

### <--- This starts the comments | and this ends it ---> ###

p("### has no effect in a string !")
```

### Embedded documentation

The symbol `=` followed by the word `begin` is used to declare the start of an embedded documentation. The symbol `=` followed by the word `end` is used to declare the end of an embedded documentation. Each delimiter (`=begin` and `=end`) must be on a new line. Refer to the [Embedded documentation] section for more information on embedded documentation.

**Note :** This type of comment can be used as a multi line comment or to automatically generate documentation. See the [Embedded documentation]for more information.) section for more information.

*Example usage :*

```ruby
=begin 
This is a simple documentation
for a simple function
=end
```

## Keywords

Keywords are words that are reserved by the language, and thus can't be (re)declared by the program. See [Keywords] for more information.

### if and else keywords

The `if` and `else` keywords are used to create conditional code blocks. It has the following format

- the `if` keyword : declares an `if` clause

- a *condition* in parenthesis : If this condition evaluates to true, execute the following code block or line. Otherwise, if an `else` clause (keyword + code block/line) is declared,  execute it. If no `else` clause is declared, do nothing.

- a *code line* OR an *indented code block* : this is the code that is to be executed if the condition is true. If it's a single code line, it can be on the same line as the `if` declaration, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with a indentation of one more than the `if` keyword.

- the `else` keyword : declares an `else` clause. It can be directly followed by another `if` keyword  to create an if/else clauses chain, in which case it's also followed by a condition in parenthesis. It can be omitted. If it is omitted, then there is no code block/line corresponding to it.

- a *code line* OR an *indented code block* : this is the code that is to be executed if the condition is true. If it's a single code line, it can be on the same line as the `if` and  `else` declaration, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with the same indetation as the `if` code block

**Note :** You can chain multiple if/else clause. See [Conditions] for more information.

*Example usage :* 

```ruby
someCondition = true

if (someCondition)
    p("Hello there")
else
    p("Goodnight world")
```

<div>
<b> Output </b>
<p>Hello there</p>
</div>

```ruby
n = 4

if (n == 1)
    p("n is equal to 1")
else if (n == 2)
    p("n is equal to 2")
else if (n == 3)
    p("n is equal to 3")
else 
    p("n is more than 3")
```

<div>
<b> Output </b>
<p>n is more than 3</p>
</div>

```ruby
name = "John"

if (name == "John") p("Hello John") else ("Hello world") # Compact version
```

<div>
<b> Output </b>
<p>Hello John</p>
</div>

### true and false keywords

The `true` and `false` keywords are used, respectively, to declare a condition that's always evaluated to true, and to declare a condition that's always evaluated to false. It can be used in an `if` statement, in `while` and `for` loops, and in [conditional expressions], as well as a value for a variable. See [Conditions] for more information. 

*Example usage :*

```ruby
someCondition = false

if (someCondition)
    p("Hello John!")
else
    p("Hello Clara!")
```

<div>
<b> Output </b>
<p> Hello Clara!</p>
</div>

### while and do keyword

The `while` keyword is used to declare a conditional loop. It has the followng format

- the `while` keyword : declares a `while` loop

- a *condition* in parenthesis : This condition will be chacked at the beginning of each iteration of the loop. If it's true, execute the code line or contained in the code block. Otherwise, skip the loop and go to the code line after the code block.

- a *code line* OR an *indented code block* : this is the code that is to be executed at each iteration of the loop. If it's a single code line, it can be on the same line as the `while` declaration, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with a indentation of one more than the `while` 

See [while loops] for more information

*Example usage :*

```ruby
isFinished = false;
someString = "Hello world!"
counter = 0

# Repeats until the variable "IisFinished" is set to true
while (!isNotFinished)
    # if the character of 'someString' at index 'counter' is equal to ' '
    if (someString[counter] == ' ')
        isFinished = true
    else # else prints the character of 'someString' at index 'counter'
        p(someString)
```

<div>
<b> Output </b>
<p>H</p>
<p>e</p>
<p>l</p>
<p>l</p>
<p>o</p>
</div>

The `do` keyword is used in association with the `while` keyword to create a conditional loop that executes at least once. A `do-while` loop has a different syntax than a `while` loop. It has the following format

- the `do` keyword : declares a `do-while` loop

- a *code line* OR an *indented code block*  : this is the code that is to be executed at each iteration of the loop. If it's a single code line, it can be on the same line as the `do` and `while` keywords, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with a indentation of one more than the `do` and `while` keywords

- the `while` keyword : It is is on a new line, except if the code line is on the same line as the `do` keyword

- a *condition* in parenthesis : this condition will be checked at the beginning of each iteration (except the first). If it's true, execute the code line or contained in the code block. Otherwise, skip the loop and go to the code line after the code block.

*Example usage :*

```ruby
do 
    p("Hello") # Will only be executed once because condition is false
while (false)

do p("World") while (false) # Compact version
```

<div>
<b> Output </b>
<p>Hello</p>
<p>World</p>
</div>

### for keyword

The `for` keyword is used to declare a loop. It has the following format

- the `for` keyword : declares a loop 

- a *variable declaration or assignement* : this variable will be declared (or assigned if it already exists) right before the first execution of the loop, and never after. If the variable is declared for the first time, it's only declared in the loop's scope

- a *condition* : this condition will be checked at the beginning of each iteration of the loop. If it's true, execute the code line or contained in the code block. Otherwise, skip the loop and go to the code line after the code block.

- a *single code statement* : this statement will be executed at the end of each iteration of the loop.

- a *code line* OR an *indented code block* : this is the code that is to be executed at each iteration of the loop. If it's a single code line, it can be on the same line as the `for` declaration, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with a indentation of one more than the `for` declaration.

Each of those section must be separated by semicolon.

*Example usage :* 

```ruby
# Creates a paragraphs for each value of 'i'
for i = 0; i < 3; i++; p(i) # Compact version
```

<div>
<b> Output </b>
<p>0</p>
<p>1</p>
<p>2</p>
</div>

```ruby
# Creates a paragraph with the text "The value of j is " followed by the value of 'i'
for i = 0; i < 5; i++
    p("The value of j is " + i)
```

<div>
<b> Output : </b>
<p>The value of j is 0</p>
<p>The value of j is 1</p>
<p>The value of j is 2</p>
<p>The value of j is 3</p>
<p>The value of j is 4</p>
</div>

**Note :** Each of the for sections can be empty, but there will be consequences. See [for loops] for more information.

*Example usage*

```ruby
# This loop will never be executed, because the condition is empty, therefore evaluating to 'false'.
# Equivalent to while (false)
for ;;
    p("This is what loneliness looks like") # This line will never be rendered
```

<div>
<b> Output </b> 
<p>[nothing]</p>
</div>

```ruby
# Infinite loop. 
# Equivalent to while (true)
for ; true;
    p("And this is infinity!")
```

<div>
<b> Output </b>
<p>
<b>A rendering error occured in file <code>index.lot</code> at line 3 :</b> <code>for ; true;</code>
</p>
</div>

### foreach and in keyword

The `foreach` keyword is used to declare a loop which iterates through a collection. It has the following format

- the `foreach` keyword : declares an iterative loop

- a *variable identifier* : this is the name of the variable that will be declared and assigned at every iteration. The variable should not be already declared

- the `in` keyword

- a *collection* : this is the collection that this loop will iterate through.

- a *code line* OR an *indented code block* : this is the code that is to be executed at each iteration of the loop. If it's a single code line, it can be on the same line as the `foeach` declaration, or in an indented code block. If it's an indented code block (ie. one or more code lines), it must be on a new line, with a indentation of one more than the `foreach` declaration.

*Example usage :*

```ruby
fruits = [ "Apple", "Banana", "Grapes" ]

foreach fruit in fruits
    p(fruit)
```

<div>
<b> Output </b>
<p>Apple</p>
<p>Banana</p>
<p>Grapes</p>
</div>

```ruby
names = [ "John", "Clara" ]

foreach name in names p("Hello " + name) # Compact form
```

<div>
<b>Output</b>
<p>John</p>
<p>Clara</p>
</div>

### break and continue keyword

The `break` keyword is used to stop the execution of a loop. it can be used in a `while`, `for` or `foreach` loop.

*Example usage :*

```ruby
items = [ "tape", "pen", "glue", "poison", "speaker" ]

foreach item in items
    if (item == "poison")
        break
    else
        p(item)
```

<div>
<b> Output </b>
<p>tape</p>
<p>pen</p>
<p>glue</p>
</div>

The `continue` keyword is used to skip an iteration of a loop. It can be used in a `while`, `for`, or `foreach` loop. it can be used to avoid an `else` clause.

*Example usage :*

```ruby
marks = [ 14, 13, 8, 10, 19 ]

foreach mark in marks
    if (mark < 10)
        continue;
    p(mark)
```

<div>
<b> Output </b>
<p>14</p>
<p>13</p>
<p>10</p>
<p>19</p>
</div>

### extends keyword

The `extends` keyword has too different uses.

#### First use : A file-wide `extends` directive

The `extends` keyword can be used at the beginning of a file to signify that it inherits code from another lotus file (refered to as *extending*). Extending a file basically means pasting the code contained in it to on top of the current file before evaluating the rest of the file. It can only be used at beginning of the file, at the first line of code (note: whitespaces and comments don't count as code, so you can have as many newlines or comments before the `extends` directive). See [Extending a file] for more information. An `extends` directive has the following format

- The `extends` keyword : declares an `extends` directive

- A string containing a *URI* or a *file name* : The URI can be relative to the file path, can be absolute, or can a URL to a distant lotus file. If it's a file name, it has to be in the same directory as the current lotus file.

**Note :** If you use a URL, the file designated by it needs to have the mime-type `text/html` or `text/lotus`. otherwise, it will be rejected.

*Example usage :* 



`page_base.lts` | Base file used by every webite's pages

```ruby
html
    head
        title("Garry's website | " + this.title)
        script(src = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js")
        style(src = "https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css")
```



`index.lts` | File used for the website's landing page

```ruby
# landing page for Garry's website 
extends "page_base.lts"

this.title = "Home"

body
    h1("Hello!")
    p("And welcome to my amazing website!")
```



**Output** when rendering index.lts

```handlebars
<html>
    <head>
        <title>Garry's website | Home</title>
        <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/js/bootstrap.min.js"/>
        <style src="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"/>
    </head>
    <body>
        <h1>Hello!</h1>
        <p>And welcome to my amazing website!</p>
    </body>
</html>
```

*Whitespaces added for lisibility*



#### Second use : Type inheritance

The `extends` keyword can be used right after a class or interface declaration to indicate that it inherits from the specified class or interface. A class can inherit only from **one class** but can inherit from an unlimited number or interfaces. See [Inheritance] for more information. It has the following format

- The `extends` keyword : indicate inheritance from another class or other interface(s)

- A comma-separated list of interfaces and/or a class.



*Example usage :*



`animals.lts` | File declaring the Animals namespace

```ruby
namespace Animals

class Animal

    name = ""
    
    # Constructor for the Animal class
    Animal(name):
        this.name = name

    # Returns the name of the animal
    def GetName():
        return "I am a " + this.name;

class Dog extends Animal

    # Constructor for the Dog class
    Dog(): base("Dog"); # Calls the base class constructor's (Animal) with argument "Dog"

class Cat extends Animal
    
    # Constructor for the Cat class
    Cat(): base("Cat"); # calls the base class constructor's (Animal) with argument "Cat"
```



`index.lts` | File rendered

```ruby
from "animals.lts" import Animals

cat = new Cat()

p(cat.GetName())

dog = new Dog()

p(dog.GetName())
```



<div>
<b>Output</b>
<p>I am a Cat</p>
<p>I am a Dog</p>
</div>
