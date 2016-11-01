$(document).ready(Jss = function() {
    var classArray = [];
    var variableArray = [];
    var styleTag = document.getElementsByTagName("style");
    Array.prototype.forEach.call(styleTag, function(e){
        if (e.textContent != ""){
            classArray.push(e.textContent.match(/\@[^\}]+\}/g));
            variableArray.push(e.textContent.match(/(\$)[^\;]+\;/g));   
        }
    });
    
    var classSelector = Array.prototype.filter.call(document.querySelectorAll('*[class*="@"]'), function (e){
        return e.className.match(/(?=\@)\@[\w|\-]+($|\s)/g);
    });
    Array.prototype.forEach.call(classSelector, function(e){
        var classes = e.className.match(/(?=\@)\@[\w|\-]+($|\s)/g);
        for(var j in classes) {
                var reg = new RegExp(classes[j].trim() + "[^\}|\@]+\}");
                if(classArray.join().match(reg)) {
                    var addClasses = classArray.join().match(reg)[0].replace(classes[j].trim(), "").trim().slice(1, -1).trim().replace(/\:/g, "(").replace(/\;/g, ")").replace(/\(\s+/g, "(").replace(/\s+\)/g, ")");
                    e.className += ' ' + addClasses;
                } else {
                    console.error("Error 404 (Not Found): `" + classes[j].trim() + "` is not defined \n", e[0]);
                }
        }
    });
    
    var styleSelector = Array.prototype.filter.call(document.querySelectorAll('*[class*="("]'), function (e){
        return e.className.match(/[\@|\w|\-]+\([^\)]+\)+/);
    });
    Array.prototype.forEach.call(styleSelector, function(e){
        var styleArray = e.className.match(/[\@|\w|\-]+\([^\)]+\)+/g);
        for(var i in styleArray) {
            var currentClass = styleArray[i].trim();
            var styler = currentClass.split("(")[0];
            var parameter = currentClass.replace(/[\w|\-|\@]+\(/ , "").slice(0,-1);
            
            var variables = parameter.match(/\$\w+/g); 
            for(var j in variables) {
                var reg = new RegExp("\\$" + variables[j].slice(1) + "[^;]+");
                if(variableArray.join().match(reg)){
                    var addParamters = variableArray.join().match(reg)[0].replace(variables[j], "").trim().slice(1).trim();
                    parameter = parameter.replace(variables[j], addParamters);   
                } else {
                    console.error("Error (Not Found): `" + variables[j] + "` is not defined \n", e[0]);
                }
            } 
            
            parameter = parameter.replace(/\$[\w|\-]+/g, "").trim();
            e.style[styler] = parameter;
        }
    });
});