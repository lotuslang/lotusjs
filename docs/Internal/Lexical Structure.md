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
    p("Hello")
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


