import os

from sphinx.application import Sphinx


def build_docs(tmp_path, srcdir):
    outdir = tmp_path / "out"
    doctreedir = tmp_path / "doctree"
    app = Sphinx(
        srcdir=srcdir,
        confdir=srcdir,
        outdir=str(outdir),
        doctreedir=str(doctreedir),
        buildername="html",
        warningiserror=False,
        freshenv=True,
    )
    app.build(force_all=True)
    return outdir


def test_basic_build(tmp_path):
    srcdir = os.path.join(os.path.dirname(__file__), "roots", "test-basic", "source")
    outdir = build_docs(tmp_path, srcdir)
    index_html = (outdir / "index.html").read_text(encoding="utf-8")
    assert "pseudocode.min.js" in index_html
    assert "<pre" in index_html
