# -*- coding: utf-8 -*-
"""
sphinxcontrib2
~~~~~~~~~~~~~~~

This package is a namespace package that contains all extensions
distributed in the ``sphinx-contrib`` distribution.

:copyright: Copyright 2007-2009 by the Sphinx team, see AUTHORS.
:license: BSD, see LICENSE for details.
"""

try:
    import pkg_resources  # type: ignore

    pkg_resources.declare_namespace(__name__)
except Exception:
    # Fallback to pkgutil
    from pkgutil import extend_path

    __path__ = extend_path(__path__, __name__)
