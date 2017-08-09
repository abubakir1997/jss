## About

Jss is a general complementary library used to execute CSS code in a more productive easier way without taking from the speed provided by native CSS, opposite to what other options such as Sass and Less do. It is a growing idea and is in its beginning beta stage.

## Functions

- CSS styles in class attribute
- CSS classes with nested classes capabilities in style tag
- Introducing variables within the styles tag that could be used in both style and/or class
- Jquery functionalities such as '+='

## Basic Examples

```

<style>

    $variables = 50px;
    @class {
        backgroundColor
        color: white;
        height: $variables;
    }
    
    .backgroundColor {
        background-color: black;
    }

</style>

<div class=" @class padding-top(50px) margin(0 auto) font-size(+=20) ">...</div>

```

## Installation

Download the **Jss.js and Jquery.js** file then include it into your project. Make sure to load the file at the end of your document. 

```
<script type="text/javascript" src="/path/to/folder/jquery.js"></script>
<script type="text/javascript" src="/path/to/folder/jss.js"></script>

```
