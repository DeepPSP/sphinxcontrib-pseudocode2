# sphinxcontrib-pseudocode2

This is a fork of the original [sphinxcontrib-pseudocode project](https://github.com/xxks-kkk/sphinxcontrib-pseudocode/),
updated to support Sphinx 7.1+ and 8.x, and modern [pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js).

## Installation

```bash
pip install sphinxcontrib-pseudocode2
```

## Quick Start

Enable the extension in your Sphinx `conf.py`:

```python
extensions = [
    ...,
    "sphinxcontrib.pseudocode2",
]

# -------------------------- Optional Configuration --------------------------
# 1. Specify math engine (default: "mathjax3", alternative: "katex")
pseudocode2_math_engine = "mathjax3"

# 2. Global pseudocode.js configuration (pseudocode2_options)
#    All parameters are directly passed to pseudocode.renderClass()
#    Covers all pseudocode.js native options (unified project-wide style)
pseudocode2_options = {
    "lineNumber": True,           # Global default: enable line numbering
    "lineNumberPunc": " | ",       # Punctuation after line numbers (e.g., "1 | ")
    "commentDelimiter": "//",     # Global default comment delimiter
    "noEnd": False,               # Global default: show "END" for control blocks
    "titlePrefix": "PseudoCode",  # Global default title prefix (replace "Algorithm")
    "captionCount": True          # Global default: enable auto-increment numbering
}
```

Write LaTeX-like pseudocode in an `.. pcode::` directive:

```text
.. pcode::
   :linenos:

   \begin{algorithm}
   \caption{Quicksort}
   \begin{algorithmic}
   \PROCEDURE{Quicksort}{$A, p, r$}
     \IF{$p < r$}
       \STATE $q = $ \CALL{Partition}{$A, p, r$}
       \STATE \CALL{Quicksort}{$A, p, q - 1$}
       \STATE \CALL{Quicksort}{$A, q + 1, r$}
     \ENDIF
   \ENDPROCEDURE
   \end{algorithmic}
   \end{algorithm}
```

## Configuration Options

Pseudocode rendering is extended with practical options (all compatible with pseudocode.js native capabilities):

- `linenos`: Enable line numbering
- `comment-delimiter`: Customize comment delimiters
- `line-number-punc`: Set line number punctuation
- `no-end`: Omit the `END` keyword for control blocks
- `title-prefix`: Customize the algorithm title prefix (e.g., "PseudoCode" instead of default "Algorithm")

### Global Configuration via `pseudocode2_options`

Pseudocode rendering styles can be unified across the entire project using a single global configuration (supports all pseudocode.js native parameters, see [pseudocode.js](https://github.com/SaswatPadhi/pseudocode.js)).

**Priority Rule**:
Configuration priority (higher priority overrides lower): Directive option (e.g., :linenos: in .rst) > pseudocode2_options (global in conf.py) > pseudocode.js default
