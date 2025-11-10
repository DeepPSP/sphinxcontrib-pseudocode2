document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("div.highlight").forEach((block) => {
    const codePreInTd = block.querySelector("td.code pre");
    const pre = codePreInTd || block.querySelector("pre");
    if (!pre) return;

    const toolbar = document.createElement("div");
    toolbar.className = "code-toolbar";

    const svgCopy = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-copy" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M4 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1zM2 5a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-1h1v1a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h1v1z"/>
        </svg>`;

    const svgWrap = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-text-wrap" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M2 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5h9a2.5 2.5 0 0 1 0 5h-1.293l.647.646a.5.5 0 0 1-.708.708l-1.5-1.5a.5.5 0 0 1 0-.708l1.5-1.5a.5.5 0 0 1 .708.708l-.647.646H11.5a1.5 1.5 0 0 0 0-3h-9a.5.5 0 0 1-.5-.5m0 4a.5.5 0 0 1 .5-.5H7a.5.5 0 0 1 0 1H2.5a.5.5 0 0 1-.5-.5"/>
        </svg>`;

    const copyBtn = document.createElement("button");
    copyBtn.className = "code-icon-btn";
    copyBtn.innerHTML = svgCopy;
    copyBtn.title = "Copy to clipboard";
    copyBtn.addEventListener("click", async (ev) => {
      const textToCopy = pre.innerText;
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(textToCopy);
        } else {
          fallbackCopyText(textToCopy);
        }
        showCopyTooltip(copyBtn, "Copied!");
      } catch (err) {
        try {
          fallbackCopyText(textToCopy);
          showCopyTooltip(copyBtn, "Copied!");
        } catch (err2) {
          console.error("Copy failed:", err, err2);
          showCopyTooltip(copyBtn, "Failed");
        }
      }
    });

    const wrapBtn = document.createElement("button");
    wrapBtn.className = "code-icon-btn";
    wrapBtn.innerHTML = svgWrap;
    wrapBtn.title = "Toggle line wrap";
    wrapBtn.addEventListener("click", () => {
      pre.classList.toggle("wrapped");
      wrapBtn.classList.toggle("active", pre.classList.contains("wrapped"));
    });

    toolbar.appendChild(copyBtn);
    toolbar.appendChild(wrapBtn);

    block.style.position = block.style.position || "relative";
    block.insertBefore(toolbar, block.firstChild);
  });
});

function fallbackCopyText(text) {
  const ta = document.createElement("textarea");
  ta.value = text;
  ta.style.position = "fixed";
  ta.style.top = "-10000px";
  ta.style.left = "-10000px";
  document.body.appendChild(ta);
  ta.focus();
  ta.select();
  const ok = document.execCommand("copy");
  document.body.removeChild(ta);
  if (!ok) throw new Error("execCommand copy failed");
}

function showCopyTooltip(btn, text = "Copied!") {
  const tooltip = document.createElement("div");
  tooltip.className = "copy-tooltip";
  tooltip.textContent = text;
  document.body.appendChild(tooltip);

  const rect = btn.getBoundingClientRect();
  let top = rect.top - 28;
  if (top < 6) top = rect.bottom + 8;

  tooltip.style.left = `${rect.left + rect.width / 2}px`;
  tooltip.style.top = `${top}px`;

  requestAnimationFrame(() => tooltip.classList.add("visible"));
  setTimeout(() => {
    tooltip.classList.remove("visible");
    setTimeout(() => tooltip.remove(), 200);
  }, 1200);
}
