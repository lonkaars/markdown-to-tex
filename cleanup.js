var fs = require("fs");

var file = fs.readFileSync("./document.tex").toString();

// remove \hypertarget that pandoc adds
file = file.replace(/\\hypertarget{.*}{%\n\\((sub)*section){(.*)}\\label{.*}}/gs, "\\$1{$3}");

// fix up \ldots with regular ...
file = file.replace(/\\ldots{}/g, "...");

// add table of contents
file = "\n\\tableofcontents\\newpage\n" + file

// add \begin{document} and \end{document} around document contents
file = "\\begin{document}\n" + file + "\n\\end{document}"

// add preamble to top of file
file = fs.readFileSync("./preamble.tex").toString() + "\n" + file

// newline at end for good measure
file += "\n"

// write changes
fs.writeFileSync("./document.tex", file, { encoding: "utf-8" });

